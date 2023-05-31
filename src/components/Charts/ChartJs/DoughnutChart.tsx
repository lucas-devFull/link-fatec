import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, Colors } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { InputLabel } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

type props = {
    dataChart: Array<Record<any, any>>;
};

export function DoughnutChart({ dataChart }: props) {
    const [chartData, setChartData] = useState<ChartData<'doughnut', number[], unknown> | null>(null);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Alunos aceitos por empresa',
            },
        },
    };

    useEffect(() => {
        if (dataChart.length > 0) {
            const data: ChartData<'doughnut', number[], unknown> = {
                labels: dataChart.map((dChart) => {
                    return dChart.companyName;
                }),
                datasets: [
                    {
                        label: 'Alunos Aceitos',
                        data: dataChart.map((dChart) => {
                            return dChart.acceptedStudents;
                        }),
                    },
                ],
            };
            setChartData(data);
        }
    }, [dataChart]);
    return (
        <div className="card flex justify-content-center">
            {chartData !== null && <Doughnut height={'250px'} options={options} data={chartData} />}
        </div>
    );
}
