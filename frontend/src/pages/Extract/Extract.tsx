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
  Legend
} from 'chart.js';
import { Link } from 'react-router-dom';

const Extract = () => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  const [wallet] = useState(2100.1);
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Histórico de Saldo'
      }
    },
    scales: {
      x: {
        type: 'category',
        labels: labels
      },
      y: {
        type: 'linear'
      }
    }
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'Saldo',
        data: labels.map(() => Math.random() * 1000),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  };
  return (
    <div className='overflow-auto'>
      <div className="h-full w-full flex flex-col items-center gap-10 p-4 md:p-10">
        <div className="flex flex-col md:flex-row justify-center w-full">
          <div className="w-full md:w-1/2 pt-[1rem] md:mr-5">
            <div className="border-2 border-solid border-primary rounded-md p-4 min-h-[16rem]">
              <span className="text-3xl">Saldo Atual (CBU) </span>
              <div className="pt-4 text-6xl font-bold text-primary lg:text-8xl">
                <span>R$&nbsp;</span>
                {wallet.toFixed(2)}
              </div>
            </div>
            <div className="flex flex-row pt-2 m-2">
              <div className="flex-1 mr-2">
                <Link to="/transfer">
                  <button className="bg-primary text-white rounded-md p-2 w-full">
                    Transferir
                  </button>
                </Link>
              </div>
              <div className="flex-1 mr-2">
                <button className="bg-primary text-white rounded-md p-2 w-full">Extrato Detalhado </button>
              </div>
              {/* <div className="flex-1">
                <button className="bg-primary text-white rounded-md p-2 w-full">Sacar</button>
              </div> */}
            </div>
          </div>
          <div className="w-full md:w-1/2 pt-[1rem] ml-auto mr-auto">
            <div className="border-2 border-solid border-primary rounded-md p-4 min-h-[16rem] flex justify-center items-center">
              <Line options={options as any} data={data} className="w-full max-h-[220px]" />
            </div>
          </div>
        </div>
        <div className="w-full">
          <span className="text-xl md:text-4xl">Saldo em outras criptomoedas</span>
          <div className="grid grid-cols-1 gap-4 pt-4">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Criptomoeda</th>
                  <th>Quantidade</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-2 border-solid border-primary rounded-md p-4 min-h-[10rem]">
                  <td className="flex justify-center items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/5751/5751029.png"
                      className="rounded-full w-8 h-8"
                    />{' '}
                  </td>
                  <td className="text-center text-xl font-bold text-secondary">Bitcoin</td>
                  <td className="text-center text-xl font-bold text-secondary">0</td>
                  <td className="text-center text-xl font-bold text-secondary">R$ 0.00</td>
                </tr>
                <tr className="border-2 border-solid border-primary rounded-md p-4 min-h-[10rem]">
                  <td className="flex justify-center items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/8035/8035452.png"
                      className="rounded-full w-8 h-8"
                    />{' '}
                  </td>
                  <td className="text-center text-xl font-bold text-secondary">Ethereum</td>
                  <td className="text-center text-xl font-bold text-secondary">0</td>
                  <td className="text-center text-xl font-bold text-secondary">R$ 0.00</td>
                </tr>
                <tr className="border-2 border-solid border-primary rounded-md p-4 min-h-[10rem]">
                  <td className="flex justify-center items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/7825/7825855.png"
                      className="rounded-full w-8 h-8"
                    />{' '}
                  </td>
                  <td className="text-center text-xl font-bold text-secondary">Litecoin</td>
                  <td className="text-center text-xl font-bold text-secondary">0</td>
                  <td className="text-center text-xl font-bold text-secondary">R$ 0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Extract;
