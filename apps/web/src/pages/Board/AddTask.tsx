import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetAllTasks, useTaskPriorities, useTaskStatuses, useTasks } from '@/providers/TasksProvider';
import { addTask, updateTask } from '@/service';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const initValue = {
    title: '',
    description: '',
    statusId: null,
    priorityId: null,
};

export const AddTask = ({
    id,
    status: boardStatusHeading,
    setEditable,
}: Partial<{ id: number; setEditable: (params: boolean) => void; status: string }>) => {
    const [adding, setAdding] = useState<boolean>(false);
    const [updatedData, setUpdatedData] = useState<{
        title: string | null;
        description: string | null;
        statusId: number | null;
        priorityId: number | null;
    }>(initValue);
    const isEditable = !!id;
    const tasks = useTasks();
    const getAllUpdatedTasks = useGetAllTasks();
    const { toast } = useToast();

    const taskStatusList = useTaskStatuses();
    const taskPriorityList = useTaskPriorities();

    const taskData = tasks?.find((t) => t.id === id);

    const { title, description, status, priority } = taskData ?? {
        title: '',
        description: '',
        status: '',
        priority: '',
    };

    const statusList = taskStatusList?.map((status) => ({ value: status.id.toString(), label: status.label })) ?? [
        { value: '', label: '' },
    ];
    const priorityList = taskPriorityList?.map((priority) => ({
        value: priority.id.toString(),
        label: priority.label,
    })) ?? [{ value: '', label: '' }];

    const statusData = statusList?.find((s) => s.label === status);
    const priorityData = priorityList?.find((p) => p.label === priority);

    useEffect(() => {
        const statusId = taskStatusList?.find((s) => s.label === boardStatusHeading)?.id;
        setUpdatedData((pv) => ({ ...pv, statusId: statusId ?? null }));
        setAdding(isEditable);

        isEditable &&
            setUpdatedData({
                title,
                description,
                statusId: Number(statusData?.value) ?? null,
                priorityId: Number(priorityData?.value) ?? null,
            });
    }, [isEditable]);

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        if (isEditable) {
            await updateTask({ id: id.toString(), payload: { ...updatedData } })
                ?.then(() => {
                    setAdding?.(false);
                    setEditable?.(false);
                    getAllUpdatedTasks();
                    toast({
                        description: 'The task has been updated',
                    });
                })
                .catch((err) =>
                    toast({
                        variant: 'destructive',
                        title: 'Uh oh! Something went wrong.',
                        description: `Error code: ${err}`,
                    })
                );
            return;
        }

        await addTask(updatedData)
            ?.then(() => {
                setAdding?.(false);
                getAllUpdatedTasks();
                toast({ description: 'New task has been created!' });
            })
            .catch((err) =>
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: `Error code: ${err}`,
                })
            );
    }

    function handleOnChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
        const { name, value } = event.target;
        setUpdatedData((pv) => ({ ...pv, [name]: value || '' }));
    }

    return (
        <div>
            {adding ? (
                <Card className="mb-2">
                    <CardHeader className="py-3">
                        <CardTitle className="text-lg">{isEditable ? 'Update' : 'Add'} Task</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-y-2" onSubmit={handleFormSubmit}>
                            <Input
                                type="text"
                                placeholder="Enter task name"
                                defaultValue={title ?? undefined}
                                name="title"
                                onChange={handleOnChange}
                            />
                            <Textarea
                                placeholder="Enter description..."
                                className="h-24"
                                defaultValue={description ?? undefined}
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
