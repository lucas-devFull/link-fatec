import React, { useEffect, useRef, useState } from 'react';

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
import Applications from './applications';

type propsFieldsJobs = {
    id?: number;
    target_course_id: string | number;
    company_id: string | number;
    experience: string;
    title: string;
    description: string;
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
    const [is_active, setIsActive] = useState<boolean>(true);
    const [courses, setCourses] = useState<Array<Record<string, string>> | []>([]);
    const [companies, setCompanies] = useState<Array<Record<any, any>> | []>([]);
    const [experiences, setExperiences] = useState<Array<Record<string, string>> | []>([
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
    const [visibleModalApplication, setVisibleModalApplication] = useState<boolean>(false);
    const [previewImg, setPreviewImg] = useState<any | null>(null);
    const [nameImg, setNameImg] = useState<string | null>(null);
    const company = useRef({});
    const course = useRef({});
    const experience = useRef({});

    addLocale('pt', {
        startsWith: 'Começa com',
        contains: 'Inclui',
        noResultsFound: 'Sem Resultados',
        noFilter: 'Remover Filtro',
    });
    locale('pt');

    const resetForm = () => {
        setVisible(false);
        setLoading(false);
        setSelectedProducts(null);
        setIsActive(true);
        setPreviewImg(null);
        setNameImg(null);
        setCompanies([]);
        setCourses([]);
        course.current = {};
        company.current = {};
        experience.current = {};
        getAllJobs();
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
        if (id && id !== null && id > 0 && typeof previewImg === 'string') {
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
                .get(`v1/job-offer?id=` + id)
                .then((response) => {
                    if (response.status == 201 || response.status == 200) {
                        setValue('target_course_id', response.data.target_course_id);
                        setValue('company_id', response.data.company_id);
                        setValue('experience', response.data.job_experience);
                        setValue('title', response.data.title);
                        setValue('role', response.data.role);
                        setValue('description', response.data.description);
                        setValue('is_active', Boolean(response.data.is_active));
                        setIsActive(response.data.is_active);
                        setPreviewImg(response.data.promotional_image_url);

                        const selectedCompany = companies.filter(
                            (company: any) => company.id == response.data.company_id,
                        );

                        if (selectedCompany && selectedCompany.length > 0) {
                            company.current = selectedCompany[0];
                        }

                        const selectedCourses = courses.filter(
                            (course: any) => course.id == response.data.target_course_id,
                        );

                        if (selectedCourses && selectedCourses.length > 0) {
                            course.current = selectedCourses[0];
                        }

                        const selectedExperience = experiences.filter(
                            (company: any) => company.id == response.data.job_experience,
                        );

                        if (selectedExperience && selectedExperience.length > 0) {
                            experience.current = selectedExperience[0];
                        }

                        if (
                            response &&
                            response.data &&
                            response.data.promotional_image_url &&
                            response.data.promotional_image_url !== null &&
                            typeof response.data.promotional_image_url === 'string'
                        ) {
                            setNameImg(response.data.promotional_image_url.slice(39));
                        }
                    }
                })
                .catch((err) => {
                    Store.addNotification({
                        message: 'Erro ao buscar os dados da vaga, tente novamente !!',
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
                            message: 'Vaga excluída com sucesso !!',
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
                        message: 'Erro ao deletar a vaga, tente novamente !!',
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
                title: 'Deseja realmente deletar esta vaga ?',
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
                    setCompanies(response.data);
                })
                .catch((error) => {
                    setCompanies([]);
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

    useEffect(() => {
        const id = watch('id');
        if ((companies.length > 0 || (user && user.login_type == '1')) && courses.length > 0 && id && id > 0) {
            getJobsById();
        }
    }, [companies, courses, watch('id')]);
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
                            message: 'Vaga atualizada com sucesso !!',
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
                        message: 'Erro ao atualizar a vaga, tente novamente !!',
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
                .post(`v1/job-offer`, watch())
                .then((response) => {
                    if (response.status == 201 || response.status == 200) {
                        Store.addNotification({
                            message: 'Vaga criada com sucesso !!',
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
                        message: 'Erro ao atualizar a vaga, tente novamente !!',
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
                    setSelectedProducts(null);
                    setIsActive(true);
                    setPreviewImg(null);
                    setNameImg(null);
                    setCompanies([]);
                    setCourses([]);
                    course.current = {};
                    company.current = {};
                    experience.current = {};
                    getAllJobs();
                    reset();
                }}
                onShow={() => {
                    getCourses();
                    getCompany();
                }}
                footer={() => {
                    return (
                        <>
                            <Divider />
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <Button
                                    style={{ width: '8rem' }}
                                    form="formJobs"
                                    type="submit"
                                    variant="outlined"
                                    color="primary"
                                >
                                    {loading ? <CircularProgress color={'primary'} size={'2rem'} /> : 'Salvar'}
                                </Button>
                            </div>
                        </>
                    );
                }}
            >
                <ContainerForm id="formJobs" onSubmit={handleSubmit(saveJobs)}>
                    <ContainerFields>
                        <ContainerFieldsForm>
                            <ContainerFields className={user && user.login_type != '1' ? 'campos' : ''}>
                                <InputLabel id="target_course_id"> Curso </InputLabel>

                                <Controller
                                    name="target_course_id"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Dropdown
                                            style={{ width: '100% !important' }}
                                            id={field.name}
                                            value={course.current}
                                            optionLabel="name"
                                            placeholder="Selecione o curso"
                                            options={courses}
                                            focusInputRef={field.ref}
                                            onChange={(e) => {
                                                setValue('target_course_id', e.value.id);
                                                course.current = e.target.value;
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
                                        render={({ field }) => (
                                            <Dropdown
                                                style={{ width: '100% !important' }}
                                                id={field.name}
                                                value={company.current}
                                                optionLabel="name"
                                                placeholder="Selecione uma empresa"
                                                options={companies}
                                                focusInputRef={field.ref}
                                                onChange={(e) => {
                                                    setValue('company_id', e.value.id);
                                                    company.current = e.target.value;
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
                                    render={({ field }) => (
                                        <Dropdown
                                            style={{ width: '100% !important' }}
                                            id={field.name}
                                            value={experience.current || null}
                                            optionLabel="name"
                                            placeholder="Selecione uma experiencia"
                                            options={experiences}
                                            focusInputRef={field.ref}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                setValue('experience', e.value.id);
                                                experience.current = e.target.value;
                                            }}
                                            className={errors.experience ? 'dropSelect p-invalid' : 'dropSelect'}
                                        />
                                    )}
                                />
                                {errors.experience && <p>Este campo é obrigatório</p>}
                            </ContainerFields>
                        </ContainerFieldsForm>

                        <ContainerFieldsForm>
                            <ContainerFields>
                                <InputLabel> Título da vaga </InputLabel>
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                                    </span>
                                    <InputText
                                        {...register('title', { required: true })}
                                        placeholder="Titulo"
                                        className={errors.title ? 'p-invalid' : ''}
                                    />
                                </div>
                                {errors.title && <p>Este campo é obrigatório</p>}
                            </ContainerFields>

                            <ContainerFields>
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
                        </ContainerFieldsForm>

                        <ContainerFieldsForm>
                            <ContainerFields>
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

                            <ContainerFields>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <label htmlFor={'is_active'}> Vaga Ativa </label>
                                    <InputSwitch
                                        style={{ padding: '0.5em', marginTop: '1rem' }}
                                        inputId={'is_active'}
                                        checked={is_active}
                                        className={errors.is_active ? 'p-invalid' : ''}
                                        onChange={(e) => {
                                            setValue('is_active', !is_active);
                                            setIsActive(!is_active);
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
                                                console.log(e.target.files[0]);

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
                </ContainerForm>
            </Dialog>

            <Applications
                visibleModal={visibleModalApplication}
                setVisibleModal={setVisibleModalApplication}
                dataJob={selectedProducts}
                getAllJobs={getAllJobs}
            ></Applications>

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
                        onClick={() => setVisibleModalApplication(true)}
                        disabled={watch('id') != null ? false : true}
                        variant="outlined"
                        color="primary"
                    >
                        Ver Candidaturas
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
                            field="title"
                            sortable
                            filter
                            style={{ width: '20%', textAlign: 'center' }}
                            header="Titulo da vaga"
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
                            header="Alunos aplicados a vaga"
                        ></Column>
                    </DataTable>
                </Box>
            </ContainerGrid>
        </ContainerRegister>
    );
};

export default Jobs;
