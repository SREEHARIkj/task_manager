import { TaskType } from '@/constants/const';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSetTasks, useTasks } from '@/providers/TasksProvider';
import moment from 'moment';

export const AddTask = ({
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
