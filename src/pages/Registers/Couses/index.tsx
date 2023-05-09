import React, { useEffect, useState } from 'react';
import {
    ContainerButtonGrid,
    ContainerFields,
    ContainerForm,
    ContainerGrid,
    ContainerPopUpButton,
    ContainerRegister,
    TitleRegister,
} from './style';
import { DataTable } from 'primereact/datatable';
import { locale, addLocale } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Column } from 'primereact/column';
import { Box, Button, CircularProgress } from '@mui/material';
import { Dialog } from 'primereact/dialog';
import axios from '../../../services/Api';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { ReactNotifications, Store } from 'react-notifications-component';

type propsFieldsCourse = {
    id?: number;
    name: string;
    description?: string;
};

const Couses = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<propsFieldsCourse>();
    const [selectedProducts, setSelectedProducts] = useState<any>();
    const [visible, setVisible] = useState<boolean>(false);
    const [dataEdition, setDataEdition] = useState<propsFieldsCourse | null>(null);

    addLocale('pt', {
        startsWith: 'Começa com',
        contains: 'Inclui',
        noResultsFound: 'Sem Resultados',
        noFilter: 'Remover Filtro',
    });
    locale('pt');

    const ComponetDeleteCourse = () => {
        return (
            <ContainerPopUpButton>
                <div>
                    <Button variant="outlined" color={'inherit'} onClick={deleteCourseById}>
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

    const deleteCourseById = () => {
        Store.removeAllNotifications();
        if (dataEdition?.id && dataEdition.id > 0) {
            axios
                .delete(`v1/course?id=` + dataEdition.id)
                .then((response) => {
                    if (response.status == 201 || response.status == 200) {
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
                                getAllCourses();
                                Store.removeAllNotifications();
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
                            getAllCourses();
                            Store.removeAllNotifications();
                        },
                    });
                });
        }
    };

    const deleteCourse = () => {
        if (dataEdition?.id && dataEdition.id > 0) {
            Store.addNotification({
                message: <ComponetDeleteCourse />,
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
                    getAllCourses();
                },
            });
        }
    };

    const getAllCourses = () => {
        setLoadingTable(true);

        axios
            .get('/v1/courses')
            .then((response) => {
                setData(response.data);
                setLoadingTable(false);
            })
            .catch((error) => {
                setLoadingTable(false);
            });
    };

    useEffect(() => {
        getAllCourses();
    }, []);

    const saveCourse = () => {
        setLoading(!loading);

        // if (dataEdition !== null) {
        //     alert('NÃO IMPLEMENTADO !!');
        //     setVisible(false);
        // }

        axios
            .post(`v1/course`, watch())
            .then((response) => {
                if (response.status == 201 || response.status == 200) {
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
                            getAllCourses();
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
                        getAllCourses();
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
                onHide={() => {
                    setVisible(false);
                    setLoading(false);
                }}
            >
                <ContainerForm onSubmit={handleSubmit(saveCourse)}>
                    <ContainerFields>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                            </span>
                            <InputText
                                {...register('name', { required: true })}
                                placeholder="Nome"
                                className={errors.name ? 'p-invalid' : ''}
                                value={dataEdition?.name}
                            />
                        </div>
                        {errors.name && <p>Este campo é obrigatório</p>}
                    </ContainerFields>

                    <ContainerFields>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                            </span>
                            <InputText
                                {...register('description', { required: true })}
                                placeholder="Descrição"
                                className={errors.description ? 'p-invalid' : ''}
                                value={dataEdition?.description}
                            />
                        </div>
                        {errors.description && <p>Este campo é obrigatório</p>}
                    </ContainerFields>
                    <Divider />
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button style={{ width: '8rem' }} type="submit" variant="outlined" color="primary">
                            {loading ? <CircularProgress color={'primary'} size={'2rem'} /> : 'Salvar'}
                        </Button>
                    </div>
                </ContainerForm>
            </Dialog>

            <TitleRegister>Cadastro de Cursos</TitleRegister>
            <ContainerGrid>
                <ContainerButtonGrid>
                    <Button
                        onClick={() => {
                            setVisible(!visible);
                            setSelectedProducts(null);
                            setDataEdition(null);
                        }}
                        variant="outlined"
                        color="primary"
                    >
                        Adicionar
                    </Button>
                    <Button
                        onClick={() => {
                            console.log(watch());

                            setVisible(!visible);
                        }}
                        disabled={dataEdition != null ? false : true}
                        variant="outlined"
                        color="inherit"
                    >
                        Editar
                    </Button>
                    <Button
                        onClick={deleteCourse}
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
                        showGridlines
                    >
                        <Column
                            field="id"
                            sortable
                            filter
                            style={{ width: '20%', textAlign: 'center' }}
                            header="ID"
                        ></Column>
                        <Column
                            field="name"
                            sortable
                            filter
                            style={{ width: '20%', textAlign: 'center' }}
                            header="Name"
                        ></Column>
                        <Column
                            field="description"
                            sortable
                            filter
                            style={{ width: '20%', textAlign: 'center' }}
                            header="Descrição"
                        ></Column>
                    </DataTable>
                </Box>
            </ContainerGrid>
        </ContainerRegister>
    );
};

export default Couses;
