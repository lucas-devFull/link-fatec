import React, { useEffect, useState } from 'react';
import {
    ContainerButtonGrid,
    ContainerFields,
    ContainerForm,
    ContainerGrid,
    ContainerLoginPassword,
    ContainerPopUpButton,
    ContainerRegister,
    TitleRegister,
} from './style';
import { DataTable } from 'primereact/datatable';
import { locale, addLocale } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';

import { Column } from 'primereact/column';
import { Box, Button, CircularProgress } from '@mui/material';
import { Dialog } from 'primereact/dialog';
import axios from '../../../services/Api';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { isValidEmail } from '../../../utils';
import { ReactNotifications, Store } from 'react-notifications-component';

type propsFieldsUser = {
    id?: number;
    full_name: string;
    email: string;
    password?: string;
};

const UserSystem = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<propsFieldsUser>();
    const [selectedProducts, setSelectedProducts] = useState<any>();
    const [visible, setVisible] = useState<boolean>(false);
    const [dataEdition, setDataEdition] = useState<propsFieldsUser | null>(null);

    addLocale('pt', {
        startsWith: 'Começa com',
        contains: 'Inclui',
        noResultsFound: 'Sem Resultados',
        noFilter: 'Remover Filtro',
    });
    locale('pt');

    const ComponetDeleteUser = () => {
        return (
            <ContainerPopUpButton>
                <div>
                    <Button
                        variant="outlined"
                        color={'inherit'}
                        onClick={() => {
                            alert('NÃO IMPLEMENTADO !!'), Store.removeAllNotifications();
                        }}
                    >
                        SIM
                    </Button>
                </div>
                <div>
                    <Button variant="outlined" color={'inherit'} onClick={() => Store.removeAllNotifications()}>
                        NÃO
                    </Button>
                </div>
            </ContainerPopUpButton>
        );
    };

    const deleteUser = () => {
        if (dataEdition?.id && dataEdition.id > 0) {
            Store.addNotification({
                message: <ComponetDeleteUser />,
                type: 'danger',
                insert: 'top',
                title: 'Deseja realmente deletar este usuário ?',
                container: 'top-center',
                width: 350,
                dismiss: {
                    showIcon: true,
                    duration: 5000,
                    pauseOnHover: true,
                    onScreen: true,
                    click: false,
                },
                onRemoval: () => {
                    getAllUsers();
                },
            });
        }
    };

    const getAllUsers = () => {
        setLoadingTable(true);

        axios
            .get('/v1/admin')
            .then((response) => {
                setData(response.data);
                setLoadingTable(false);
            })
            .catch((error) => {
                setLoadingTable(false);
            });
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const saveUser = () => {
        setLoading(!loading);
        console.log(watch());

        axios
            .post(`v1/register/admin`, watch())
            .then((response) => {
                if (response.status == 201) {
                    Store.addNotification({
                        message: 'Usuário criado com sucesso !!',
                        type: 'success',
                        insert: 'top',
                        container: 'top-center',
                        width: 350,
                        dismiss: {
                            duration: 2000,
                            onScreen: true,
                        },
                        onRemoval: () => {
                            setLoading(false);
                            setVisible(!visible);
                            getAllUsers();
                        },
                    });
                }
            })
            .catch((err) => {
                Store.addNotification({
                    message: 'Erro ao criar o usuário, tente novamente !!',
                    type: 'danger',
                    insert: 'top',
                    container: 'top-center',
                    width: 350,
                    dismiss: {
                        duration: 2000,
                        onScreen: true,
                    },
                    onRemoval: () => {
                        setLoading(false);
                        setVisible(!visible);
                        getAllUsers();
                    },
                });
            });
    };

    return (
        <ContainerRegister>
            <ReactNotifications />
            <Dialog
                draggable={false}
                header="Informações"
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
            >
                <ContainerForm onSubmit={handleSubmit(saveUser)}>
                    <ContainerFields>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                            </span>
                            <InputText
                                {...register('full_name', { required: true })}
                                placeholder="Nome Completo"
                                className={errors.full_name ? 'p-invalid' : ''}
                                value={dataEdition?.full_name}
                            />
                        </div>
                        {errors.full_name && <p>Este campo é obrigatório</p>}
                    </ContainerFields>

                    <ContainerLoginPassword>
                        <ContainerFields>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <FontAwesomeIcon icon={icon({ name: 'circle-user' })} />
                                </span>
                                <InputText
                                    {...register('email', { validate: isValidEmail })}
                                    placeholder="Email"
                                    className={errors.email ? 'p-invalid' : ''}
                                    value={dataEdition?.email}
                                />
                            </div>
                            {errors.email && <p> Preencha o campo corretamente </p>}
                        </ContainerFields>

                        <ContainerFields>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <FontAwesomeIcon icon={icon({ name: 'lock' })} />
                                </span>

                                <InputText
                                    type="password"
                                    {...register('password', { required: true })}
                                    placeholder="Senha"
                                    className={errors.password ? 'p-invalid' : ''}
                                />
                            </div>
                            {errors.password && <p>Este campo é obrigatório</p>}
                        </ContainerFields>
                    </ContainerLoginPassword>

                    <Divider />
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button style={{ width: '8rem' }} type="submit" variant="outlined" color="primary">
                            {loading ? <CircularProgress color={'primary'} size={'2rem'} /> : 'Adicionar'}
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
                    <Button
                        onClick={() => alert('NÃO IMPLEMENTADO !!')}
                        disabled={dataEdition != null ? false : true}
                        variant="outlined"
                        color="inherit"
                    >
                        Editar
                    </Button>
                    <Button
                        onClick={deleteUser}
                        disabled={dataEdition != null ? false : true}
                        variant="outlined"
                        color="error"
                    >
                        Deletar
                    </Button>
                </ContainerButtonGrid>
                <Box sx={{ width: '100%', height: '40rem', padding: '0rem 1.5rem' }}>
                    <DataTable
                        filterDisplay="row"
                        size="normal"
                        value={data}
                        paginator
                        loading={loadingTable}
                        rows={8}
                        width="3rem"
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        selectionMode={'single'}
                        metaKeySelection={false}
                        dataKey="id"
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        scrollable
                        scrollHeight="35rem"
                        onRowSelect={(event) => setDataEdition(event.data)}
                        onRowUnselect={() => setDataEdition(null)}
                    >
                        <Column field="id" sortable filter style={{ width: '25%' }} header="ID"></Column>
                        <Column field="name" sortable filter style={{ width: '25%' }} header="Name"></Column>
                        <Column field="email" sortable filter style={{ width: '25%' }} header="Email"></Column>
                    </DataTable>
                </Box>
            </ContainerGrid>
        </ContainerRegister>
    );
};

export default UserSystem;
