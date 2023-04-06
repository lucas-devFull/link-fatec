import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';

const AuthRoutes: React.FC = () => {
    const GetRoutes = () => {
        const routes = useRoutes([
            {
                path: '/',
                element: <PageNotFound />,
            },
            { path: '/', element: <PageNotFound /> },
            { path: '*', element: <Navigate to="/" /> },
        ]);
        return routes;
    };

    return <GetRoutes />;
};

export default AuthRoutes;
