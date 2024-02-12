import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ErrorBoundary from '../components/ErrorBoundary';
import Layout from '../components/Layout';
import NewTask from '@/pages/NewTask';
import MyTasks from '@/lib/MyTasks';

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
            <Route index element={<Navigate to={'home'} replace />} />
            <Route path="home" element={<HomePage />} />
            <Route path="my-tasks" element={<MyTasks />} />
            <Route path="new-task" element={<NewTask />} />
            <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
    )
);
