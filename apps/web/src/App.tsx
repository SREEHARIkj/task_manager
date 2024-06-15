import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes';
import { TasksProvider } from './providers/TasksProvider';
import { useEffect } from 'react';
import { CursorDetailsProvider } from './providers/CursorDetailsProvider';
import { Toaster } from './components/ui/toaster';

function App() {
    useEffect(() => {
        const uniqueId = Math.random().toString(36).substring(2);

        localStorage.setItem('tabId', uniqueId);

        const storageEventListener = (event: StorageEvent) => {
            if (event.key === 'tabId') {
                if (event.newValue !== uniqueId) {
                    console.log('Another tab is open.');
                }
            }
        };

        window.addEventListener('storage', storageEventListener);
        return () => {
            window.removeEventListener('storage', storageEventListener);
        };
    }, []);

    return (
        <>
            <CursorDetailsProvider>
                <TasksProvider>
                    <RouterProvider router={routes} />
                    <Toaster />
                </TasksProvider>
            </CursorDetailsProvider>
        </>
    );
}

export default App;
