import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { InputLabel } from '@mui/material';

type props = {
    dataChart: any;
};
export default function DoughnutChart({ dataChart }: props) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        if (dataChart.length > 0) {
            const data = {
                labels: dataChart.map((dChart: any) => {
                    return dChart.description;
                }),

                datasets: [
                    {
                        data: dataChart.map((dChart: any) => {
                            return dChart.job_offer_count;
                        }),
                    },
                ],
            };
            const options = {
                cutout: '60%',
            };

            setChartData(data);
            setChartOptions(options);
        }
    }, [dataChart]);

    return (
        <div className="card flex justify-content-center">
            <InputLabel id="target_course_id"> Vagas Diárias Criadas </InputLabel>
            <Chart type="doughnut" data={chartData} options={chartOptions} className="" />
        </div>
    );
}
