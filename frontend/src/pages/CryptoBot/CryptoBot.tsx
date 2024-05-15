import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';



const Crypto = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    const [wallet] = useState(2100.10);
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Histórico de Saldo',
            },
        },
        scales: {
            x: {
                type: 'category',
                labels: labels,
            },
            y: {
                type: 'linear',
            },
            
        },
    };
    const data = {
        labels,
        datasets: [
            {
                label: 'Saldo',
                data: labels.map(() => Math.random() * 1000),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },

        ],
    };
    return (
        <div className="h-full w-full flex items-center flex-col gap-10 p-10">
            <div className="flex justify-center w-full">
                <div className="w-1/2 pt-[1rem] mr-5">
                    <div className="border-2 border-solid border-primary rounded-md p-4 min-h-[16rem]">
                        <span className="text-3xl">Saldo Atual</span>
                        <div className="pt-4 text-8xl font-bold text-primary">
                            <span>R$&nbsp;</span>
                            {wallet.toFixed(2)}
                        </div>
                    </div>
                    <div className='flex flex-row pt-2 m-2'>
                        <div className="flex-1 mr-2">
                            <button
                                className="bg-primary text-white rounded-md p-2 w-full"
                            >
                                Transferir
                            </button>
                        </div>
                        <div className="flex-1 mr-2">
                            <button
                                className="bg-primary text-white rounded-md p-2 w-full"
                            >
                                Depositar
                            </button>
                        </div>
                        <div className="flex-1">
                            <button
                                className="bg-primary text-white rounded-md p-2 w-full"
                            >
                                Sacar
                            </button>
                        </div>
                    </div>


                </div>
                <div className="w-1/2 pt-[1rem] ml-auto mr-auto">
                    <div className="border-2 border-solid border-primary rounded-md p-4 min-h-[16rem] flex justify-center items-center">
                        <Line
                            options={options as any}
                            data={data}
                            className="w-full max-h-[220px]"
                        />
                    </div>
                </div>

            </div>
            <div>
                oi
            </div>
        </div>

    );
};

export default Crypto;