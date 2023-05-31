import React from 'react';

export type TDataMenu = {
    id: number;
    description: string;
    endpoint: string | null;
    itens: any[];
    menu_icon: string;
    ordenation: number;
};

export const getMenu = (tipo_login: number | string | null | undefined) => {
    if (tipo_login && tipo_login == 1) {
        return [
            {
                id: 8,
                description: 'Vagas',
                menu_icon: 'briefcase',
                item_group: 2,
                ordenation: 1,
                endpoint: '/register/jobs',
                itens: [],
            },
        ];
    }

    if (tipo_login && tipo_login == 4) {
        return [
            {
                id: 1,
                description: 'Dashboard',
                menu_icon: 'house',
                ordenation: 1,
                endpoint: '/',
                itens: [],
            },
            {
                id: 4,
                description: 'Empresa',
                menu_icon: 'building',
                item_group: 2,
                ordenation: 5,
                endpoint: '/register/company',
                itens: [],
            },
            {
                id: 8,
                description: 'Vagas',
                menu_icon: 'briefcase',
                item_group: 2,
                ordenation: 6,
                endpoint: '/register/jobs',
                itens: [],
            },
        ];
    }

    return [
        {
            id: 1,
            description: 'Dashboard',
            menu_icon: 'house',
            ordenation: 1,
            endpoint: '/',
            itens: [],
        },
        {
            id: 3,
            description: 'Alunos',
            menu_icon: 'users',
            item_group: 2,
            ordenation: 4,
            endpoint: '/register/student',
            itens: [],
        },
        {
            id: 4,
            description: 'Empresa',
            menu_icon: 'building',
            item_group: 2,
            ordenation: 5,
            endpoint: '/register/company',
            itens: [],
        },
        {
            id: 5,
            description: 'Administradores do Sistema',
            menu_icon: 'user',
            item_group: 2,
            ordenation: 7,
            endpoint: '/register/administrator',
            itens: [],
        },
        {
            id: 6,
            description: 'Cursos',
            menu_icon: 'graduationCap',
            item_group: 2,
            ordenation: 1,
            endpoint: '/register/courses',
            itens: [],
        },
        {
            id: 8,
            description: 'Vagas',
            menu_icon: 'briefcase',
            item_group: 2,
            ordenation: 6,
            endpoint: '/register/jobs',
            itens: [],
        },
    ];
};
