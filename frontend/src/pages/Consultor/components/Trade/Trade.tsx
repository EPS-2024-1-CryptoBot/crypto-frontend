import { useEffect, useRef, useState } from "react";
import { api } from "../../../../config/api";

const Trade = () => {
  const [contracts, setContracts] = useState<{ [key: string]: any }>({});
  const [filteredContracts, setFilteredContracts] = useState<{ [key: string]: any }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSymbols, setSelectedSymbols] = useState<{ [key: string]: any }>({});
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

  const handleSymbolClick = (symbol: string) => {
    setSelectedSymbols(prevState => ({
      ...prevState,
      [symbol]: contracts[symbol]
    }));
    setSearchTerm("");
    setFilteredContracts(contracts);
  };

  return (
    <div className="text-center w-full h-full mt-4 bg-gray-900 overflow-hidden">
      <div className="mb-4 relative inline-block">
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
              </tr>
            </thead>
            <tbody className="overflow-y-auto max-h-full">
              {Object.keys(selectedSymbols).map((key, index) => (
                <tr key={index}>
                  <td className="p-2 border-b border-gray-200 dark:border-gray-700 text-sm">
                    {selectedSymbols[key].symbol}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Trade;
