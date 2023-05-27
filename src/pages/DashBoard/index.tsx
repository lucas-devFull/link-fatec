import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import * as all from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/Api';
import { DoughnutChart } from '../../components/Charts/ChartJs/DoughnutChart';
import { BarChart } from '../../components/Charts/ChartJs/BarChart';

type dataDashBoard = {
    panel_data: {
        companies: number;
        courses: number;
        job_offers: number;
        students: number;
    };

    chart_data: {
        accepted_students_by_companies_in_month: Array<Record<any, any>>;
        job_month_data: {
            closed: Array<number>;
            open: Array<number>;
        };
    };
};

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [dataDashBoard, setDataDashBoard] = useState<dataDashBoard>({
        panel_data: {
            companies: 0,
            courses: 0,
            job_offers: 0,
            students: 0,
        },
        chart_data: {
            accepted_students_by_companies_in_month: [],
            job_month_data: {
                closed: [],
                open: [],
            },
        },
    });

    useEffect(() => {
        axios
            .get('v1/web/dashboard')
            .then((response) => {
                if (response && response.status == 200) {
                    setDataDashBoard(response.data);
                }
            })
            .catch((error) => {
                setDataDashBoard({} as dataDashBoard);
            });
    }, []);

    return (
        <all.ContainerDashboard>
            <all.ContainerCard>
                <div onClick={() => navigate('/register/courses')}>
                    <div>
                        <FontAwesomeIcon size="4x" icon={icon({ name: 'graduation-cap' })} />
                    </div>
                    <Card title="Cursos">
                        <p className="m-0">{dataDashBoard.panel_data.courses}</p>
                    </Card>
                </div>

                <div onClick={() => navigate('/register/student')}>
                    <div>
                        <FontAwesomeIcon size="4x" icon={icon({ name: 'users' })} />
                    </div>
                    <Card title="Alunos">
                        <p className="m-0">{dataDashBoard.panel_data.students}</p>
                    </Card>
                </div>

                <div onClick={() => navigate('/register/company')}>
                    <div>
                        <FontAwesomeIcon size="4x" icon={icon({ name: 'building' })} />
                    </div>
                    <Card title="Empresas">
                        <p className="m-0">{dataDashBoard.panel_data.companies}</p>
                    </Card>
                </div>

                <div onClick={() => navigate('/register/jobs')}>
                    <div>
                        <FontAwesomeIcon size="4x" icon={icon({ name: 'briefcase' })} />
                    </div>
                    <Card title="Vagas">
                        <p className="m-0">{dataDashBoard.panel_data.job_offers}</p>
                    </Card>
                </div>
            </all.ContainerCard>

            <all.ContainerCharts>
                <DoughnutChart
                    dataChart={dataDashBoard.chart_data.accepted_students_by_companies_in_month}
                ></DoughnutChart>
                <BarChart dataChart={dataDashBoard.chart_data.job_month_data}></BarChart>
            </all.ContainerCharts>
        </all.ContainerDashboard>
    );
};

export default Dashboard;
