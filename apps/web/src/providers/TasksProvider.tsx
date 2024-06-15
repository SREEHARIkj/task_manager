import { PriorityType, StatusType, TaskType } from '@/constants/const';
import { getAllPriorities, getAllStatuses, getAllTasks } from '@/service';
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

const TasksContext = createContext<{
    tasks: TaskType[] | undefined;
    taskStatuses: StatusType[] | undefined;
    taskPriorities: PriorityType[] | undefined;
    setTasks: Dispatch<SetStateAction<TaskType[]>> | undefined;
    getAllUpdatedTasks: () => void;
    getAllUpdatedTaskPriorities: () => void;
    getAllUpdatedTaskStatuses: () => void;
    dragStarted: boolean;
    setDragStarted: (param: boolean) => void;
}>({
    tasks: [],
    taskStatuses: [],
    taskPriorities: [],
    setTasks: () => {},
    getAllUpdatedTasks: () => {},
    getAllUpdatedTaskPriorities: () => {},
    getAllUpdatedTaskStatuses: () => {},
    dragStarted: false,
    setDragStarted: (data = false) => data,
});

export const useTasks = () => {
    const { tasks } = useContext(TasksContext);
    return tasks;
};

export const useTaskStatuses = () => {
    const { taskStatuses } = useContext(TasksContext);
    return taskStatuses;
};

export const useTaskPriorities = () => {
    const { taskPriorities } = useContext(TasksContext);
    return taskPriorities;
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

export const useGetAllTasks = () => {
    const { getAllUpdatedTasks } = useContext(TasksContext);
    return getAllUpdatedTasks;
};

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [taskStatuses, setTaskStatuses] = useState<StatusType[]>([]);
    const [taskPriorities, setTaskPriorities] = useState<PriorityType[]>([]);
    const [dragStarted, setDragStarted] = useState<boolean>(false);

    const getAllUpdatedTasks = async () => {
        const response = await getAllTasks();
        setTasks?.(() => (response?.data?.length ? response?.data : []));
    };
    const getAllUpdatedTaskStatuses = async () => {
        const response = await getAllStatuses();
        setTaskStatuses?.(response?.data?.length ? response?.data : []);
    };
    const getAllUpdatedTaskPriorities = async () => {
        const response = await getAllPriorities();
        setTaskPriorities?.(response?.data?.length ? response?.data : []);
    };

    useEffect(() => {
        getAllUpdatedTasks();
        getAllUpdatedTaskPriorities();
        getAllUpdatedTaskStatuses();
    }, []);

    return (
        <TasksContext.Provider
            value={{
                tasks,
                taskStatuses,
                taskPriorities,
                setTasks,
                getAllUpdatedTasks,
                getAllUpdatedTaskPriorities,
                getAllUpdatedTaskStatuses,
                dragStarted,
                setDragStarted,
            }}
        >
            {children}
        </TasksContext.Provider>
    );
};
