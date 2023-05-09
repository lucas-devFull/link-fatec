import React from 'react';
import Jobs from '../pages/Registers/jobs';
import Student from '../pages/Registers/Students';
import UserSystem from '../pages/Registers/UserSystem';
import Couses from '../pages/Registers/Couses';
import Company from '../pages/Registers/Company';

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
