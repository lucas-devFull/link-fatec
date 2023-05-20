import React, { useEffect, useState } from 'react';
import {
    ContainerButtonGrid,
    ContainerFields,
    ContainerFieldsForm,
    ContainerForm,
    ContainerGrid,
    ContainerInputFile,
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
import { Box, Button, CircularProgress, InputLabel } from '@mui/material';
import { Dialog } from 'primereact/dialog';
import axios from '../../../services/Api';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { isValidEmail } from '../../../utils';
import { ReactNotifications, Store } from 'react-notifications-component';
import { ContainerPreviewImg } from '../Company/style';

type propsFieldsUser = {
    id?: number;
    full_name: string;
    name: string;
    email: string;
    password?: string;
    profile_picture: any | null;
};

const UserSystem = () => {
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
    } = useForm<propsFieldsUser>();
    const [selectedProducts, setSelectedProducts] = useState<any>();
    const [visible, setVisible] = useState<boolean>(false);
    const [previewImg, setPreviewImg] = useState<any | null>(null);
    const [nameImg, setNameImg] = useState<string | null>(null);

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
        getAllUsers();
        setSelectedProducts(null);
        setPreviewImg(null);
        setNameImg(null);
        reset();
    };

    const setFields = (values: propsFieldsUser | null) => {
        if (values == null) {
            reset();
        } else {
            setValue('id', values.id);
            setValue('full_name', values.name);
            setValue('email', values.email);
            setValue('password', values.password);
            setPreviewImg(values.profile_picture);

            if (values && values.profile_picture !== null && typeof values.profile_picture === 'string') {
                setNameImg(values.profile_picture.slice(31));
            }
        }
    };

    const getImg = (): string => {
        if (previewImg && previewImg !== null && typeof previewImg === 'string') {
            return previewImg;
        }

        return URL.createObjectURL(previewImg);
    };

    const convertImgBase64 = (file: FileList, calback: (reader: any) => void) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            calback(reader.result);
        };
        reader.readAsDataURL(file[0]);
    };

    const getLabelImage = () => {
        const labelImage = nameImg && nameImg !== null ? nameImg : 'Selecione um arquivo';
        return labelImage;
    };

    const deleteUserById = () => {
        Store.removeAllNotifications();
        const id = watch('id');
        if (id && id !== null && id > 0) {
            reset();
            axios
                .delete(`v1/user?id=` + id)
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
                                getAllUsers();
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
                            getAllUsers();
                            Store.removeAllNotifications();
                        },
                    });
                });
        }
    };

    const ComponetDeleteUser = () => {
        return (
            <ContainerPopUpButton>
                <div>
                    <Button variant="outlined" color={'inherit'} onClick={deleteUserById}>
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
        const id = watch('id');
        if (id && id !== null && id > 0) {
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
        const id = watch('id');
        if (id && id !== null && id > 0) {
            axios
                .put(`v1/admin`, watch())
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
                    setVisible(false);
                    setLoading(false);
                    setPreviewImg(null);
                    setSelectedProducts(null);
                    setNameImg(null);
                    reset();
                }}
            >
                <ContainerForm onSubmit={handleSubmit(saveUser)}>
                    <ContainerFieldsForm>
                        <ContainerFields className="login">
                            <InputLabel> Nome completo </InputLabel>
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

                        <ContainerFields className="login">
                            <InputLabel> Email </InputLabel>
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

                        <ContainerFields className="login">
                            <InputLabel> Senha </InputLabel>
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

                    <ContainerFieldsForm>
                        <ContainerFields>
                            <InputLabel> Foto de perfil </InputLabel>
                            <ContainerInputFile className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <FontAwesomeIcon icon={icon({ name: 'image' })} />
                                </span>
                                <label htmlFor="file" className={errors.profile_picture ? 'p-invalid' : ''}>
                                    {getLabelImage()}
                                </label>
                                <InputText
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    {...register('profile_picture')}
                                    placeholder="Imagem Perfil"
                                    {...register('profile_picture', { required: false })}
                                    // value={dataEdition?.profile_picture.target.files}
                                    onChange={(e) => {
                                        if (e && e.target && e.target.files && e.target.files?.length > 0) {
                                            setPreviewImg(e.target.files[0]);
                                            setNameImg(e.target.files[0].name);
                                            convertImgBase64(e.target.files, (reader) => {
                                                setValue('profile_picture', reader);
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
                                    <img src={getImg()} />
                                    <div
                                        onClick={() => {
                                            setPreviewImg(null);
                                            setNameImg(null);
                                            setValue('profile_picture', '');
                                        }}
                                    >
                                        <FontAwesomeIcon icon={icon({ name: 'xmark' })} />
                                    </div>
                                </ContainerPreviewImg>
                            )}
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

            <TitleRegister>Cadastro de usuários do sistema</TitleRegister>
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
                        onClick={() => setVisible(!visible)}
                        disabled={watch('id') != null ? false : true}
                        variant="outlined"
                        color="inherit"
                    >
                        Editar
                    </Button>
                    <Button
                        onClick={deleteUser}
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
                    >
                        <Column field="id" sortable filter style={{ width: '25%' }} header="ID"></Column>
                        <Column field="name" sortable filter style={{ width: '25%' }} header="Nome"></Column>
                        <Column field="email" sortable filter style={{ width: '25%' }} header="Email"></Column>
                    </DataTable>
                </Box>
            </ContainerGrid>
        </ContainerRegister>
    );
};

export default UserSystem;
