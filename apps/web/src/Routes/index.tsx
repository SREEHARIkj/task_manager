import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ErrorBoundary from '../components/ErrorBoundary';
import Layout from '../components/Layout';
import NewTask from '@/pages/NewTask';
import MyTasks from '@/pages/MyTasks';
import Board from '@/pages/Board';
import { getTask } from '@/service';

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/*" element={<Layout />} errorElement={<ErrorBoundary />}>
                <Route index element={<Navigate to={'home'} replace />} />
                <Route path="home" element={<HomePage />} />
                <Route path="my-tasks" element={<MyTasks />} />
                <Route path="task">
                    <Route index element={<NewTask />} />
                    <Route path=":id" element={<NewTask />} loader={({ params: { id } }) => getTask(id as string)} />
                </Route>
                <Route path="board" element={<Board />} />
            </Route>
            <Route
                path="/login"
                element={
                    <>
                        <h2>Admin Area</h2>
                    </>
                }
            />
            <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
    )
);
