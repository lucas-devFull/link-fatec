import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AuthRoutes from './auth.routes';
import GuestRoutes from './guest.routes';
import { useAuth } from '../contexts/auth';

const Routes: React.FC = () => {
    const { logged } = useAuth();
    console.log(logged);

    return <BrowserRouter>{logged ? <AuthRoutes /> : <GuestRoutes />} </BrowserRouter>;
};

export default Routes;
