import { Fragment, useState } from 'react';
import { api } from '../../config/api';
import { formatBrlValue } from '../../utils/utils';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registro dos componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DetalhesAcao = () => {
  const [searchTicker, setSearchTicker] = useState('');
  const [companyData, setCompanyData] = useState<any | null>();
  const [loadingTickers, setLoadingTickers] = useState(false);

  const handleSearch = async () => {
    if (!searchTicker || loadingTickers) return;
    try {
      const result = await api.get(
        `/consultant/stock_compass/stocks/stock-summary/${searchTicker}`
      );
      setCompanyData(result.data);
    } catch (error: any) {
      console.log(error?.response?.data);
      setCompanyData(null);
    } finally {
      setLoadingTickers(false);
    }
  };

  const chartData = {
    labels: companyData ? companyData.allPrices.map((item:any) => item?.priceDate) : [],
    datasets: [
      {
        label: 'Preço',
        data: companyData ? companyData.allPrices.map((item:any) => item?.value) : [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="container max-w-[60%] p-4">
      <h1 className="text-2xl font-bold mb-4">Busca por Ticker</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Digite o ticker"
          value={searchTicker}
          onChange={(e) => setSearchTicker(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded">
          Buscar
        </button>
      </div>
      <div className="w-full flex flex-col gap-2">
        {!loadingTickers && companyData && (
          <Fragment>
            <div className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">{companyData?.companyName}</h2>
              <p>
                <strong>Ticker:</strong> {companyData?.ticker}
              </p>
              <p>
                <strong>Preço Atual:</strong> R$ {companyData?.currentPrice}
              </p>
              <p>
                <strong>CompanyId:</strong> {companyData?.companyId}
              </p>
              <p>
                <strong>Free Float:</strong> {companyData?.freeFloat}%
              </p>
              <p>
                <strong>Tag Along:</strong> {companyData?.tagAlong}%
              </p>
              <p>
                <strong>Liquidez Diária Média:</strong> R${' '}
                {formatBrlValue(companyData?.avgDailyLiquidity)}
              </p>
              <p>
                <strong>Categoria:</strong> {companyData?.categorie}
              </p>
              <p>
                <strong>Variação 1 Dia:</strong> {companyData?.variationOneDay}%
              </p>
              <p>
                <strong>Variação 1 Mês:</strong> {companyData?.variationOneMonth}%
              </p>
              <p>
                <strong>Variação 12 Meses:</strong> {companyData?.variationTwelveMonths}%
              </p>
            </div>
            <div className="bg-white shadow rounded p-4">
              <div className="mt-4">
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default DetalhesAcao;
