import { useEffect, useRef, useState } from "react";
import { FaCrown } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { api } from "../../../../config/api";

const Trade = () => {
  const [contracts, setContracts] = useState<{ [key: string]: any }>({});
  const [filteredContracts, setFilteredContracts] = useState<{ [key: string]: any }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSymbols, setSelectedSymbols] = useState<{ [key: string]: any }>({});
  const [showLimitModal, setShowLimitModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getContracts = async () => {
    try {
      const res = await api.get('/consultant/contract_list');
      const contractData: { [key: string]: any } = res.data;
      setContracts(contractData);
      setFilteredContracts(contractData);
    } catch (error) {
      console.log(error);
    }
  };

  const getSymbolInfo = async (symbol: string) => {
    try {
      const res = await api.get(`/consultant/symbol_price?symbol=${symbol}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    getContracts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = Object.keys(contracts).filter(key => 
      contracts[key].symbol.toLowerCase().includes(value.toLowerCase())
    );
    const newFilteredContracts: { [key: string]: any } = filtered.reduce((obj, key) => {
      obj[key] = contracts[key];
      return obj;
    }, {} as { [key: string]: any });
    setFilteredContracts(newFilteredContracts);
  };

  const handleSymbolClick = async (symbol: string) => {
    if (Object.keys(selectedSymbols).length >= 5) {
      setShowLimitModal(true);
      return;
    }
    const symbolInfo = await getSymbolInfo(symbol);
    setSelectedSymbols(prevState => ({
      ...prevState,
      [symbol]: {
        ...contracts[symbol],
        bid: symbolInfo?.bid,
        ask: symbolInfo?.ask,
      }
    }));
    setSearchTerm("");
    setFilteredContracts(contracts); // Reset filtered contracts after selection
  };

  const handleDeleteSymbol = (symbol: string) => {
    setSelectedSymbols(prevState => {
      const newState = { ...prevState };
      delete newState[symbol];
      return newState;
    });
  };

  return (
    <div className="text-center w-full h-full mt-4 bg-gray-900 overflow-hidden">
      <div className="my-5 relative inline-block">
        <input
          type="text"
          placeholder="Binance"
          className="mr-2 p-2 border border-gray-300 rounded text-black"
          value={searchTerm}
          onChange={handleSearchChange}
          ref={inputRef}
        />
        {searchTerm && (
          <div
            className="absolute left-0 bg-white border border-gray-300 mt-1 rounded max-h-60 overflow-y-auto z-10 text-black"
            style={{ width: inputRef.current ? inputRef.current.offsetWidth : 'auto' }}
          >
            {Object.keys(filteredContracts).map((key, index) => (
              <button
                key={index}
                className="w-full text-left p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSymbolClick(filteredContracts[key].symbol)}
              >
                {filteredContracts[key].symbol}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="overflow-auto h-full">
        <div className="min-w-full bg-gray-800 shadow-md h-full">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-900">
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">
                  Símbolo
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">
                  Compra (U$)
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">
                  Venda (U$)
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900"></th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto max-h-full">
              {Object.keys(selectedSymbols).map((key, index) => (
                <tr key={index}>
                  <td className="p-2 border-b border-gray-200 dark:border-gray-700 text-sm">
                    {selectedSymbols[key].symbol}
                  </td>
                  <td className="p-2 border-b border-gray-200 dark:border-gray-700 text-sm">
                    {selectedSymbols[key].bid}
                  </td>
                  <td className="p-2 border-b border-gray-200 dark:border-gray-700 text-sm">
                    {selectedSymbols[key].ask}
                  </td>
                  <td className="p-2 border-b border-gray-200 dark:border-gray-700 text-sm">
                    <button
                      className="p-2 bg-secondary border rounded"
                      onClick={() => handleDeleteSymbol(selectedSymbols[key].symbol)}
                    >
                      <MdClose />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showLimitModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg text-secondary font-bold flex justify-center items-center">
              Atualize para o <span className="text-yellow-500 ml-1">Premium</span> <FaCrown className="text-yellow-500 ml-1" />
            </p>
            <p className="text-sm text-secondary mt-2">Atualize para um plano premium para visualizar mais de 5 criptos.</p>
            <button
              className="mt-6 px-4 py-2 bg-secondary text-white rounded"
              onClick={() => setShowLimitModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trade;
