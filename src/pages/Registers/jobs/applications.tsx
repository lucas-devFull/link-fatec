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

type propsModalApplication = {
    visibleModal: boolean;
    setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
    dataJob: Record<any, any>;
};

const Applications = ({ visibleModal, setVisibleModal, dataJob }: propsModalApplication) => {
    const [loadingModalApplication, setLoadingModalApplication] = useState<boolean>(true);
    const [dataApplications, setDataApplications] = useState([]);

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
            return <Avatar style={{ padding: '0.4rem' }} image={img} size="large" shape="circle" />;
        }

        return (
            <Avatar icon={'pi pi-user'} style={{ width: '2.5rem', height: '2.5rem' }} size="normal" shape="circle" />
        );
    };

    const getElementStateJob = (state: number) => {
        if (!state) {
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
        return dataApplications.length > 0 ? (
            dataApplications.map((applications: any, index) => {
                return (
                    <all.ContainerStudentsApplications key={index}>
                        <all.ContainerHeaderModalApplications>
                            <div>
                                {getImgAvatar(applications?.profile_picture)}
                                <all.ContainerNameCompany>
                                    <div>{applications?.name}</div>
                                    <div>
                                        <span>{applications?.course_name}</span>
                                        <span>{applications?.email}</span>
                                    </div>
                                </all.ContainerNameCompany>
                                <div> Curriculo.pdf</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div> Aceitar </div>
                                <div style={{ marginLeft: '1rem' }}> Rejeitar </div>
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
            style={{ width: '50vw' }}
            header={() => {
                return (
                    dataJob && (
                        <all.ContainerModalApplication>
                            <all.ContainerHeaderModalApplications>
                                <div>
                                    {getImgAvatar(dataJob.company_profile_picture)}
                                    <all.ContainerNameCompany>
                                        <div>Titulo da vaga</div>
                                        <div>
                                            <span>{dataJob.company_name}</span>
                                            <span>{'Garça, SP'}</span>
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
                setDataApplications([]);
                setLoadingModalApplication(true);
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
