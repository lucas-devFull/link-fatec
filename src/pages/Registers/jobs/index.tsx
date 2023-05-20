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
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { Divider } from 'primereact/divider';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

import { Box, Button, CircularProgress, InputLabel } from '@mui/material';
import { Dialog } from 'primereact/dialog';
import axios from '../../../services/Api';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm, Controller } from 'react-hook-form';
import { ReactNotifications, Store } from 'react-notifications-component';
import './style.css';
import { ContainerFieldsForm } from './style';
import { useAuth } from '../../../contexts/auth';

type propsFieldsJobs = {
    id?: number;
    target_course_id: string | number;
    company_id: string | number;
    description: string;
    experience: string;
    role: string;
    is_active: boolean;
    prom_image: any | null;
};

const Jobs = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<propsFieldsJobs>();
    const [courses, setCourses] = useState<Array<Record<string, string>> | []>([]);
    const [company, setCompany] = useState<Array<Record<string, string>> | []>([]);
    const [is_active, setIsActive] = useState<boolean>(true);
    const [experience, setExperience] = useState<Array<Record<string, string>> | []>([
        {
            id: '0',
            name: 'Não exigida',
        },
        {
            id: '1',
            name: 'Treinee',
        },
        {
            id: '2',
            name: 'Júnior',
        },
        {
            id: '3',
            name: 'Pleno',
        },
    ]);
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
        getAllJobs();
        setSelectedProducts(null);
        setPreviewImg(null);
        setNameImg(null);
        reset();
    };

    const setFields = (values: propsFieldsJobs | null) => {
        if (values == null) {
            reset();
        } else {
            setValue('id', values.id);
        }
    };

    const getImg = (): string => {
        const id = watch('id');
        if (id && id !== null && id > 0) {
            return previewImg;
        }

        return URL.createObjectURL(previewImg);
    };

    const ComponetDeleteJobs = () => {
        return (
            <ContainerPopUpButton>
                <div>
                    <Button variant="outlined" color={'inherit'} onClick={deleteJobsById}>
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

    const getJobsById = () => {
        const id = watch('id');
        if (id && id !== null && id > 0) {
            axios
                .get(`v1/jobs-offers/` + id)
                .then((response) => {
                    if (response.status == 201 || response.status == 200) {
                        console.log(response.data);
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

    const deleteJobsById = () => {
        Store.removeAllNotifications();
        const id = watch('id');
        if (id && id !== null && id > 0) {
            axios
                .delete(`v1/job-offer?id=` + id)
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
                                getAllJobs();
                                Store.removeAllNotifications();
                            },
                        });
                    }
                })
                .catch((err) => {
                    Store.addNotification({
                        message: 'Erro ao deletar o usuário, tente novamente !!',
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
                            getAllJobs();
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
    const deleteJobs = () => {
        const id = watch('id');
        if (id && id !== null && id > 0) {
            Store.addNotification({
                message: <ComponetDeleteJobs />,
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
                    getAllJobs();
                },
            });
        }
    };
    const getCompany = () => {
        if (user && user.login_type != '1') {
            axios
                .get('/v1/company')
                .then((response) => {
                    setCompany(response.data);
                })
                .catch((error) => {
                    setCompany([]);
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

    const getAllJobs = () => {
        setLoadingTable(true);

        axios
            .get('/v1/user/job-offers')
            .then((response) => {
                setData(response.data);
                setLoadingTable(false);
            })
            .catch((error) => {
                setLoadingTable(false);
            });
    };

    useEffect(() => {
        getAllJobs();
    }, []);

    const getLabelImage = () => {
        const labelImage = nameImg && nameImg !== null ? nameImg : 'Selecione um arquivo';
        return labelImage;
    };

    const saveJobs = () => {
        setLoading(true);
        const id = watch('id');
        if (id && id !== null && id > 0) {
            axios
                .put(`v1/job-offer`, watch())
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
            console.log(watch());
            axios
                .post(`v1/job-offer`, watch())
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
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => {
                    setVisible(false);
                    setLoading(false);
                    setPreviewImg(null);
                    setNameImg(null);
                    reset();
                }}
                onShow={() => {
                    getCourses();
                    getCompany();
                }}
            >
                <ContainerForm onSubmit={handleSubmit(saveJobs)}>
                    <ContainerFields>
                        <ContainerFieldsForm>
                            <ContainerFields className={user && user.login_type != '1' ? 'campos' : ''}>
                                <InputLabel id="target_course_id"> Curso </InputLabel>

                                <Controller
                                    name="target_course_id"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => (
                                        <Dropdown
                                            style={{ width: '100% !important' }}
                                            id={field.name}
                                            value={field.value}
                                            optionLabel="name"
                                            placeholder="Selecione o curso"
                                            options={courses}
                                            focusInputRef={field.ref}
                                            onChange={(e) => {
                                                field.onChange(e.value);
                                                control._updateFieldArray('target_course_id', e.value.id);
                                            }}
                                            className={errors.target_course_id ? 'dropSelect p-invalid' : 'dropSelect'}
                                        />
                                    )}
                                />
                                {errors.target_course_id && <p>Este campo é obrigatório</p>}
                            </ContainerFields>
                            {user && user.login_type != '1' && (
                                <ContainerFields className="campos">
                                    <InputLabel id="company_id"> Empresa </InputLabel>

                                    <Controller
                                        name="company_id"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field, fieldState }) => (
                                            <Dropdown
                                                style={{ width: '100% !important' }}
                                                id={field.name}
                                                value={field.value}
                                                optionLabel="name"
                                                placeholder="Selecione uma empresa"
                                                options={company}
                                                focusInputRef={field.ref}
                                                onChange={(e) => {
                                                    field.onChange(e.value);
                                                    control._updateFieldArray('company_id', e.value.id);
                                                }}
                                                className={errors.company_id ? 'dropSelect p-invalid' : 'dropSelect'}
                                            />
                                        )}
                                    />
                                    {errors.company_id && <p>Este campo é obrigatório</p>}
                                </ContainerFields>
                            )}
                            <ContainerFields className={user && user.login_type != '1' ? 'campos' : ''}>
                                <InputLabel id="experience"> Experiência </InputLabel>

                                <Controller
                                    name="experience"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => (
                                        <Dropdown
                                            style={{ width: '100% !important' }}
                                            id={field.name}
                                            value={field.value}
                                            optionLabel="name"
                                            placeholder="Selecione uma experiencia"
                                            options={experience}
                                            focusInputRef={field.ref}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                control._updateFieldArray('experience', e.value.id);
                                            }}
                                            className={errors.experience ? 'dropSelect p-invalid' : 'dropSelect'}
                                        />
                                    )}
                                />
                                {errors.experience && <p>Este campo é obrigatório</p>}
                            </ContainerFields>
                        </ContainerFieldsForm>

                        <ContainerFieldsForm>
                            <ContainerFields className="campos">
                                <InputLabel> Descrição da vaga </InputLabel>
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                                    </span>
                                    <InputTextarea
                                        {...register('description', { required: true })}
                                        placeholder="Descrição da Vaga"
                                        className={errors.description ? 'p-invalid' : ''}
                                    />
                                </div>
                                {errors.description && <p>Este campo é obrigatório</p>}
                            </ContainerFields>

                            <ContainerFields className="campos">
                                <InputLabel> Área de atuação </InputLabel>
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                                    </span>
                                    <InputText
                                        {...register('role', { required: true })}
                                        placeholder="Área de atuação"
                                        className={errors.role ? 'p-invalid' : ''}
                                    />
                                </div>
                                {errors.role && <p>Este campo é obrigatório</p>}
                            </ContainerFields>

                            <ContainerFields className="campos">
                                <div>
                                    <Controller
                                        name={'is_active'}
                                        control={control}
                                        rules={{ required: false }}
                                        render={({ field }) => {
                                            return (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        flexDirection: 'column',
                                                    }}
                                                >
                                                    <label htmlFor={field.name}> Vaga Ativa </label>
                                                    <InputSwitch
                                                        style={{ padding: '0.5em' }}
                                                        inputId={field.name}
                                                        checked={is_active}
                                                        inputRef={field.ref}
                                                        className={errors.is_active ? 'p-invalid' : ''}
                                                        onChange={(e) => {
                                                            field.onChange(e.value);
                                                            setIsActive(!is_active);
                                                        }}
                                                    />
                                                </div>
                                            );
                                        }}
                                    />
                                </div>
                            </ContainerFields>
                        </ContainerFieldsForm>

                        <ContainerFieldsForm>
                            <ContainerFields>
                                <InputLabel> Foto promocional </InputLabel>
                                <ContainerInputFile className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <FontAwesomeIcon icon={icon({ name: 'image' })} />
                                    </span>
                                    <label htmlFor="file" className={errors.prom_image ? 'p-invalid' : ''}>
                                        {getLabelImage()}
                                    </label>
                                    <InputText
                                        id="file"
                                        type="file"
                                        accept="image/*"
                                        placeholder="Imagem Perfil"
                                        {...register('prom_image', { required: false })}
                                        onChange={(e) => {
                                            if (e && e.target && e.target.files && e.target.files?.length > 0) {
                                                setPreviewImg(e.target.files[0]);
                                                setNameImg(e.target.files[0].name);
                                                convertImgBase64(e.target.files, (reader) => {
                                                    setValue('prom_image', reader);
                                                });
                                            }
                                        }}
                                    />
                                </ContainerInputFile>
                            </ContainerFields>
                            <ContainerFields>
                                {previewImg && (
                                    <ContainerPreviewImg>
                                        <img src={getImg()} />
                                        <div
                                            onClick={() => {
                                                setPreviewImg(null);
                                                setNameImg(null);
                                                setValue('prom_image', '');
                                            }}
                                        >
                                            <FontAwesomeIcon icon={icon({ name: 'xmark' })} />
                                        </div>
                                    </ContainerPreviewImg>
                                )}
                            </ContainerFields>
                        </ContainerFieldsForm>
                    </ContainerFields>
                    <Divider />
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button style={{ width: '8rem' }} type="submit" variant="outlined" color="primary">
                            {loading ? <CircularProgress color={'primary'} size={'2rem'} /> : 'Salvar'}
                        </Button>
                    </div>
                </ContainerForm>
            </Dialog>

            <TitleRegister>Cadastro de Vagas</TitleRegister>
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
                            getJobsById();
                        }}
                        disabled={watch('id') != null ? false : true}
                        variant="outlined"
                        color="inherit"
                    >
                        Editar
                    </Button>
                    <Button
                        onClick={deleteJobs}
                        disabled={watch('id') != null ? false : true}
                        variant="outlined"
                        color="error"
                    >
                        Deletar
                    </Button>

                    <Button
                        onClick={deleteJobs}
                        disabled={watch('id') != null ? false : true}
                        variant="outlined"
                        color="primary"
                    >
                        Ver Candidaturas
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
                            field="role"
                            sortable
                            filter
                            style={{ width: '20%', textAlign: 'center' }}
                            header="Área de atuação"
                        ></Column>
                        <Column
                            field="target_course"
                            sortable
                            filter
                            style={{ width: '20%', textAlign: 'center' }}
                            header="Curso direcionado"
                        ></Column>
                        {user && user?.login_type != '1' && (
                            <Column
                                field="company_name"
                                sortable
                                filter
                                style={{ width: '20%', textAlign: 'center' }}
                                header="Empresa"
                            ></Column>
                        )}
                        <Column
                            field="applied_students_count"
                            sortable
                            filter
                            style={{ width: '20%', textAlign: 'center' }}
                            header="Estudantes aplicados a vaga"
                        ></Column>
                    </DataTable>
                </Box>
            </ContainerGrid>
        </ContainerRegister>
    );
};

export default Jobs;
