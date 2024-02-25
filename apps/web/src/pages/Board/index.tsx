import { StatusOptionType, StatusOptions } from '@/constants/const';
import React, { useEffect, useId, useMemo, useState } from 'react';
import { DeleteDropArea } from './DeleteDropArea';
import { ColumnHeading } from './ColumnHeading';
import { DropContainer } from './DropContainer';
import { socket } from '@/lib/utils/socketConfig';
import { MousePointer2 } from 'lucide-react';
import { useCursorStatus } from '@/providers/CursorDetailsProvider';
import useMousePosition from '@/Hooks/useMousePosition';

export interface DropContainerProps {
    index: number;
    status: string;
}

export type UserAndPointerDetails = {
    id: string;
    mousePosition: { x: number | null; y: number | null };
    color: string;
    isDragActive: boolean;
};

const Board: React.FC = () => {
    const [userAndPointers, setUserAndPointers] = useState<Array<UserAndPointerDetails>>([]);
    const mousePosition = useMousePosition();
    const { cursorStatus: isCusrorLeaved } = useCursorStatus();
    const { isDragActive } = useCursorStatus();

    const userId = useId();

    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            console.debug('Socket Connected');
        });
        socket.on('disconnect', () => {
            console.debug('Socket Disconnected');
        });

        socket.on('userAndPointers', (data) => {
            setUserAndPointers(data);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        localStorage.getItem('tabId');
        socket.emit('mousePointerLocation', {
            id: localStorage.getItem('tabId') || userId,
            mousePosition,
            isDragActive,
        });
    }, [mousePosition]);

    // console.log(mousePosition);

    const filteredMousePointerList = useMemo(() => {
        const list = userAndPointers?.filter((i) => i.id !== localStorage.getItem('tabId'));

        // clean up mouse click optiond if not needed
        const isDragging = list.find(({ isDragActive }) => isDragActive) || {};
        if (Object.keys(isDragging).length) {
            const {
                mousePosition: { x, y },
            } = isDragging as UserAndPointerDetails;
            const simulatedEvent = new MouseEvent('mousedown', { clientX: x || 0, clientY: y || 0 });
            document.dispatchEvent(simulatedEvent);
        }
        //------------------------------------------

        return list;
    }, [userAndPointers]);

    return (
        <div className="flex flex-col items-center h-screen px-16 relative ">
            <DeleteDropArea />
            <div className="flex flex-row gap-3">
                {StatusOptions.map(({ label, color, value }: StatusOptionType, index) => (
                    <div key={`${value}-${index}`} className="flex flex-col gap-4 flex-1">
                        <ColumnHeading title={label} color={color} />
                        <DropContainer index={index} status={value} />
                    </div>
                ))}
            </div>
            {isCusrorLeaved &&
                filteredMousePointerList?.map(({ id, mousePosition, color }, index) => (
                    <div
                        key={id}
                        className="fixed size-full indent-10"
                        style={{ top: mousePosition.y || 0, left: mousePosition.x || 0 }}
                    >
                        <div key={`${id}-${index}-pointer`}>
                            <MousePointer2 size={'18px'} color={color} fill={color} />
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Board;
