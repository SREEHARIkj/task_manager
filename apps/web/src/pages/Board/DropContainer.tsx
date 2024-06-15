import { cn } from '@/lib/utils';
import React, { DragEvent, useState } from 'react';
import { useGetAllTasks, useSetDragStatus, useTaskStatuses, useTasks } from '@/providers/TasksProvider';
import { AddTask } from './AddTask';
import { DropContainerProps } from '.';
import { DraggableCard } from './DraggableCard';
import { updateTask } from '@/service';

export const DropContainer: React.FC<DropContainerProps> = ({ index, status }) => {
    const [isActive, setActive] = useState<boolean>(false);
    const tasks = useTasks();
    const getAllTask = useGetAllTasks();
    const setDragStatus = useSetDragStatus();

    const taskStatusList = useTaskStatuses();

    const statusId = taskStatusList?.find(({ label }) => label === status)?.id;

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDrop = async (e: DragEvent) => {
        const data = e.dataTransfer.getData('text');
        const currentTaskStatus = tasks?.find((task) => task?.id === +data)?.status;
        const currentTaskStatusId = taskStatusList?.find(({ label }) => label === currentTaskStatus)?.id;

        if (currentTaskStatusId === statusId) return;

        if (!!data && isActive) {
            statusId && updateTask({ id: data, payload: { statusId } })?.then(() => getAllTask());
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
            className={cn('rounded-md h-dvh bg-opacity-15 w-full', isActive ? 'border border-1 border-blue-500' : '')}
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
                .map((task, j) => <DraggableCard key={`${j}-task-DraggableCard`} {...task} status={status} />)}
            <AddTask status={status} />
        </div>
    );
};
