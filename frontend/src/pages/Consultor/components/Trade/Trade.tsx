import { useEffect, useState } from "react";
import { api } from "../../../../config/api";

const Trade = () => {
  const [contracts, setContracts] = useState<{ [key: string]: any }>({});
  const [loadingContracts, setLoadingContracts] = useState(false);

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

  useEffect(() => {
    getContracts();
  }, []);

  return (
    <div className="text-center w-full h-full mt-4 bg-gray-900 overflow-hidden">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Binance"
          className="mr-2 p-2 border border-gray-300 rounded text-black"
        />
      </div>
      <div className="overflow-auto h-full">
        <div className="min-w-full bg-gray-800 shadow-md">
          {loadingContracts ? (
            <div>Loading...</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">
                    Símbolo
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trade;
