import { TaskType } from '@/constants/const';
import { useSetDragStatus } from '@/providers/TasksProvider';
import { DragEvent, useState } from 'react';
import { AddTask } from './AddTask';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSetDragActive } from '@/providers/CursorDetailsProvider';

export const DraggableCard = ({ title, description, priority, id, status }: TaskType & { status: string }) => {
    const [editable, setEditable] = useState(false);
    const setDragStatus = useSetDragStatus();
    const setIsDragActive = useSetDragActive();
    const handleDragStart = (e: DragEvent) => {
        e.dataTransfer.setData('text/plain', id.toString());
        setDragStatus(true);
        setIsDragActive(true);
    };
    function handleDragEnd(e: DragEvent<HTMLDivElement>): void {
        e.dataTransfer.clearData();
        setDragStatus(false);
        setIsDragActive(false);
    }

    return (
        <>
            {editable ? (
                <AddTask {...{ id, status }} setEditable={setEditable} />
            ) : (
                <Card
                    draggable={true}
                    key={`draggable-${id}`}
                    className="mb-2 cursor-grab active:cursor-grabbing bg-[#F0F2F5]"
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDoubleClickCapture={() => setEditable(true)}
                >
                    <CardHeader className="py-3">
                        <CardTitle className="text-lg">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <p>{priority}</p>
                    </CardFooter>
                </Card>
            )}
        </>
    );
};
