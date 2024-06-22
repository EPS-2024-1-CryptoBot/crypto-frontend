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
import { api } from '../../config/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface CoinHistory {
  timestamp: number;
  value: number;
}

interface CoinHistoryProps {
  coinName: string;
  setIsLoadingChart: (loading: boolean) => void;
}

const CoinHistory = ({ coinName, setIsLoadingChart }: CoinHistoryProps) => {
  const [coinHistory, setCoinHistory] = useState<CoinHistory[]>([]);

  const handleGetChart = async () => {
    try {
      setIsLoadingChart(true);
      const response = await api.get(`/consultant/coin_history`, {
        params: { coin: coinName }
      });
      setCoinHistory(
        response.data.prices.map((price: [number, number]) => ({
          timestamp: price[0],
          value: price[1]
        }))
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching coin history:', error);
    } finally {
      setIsLoadingChart(false);
    }
  };

  const timeStampToDateWithinLastThirtyDaysByCoinHistory = () => {
    const today = new Date();
    const lastThirtyDays = new Date(today);
    lastThirtyDays.setDate(today.getDate() - 30);
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(lastThirtyDays);
      date.setDate(lastThirtyDays.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const chartData = {
    labels: timeStampToDateWithinLastThirtyDaysByCoinHistory(),
    datasets: [
      {
        label: 'Value',
        data: coinHistory.map((history) => history.value),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Coin History'
      }
    },
    scales: {
      x: {
        type: 'category',
        labels: chartData.labels
      },
      y: {
        type: 'linear'
      }
    }
  };

  return (
    <div className="">
      <button
        className="bg-secondary text-white rounded p-4"
        onClick={handleGetChart}
        disabled={!coinName || !coinName.length}>
        Buscar Histórico da Moeda
      </button>
      <div className='w-full'>
      {coinHistory.length > 0 && (
        <div>
          <h2>Histórico da Moeda</h2>
          <div className="w-full md:w-3/4 pt-[1rem] ml-auto mr-auto">
            <div className="border-2 border-solid border-primary rounded-md p-4 min-h-[16rem] flex justify-center items-center">
              <Line
                options={chartOptions as any}
                data={chartData}
                className="w-full max-h-[220px]"
              />
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default CoinHistory;
