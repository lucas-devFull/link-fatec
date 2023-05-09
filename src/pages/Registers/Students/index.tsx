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
        formState: { errors },
    } = useForm<propsFieldsStudent>();
    const [selectedProducts, setSelectedProducts] = useState<any>();
    const [courses, setCourses] = useState<Array<Record<string, string>> | []>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [dataEdition, setDataEdition] = useState<propsFieldsStudent | null>(null);

    addLocale('pt', {
        startsWith: 'Começa com',
        contains: 'Inclui',
        noResultsFound: 'Sem Resultados',
        noFilter: 'Remover Filtro',
    });
    locale('pt');

    const ComponetDeleteStudent = () => {
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

    const deleteStudent = () => {
        if (dataEdition?.id && dataEdition.id > 0) {
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
        console.log(watch());

        if (dataEdition !== null) {
            alert('NÃO IMPLEMENTADO !!');
            setVisible(false);
        }

        // axios
        // .post(`v1/register/admin`, watch())
        // .then((response) => {
        // if (response.status == 201) {
        // Store.addNotification({
        // message: 'Usuário criado com sucesso !!',
        // type: 'success',
        // insert: 'top',
        // container: 'top-center',
        // width: 350,
        // dismiss: {
        // duration: 2000,
        // onScreen: true,
        // },
        // onRemoval: () => {
        // setLoading(false);
        // setVisible(!visible);
        // getAllStudents();
        // },
        // });
        // }
        // })
        // .catch((err) => {
        // Store.addNotification({
        // message: 'Erro ao criar o usuário, tente novamente !!',
        // type: 'danger',
        // insert: 'top',
        // container: 'top-center',
        // width: 350,
        // dismiss: {
        // duration: 2000,
        // onScreen: true,
        // },
        // onRemoval: () => {
        // setLoading(false);
        // setVisible(!visible);
        // getAllStudents();
        // },
        // });
        // });
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
                onShow={getCourses}
            >
                <ContainerForm onSubmit={handleSubmit(saveStudent)}>
                    <ContainerFields>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Curso</InputLabel>
                            <Select
                                value={dataEdition?.course_id == null ? 0 : dataEdition?.course_id}
                                onChange={(e) =>
                                    setDataEdition({
                                        ...(dataEdition ? dataEdition : ({} as propsFieldsStudent)),
                                        course_id: e.target.value,
                                    })
                                }
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
                                    value={dataEdition?.ra}
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
                                    value={dataEdition?.name}
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
                        onClick={deleteStudent}
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
