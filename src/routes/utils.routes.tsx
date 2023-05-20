import React from 'react';
import Jobs from '../pages/Registers/jobs';
import Student from '../pages/Registers/Students';
import UserSystem from '../pages/Registers/UserSystem';
import Couses from '../pages/Registers/Courses';
import Company from '../pages/Registers/Company';
import Dashboard from '../pages/DashBoard';
import { Navigate } from 'react-router-dom';

export const getRoutesCompany = () => {
    return [
        {
            path: '/register/jobs',
            element: <Jobs />,
        },
        {
            path: '/',
            element: <Navigate to={'/register/jobs'} />,
        },
    ];
};

export const getRoutesAdmin = () => {
    return [
        {
            path: '/',
            element: <Dashboard />,
        },
        {
            path: '/register/jobs',
            element: <Jobs />,
        },
    ];
};

export const getRoutesMaster = () => {
    return [
        {
            path: '/',
            element: <Dashboard />,
        },
        {
            path: '/register/student',
            element: <Student />,
        },
        {
            path: 'register/administrator',
            element: <UserSystem />,
        },
        {
            path: 'register/courses',
            element: <Couses />,
        },
        {
            path: 'register/jobs',
            element: <Jobs />,
        },
        {
            path: 'register/company',
            element: <Company />,
        },
    ];
};
