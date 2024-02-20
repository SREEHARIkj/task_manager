import { TaskType } from '@/constants/const';
import { getAllTasks } from '@/service';
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

const TasksContext = createContext<{
    tasks: TaskType[] | undefined;
    setTasks: Dispatch<SetStateAction<TaskType[]>> | undefined;
    getAllUpdatedTasks: () => void;
}>({
    tasks: undefined,
    setTasks: undefined,
    getAllUpdatedTasks: () => {},
});

export const useTasks = () => {
    const { tasks } = useContext(TasksContext);
    return tasks;
};

export const useSetTasks = () => {
    const { setTasks } = useContext(TasksContext);
    return setTasks;
};

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<TaskType[]>([]);

    const getAllUpdatedTasks = async () => {
        const response = await getAllTasks();
        setTasks?.(() => (response?.data?.length ? response?.data : []));
    };

    useEffect(() => {
        getAllUpdatedTasks();
    }, []);

    return <TasksContext.Provider value={{ tasks, setTasks, getAllUpdatedTasks }}>{children}</TasksContext.Provider>;
};
