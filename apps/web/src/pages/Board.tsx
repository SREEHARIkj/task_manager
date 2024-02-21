import { StatusOptionType, StatusOptions, TaskType } from '@/constants/const';
import { cn } from '@/lib/utils';
import React, { ChangeEvent, DragEvent, FormEvent, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDragStatus, useSetDragStatus, useSetTasks, useTasks } from '@/providers/TasksProvider';
import moment from 'moment';
import { Trash2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface DropContainerProps {
    index: number;
    status: string;
}

const DraggableCard = ({ title, description, priority, id, status }: TaskType & { status: string }) => {
    const [editable, setEditable] = useState(false);
    const setDragStatus = useSetDragStatus();
    const handleDragStart = (e: DragEvent) => {
        e.dataTransfer.setData('text/plain', id);
        setDragStatus(true);
    };
    function handleDragEnd(e: DragEvent<HTMLDivElement>): void {
        e.dataTransfer.clearData();
        setDragStatus(false);
    }

    return (
        <>
            {editable ? (
                <AddTask {...{ title, description, priority, id, status }} setEditable={setEditable} />
            ) : (
                <Card
                    draggable={true}
                    key={`draggable-${id}`}
                    className="mb-2 cursor-grab active:cursor-grabbing bg-[#F0F2F5]"
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDoubleClickCapture={() => setEditable(true)}
                >
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>{priority}</p>
                    </CardFooter>
                </Card>
            )}
        </>
    );
};

const DropContainer: React.FC<DropContainerProps> = ({ index, status }) => {
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

const ColumnHeading = ({ title, color }: { title: string; color: string }) => (
    <div className="bg-primary flex flex-row justify-between items-center px-3 rounded-md py-2">
        <span className={`font-semibold opacity-70`} style={{ color: `${color}` }}>
            {title}
        </span>
    </div>
);

const AddTask = ({
    title,
    description,
    priority,
    id,
    setEditable,
    status,
}: Partial<TaskType & { setEditable: (params: boolean) => void; status: string }>) => {
    const [adding, setAdding] = useState<boolean>(false);
    const [updatedData, setUpdatedData] = useState<{ title: string; description: string } | TaskType>();
    const isEditable = !!id;
    const tasks = useTasks();
    const setTasks = useSetTasks();

    useEffect(() => {
        setAdding(isEditable);
    }, [isEditable]);

    function handleFormSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        if (isEditable) {
            const dataToSet = tasks?.map((t) => (id !== t.id ? t : { ...t, ...updatedData }));
            dataToSet && setTasks?.(dataToSet);
            setAdding?.(false);
            setEditable?.(false);
            return;
        }

        setTasks?.(
            (pv) =>
                [
                    ...pv,
                    {
                        id: (pv.length + 1).toString(),
                        status: status ?? 'Todo',
                        dueDate: '',
                        priority: 'high',
                        ...updatedData,
                    },
                ] as TaskType[]
        );

        setAdding?.(false);
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        if (isEditable) {
            const taskToEdit = tasks?.find(({ id: _id }) => _id === id);
            setUpdatedData({ ...taskToEdit, [name]: value, createdAt: moment(new Date()).toISOString() } as TaskType);
            return;
        }
        setUpdatedData((pv) => ({ ...pv, [name]: value || '' }) as { title: string; description: string } | undefined);
    }

    return (
        <div>
            {adding ? (
                <Card className="mb-2">
                    <CardHeader>
                        <CardTitle>{isEditable ? 'Update' : 'Add'} Task</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-y-2" onSubmit={handleFormSubmit}>
                            <Input
                                type="text"
                                placeholder="Enter task name"
                                defaultValue={title}
                                name="title"
                                onChange={handleOnChange}
                            />
                            <Input
                                type="text"
                                placeholder="Enter description..."
                                className="h-24 placeholder:absolute placeholder:top-4 placeholder:left-2"
                                defaultValue={description}
                                name="description"
                                onChange={handleOnChange}
                            />
                            <section className="flex flex-row justify-end items-center gap-3">
                                <span>{priority ?? null}</span>
                                <Button type="submit">Save</Button>
                                <Button
                                    variant={'secondary'}
                                    onClick={() => (isEditable ? setEditable?.(false) : setAdding(false))}
                                >
                                    cancel
                                </Button>
                            </section>
                        </form>
                    </CardContent>
                </Card>
            ) : (
                <div className="flex justify-end">
                    <Button variant={'ghost'} onClick={() => setAdding(!adding)}>
                        Add +
                    </Button>
                </div>
            )}
        </div>
    );
};

const DeleteDropArea: React.FC = () => {
    const isDropZoneActive = useDragStatus();
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    function handleFileDroppedOnDeleteField(event: DragEvent<HTMLDivElement>): void {
        event.preventDefault();
        setShowAlert(true);
    }

    const handleCancel = () => setShowAlert(false);

    return (
        <>
            <AlertDialog open={showAlert}>
                <AlertDialogTrigger asChild>
                    <div
                        className={cn(
                            `fixed bottom-24 rounded-full p-2 outline-dotted outline-offset-4 outline-gray-600/30 
                    transition-opacity ease-linear duration-300
                    flex justify-center items-center size-16 bg-red-300 `,
                            {
                                'opacity-0': !isDropZoneActive,
                                'opacity-100': isDropZoneActive,
                            }
                        )}
                        onDrop={handleFileDroppedOnDeleteField}
                        onDropCapture={handleFileDroppedOnDeleteField}
                        onDragOver={handleDragOver}
                    >
                        {isDropZoneActive && <Trash2 />}
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete task you are selected.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

const Board: React.FC = () => {
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
        </div>
    );
};

export default Board;
