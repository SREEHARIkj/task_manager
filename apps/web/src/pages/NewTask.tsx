import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea, TextareaProps } from '@/components/ui/textarea';
import { TaskType } from '@/constants/const';
import { cn } from '@/lib/utils';
import { addTask, updateTask } from '@/service';
import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

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

const NewTask: React.FC = () => {
    const navigate = useNavigate();
    const { data: taskData } = (useLoaderData() as AxiosResponse<TaskType>) ?? { data: {} };
    const [state, setState] = useState({
        title: '',
        description: '',
    });
    const isNoTaskData = Object.keys(taskData).length === 0 && taskData.constructor === Object;

    const handleSubmit = async () => {
        if (isNoTaskData) {
            await addTask(state)
                .then(() => alert('New task has been created!'))
                .catch(() => alert('Failed to create new task'));
            return;
        }
        const { id, ...rest } = taskData;
        await updateTask({ id, payload: { ...rest, ...state } })
            .then(() => {
                alert('The task has been updated');
                navigate('/my-tasks');
            })
            .catch(() => alert('Failed to edit the task'));
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
                        defaultValue={taskData.title}
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
                        defaultValue={taskData.description}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setState((prevState) => ({ ...prevState, description: event.target.value }))
                        }
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Label className="text-[14px] font-semibold">Due Date</Label>
                    <DatePicker />
                </div>
                <div className="flex flex-row space-x-2 p-0 justify-center w-full">
                    <div className="flex flex-col gap-2 h-fit">
                        <Label className="text-[14px] font-semibold">Assignees</Label>
                        <StyledInput className="w-full" type="text" placeholder="Add assignees" />
                    </div>
                    <div className="flex flex-col gap-2 h-fit">
                        <Label className="text-[14px] font-semibold">Add Status</Label>
                        <StyledInput className="w-full" type="text" placeholder="Add status" />
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
