import { TaskType } from '@/constants/const';
import { cn } from '@/lib/utils';
import React, { DragEvent, useState } from 'react';
import { useSetDragStatus, useSetTasks, useTasks } from '@/providers/TasksProvider';
import { AddTask } from './AddTask';
import { DropContainerProps } from '.';
import { DraggableCard } from './DraggableCard';

export const DropContainer: React.FC<DropContainerProps> = ({ index, status }) => {
    const [isActive, setActive] = useState<boolean>(false);
    const tasks = useTasks();
    const setTasks = useSetTasks();
    const setDragStatus = useSetDragStatus();

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDrop = (e: DragEvent) => {
        const data = e.dataTransfer.getData('text');
        if (!!data && isActive) {
            const updatedTask: TaskType[] | undefined = tasks?.map((task) =>
                task.id === data ? { ...task, status: status } : task
            );
            updatedTask && setTasks?.(updatedTask);
        }
        setActive(false);
        setDragStatus(false);
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDropCapture={handleDrop}
            key={index}
            className={cn('rounded-md h-dvh bg-opacity-15', isActive ? 'border border-1 border-blue-500' : '')}
            {...(isActive && {
                style: {
                    background: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 15px,
                        #17171724 15px,
                        #17171724 18px
                    )`,
                },
            })}
        >
            {tasks
                ?.filter((task) => task.status === status)
                .map((task, j) => <DraggableCard key={`${j}-task-Draggablecard`} {...task} status={status} />)}
            <AddTask status={status} />
        </div>
    );
};
