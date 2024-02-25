import { cn } from '@/lib/utils';
import React, { DragEvent, useState } from 'react';
import { useDragStatus } from '@/providers/TasksProvider';
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

export const DeleteDropArea: React.FC = () => {
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
