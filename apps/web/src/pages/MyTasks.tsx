import { Button } from '@/components/ui/button';
import React, { HTMLAttributes } from 'react';
import { cn } from '../lib/utils';
import { Pencil } from 'lucide-react';

type StyledHeadingProps = HTMLAttributes<HTMLDivElement> & { className?: string };

const StyledHeading: React.FC<StyledHeadingProps> = ({ children, className, ...args }) => (
    <span className={cn(className, 'font-bold text-lg')} {...args}>
        {children}
    </span>
);

const TaskItem: React.FC = () => (
    <div className="flex flex-row gap-6 items-center w-full">
        <Button>
            <Pencil size={'16px'} />
        </Button>
        <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-col gap-0">
                <h4 className="text-lg font-medium">Task name</h4>
                <h2 className="text-sm">Task description</h2>
            </div>
            <p>Due at 12:00 PM</p>
        </div>
    </div>
);

const MyTasks: React.FC = () => {
    return (
        <div className="flex w-full justify-center gap-2">
            <div className="flex flex-col gap-4 w-8/12 ">
                <div className="flex flex-row justify-between">
                    <h6 className="font-bold text-4xl mb-5 items-center">My Tasks</h6>
                    <Button>Sort</Button>
                </div>
                <StyledHeading>Today</StyledHeading>
                <TaskItem />
                <StyledHeading>This week</StyledHeading>
                <StyledHeading>Completed</StyledHeading>
            </div>
        </div>
    );
};

export default MyTasks;
