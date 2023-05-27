import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { InputLabel } from '@mui/material';

type props = {
    dataChart: {
        closed: Array<Record<any, any>>;
        open: Array<Record<any, any>>;
    };
};

export default function ComboDemo({ dataChart }: props) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        if (dataChart) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
            const data = {
                labels: [
                    'Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro',
                ],
                datasets: [
                    {
                        label: 'Vagas Abertas',
                        backgroundColor: documentStyle.getPropertyValue('--red-600'),
                        borderColor: documentStyle.getPropertyValue('--red-600'),
                        data: dataChart.open.map((dChart) => {
                            return parseInt(dChart.job_count);
                        }),
                    },
                    {
                        label: 'Vagas Concluídas',
                        backgroundColor: documentStyle.getPropertyValue('--cyan-600'),
                        borderColor: documentStyle.getPropertyValue('--cyan-600'),
                        data: dataChart.closed.map((dChart) => {
                            return parseInt(dChart.inactive_job_count);
                        }),
                    },
                ],
            };
            const options = {
                maintainAspectRatio: false,
                aspectRatio: 1.5,

                plugins: {
                    legend: {
                        labels: {
                            fontColor: textColor,
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                            font: {
                                weight: 500,
                            },
                        },
                        grid: {
                            display: false,
                            drawBorder: false,
                        },
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary,
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false,
                        },
                    },
                },
            };

            setChartData(data);
            setChartOptions(options);
        }
    }, [dataChart]);

    return (
        <div className="card">
            <InputLabel id="target_course_id"> Vagas Criadas e Concluídas no ano </InputLabel>
            <Chart type="bar" style={{ height: '400px' }} data={chartData} options={chartOptions} />
        </div>
    );
}
