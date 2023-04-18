import React from 'react';
import { useRoutes } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';

const GuestRoutes: React.FC = () => {
    const { logged } = useAuth();

    const GetRoutes = () => {
        const routes = useRoutes([
            {
                path: '/login',
                element: <Login />,
            },
            { path: '*', element: <PageNotFound redirect={!logged} /> },
        ]);
        return routes;
    };

    return <GetRoutes />;
};

export default GuestRoutes;
