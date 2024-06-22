import { useState, useEffect } from 'react';
import { api } from '../../config/api';

interface CoinSummary {
  brl: number;
  brl_market_cap: number;
  brl_24h_vol: number;
  brl_24h_change: number;
  last_updated_at: number;
}

const CoinSummary = () => {
  const [coinSummary, setCoinSummary] = useState<Record<string, CoinSummary>>({});
  const [isLoadingCoins, setIsLoadingCoins] = useState<boolean>(false);

  const handleGetCoins = async () => {
    try {
      setIsLoadingCoins(true);
      const response = await api.get('/consultant/coin_list_with_summary');
      setCoinSummary(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching coins:', error);
    } finally {
      setIsLoadingCoins(false);
    }
  };

  useEffect(() => {
    handleGetCoins();
  }, []);

  return (
    <div className="mt-4 w-full">
      {Object.keys(coinSummary).length > 0 && (
        <div>
          <h2>Moedas Disponíveis</h2>
          <div className="mt-4 max-h-[280px] overflow-auto px-52">
            <table className="table-auto w-full">
              <thead className="bg-gray-200 text-gray-700 sticky top-0">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Moeda</th>
                  <th className="border border-gray-300 px-4 py-2">Valor (R$)</th>
                  <th className="border border-gray-300 px-4 py-2">Market Cap (R$)</th>
                  <th className="border border-gray-300 px-4 py-2">Transações (24h/R$)</th>
                  <th className="border border-gray-300 px-4 py-2">Variação (24h/R$)</th>
                  <th className="border border-gray-300 px-4 py-2">Atualizado em</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {Object.keys(coinSummary).map((key) => (
                  <tr key={key} className="bg-white border-b border-gray-200">
                    <td className="border border-gray-300 px-4 py-2">{key}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {coinSummary[key].brl.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {coinSummary[key].brl_market_cap.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {coinSummary[key].brl_24h_vol.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {coinSummary[key].brl_24h_change.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(coinSummary[key].last_updated_at * 1000).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinSummary;
