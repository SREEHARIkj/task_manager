import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea, TextareaProps } from '@/components/ui/textarea';
import { TaskType } from '@/constants/const';
import { cn } from '@/lib/utils';
import { addTask, updateTask } from '@/service';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { StatusList } from '@/components/statusList';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusIcon } from 'lucide-react';
import { useTaskPriorities, useTaskStatuses } from '@/providers/TasksProvider';
import { useToast } from '@/components/ui/use-toast';

interface StyledInputProps {
    className?: string;
    boxType?: 'input' | 'textarea';
}

const StyledInput: React.FC<StyledInputProps & (InputProps | TextareaProps)> = ({
    className,
    boxType = 'input',
    ...args
}) => {
    return (
        <>
            {boxType === 'input' ? (
                <Input
                    className={cn(className, 'text-[#637587] bg-[#F0F2F5] border-0 rounded-xl placeholder:font-normal')}
                    {...(args as InputProps)}
                />
            ) : (
                <Textarea
                    className={cn(className, 'text-[#637587] bg-[#F0F2F5] border-0 rounded-xl placeholder:font-normal')}
                    {...(args as TextareaProps)}
                />
            )}
        </>
    );
};

const initialState = {
    title: '',
    description: '',
    statusId: null,
    priorityId: null,
    dueDate: new Date(),
};

const NewTask: React.FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { data: taskData } = (useLoaderData() as AxiosResponse<TaskType>) ?? { data: {} };
    const [state, setState] = useState<{
        title: string | null;
        description: string | null;
        statusId: number | null;
        priorityId: number | null;
        dueDate: Date;
    }>(initialState);

    const isNoTaskData = Object.keys(taskData).length === 0 && taskData.constructor === Object;
    const showPeople = false;

    const taskStatusList = useTaskStatuses();
    const taskPriorityList = useTaskPriorities();

    const statusList = taskStatusList?.map((status) => ({ value: status.id.toString(), label: status.label })) ?? [
        { value: '', label: '' },
    ];
    const priorityList = taskPriorityList?.map((priority) => ({
        value: priority.id.toString(),
        label: priority.label,
    })) ?? [{ value: '', label: '' }];

    const statusData = isNoTaskData ? undefined : statusList?.find((status) => status.label === taskData?.status);
    const priorityData = isNoTaskData
        ? undefined
        : priorityList?.find((priority) => priority.label === taskData?.priority);

    useEffect(() => {
        if (!isNoTaskData) {
            return setState({
                title: taskData?.title,
                description: taskData?.description,
                priorityId: Number(priorityData?.value) ?? null,
                statusId: Number(statusData?.value) ?? null,
                dueDate: taskData.dueDate ?? new Date(),
            });
        }
        return () => {
            setState(initialState);
        };
    }, []);

    const handleSubmit = () => {
        Object.keys(taskData).forEach((k) => {
            if (['priority', 'status', 'createdAt'].includes(k)) {
                delete taskData[k as keyof TaskType];
            }
        });
        const { id, ...rest } = taskData;

        if (isNoTaskData) {
            addTask(state)
                ?.then(() => {
                    toast({ description: 'New task has been created!' });
                    navigate('/my-tasks');
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

        updateTask({ id: id.toString(), payload: { ...rest, ...state } })
            ?.then(() => {
                toast({
                    description: 'The task has been updated',
                });
                navigate('/my-tasks');
            })
            .catch((err) =>
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: `Error code: ${err}`,
                })
            );
    };

    return (
        <div className="flex flex-col items-center w-full h-full">
            <div className="flex flex-col items-start w-96 space-y-5">
                <h6 className="font-bold text-4xl mb-5">{isNoTaskData ? 'New Task' : 'Update Task'}</h6>
                <div className="flex flex-col gap-2 w-full">
                    <Label className="text-[14px] font-semibold">Task Name</Label>
                    <StyledInput
                        className="w-full"
                        type="text"
                        placeholder="e.g Set up user authentication"
                        name="title"
                        defaultValue={state.title ?? ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setState((prev) => ({ ...prev, title: event.target.value }))
                        }
                    />
                </div>
                <div className="flex flex-col gap-2 h-fit w-full">
                    <Label className="text-[14px] font-semibold">Description</Label>
                    <StyledInput
                        className="h-32 w-full "
                        boxType="textarea"
                        placeholder={'Add more details....'}
                        name="description"
                        defaultValue={state.description ?? ''}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setState((prevState) => ({ ...prevState, description: event.target.value }))
                        }
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Label className="text-[14px] font-semibold">Due Date</Label>
                    <DatePicker
                        value={state?.dueDate ?? new Date()}
                        onSelectDate={(date) => setState((pv) => ({ ...pv, dueDate: date }))}
                    />
                </div>
                <div className="flex flex-col gap-2 h-fit">
                    <Label className="text-[14px] font-semibold">Assignees</Label>
                    {showPeople && (
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="add user" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    )}
                    <div className="flex flex-row items-center justify-start space-x-2">
                        <div className="border-solid border-1 rounded-full bg-gray-300 size-8 p-1">
                            <PlusIcon className="opacity-50" />
                        </div>
                        <h1 className="text-sm">Add users</h1>
                    </div>
                </div>
                <div className="flex flex-row space-x-2 p-0 justify-center w-full">
                    <div className="flex flex-col gap-2 h-fit w-full">
                        <Label className="text-[14px] font-semibold">Priority</Label>
                        <StyledInput
                            className="w-full"
                            type="text"
                            placeholder="Priority"
                            defaultValue={taskData.priority ?? ''}
                            // onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            //     setState((prev) => ({ ...prev, priority: event.target.value }))
                            // }
                        />
                    </div>
                    <div className="flex flex-col gap-2 h-fit w-full">
                        <Label className="text-[14px] font-semibold">Add Status</Label>
                        <StatusList
                            statusList={statusList}
                            value={statusData}
                            onSelect={(id) => setState((prev) => ({ ...prev, statusId: +id! }))}
                        />
                    </div>
                </div>
                <div className="flex flex-row space-x-3 justify-end w-full">
                    <Button variant={'secondary'} className="rounded-xl" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button className="rounded-xl" onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NewTask;
