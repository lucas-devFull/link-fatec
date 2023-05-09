import React, { useEffect, useState } from 'react';

import {
    ContainerButtonGrid,
    ContainerFields,
    ContainerForm,
    ContainerGrid,
    ContainerInputFile,
    ContainerPopUpButton,
    ContainerRegister,
    TitleRegister,
    ContainerPreviewImg,
} from './style';
import { DataTable } from 'primereact/datatable';
import { locale, addLocale } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Column } from 'primereact/column';
import { Box, Button, CircularProgress } from '@mui/material';
import { Dialog } from 'primereact/dialog';
import axios from '../../../services/Api';
import { TabView, TabPanel } from 'primereact/tabview';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { ReactNotifications, Store } from 'react-notifications-component';
import './style.css';
import { ContainerFieldsForm } from './style';

type propsFieldsCompany = {
    id?: number;
    description: string;
    full_name: string;
    password: string;
    email: string;
    profile_picture: HTMLInputElement | null;

    street: string;
    number: string;
    neighborhood: string;
    complement: string;
    zipCode: string;
    city: string;
    state: string;
    country: string;
    latitude: string;
    longitude: string;
};

const Company = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<propsFieldsCompany>();
    const [selectedProducts, setSelectedProducts] = useState<any>();
    const [visible, setVisible] = useState<boolean>(false);
    const [dataEdition, setDataEdition] = useState<propsFieldsCompany | null>(null);
    const [previewImg, setPreviewImg] = useState<string | null>(null);

    addLocale('pt', {
        startsWith: 'Começa com',
        contains: 'Inclui',
        noResultsFound: 'Sem Resultados',
        noFilter: 'Remover Filtro',
    });
    locale('pt');

    useEffect(() => {
        console.log(dataEdition?.profile_picture);
        if (dataEdition && dataEdition?.profile_picture !== null) {
            setPreviewImg(URL.createObjectURL(dataEdition.profile_picture.target.files[0]));
        }
    }, [dataEdition?.profile_picture]);

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
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => {
                    setVisible(false);
                    setLoading(false);
                    setPreviewImg(null);
                }}
                onShow={() => {
                    console.log(dataEdition);
                }}
            >
                <ContainerForm onSubmit={handleSubmit(saveCourse)}>
                    <ContainerFields>
                        <TabView activeIndex={0}>
                            <TabPanel header="Perfil" leftIcon="pi pi-user mr-2">
                                <ContainerFieldsForm>
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
                                </ContainerFieldsForm>
                                <ContainerFieldsForm>
                                    <ContainerFields>
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <FontAwesomeIcon icon={icon({ name: 'circle-user' })} />
                                            </span>
                                            <InputText
                                                {...register('email', { required: true })}
                                                placeholder="Email"
                                                className={errors.email ? 'p-invalid' : ''}
                                                value={dataEdition?.email}
                                            />
                                        </div>
                                        {errors.email && <p>Este campo é obrigatório</p>}
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
                                                value={dataEdition?.password}
                                            />
                                        </div>
                                        {errors.password && <p>Este campo é obrigatório</p>}
                                    </ContainerFields>
                                </ContainerFieldsForm>
                                <ContainerFieldsForm>
                                    <ContainerFields>
                                        <ContainerInputFile className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <FontAwesomeIcon icon={icon({ name: 'image' })} />
                                            </span>
                                            <label htmlFor="file" className={errors.profile_picture ? 'p-invalid' : ''}>
                                                {dataEdition !== null && dataEdition.profile_picture !== null
                                                    ? dataEdition.profile_picture.target.files[0].name
                                                    : 'Selecione um arquivo'}
                                            </label>
                                            <InputText
                                                id="file"
                                                type="file"
                                                accept="image/*"
                                                {...register('profile_picture', { required: true })}
                                                placeholder="Imagem Perfil"
                                                // value={dataEdition?.profile_picture.target.files}
                                                onChange={(e) => {
                                                    if (e && e.target && e.target.files && e.target.files?.length > 0) {
                                                        setDataEdition({
                                                            ...(dataEdition !== null
                                                                ? dataEdition
                                                                : ({} as propsFieldsCompany)),
                                                            profile_picture: e,
                                                        });
                                                    }
                                                }}
                                            />
                                        </ContainerInputFile>
                                        {errors.profile_picture && <p>Este campo é obrigatório</p>}
                                    </ContainerFields>
                                    <ContainerFields>
                                        {previewImg && (
                                            <ContainerPreviewImg>
                                                <img src={previewImg} />
                                                <div
                                                    onClick={() => {
                                                        setPreviewImg(null);
                                                        setDataEdition({
                                                            ...(dataEdition !== null
                                                                ? dataEdition
                                                                : ({} as propsFieldsCompany)),
                                                            profile_picture: null,
                                                        });
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={icon({ name: 'xmark' })} />
                                                </div>
                                            </ContainerPreviewImg>
                                        )}
                                    </ContainerFields>
                                </ContainerFieldsForm>
                            </TabPanel>
                            <TabPanel header="Endereço" leftIcon="pi pi-id-card fs-2 mr-2">
                                <ContainerFieldsForm>
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
                                </ContainerFieldsForm>
                                <ContainerFieldsForm>
                                    <ContainerFields>
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <FontAwesomeIcon icon={icon({ name: 'circle-user' })} />
                                            </span>
                                            <InputText
                                                {...register('email', { required: true })}
                                                placeholder="Email"
                                                className={errors.email ? 'p-invalid' : ''}
                                                value={dataEdition?.email}
                                            />
                                        </div>
                                        {errors.email && <p>Este campo é obrigatório</p>}
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
                                                value={dataEdition?.password}
                                            />
                                        </div>
                                        {errors.password && <p>Este campo é obrigatório</p>}
                                    </ContainerFields>
                                </ContainerFieldsForm>
                                <ContainerFieldsForm>
                                    <ContainerFields>
                                        <ContainerInputFile className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <FontAwesomeIcon icon={icon({ name: 'image' })} />
                                            </span>
                                            <label htmlFor="file" className={errors.profile_picture ? 'p-invalid' : ''}>
                                                {dataEdition !== null && dataEdition.profile_picture !== null
                                                    ? dataEdition.profile_picture.target.files[0].name
                                                    : 'Selecione um arquivo'}
                                            </label>
                                            <InputText
                                                id="file"
                                                type="file"
                                                accept="image/*"
                                                {...register('profile_picture', { required: true })}
                                                placeholder="Imagem Perfil"
                                                // value={dataEdition?.profile_picture.target.files}
                                                onChange={(e) => {
                                                    if (e && e.target && e.target.files && e.target.files?.length > 0) {
                                                        setDataEdition({
                                                            ...(dataEdition !== null
                                                                ? dataEdition
                                                                : ({} as propsFieldsCompany)),
                                                            profile_picture: e,
                                                        });
                                                    }
                                                }}
                                            />
                                        </ContainerInputFile>
                                        {errors.profile_picture && <p>Este campo é obrigatório</p>}
                                    </ContainerFields>
                                    <ContainerFields>
                                        {previewImg && (
                                            <ContainerPreviewImg>
                                                <img src={previewImg} />
                                                <div
                                                    onClick={() => {
                                                        setPreviewImg(null);
                                                        setDataEdition({
                                                            ...(dataEdition !== null
                                                                ? dataEdition
                                                                : ({} as propsFieldsCompany)),
                                                            profile_picture: null,
                                                        });
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={icon({ name: 'xmark' })} />
                                                </div>
                                            </ContainerPreviewImg>
                                        )}
                                    </ContainerFields>
                                </ContainerFieldsForm>
                            </TabPanel>
                        </TabView>
                    </ContainerFields>
                    <Divider />
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button style={{ width: '8rem' }} type="submit" variant="outlined" color="primary">
                            {loading ? <CircularProgress color={'primary'} size={'2rem'} /> : 'Salvar'}
                        </Button>
                    </div>
                </ContainerForm>
            </Dialog>

            <TitleRegister>Cadastro de Empresa</TitleRegister>
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
                    </DataTable>
                </Box>
            </ContainerGrid>
        </ContainerRegister>
    );
};

export default Company;
