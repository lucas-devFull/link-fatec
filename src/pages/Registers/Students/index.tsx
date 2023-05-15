import React, { useEffect, useState } from 'react';
import {
    ContainerButtonGrid,
    ContainerFields,
    ContainerForm,
    ContainerGrid,
    ContainerFieldsForm,
    ContainerPopUpButton,
    ContainerRegister,
    TitleRegister,
} from './style';
import { DataTable } from 'primereact/datatable';
import { locale, addLocale } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Column } from 'primereact/column';
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Dialog } from 'primereact/dialog';
import axios from '../../../services/Api';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { isValidEmail } from '../../../utils';
import { ReactNotifications, Store } from 'react-notifications-component';

type propsFieldsStudent = {
    id?: number;
    ra: string;
    full_name: string;
    name: string;
    email: string;
    password?: string;
    course_id?: string | number;
};

const Student = () => {
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
    } = useForm<propsFieldsStudent>();
    const [selectedProducts, setSelectedProducts] = useState<any>();
    const [visible, setVisible] = useState<boolean>(false);
    const [courses, setCourses] = useState<Array<Record<string, string>> | []>([]);

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
        getAllStudents();
        setSelectedProducts(null);
        reset();
    };

    const setFields = (values: propsFieldsStudent | null) => {
        if (values == null) {
            reset();
        } else {
            setValue('id', values.id);
            setValue('course_id', values.course_id);
            setValue('ra', values.ra);
            setValue('full_name', values.name);
            setValue('name', values.name);
            setValue('email', values.email);
            setValue('password', values.password);
        }
    };

    const deleteStudentById = () => {
        Store.removeAllNotifications();
        const id = watch('id');
        if (id && id !== null && id > 0) {
            reset();
            axios
                .delete(`v1/student?id=` + id)
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
                                setSelectedProducts(null);
                                getAllStudents();
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
                            setSelectedProducts(null);
                            getAllStudents();
                            Store.removeAllNotifications();
                        },
                    });
                });
        }
    };

    const ComponetDeleteStudent = () => {
        return (
            <ContainerPopUpButton>
                <div>
                    <Button variant="outlined" color={'inherit'} onClick={deleteStudentById}>
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

    const deleteStudent = () => {
        const id = watch('id');
        if (id && id != null && id > 0) {
            Store.addNotification({
                message: <ComponetDeleteStudent />,
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
                    getAllStudents();
                },
            });
        }
    };

    const getCourses = () => {
        axios
            .get('/v1/courses')
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                setCourses([]);
            });
    };

    const getAllStudents = () => {
        setLoadingTable(true);

        axios
            .get('/v1/student')
            .then((response) => {
                setData(response.data);
                setLoadingTable(false);
            })
            .catch((error) => {
                setLoadingTable(false);
            });
    };

    useEffect(() => {
        getAllStudents();
    }, []);

    const saveStudent = () => {
        setLoading(!loading);

        const id = watch('id');
        if (id && id !== null && id > 0) {
            axios
                .put(`v1/student`, watch())
                .then((response) => {
                    if (response.status == 201 || response.status == 200) {
                        Store.addNotification({
                            message: 'Usuário atualizado com sucesso !!',
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
                        message: 'Erro ao atualizar o usuário, tente novamente !!',
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
        } else {
            axios
                .post(`v1/register/student`, watch())
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
                                resetForm();
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
                onShow={getCourses}
            >
                <ContainerForm onSubmit={handleSubmit(saveStudent)}>
                    <ContainerFields>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Curso</InputLabel>
                            <Select
                                size="small"
                                {...register('course_id', { required: false })}
                                value={watch('course_id')}
                                onChange={(e) => {
                                    setValue('course_id', e.target.value);
                                }}
                                placeholder="Select o curso"
                                fullWidth={true}
                                label="Curso"
                                className="w-full md:w-14rem"
                            >
                                <MenuItem key={0} value={0}>
                                    {'Nenhum Selecionado'}
                                </MenuItem>
                                {courses.map((item, index) => {
                                    return (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </ContainerFields>

                    <ContainerFieldsForm>
                        <ContainerFields>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                                </span>
                                <InputText
                                    {...register('ra', { required: true })}
                                    placeholder="Nome Completo"
                                    className={errors.ra ? 'p-invalid' : ''}
                                />
                            </div>
                            {errors.ra && <p>Este campo é obrigatório</p>}
                        </ContainerFields>

                        <ContainerFields>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                                </span>
                                <InputText
                                    {...register('full_name', { required: true })}
                                    placeholder="Nome Completo"
                                    className={errors.full_name ? 'p-invalid' : ''}
                                />
                            </div>
                            {errors.full_name && <p>Este campo é obrigatório</p>}
                        </ContainerFields>
                    </ContainerFieldsForm>
                    <ContainerFieldsForm>
                        <ContainerFields>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <FontAwesomeIcon icon={icon({ name: 'circle-user' })} />
                                </span>
                                <InputText
                                    {...register('email', { validate: isValidEmail })}
                                    placeholder="Email"
                                    className={errors.email ? 'p-invalid' : ''}
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
                    </ContainerFieldsForm>
                    <Divider />
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button style={{ width: '8rem' }} type="submit" variant="outlined" color="primary">
                            {loading ? <CircularProgress color={'primary'} size={'2rem'} /> : 'Salvar'}
                        </Button>
                    </div>
                </ContainerForm>
            </Dialog>

            <TitleRegister>Cadastro de Estudantes</TitleRegister>
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
                            console.log(watch());
                            setVisible(!visible);
                        }}
                        disabled={watch('id') != null ? false : true}
                        variant="outlined"
                        color="inherit"
                    >
                        Editar
                    </Button>
                    <Button
                        onClick={deleteStudent}
                        disabled={watch('id') != null ? false : true}
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
                        onRowSelect={(event) => setFields(event.data)}
                        onRowUnselect={() => reset()}
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
                            field="ra"
                            sortable
                            filter
                            style={{ width: '20%', textAlign: 'center' }}
                            header="RA"
                        ></Column>
                        <Column
                            field="name"
                            sortable
                            filter
                            style={{ width: '20%', textAlign: 'center' }}
                            header="Name"
                        ></Column>
                        <Column
                            field="email"
                            sortable
                            filter
                            style={{ width: '20%', textAlign: 'center' }}
                            header="Email"
                        ></Column>
                        <Column
                            field="course_name"
                            sortable
                            filter
                            style={{ width: '20%', textAlign: 'center' }}
                            header="Curso"
                        ></Column>
                    </DataTable>
                </Box>
            </ContainerGrid>
        </ContainerRegister>
    );
};

export default Student;
