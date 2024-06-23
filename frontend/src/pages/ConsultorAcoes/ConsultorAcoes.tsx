import { useEffect, useState } from 'react';
import { api } from '../../config/api';
import DetalhesAcao from './DetalhesAcao';

const ConsultorAcoes = () => {
  const [tickers, setTickers] = useState([]);
  const [loadingTickers, setLoadingTickers] = useState(false);
  const getTickers = async () => {
    setLoadingTickers(true);
    try {
      const response = await api.get('/consultant/tickers');
      setTickers(response.data);
    } catch (error: any) {
      console.log(error?.response?.data);
    } finally {
      setLoadingTickers(false);
    }
  };

  useEffect(() => {
    getTickers();
  }, []);

  return (
    <div className="w-full h-full flex">
      <div className="max-w-[40%]">
        {loadingTickers ? (
          <p>Carregando...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Nome da Compania</th>
              </tr>
            </thead>
            <tbody>
              {tickers?.length > 0 ? (
                tickers.map((ticker: any, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-200">{ticker?.ticker}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{ticker?.companyName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2}>Nenhum dado encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <DetalhesAcao />
    </div>
  );
};

export default ConsultorAcoes;
