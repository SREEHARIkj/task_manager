import { StatusOptions, TaskType, Tasks } from '@/const';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

type GridColumnProps = {
    index: number;
    children?: ReactNode | ReactNode[];
    isActive: boolean;
};

const TaskCard = ({ title, description, priority }: Omit<TaskType, 'id' | 'status'>) => (
    <div
        draggable
        className="outline outline-1 outline-blue-500/50 w-full h-fit bg-slate-100 rounded-md shadow mb-1 flex flex-col gap-2 p-3 cursor-move"
        onDragStart={(e) => e.dataTransfer.setData('text/plain', '')}
    >
        <h3>{title}</h3>
        <span>{description}</span>
        <span>Priority: {priority}</span>
    </div>
);

const GridColumn: React.FC<GridColumnProps> = ({ index, children, isActive }) => (
    <div
        key={index}
        className={cn('  rounded-md h-dvh bg-opacity-35', isActive ? 'border border-1 border-blue-500' : '')}
        {...(isActive && {
            style: {
                background: `repeating-linear-gradient(
        45deg,
        #039BE5 0px,
        #039BE5 2px,
        #90CAF9 2px,
        #90CAF9 8px
      )`,
            },
        })}
    >
        {children}
    </div>
);

const ColumnHeading = ({ title, color }: { title: string; color: string }) => (
    <div className="flex flex-row justify-between items-center px-3 outline outline-1 outline-blue-500/50 rounded-md py-2">
        <span className="font-semibold opacity-70">{title}</span>
        <div className={cn(' border rounded-full w-4 h-4', `bg-[${color}]`)} key={color}></div>
    </div>
);

const GridView: React.FC = () => {
    return (
        <div className="grid grid-cols-5 w-full h-fit gap-4 px-9">
            {Array.from({ length: 5 }, (_, i) => (
                <div className="flex flex-col gap-5" key={i}>
                    <ColumnHeading
                        title={StatusOptions[i].label.toString()}
                        color={StatusOptions[i].color.toString()}
                    />
                    <GridColumn index={i} isActive={false}>
                        {Tasks.filter((task) => task.status === StatusOptions[i].value).map((task, j) => (
                            <TaskCard key={`${j}-task-card`} {...task} />
                        ))}
                    </GridColumn>
                </div>
            ))}
        </div>
    );
};

export default GridView;
