import { TaskType, Tasks } from '@/const';
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

const TasksContext = createContext<{
    tasks: TaskType[] | undefined;
    setTasks: Dispatch<SetStateAction<TaskType[]>> | undefined;
}>({
    tasks: undefined,
    setTasks: undefined,
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
    const [tasks, setTasks] = useState<TaskType[]>(Tasks);
    return <TasksContext.Provider value={{ tasks, setTasks }}>{children}</TasksContext.Provider>;
};
