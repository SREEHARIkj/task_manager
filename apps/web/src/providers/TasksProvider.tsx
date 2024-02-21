import { TaskType } from '@/constants/const';
import { getAllTasks } from '@/service';
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

const TasksContext = createContext<{
    tasks: TaskType[] | undefined;
    setTasks: Dispatch<SetStateAction<TaskType[]>> | undefined;
    getAllUpdatedTasks: () => void;
    dragStarted: boolean;
    setDragStarted: (param: boolean) => void;
}>({
    tasks: undefined,
    setTasks: undefined,
    getAllUpdatedTasks: () => {},
    dragStarted: false,
    setDragStarted: (data = false) => data,
});

export const useTasks = () => {
    const { tasks } = useContext(TasksContext);
    return tasks;
};

export const useSetTasks = () => {
    const { setTasks } = useContext(TasksContext);
    return setTasks;
};

export const useDragStatus = () => {
    const { dragStarted } = useContext(TasksContext);
    return dragStarted;
};

export const useSetDragStatus = () => {
    const { setDragStarted } = useContext(TasksContext);
    return setDragStarted;
};

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [dragStarted, setDragStarted] = useState<boolean>(false);

    const getAllUpdatedTasks = async () => {
        const response = await getAllTasks();
        setTasks?.(() => (response?.data?.length ? response?.data : []));
    };

    useEffect(() => {
        getAllUpdatedTasks();
    }, []);

    return (
        <TasksContext.Provider value={{ tasks, setTasks, getAllUpdatedTasks, dragStarted, setDragStarted }}>
            {children}
        </TasksContext.Provider>
    );
};
