import { useEffect, useState } from 'react';
import { api } from '../../../config/api';

const Contratos = () => {
  const [contracts, setContracts] = useState<{ [key: string]: any }>({});
  const [loadingContracts, setLoadingContracts] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [symbolInfo, setSymbolInfo] = useState<any>();
  const [symbolInfoLoading, setSymbolInfoLoading] = useState(false);
  const getContracts = async () => {
    setLoadingContracts(true);
    try {
      const res = await api.get('/consultant/contract_list');

      setContracts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingContracts(false);
    }
  };

  const handleSymbolChange = (e: any) => {
    setSymbol(e.target.value);
  };

  useEffect(() => {
    getContracts();
  }, []);

  const getSymbolInfo = async () => {
    if (!symbol || symbol === '' || symbolInfoLoading) {
      return;
    }
    setSymbolInfoLoading(true);
    try {
      const res = await api.get(`/consultant/symbol_price?symbol=${symbol}`);
      console.log(res.data);
      setSymbolInfo(res.data);
    } catch (error) {
      console.log(error);
    }
    setSymbolInfoLoading(false);
  };

  return (
    <div className="text-center w-full h-full text-white">
      <div className="h-[60%] bg-gray-800 overflow-y-scroll scroll-m-0">
        {loadingContracts ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">
                  Símbolo
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">
                  Plataforma
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">
                  Lote
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">
                  Decimais
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(contracts).map((key, index) => {
                return (
                  <tr key={index}>
                    <td className="p-2 border-b border-gray-200 dark:border-gray-700 text-sm">
                      {contracts[key].symbol}
                    </td>
                    <td className="p-2 border-b border-gray-200 dark:border-gray-700">
                      {contracts[key].exchange}
                    </td>
                    <td className="p-2 border-b border-gray-200 dark:border-gray-700">
                      {contracts[key].lot_size}
                    </td>
                    <td className="p-2 border-b border-gray-200 dark:border-gray-700">
                      {contracts[key].price_decimals}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="h-[37%]">
        <div className="flex w-full items-center">
          <ControlledInput
            onChange={handleSymbolChange}
            value={symbol}
            name="symbol"
            label="BID e ASK"
            inputType="text"
            placeholder="Digite o símbolo"
          />

          <button className="p-2 bg-blue-500 text-white rounded" onClick={getSymbolInfo}>
            Pesquisar
          </button>
        </div>
        {symbolInfoLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col items-start">
            <span className="text-white">Bid: {symbolInfo?.bid}</span>
            <span className="text-white">Ask: {symbolInfo?.ask}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const ControlledInput = ({ value, name, label, inputType, placeholder, onChange }: any) => {
  return (
    <div className="flex flex-col w-full items-start gap-1">
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      <input
        type={inputType}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="h-[3rem] border border-gray-300 rounded text-black"
      />
    </div>
  );
};

export default Contratos;
