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
                id: 1,
                description: 'Dashboard',
                menu_icon: 'house',
                ordenation: 1,
                endpoint: '/',
                itens: [],
            },
            {
                id: 2,
                description: 'Cadastro',
                menu_icon: 'add',
                ordenation: 2,
                endpoint: null,
                itens: [
                    {
                        id: 8,
                        description: 'Vagas',
                        menu_icon: null,
                        item_group: 2,
                        ordenation: 1,
                        endpoint: '/register/jobs',
                    },
                ],
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
                id: 2,
                description: 'Cadastro',
                menu_icon: 'add',
                ordenation: 2,
                endpoint: null,
                itens: [
                    {
                        id: 8,
                        description: 'Classe',
                        menu_icon: null,
                        item_group: 2,
                        ordenation: 3,
                        endpoint: '/register/college_class',
                    },
                    {
                        id: 8,
                        description: 'Vagas',
                        menu_icon: null,
                        item_group: 2,
                        ordenation: 6,
                        endpoint: '/register/jobs',
                    },
                ],
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
            id: 2,
            description: 'Cadastro',
            menu_icon: 'add',
            ordenation: 2,
            endpoint: null,
            itens: [
                {
                    id: 3,
                    description: 'Estudante',
                    menu_icon: null,
                    item_group: 2,
                    ordenation: 4,
                    endpoint: '/register/student',
                },
                {
                    id: 4,
                    description: 'Empresa',
                    menu_icon: null,
                    item_group: 2,
                    ordenation: 5,
                    endpoint: '/register/company',
                },
                {
                    id: 5,
                    description: 'Usuários Sistema',
                    menu_icon: null,
                    item_group: 2,
                    ordenation: 7,
                    endpoint: '/register/administrator',
                },
                {
                    id: 6,
                    description: 'Cursos',
                    menu_icon: null,
                    item_group: 2,
                    ordenation: 1,
                    endpoint: '/register/curses',
                },
                {
                    id: 7,
                    description: 'Semestre',
                    menu_icon: null,
                    item_group: 2,
                    ordenation: 2,
                    endpoint: '/register/semester',
                },
                {
                    id: 8,
                    description: 'Classe',
                    menu_icon: null,
                    item_group: 2,
                    ordenation: 3,
                    endpoint: '/register/college_class',
                },
                {
                    id: 8,
                    description: 'Vagas',
                    menu_icon: null,
                    item_group: 2,
                    ordenation: 6,
                    endpoint: '/register/jobs',
                },
            ],
        },
    ];
};
