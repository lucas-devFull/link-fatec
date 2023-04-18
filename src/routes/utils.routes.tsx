import React from 'react';
import Jobs from '../pages/Registers/jobs';
import Student from '../pages/Registers/Students';
import UserSystem from '../pages/Registers/UserSystem';

export const getRoutesCompany = () => {
    return [
        {
            path: '/register/jobs',
            element: <Jobs />,
        },
    ];
};

export const getRoutesAdmin = () => {
    return [
        {
            path: '/register/jobs',
            element: <Jobs />,
        },
    ];
};

export const getRoutesMaster = () => {
    return [
        {
            path: '/register/student',
            element: <Student />,
        },
        {
            path: '/register/jobs',
            element: <Jobs />,
        },
        {
            path: 'register/administrator',
            element: <UserSystem />,
        },
    ];
};
