import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React from 'react';

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const StyledInput: React.FC<StyledInputProps> = ({ className, ...args }) => (
    <Input className={cn(className, 'text-[#637587] bg-[#F0F2F5] border-0 rounded-xl')} {...args} />
);

const NewTask: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full h-full">
            <div className="flex flex-col items-start w-96 gap-0">
                <h6 className="font-bold text-4xl mb-5">New Task</h6>
                <div className="flex flex-col gap-2 py-3 w-full">
                    <Label className="text-[14px] font-semibold">Task Name</Label>
                    <StyledInput className="w-full" type="text" placeholder="e.g Set up user authentication" />
                </div>
                <div className="flex flex-col gap-2 py-3 h-fit w-full">
                    <Label className="text-[14px] font-semibold">Description</Label>
                    <StyledInput className="h-32 w-full" type="text" placeholder="Add more details" />
                </div>
                <div className="flex flex-col gap-2 py-3 w-full">
                    <Label className="text-[14px] font-semibold">Due Date</Label>
                    <DatePicker />
                </div>
                <div className="flex flex-row gap-3 p-0 justify-center w-full">
                    <div className="flex flex-col gap-2 py-3 h-fit">
                        <Label className="text-[14px] font-semibold">Assignees</Label>
                        <StyledInput className="w-full" type="text" placeholder="Add assignees" />
                    </div>
                    <div className="flex flex-col gap-2 py-3 h-fit">
                        <Label className="text-[14px] font-semibold">Add Status</Label>
                        <StyledInput className="w-full" type="text" placeholder="Add status" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewTask;
