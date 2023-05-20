import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/DashBoard';
import PageNotFound from '../pages/PageNotFound';
import { getRoutesAdmin, getRoutesCompany, getRoutesMaster } from './utils.routes';
import styled from 'styled-components';

const ContainerRoutes = styled.div`
    padding: 2rem;
    height: 102%;
    display: flex;
`;

const AuthRoutes: React.FC = () => {
    const { user, logged } = useAuth();

    const getRoutesPermitted = (): RouteObject[] => {
        if (user?.login_type == '1') {
            return getRoutesCompany();
        }

        if (user?.login_type == '4') {
            return getRoutesAdmin();
        }

        return getRoutesMaster();
    };
    const GetRoutes = () => {
        const routes = useRoutes([
            { path: '*', element: <PageNotFound redirect={!logged} /> },
            ...getRoutesPermitted(),
        ]);
        return routes;
    };

    return (
        <MainLayout>
            <ContainerRoutes>
                <GetRoutes />
            </ContainerRoutes>
        </MainLayout>
    );
};

export default AuthRoutes;
