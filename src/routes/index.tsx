import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import GuestRoutes from './guest.routes';

const Routes: React.FC = () => {
    const { logged } = useAuth();

    return <BrowserRouter> {logged ? <AuthRoutes /> : <GuestRoutes />} </BrowserRouter>;
};

export default Routes;
