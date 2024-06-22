import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../config/api';

type Transaction = {
  sender: string;
  receiver: string;
  amount: number;
};

const Extract = () => {
  // ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  const [balance, setBalance] = useState(0);
  const [extrato, setExtrato] = useState([]);
  // const labels = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December'
  // ];
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top' as const
  //     },
  //     title: {
  //       display: true,
  //       text: 'Histórico de Saldo'
  //     }
  //   },
  //   scales: {
  //     x: {
  //       type: 'category',
  //       labels: labels
  //     },
  //     y: {
  //       type: 'linear'
  //     }
  //   }
  // };
  // const val = Math.random() * 1000;
  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Saldo',
  //       data: labels.map(() => val),
  //       borderColor: 'rgb(255, 99, 132)',
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)'
  //     }
  //   ]
  // };

  // const handleMine = async () => {
  //   const response = await api.post('/wallet/mine');

  //   console.log('Mine:', response.data);
  // };

  const handleBalance = async () => {
    try {
      const response = await api.get('/wallet/balance');
      setBalance(response.data.balance);
      console.log('Balance:', response.data);
    } catch (error: any) {
      console.log('Balance:', error?.response?.data);
    }
  };

  const handleTransactions = async () => {
    try {
      const response = await api.get('/wallet/transactions');
      if (response.data.length > 0) {
        setExtrato(response.data);
      }
      console.log('Transactions:', response.data);
    } catch (error: any) {
      console.log('Transactions:', error?.response?.data);
    }
  };

  useEffect(() => {
    handleBalance();
    handleTransactions();
  }, []);

  return (
    <div className="overflow-auto">
      <div className="h-full w-full flex flex-col items-center gap-10 p-4 md:p-10">
        <div className="flex flex-col md:flex-row justify-center w-full">
          <div className="w-full md:w-1/2 pt-[1rem] md:mr-5">
            <div className="border-2 border-solid border-primary rounded-md p-4 min-h-[16rem]">
              <span className="text-3xl">Saldo Atual (CBU) </span>
              <div className="pt-4 text-6xl font-bold text-primary lg:text-8xl">
                <span>R$&nbsp;</span>
                {balance.toFixed(2)}
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
              {/* <div className="flex-1">
                <button className="bg-primary text-white rounded-md p-2 w-full">Sacar</button>
              </div> */}
            </div>
          </div>
          <div className="w-full md:w-1/2 pt-[1rem] ml-auto mr-auto">
            <div className="border-2 border-solid border-primary rounded-md p-4 min-h-[16rem] flex justify-center items-center">
              {/* <Line options={options as any} data={data} className="w-full max-h-[220px]" /> */}
            </div>
          </div>
        </div>
        <div className="w-full">
          <span className="text-xl md:text-4xl">Histórico de transações na blockchain</span>
          <div className="grid grid-cols-1 gap-4 pt-4">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th>Enviado por</th>
                  <th>Recebido por</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {extrato.map((transaction: Transaction, index: number) => (
                  <tr
                    key={index}
                    className="border-2 border-solid border-primary rounded-md p-4 min-h-[10rem]">
                    <td className="text-center text-xl font-bold text-secondary">
                      {transaction.sender}
                    </td>
                    <td className="text-center text-xl font-bold text-secondary">
                      {transaction.receiver}
                    </td>
                    <td className="text-center text-xl font-bold text-secondary">
                      R$ {transaction.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Extract;
