import React, { useEffect, useState } from 'react';
import { ContainerButtonGrid, ContainerForm, ContainerGrid, ContainerRegister, TitleRegister } from './style';
import { DataTable } from 'primereact/datatable';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { locale, addLocale } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';

import { Column } from 'primereact/column';
import { Box, Button } from '@mui/material';
import { Dialog } from 'primereact/dialog';
import axios from '../../../services/Api';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserSystem = () => {
    const [data, setData] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState<any>();
    const [visible, setVisible] = useState<boolean>(false);

    addLocale('pt', {
        startsWith: 'Começa com',
        contains: 'Inclui',
        noResultsFound: 'Sem Resultados',
        noFilter: 'Remover Filtro',
    });
    locale('pt');

    useEffect(() => {
        axios.post('/v1/api/register/admin').then((response) => {
            setData(response.data);
        });
    }, []);

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
        { id: 10, lastName: 'Roxie', firstName: 'a', age: 65 },
        { id: 11, lastName: 'Roxie', firstName: 'Hardvey', age: 65 },
        { id: 12, lastName: 'Roxie', firstName: 'Harddvey', age: 65 },
    ];

    return (
        <ContainerRegister>
            <Dialog
                draggable={false}
                header="Informações"
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
            >
                <ContainerForm>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <FontAwesomeIcon icon={icon({ name: 'circle-user' })} />
                        </span>
                        <InputText placeholder="Nome Completo" />
                    </div>

                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <FontAwesomeIcon icon={icon({ name: 'circle-user' })} />
                        </span>
                        <InputText placeholder="Email" />
                    </div>

                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <FontAwesomeIcon icon={icon({ name: 'circle-user' })} />
                        </span>

                        <Password placeholder="Senha" feedback={false} toggleMask />
                    </div>
                    <Divider />
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button onClick={() => alert('salvar')} variant="outlined" color="primary">
                            Adicionar
                        </Button>
                    </div>
                </ContainerForm>
            </Dialog>

            <TitleRegister>Cadastro de usuários do sistema</TitleRegister>
            <ContainerGrid>
                <ContainerButtonGrid>
                    <Button onClick={() => setVisible(!visible)} variant="outlined" color="primary">
                        Adicionar
                    </Button>
                    <Button variant="outlined" color="inherit">
                        Editar
                    </Button>
                    <Button variant="outlined" color="error">
                        Deletar
                    </Button>
                </ContainerButtonGrid>
                <Box sx={{ height: '40rem' }}>
                    <DataTable
                        filterDisplay="row"
                        // selectionMode="single"
                        size="normal"
                        value={rows}
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        tableStyle={{ minWidth: '50rem' }}
                        selectionMode={'single'}
                        dataKey="id"
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        scrollable
                        scrollHeight="35rem"
                    >
                        <Column field="id" sortable filter style={{ width: '25%' }} header="ID"></Column>
                        <Column field="firstName" sortable filter style={{ width: '25%' }} header="Email"></Column>
                    </DataTable>
                </Box>
            </ContainerGrid>
        </ContainerRegister>
    );
};

export default UserSystem;
