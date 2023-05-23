import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import axios from '../../../services/Api';
import * as all from './style';
import { Avatar } from 'primereact/avatar';
import { Chip } from 'primereact/chip';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SelectButton } from 'primereact/selectbutton';

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
    const options = ['Aceitar', 'Rejeitar'];
    const [value, setValue] = useState(null);

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
                icon={'pi pi-user'}
                className={'avatar'}
                style={{ width: '2.5rem', height: '2.5rem' }}
                size="normal"
                shape="circle"
            />
        );
    };

    const getElementStateJob = (state: number) => {
        if (state) {
            return (
                <all.ContainerStateJob typeButton="active">
                    <Chip label="Vaga ativa" icon={<FontAwesomeIcon icon={icon({ name: 'check' })} />} />
                </all.ContainerStateJob>
            );
        }
        return (
            <all.ContainerStateJob typeButton="closed">
                <Chip label="Vaga fechada" icon={<FontAwesomeIcon icon={icon({ name: 'ban' })} />} />
            </all.ContainerStateJob>
        );
    };

    const getStudentesApplications = () => {
        return dataApplications && dataApplications.students && dataApplications.students.length > 0 ? (
            dataApplications.students.map((applications: any, index) => {
                return (
                    <all.ContainerStudentsApplications key={index}>
                        <all.ContainerHeaderModalApplications>
                            <div className="body">
                                {getImgAvatar(applications?.profile_picture)}
                                <all.ContainerNameCompany>
                                    <div>{applications?.full_name}</div>
                                    <div>
                                        <span>{dataJob?.target_course}</span>
                                        <span>{applications?.email}</span>
                                        <all.ContainerFileResume href={applications?.resume}>
                                            <span> Curriculo </span>
                                            <FontAwesomeIcon icon={icon({ name: 'file-arrow-down' })} size="1x" />
                                        </all.ContainerFileResume>
                                    </div>
                                </all.ContainerNameCompany>
                            </div>

                            <div style={{ display: 'flex' }}>
                                <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options} />
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
                    dataJob && (
                        <all.ContainerModalApplication>
                            <all.ContainerHeaderModalApplications>
                                <div>
                                    {getImgAvatar(dataJob.company_profile_picture)}
                                    <all.ContainerNameCompany>
                                        <div>{dataJob.title}</div>
                                        <div>
                                            <span>{dataJob.company_name}</span>
                                            <span>{dataJob.address}</span>
                                        </div>
                                    </all.ContainerNameCompany>
                                </div>
                                {getElementStateJob(dataJob.is_active)}
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
