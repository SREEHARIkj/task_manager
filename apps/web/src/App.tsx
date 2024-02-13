import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes';
import { TasksProvider } from './providers/TasksProvider';

function App() {
    return (
        <>
            <TasksProvider>
                <RouterProvider router={routes} />
            </TasksProvider>
        </>
    );
}

export default App;
