import React, { useState } from 'react';
import { Card } from 'primereact/card';
import * as all from './styles';
import DoughnutChart from '../../components/Charts/Doughnut';
import ComboDemo from '../../components/Charts/Combo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <all.ContainerDashboard>
            <all.ContainerCard>
                <div onClick={() => navigate('/register/student')}>
                    <div>
                        <FontAwesomeIcon size="5x" icon={icon({ name: 'users' })} />
                    </div>
                    <Card title="Alunos">
                        <p className="m-0">50</p>
                    </Card>
                </div>

                <div onClick={() => navigate('/register/courses')}>
                    <div>
                        <FontAwesomeIcon size="5x" icon={icon({ name: 'graduation-cap' })} />
                    </div>
                    <Card title="Cursos">
                        <p className="m-0">50</p>
                    </Card>
                </div>

                <div onClick={() => navigate('/register/company')}>
                    <div>
                        <FontAwesomeIcon size="5x" icon={icon({ name: 'building' })} />
                    </div>
                    <Card title="Empresas">
                        <p className="m-0">3</p>
                    </Card>
                </div>

                <div onClick={() => navigate('/register/jobs')}>
                    <div>
                        <FontAwesomeIcon size="5x" icon={icon({ name: 'briefcase' })} />
                    </div>
                    <Card title="Vagas">
                        <p className="m-0">5</p>
                    </Card>
                </div>
            </all.ContainerCard>

            <all.ContainerCharts>
                <DoughnutChart></DoughnutChart>
                <ComboDemo></ComboDemo>
            </all.ContainerCharts>
        </all.ContainerDashboard>
    );
};

export default Dashboard;
