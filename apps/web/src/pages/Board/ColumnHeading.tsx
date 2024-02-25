import React from 'react';

export const ColumnHeading = ({ title, color }: { title: string; color: string }) => (
    <div className="bg-primary flex flex-row justify-between items-center px-3 rounded-md py-2">
        <span className={`font-semibold opacity-70`} style={{ color: `${color}` }}>
            {title}
        </span>
    </div>
);
