import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';

const GuestRoutes: React.FC = () => {
    const GetRoutes = () => {
        const routes = useRoutes([
            {
                path: '/',
                element: <Login />,
            },
            { path: '*', element: <PageNotFound redirect={true} /> },
        ]);
        return routes;
    };

    return <GetRoutes />;
};

export default GuestRoutes;
