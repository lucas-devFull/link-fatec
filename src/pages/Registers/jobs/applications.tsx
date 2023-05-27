import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import axios from '../../../services/Api';
import * as all from './style';
import { Avatar } from 'primereact/avatar';
import { Chip } from 'primereact/chip';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@mui/material';
import { SelectButton } from 'primereact/selectbutton';
import { useForm, Controller } from 'react-hook-form';

type propsModalApplication = {
    visibleModal: boolean;
    setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
    dataJob: Record<any, any>;
    getAllJobs: any;
};

type dataApplications = {
    job: Record<string, any>;
    students: Array<Record<any, any>>;
};

const Applications = ({ visibleModal, setVisibleModal, dataJob, getAllJobs }: propsModalApplication) => {
    const [loadingModalApplication, setLoadingModalApplication] = useState<boolean>(true);
    const [dataApplications, setDataApplications] = useState<dataApplications>({} as dataApplications);
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const options = ['Aceito', 'Rejeitado'];
    const { control } = useForm();

    const getApplicationsJobs = (id: number) => {
        axios.get(`/v1/job-offer/${id}/application`).then((res) => {
            if (res.status == 200 || res.status == 201) {
                setLoadingModalApplication(false);
                setDataApplications(res.data);
            }
        });
    };

    const getImgAvatar = (img: any) => {
        if (img && img !== null) {
            return (
                <Avatar style={{ padding: '0.4rem' }} className={'avatar'} image={img} size="large" shape="square" />
            );
        }

        return (
            <Avatar
                icon={<FontAwesomeIcon icon={icon({ name: 'user', style: 'regular' })} size="2x" />}
                className={'avatar'}
                style={{ padding: '0.4rem' }}
                size="large"
                shape="square"
            />
        );
    };

    const setActiveJob = () => {
        setLoadingButton(true);
        axios
            .put(`v1/job-offer`, {
                id: dataApplications.job.id,
                is_active: !dataApplications.job.is_active,
            })
            .then((res) => {
                if (res.status == 200 || res.status == 201) {
                    setLoadingButton(false);
                    dataApplications.job.is_active = !dataApplications.job.is_active;
                    setDataApplications({ ...dataApplications });
                }
            });
    };

    const getElementStateJob = (state: number) => {
        if (state) {
            return (
                <div style={{ height: '3rem' }}>
                    <all.ContainerStateJob
                        onClick={() => {
                            setActiveJob();
                        }}
                        typeButton="active"
                    >
                        <Chip
                            style={{ borderRadius: '10px;' }}
                            label="Vaga ativa"
                            icon={<FontAwesomeIcon icon={icon({ name: 'check' })} />}
                        />
                    </all.ContainerStateJob>
                    {loadingButton && (
                        <all.ContainerLoadingState>
                            <CircularProgress color={'primary'} size={'2rem'} />
                        </all.ContainerLoadingState>
                    )}
                </div>
            );
        }
        return (
            <div style={{ height: '3rem' }}>
                <all.ContainerStateJob
                    onClick={() => {
                        setActiveJob();
                    }}
                    typeButton="closed"
                >
                    <Chip
                        style={{ borderRadius: '10px;' }}
                        label="Vaga Concluída"
                        icon={<FontAwesomeIcon icon={icon({ name: 'ban' })} />}
                    />
                </all.ContainerStateJob>
                {loadingButton && (
                    <all.ContainerLoadingState>
                        <CircularProgress color={'primary'} size={'2rem'} />
                    </all.ContainerLoadingState>
                )}
            </div>
        );
    };

    const getValueState = (state: number) => {
        if (state == 1) {
            return 'Aceito';
        }

        if (state == 2) {
            return 'Rejeitado';
        }

        return null;
    };

    const getValueStateNumber = (state: string) => {
        if (state == 'Rejeitado') {
            return 2;
        }

        if (state == 'Aceito') {
            return 1;
        }

        return 0;
    };

    const setStatusStudent = (
        student_id: number,
        job_id: number,
        state: number,
        callback?: (response: boolean) => void,
    ) => {
        setLoadingButton(true);
        axios
            .put(`v1/student/${student_id}/job/${job_id}/application-status`, { status: state })
            .then((response) => {
                if (response.status == 200) {
                    setLoadingButton(false);
                    callback && callback(true);
                }
            })
            .catch((err) => {
                setLoadingButton(false);
                getApplicationsJobs;
            });
    };

    const getStudentesApplications = () => {
        return dataApplications && dataApplications.students && dataApplications.students.length > 0 ? (
            dataApplications.students.map((applications: Record<any, any>, index) => {
                return (
                    <all.ContainerStudentsApplications key={index}>
                        <all.ContainerHeaderModalApplications>
                            <div className="body">
                                {getImgAvatar(applications?.profile_picture)}
                                <all.ContainerNameCompany>
                                    <div>{applications?.full_name}</div>
                                    <div>
                                        <span>{dataApplications.job?.target_course}</span>
                                        <span>{applications?.email}</span>
                                        <all.ContainerFileResume href={applications?.resume}>
                                            <span> Curriculo </span>
                                            <FontAwesomeIcon icon={icon({ name: 'file-arrow-down' })} size="1x" />
                                        </all.ContainerFileResume>
                                    </div>
                                </all.ContainerNameCompany>
                            </div>

                            <div style={{ display: 'flex' }}>
                                <Controller
                                    control={control}
                                    name="status_students"
                                    render={({ field }) => {
                                        return (
                                            <div style={{ height: '2.7rem' }}>
                                                <SelectButton
                                                    id={field.name}
                                                    data-id={applications.id}
                                                    {...field}
                                                    value={
                                                        typeof applications.application_status == 'string'
                                                            ? applications.application_status
                                                            : getValueState(applications.application_status)
                                                    }
                                                    onChange={(e) => {
                                                        const statusNumber = getValueStateNumber(e.value);
                                                        setStatusStudent(
                                                            applications.id,
                                                            dataApplications.job.id,
                                                            statusNumber,
                                                            (response: boolean) => {
                                                                if (response) {
                                                                    dataApplications.students[
                                                                        index
                                                                    ].application_status = statusNumber;
                                                                    setDataApplications({ ...dataApplications });
                                                                }
                                                            },
                                                        );
                                                    }}
                                                    options={options}
                                                ></SelectButton>

                                                {loadingButton && (
                                                    <all.ContainerLoading>
                                                        <CircularProgress color={'primary'} size={'2rem'} />
                                                    </all.ContainerLoading>
                                                )}
                                            </div>
                                        );
                                    }}
                                />
                            </div>
                        </all.ContainerHeaderModalApplications>
                    </all.ContainerStudentsApplications>
                );
            })
        ) : (
            <all.ContainerNoApplications> Sem aplicações à vaga</all.ContainerNoApplications>
        );
    };

    const getElementHorizontal = () => {
        return (
            <all.ContainerBodyModalApplication>
                {loadingModalApplication ? (
                    <CircularProgress color={'primary'} size={'2rem'} />
                ) : (
                    getStudentesApplications()
                )}
            </all.ContainerBodyModalApplication>
        );
    };

    return (
        <Dialog
            draggable={false}
            visible={visibleModal}
            style={{ width: '40rem' }}
            header={() => {
                return (
                    dataApplications.job && (
                        <all.ContainerModalApplication>
                            <all.ContainerHeaderModalApplications>
                                <div>
                                    {getImgAvatar(dataApplications.job.company_profile_picture)}
                                    <all.ContainerNameCompany>
                                        <div>{dataApplications.job.title}</div>
                                        <div>
                                            <span>{dataApplications.job.company_name}</span>
                                            <span>{dataApplications.job.address}</span>
                                        </div>
                                    </all.ContainerNameCompany>
                                </div>
                                {getElementStateJob(dataApplications.job.is_active)}
                            </all.ContainerHeaderModalApplications>
                            <Divider className="modalApplications" />
                        </all.ContainerModalApplication>
                    )
                );
            }}
            onHide={() => {
                setVisibleModal(false);
                setDataApplications({} as dataApplications);
                setLoadingModalApplication(true);
                getAllJobs();
            }}
            onShow={() => {
                getApplicationsJobs(dataJob.id);
            }}
        >
            {getElementHorizontal()}
        </Dialog>
    );
};

export default Applications;
