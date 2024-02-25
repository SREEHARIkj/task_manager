import { useEffect, useState } from 'react';

type CursorCordinate = { x: null | number; y: null | number };

const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState<CursorCordinate>({ x: null, y: null });

    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('drag', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);
    return mousePosition;
};

export default useMousePosition;
