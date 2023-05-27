import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type props = {
    dataChart: {
        closed: Array<number>;
        open: Array<number>;
    };
};

export function BarChart({ dataChart }: props) {
    const [chartData, setChartData] = useState<ChartData<'bar', number[], unknown> | null>(null);

    const options = {
        responsive: true,
        height: '20rem',
        width: '10rem',
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Vagas Criadas e Concluídas no ano',
            },
        },
    };

    useEffect(() => {
        if (dataChart) {
            const documentStyle = getComputedStyle(document.documentElement);
            const labels = [
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
            ];

            const data = {
                labels,
                datasets: [
                    {
                        label: 'Vagas Abertas',
                        data: dataChart.open,
                        backgroundColor: documentStyle.getPropertyValue('--red-600'),
                    },
                    {
                        label: 'Vagas Concluídas',
                        data: dataChart.closed,
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            };
            setChartData(data);
        }
    }, [dataChart]);
    return (
        <div className="card flex justify-content-center">
            {chartData && <Bar height={'250px'} options={options} data={chartData}></Bar>}
        </div>
    );
}
