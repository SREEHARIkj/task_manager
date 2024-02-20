import { Button } from '@/components/ui/button';
import React, { HTMLAttributes, useMemo } from 'react';
import { cn } from '../lib/utils';
import { Pencil } from 'lucide-react';
import { useTasks } from '@/providers/TasksProvider';
import { TaskType } from '@/constants/const';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

type StyledHeadingProps = HTMLAttributes<HTMLDivElement> & { className?: string };

const StyledHeading: React.FC<StyledHeadingProps> = ({ children, className, ...args }) => (
    <span className={cn(className, 'font-bold text-lg')} {...args}>
        {children}
    </span>
);

const TaskItem: React.FC<TaskType> = ({ title, description, createdAt, id }) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-row gap-6 items-center w-full">
            <Button variant={'secondary'} onClick={() => navigate(`/task/${id}`)}>
                <Pencil size={'16px'} />
            </Button>
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-col gap-0">
                    <h4 className="text-lg font-medium">{title}</h4>
                    <h2 className="text-sm">{description}</h2>
                </div>
                <p>Created at {moment(createdAt).format('DD-MM-YYYY - hh:mm A')}</p>
            </div>
        </div>
    );
};

const MyTasks: React.FC = () => {
    const tasks = useTasks();

    moment.calendarFormat = function (myMoment, now) {
        const weekStart = moment(now).startOf('week');
        const weekEnd = moment(now).endOf('week');

        if (myMoment.isBetween(weekStart, weekEnd, null, '[]')) {
            // myMoment is within the current week
            return 'thisWeek';
        } else {
            const week = moment(myMoment).clone().startOf('week').isoWeekday(1);
            const diff = myMoment.diff(week, 'days', true);

            const retVal =
                diff < -6
                    ? 'sameElse'
                    : diff < -1
                      ? 'lastWeek'
                      : diff < 0
                        ? 'lastDay'
                        : diff < 1
                          ? 'sameDay'
                          : diff < 2
                            ? 'nextDay'
                            : diff < 7
                              ? 'nextWeek'
                              : 'nextMonth';
            return retVal;
        }
    };

    const updatedTasks = useMemo(() => {
        return Object.groupBy(tasks, ({ createdAt }) => {
            return moment(new Date(createdAt)).calendar(null, {
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                nextWeek: 'dddd',
                lastDay: '[Yesterday]',
                lastWeek: '[Last] dddd',
                sameElse: 'DD/MM/YYYY',
                thisWeek: '[This week]',
            });
        }) as Record<string, TaskType[]>;
    }, [tasks]);

    return (
        <div className="flex w-full justify-center gap-2">
            <div className="flex flex-col space-y-3 w-8/12 pb-8">
                <div className="flex flex-row justify-between">
                    <h6 className="font-bold text-4xl mb-5 items-center">My Tasks</h6>
                    <Button>Sort</Button>
                </div>

                {Object.keys?.(updatedTasks)?.map((dateTime, titleIndex) => (
                    <React.Fragment key={`title-myTasks-${titleIndex}`}>
                        <StyledHeading>{dateTime}</StyledHeading>
                        {updatedTasks?.[dateTime]?.map((task, taskIndex) => (
                            <TaskItem key={`Task-Item-${titleIndex}-${taskIndex}-${task.id}`} {...task} />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
export default MyTasks;
