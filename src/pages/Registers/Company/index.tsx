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
import { Box, Button, CircularProgress, InputLabel } from '@mui/material';
import { Dialog } from 'primereact/dialog';
import axios from '../../../services/Api';
import { TabView, TabPanel } from 'primereact/tabview';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { ReactNotifications, Store } from 'react-notifications-component';
import './style.css';
import { ContainerFieldsForm } from './style';
import { isValidEmail } from '../../../utils';

type propsFieldsCompany = {
    id?: number;
    full_name: string;
    password: string;
    email: string;
    profile_picture: any | null;

    street: string;
    number: string;
    neighborhood: string;
    complement: string;
    zip_code: string;
    city: string;
    state: string;
    country: string;
};

const Company = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<propsFieldsCompany>();
    const [selectedProducts, setSelectedProducts] = useState<any>();
    const [visible, setVisible] = useState<boolean>(false);
    const [previewImg, setPreviewImg] = useState<any | null>(null);
    const [nameImg, setNameImg] = useState<string | null>(null);
    const [zipCode, setZipCode] = useState<boolean>(true);

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
        getAllCompany();
        setSelectedProducts(null);
        setPreviewImg(null);
        setNameImg(null);
        reset();
    };

    const setFields = (values: propsFieldsCompany | null) => {
        if (values == null) {
            reset();
        } else {
            setValue('id', values.id);
        }
    };

    const getImg = (): string => {
        if (previewImg && previewImg !== null && typeof previewImg === 'string') {
            return previewImg;
        }

        return URL.createObjectURL(previewImg);
    };

    const ComponetDeleteCompany = () => {
        return (
            <ContainerPopUpButton>
                <div>
                    <Button variant="outlined" color={'inherit'} onClick={deleteCompanyById}>
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

    const getCompanyById = () => {
        const id = watch('id');
        if (id && id !== null && id > 0) {
            axios
                .get(`v1/company/` + id)
                .then((response) => {
                    if (response.status == 201 || response.status == 200) {
                        setValue('email', response.data.email);
                        setValue('full_name', response.data.name);

                        setValue('zip_code', response.data.address.zip_code);
                        setValue('city', response.data.address.city);
                        setValue('complement', response.data.address.complement);
                        setValue('country', response.data.address.country);
                        setValue('neighborhood', response.data.address.neighborhood);
                        setValue('number', response.data.address.number);
                        setValue('state', response.data.address.state);
                        setValue('street', response.data.address.street);
                        setPreviewImg(response.data.profile_picture);

                        if (
                            response &&
                            response.data &&
                            response.data.profile_picture &&
                            response.data.profile_picture !== null &&
                            typeof response.data.profile_picture === 'string'
                        ) {
                            setNameImg(response.data.profile_picture.slice(31));
                        }
                    }
                })
                .catch((err) => {
                    Store.addNotification({
                        message: 'Erro ao buscar os dados do usuário, tente novamente !!',
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

    const deleteCompanyById = () => {
        Store.removeAllNotifications();
        const id = watch('id');
        if (id && id !== null && id > 0) {
            axios
                .delete(`v1/company?id=` + id)
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
                                getAllCompany();
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
                            getAllCompany();
                            Store.removeAllNotifications();
                        },
                    });
                });
        }
    };

    const convertImgBase64 = (file: FileList, calback: (reader: any) => void) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            calback(reader.result);
        };
        reader.readAsDataURL(file[0]);
    };
    const deleteCompany = () => {
        const id = watch('id');
        if (id && id !== null && id > 0) {
            Store.addNotification({
                message: <ComponetDeleteCompany />,
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
                    getAllCompany();
                },
            });
        }
    };

    const getAllCompany = () => {
        setLoadingTable(true);

        axios
            .get('/v1/company')
            .then((response) => {
                setData(response.data);
                setLoadingTable(false);
            })
            .catch((error) => {
                setLoadingTable(false);
            });
    };

    useEffect(() => {
        getAllCompany();
    }, []);

    const getZipCode = (zipCode: string) => {
        fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
            .then((response) => response.json())
            .then((res) => {
                if (res && res.erro) {
                    Store.addNotification({
                        message: 'Erro ao buscar o CEP, tente novamente !!',
                        type: 'danger',
                        insert: 'top',
                        container: 'top-center',
                        width: 350,
                        dismiss: {
                            duration: 1000,
                            onScreen: true,
                        },
                    });
                } else {
                    setValue('street', res.logradouro);
                    setValue('city', res.localidade);
                    setValue('neighborhood', res.bairro);
                    setValue('state', res.uf);
                    setValue('country', 'Brasil');
                    setValue('zip_code', res.cep);
                    setZipCode(false);
                }
            })
            .catch((error) => {
                setValue('street', '');
                setValue('city', '');
                setValue('neighborhood', '');
                setValue('state', '');
                setValue('country', '');
                setValue('zip_code', '');
                setZipCode(true);
            });
    };

    const getLabelImage = () => {
        const labelImage = nameImg && nameImg !== null ? nameImg : 'Selecione um arquivo';
        return labelImage;
    };

    const getErrorZipCode = () => {
        if (errors.zip_code && errors.zip_code.type == 'minLength') {
            return <p> Tamanho minimo de 8 caracters</p>;
        }

        return errors.zip_code && <p>Este campo é obrigatório</p>;
    };

    const saveCompany = () => {
        setLoading(true);
        const id = watch('id');
        if (id && id !== null && id > 0) {
            axios
                .put(`v1/company`, watch())
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
                            setLoading(false);
                        },
                    });
                });
        } else {
            axios
                .post(`v1/register/company`, watch())
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
                            setLoading(false);
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
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => {
                    setVisible(false);
                    setLoading(false);
                    setPreviewImg(null);
                    setZipCode(false);
                    setSelectedProducts(null);
                    setNameImg(null);
                    reset();
                }}
            >
                <ContainerForm onSubmit={handleSubmit(saveCompany)}>
                    <ContainerFields>
                        <TabView activeIndex={0}>
                            <TabPanel header="Perfil" leftIcon="pi pi-user mr-2">
                                <ContainerFieldsForm>
                                    <ContainerFields className="endereco">
                                        <InputLabel> Nome Completo </InputLabel>
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                                            </span>
                                            <InputText
                                                {...register('full_name', { required: true })}
                                                placeholder="Razão social"
                                                className={errors.full_name ? 'p-invalid' : ''}
                                            />
                                        </div>
                                        {errors.full_name && <p>Este campo é obrigatório</p>}
                                    </ContainerFields>
                                    <ContainerFields className="endereco">
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
                                    <ContainerFields className="endereco">
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
                            </TabPanel>
                            <TabPanel header="Endereço" leftIcon="pi pi-id-card fs-2 mr-2">
                                <ContainerFieldsForm>
                                    <ContainerFields className="endereco">
                                        <InputLabel> CEP </InputLabel>
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                                            </span>

                                            <InputText
                                                id="phone"
                                                placeholder="digite um CEP 99999999"
                                                maxLength={9}
                                                {...register('zip_code', { required: true, minLength: 8 })}
                                                className={errors.zip_code ? 'p-invalid' : ''}
                                                onChange={(e) => {
                                                    if (e.target.value && e.target.value.length > 7) {
                                                        getZipCode(e.target.value);
                                                    }
                                                }}
                                            />
                                        </div>
                                        {getErrorZipCode()}
                                    </ContainerFields>

                                    <ContainerFields style={{ width: '45%' }}>
                                        <InputLabel> Rua </InputLabel>
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                                            </span>
                                            <InputText
                                                {...register('street', { required: true })}
                                                placeholder="Endereço"
                                                className={errors.street ? 'p-invalid' : ''}
                                                disabled={zipCode}
                                            />
                                        </div>
                                        {errors.street && <p>Este campo é obrigatório</p>}
                                    </ContainerFields>

                                    <ContainerFields style={{ width: '20%' }}>
                                        <InputLabel> Número </InputLabel>
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                                            </span>
                                            <InputText
                                                {...register('number', { required: true })}
                                                placeholder="Número"
                                                className={errors.number ? 'p-invalid' : ''}
                                            />
                                        </div>
                                        {errors.number && <p>Este campo é obrigatório</p>}
                                    </ContainerFields>
                                </ContainerFieldsForm>

                                <ContainerFieldsForm>
                                    <ContainerFields className="endereco2">
                                        <InputLabel> Bairro </InputLabel>
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                                            </span>
                                            <InputText
                                                {...register('neighborhood', { required: true })}
                                                placeholder="Bairro"
                                                className={errors.neighborhood ? 'p-invalid' : ''}
                                                disabled={zipCode}
                                            />
                                        </div>
                                        {errors.neighborhood && <p>Este campo é obrigatório</p>}
                                    </ContainerFields>
                                    <ContainerFields className="endereco2">
                                        <InputLabel> Cidade </InputLabel>
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                                            </span>
                                            <InputText
                                                {...register('city', { required: true })}
                                                placeholder="Cidade"
                                                className={errors.city ? 'p-invalid' : ''}
                                                disabled={zipCode}
                                            />
                                        </div>
                                        {errors.city && <p>Este campo é obrigatório</p>}
                                    </ContainerFields>

                                    <ContainerFields className="endereco2">
                                        <InputLabel> Estado </InputLabel>
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                                            </span>
                                            <InputText
                                                {...register('state', { required: true })}
                                                placeholder="Estado"
                                                className={errors.state ? 'p-invalid' : ''}
                                                disabled={zipCode}
                                            />
                                        </div>
                                        {errors.state && <p>Este campo é obrigatório</p>}
                                    </ContainerFields>
                                    <ContainerFields className="endereco2">
                                        <InputLabel> País </InputLabel>
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                                            </span>
                                            <InputText
                                                {...register('country', { required: true })}
                                                placeholder="País"
                                                className={errors.country ? 'p-invalid' : ''}
                                                disabled={zipCode}
                                            />
                                        </div>
                                        {errors.country && <p>Este campo é obrigatório</p>}
                                    </ContainerFields>
                                </ContainerFieldsForm>

                                <ContainerFieldsForm>
                                    <ContainerFields style={{ width: '100%' }}>
                                        <InputLabel> Complemento </InputLabel>
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                                            </span>
                                            <InputText
                                                {...register('complement', { required: false })}
                                                placeholder="Complemento"
                                                className={errors.complement ? 'p-invalid' : ''}
                                            />
                                        </div>
                                        {errors.complement && <p>Este campo é obrigatório</p>}
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
                            setNameImg(null);
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
                            getCompanyById();
                        }}
                        disabled={watch('id') != null ? false : true}
                        variant="outlined"
                        color="inherit"
                    >
                        Editar
                    </Button>
                    <Button
                        onClick={deleteCompany}
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
                            field="email"
                            sortable
                            filter
                            style={{ width: '20%', textAlign: 'center' }}
                            header="Email"
                        ></Column>
                    </DataTable>
                </Box>
            </ContainerGrid>
        </ContainerRegister>
    );
};

export default Company;
