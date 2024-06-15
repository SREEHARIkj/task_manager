import { cn } from '@/lib/utils';
import React, { DragEvent, useReducer } from 'react';
import { useDragStatus, useGetAllTasks } from '@/providers/TasksProvider';
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
import { removeTask } from '@/service';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

type State = {
    showAlert: boolean;
    taskIdToDelete: string | null;
};

type Reducer = (state: State, newState: Partial<State>) => State;

export const DeleteDropArea: React.FC = () => {
    const isDropZoneActive = useDragStatus();
    const getAllUpdatedTasks = useGetAllTasks();
    const setReducerState: Reducer = (state, newSate) => ({ ...state, ...newSate });
    const [state, setState] = useReducer(setReducerState, { showAlert: false, taskIdToDelete: null });

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    function handleFileDroppedOnDeleteField(event: DragEvent<HTMLDivElement>): void {
        event.preventDefault();
        const data = event.dataTransfer.getData('text');
        setState({ showAlert: true, taskIdToDelete: data });
    }

    const handleCancel = () => setState({ showAlert: false });

    function handleSubmit(): void {
        if (!state.taskIdToDelete) {
            setState({ showAlert: false });
            return;
        }
        removeTask(+state?.taskIdToDelete)
            ?.then(() => {
                setState({ showAlert: false, taskIdToDelete: null });

                toast({
                    title: 'Success',
                    description: `Deleted successfully`,
                });

                getAllUpdatedTasks();
            })
            .catch((error) => {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Something happened while try to delete, ${error}`,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
            });
    }

    return (
        <>
            <AlertDialog open={state.showAlert}>
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
                        <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
