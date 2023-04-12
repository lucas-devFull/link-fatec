import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/DashBoard';
import PageNotFound from '../pages/PageNotFound';
import Student from '../pages/Registers/Students';

const AuthRoutes: React.FC = () => {
    const GetRoutes = () => {
        const routes = useRoutes([
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/register/student',
                element: <Student />,
            },
            { path: '*', element: <PageNotFound redirect={false} /> },
        ]);
        return routes;
    };

    return (
        <MainLayout>
            <GetRoutes />
        </MainLayout>
    );
};

export default AuthRoutes;
