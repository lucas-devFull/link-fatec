import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import MainLayout from '../layouts/MainLayout';
import PageNotFound from '../pages/PageNotFound';
import { getRoutesAdmin, getRoutesCompany, getRoutesMaster } from './utils.routes';
import styled from 'styled-components';
import Perfil from '../pages/Perfil';

const ContainerRoutes = styled.div`
    padding: 1rem 1rem 0rem 1rem;
    height: 100%;
    display: flex;
`;

const AuthRoutes: React.FC = () => {
    const { user } = useAuth();

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
            { path: '*', element: <PageNotFound redirectPage={false} /> },
            { path: '/perfil', element: <Perfil /> },
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
