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
import { Box, Button, CircularProgress, InputLabel } from '@mui/material';
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
        reset,
        setValue,
        formState: { errors },
    } = useForm<propsFieldsCourse>();
    const [selectedProducts, setSelectedProducts] = useState<any>();
    const [visible, setVisible] = useState<boolean>(false);

    addLocale('pt', {
        startsWith: 'Começa com',
        contains: 'Inclui',
        noResultsFound: 'Sem Resultados',
        noFilter: 'Remover Filtro',
    });
    locale('pt');

    const resetForm = () => {
        setLoading(false);
        setVisible(false);
        getAllCourses();
        setSelectedProducts(null);
        reset();
    };

    const setFields = (values: propsFieldsCourse | null) => {
        if (values == null) {
            reset();
        } else {
            setValue('id', values.id);
            setValue('name', values.name);
            setValue('description', values.description);
        }
    };

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
        const id = watch('id');
        if (id && id !== null && id > 0) {
            reset();
            axios
                .delete(`v1/course?id=` + id)
                .then((response) => {
                    if (response.status == 201 || response.status == 200) {
                        Store.addNotification({
                            message: 'Curso excluído com sucesso !!',
                            type: 'success',
                            insert: 'top',
                            container: 'top-center',
                            width: 350,
                            dismiss: {
                                duration: 2000,
                                onScreen: true,
                            },
                            onRemoval: () => {
                                setSelectedProducts(null);
                                getAllCourses();
                                Store.removeAllNotifications();
                            },
                        });
                    }
                })
                .catch((err) => {
                    Store.addNotification({
                        message: 'Erro ao excluir o curso, tente novamente !!',
                        type: 'danger',
                        insert: 'top',
                        container: 'top-center',
                        width: 350,
                        dismiss: {
                            duration: 2000,
                            onScreen: true,
                        },
                        onRemoval: () => {
                            setSelectedProducts(null);
                            getAllCourses();
                            Store.removeAllNotifications();
                        },
                    });
                });
        }
    };

    const deleteCourse = () => {
        const id = watch('id');
        if (id && id !== null && id > 0) {
            Store.addNotification({
                message: <ComponetDeleteCourse />,
                type: 'danger',
                insert: 'top',
                title: 'Deseja realmente deletar este curso ?',
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
        setLoading(true);
        const id = watch('id');
        if (id && id !== null && id > 0) {
            axios
                .put(`v1/course`, watch())
                .then((response) => {
                    if (response.status == 201 || response.status == 200) {
                        Store.addNotification({
                            message: 'Curso atualizado com sucesso !!',
                            type: 'success',
                            insert: 'top',
                            container: 'top-center',
                            width: 350,
                            dismiss: {
                                duration: 2000,
                                onScreen: true,
                            },
                            onRemoval: () => {
                                resetForm();
                            },
                        });
                    }
                })
                .catch((err) => {
                    Store.addNotification({
                        message: 'Erro ao atualizar o curso, tente novamente !!',
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
                        },
                    });
                });
        } else {
            axios
                .post(`v1/course`, watch())
                .then((response) => {
                    if (response.status == 201 || response.status == 200) {
                        Store.addNotification({
                            message: 'Curso criado com sucesso !!',
                            type: 'success',
                            insert: 'top',
                            container: 'top-center',
                            width: 350,
                            dismiss: {
                                duration: 2000,
                                onScreen: true,
                            },
                            onRemoval: () => {
                                resetForm();
                            },
                        });
                    }
                })
                .catch((err) => {
                    Store.addNotification({
                        message: 'Erro ao criar o curso, tente novamente !!',
                        type: 'danger',
                        insert: 'top',
                        container: 'top-center',
                        width: 350,
                        dismiss: {
                            duration: 2000,
                            onScreen: true,
                        },
                        onRemoval: () => {
                            resetForm();
                        },
                    });
                });
        }
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
                    resetForm();
                }}
            >
                <ContainerForm onSubmit={handleSubmit(saveCourse)}>
                    <ContainerFields>
                        <InputLabel> Nome </InputLabel>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                            </span>
                            <InputText
                                {...register('name', { required: true })}
                                placeholder="Nome"
                                className={errors.name ? 'p-invalid' : ''}
                            />
                        </div>
                        {errors.name && <p>Este campo é obrigatório</p>}
                    </ContainerFields>

                    <ContainerFields>
                        <InputLabel> Descrição do curso </InputLabel>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                            </span>
                            <InputText
                                {...register('description', { required: true })}
                                placeholder="Descrição"
                                className={errors.description ? 'p-invalid' : ''}
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
                            reset();
                        }}
                        variant="outlined"
                        color="primary"
                    >
                        Adicionar
                    </Button>
                    <Button
                        onClick={() => {
                            setVisible(!visible);
                        }}
                        disabled={watch('id') != null ? false : true}
                        variant="outlined"
                        color="inherit"
                    >
                        Editar
                    </Button>
                    <Button
                        onClick={deleteCourse}
                        disabled={watch('id') != null ? false : true}
                        variant="outlined"
                        color="error"
                    >
                        Deletar
                    </Button>
                </ContainerButtonGrid>
                <Box sx={{ width: '100%', height: '33rem', padding: '0rem 1.5rem' }}>
                    <DataTable
                        filterDisplay="row"
                        size="normal"
                        value={data}
                        paginator
                        loading={loadingTable}
                        rows={6}
                        width="3rem"
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        selectionMode={'single'}
                        metaKeySelection={false}
                        dataKey="id"
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        scrollable
                        scrollHeight="35rem"
                        onRowSelect={(event) => setFields(event.data)}
                        onRowUnselect={() => reset()}
                        showGridlines
                    >
                        <Column
                            field="id"
                            sortable
                            filter
                            style={{ width: '5%', textAlign: 'center' }}
                            header="ID"
                        ></Column>
                        <Column
                            field="name"
                            sortable
                            filter
                            style={{ width: '20%', textAlign: 'center' }}
                            header="Nome"
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
