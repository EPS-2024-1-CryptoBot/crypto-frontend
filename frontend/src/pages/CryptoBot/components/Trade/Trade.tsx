import { api } from "../../../../config/api";

const rows = [
  { symbol: 'BTC/USD', exchange: 'Binance', bid: '45000', ask: '45100' },
  { symbol: 'ETH/USD', exchange: 'Bitmex', bid: '2800', ask: '2810' },
  { symbol: 'XRP/USD', exchange: 'Bitmex', bid: '1.05', ask: '1.06' },
  { symbol: 'LTC/USD', exchange: 'Binance', bid: '160', ask: '161' },
  { symbol: 'ADA/USD', exchange: 'Binance', bid: '1.45', ask: '1.46' },
  { symbol: 'DOT/USD', exchange: 'Bitmex', bid: '25', ask: '25.1' },
  { symbol: 'ETH/USD', exchange: 'Bitmex', bid: '2800', ask: '2810' },
  { symbol: 'XRP/USD', exchange: 'Bitmex', bid: '1.05', ask: '1.06' },
  { symbol: 'LTC/USD', exchange: 'Binance', bid: '160', ask: '161' },
  { symbol: 'ADA/USD', exchange: 'Binance', bid: '1.45', ask: '1.46' },
  { symbol: 'DOT/USD', exchange: 'Bitmex', bid: '25', ask: '25.1' },
  { symbol: 'ETH/USD', exchange: 'Bitmex', bid: '2800', ask: '2810' },
  { symbol: 'XRP/USD', exchange: 'Bitmex', bid: '1.05', ask: '1.06' },
  { symbol: 'LTC/USD', exchange: 'Binance', bid: '160', ask: '161' },
  { symbol: 'ADA/USD', exchange: 'Binance', bid: '1.45', ask: '1.46' },
  { symbol: 'DOT/USD', exchange: 'Bitmex', bid: '25', ask: '25.1' },
  { symbol: 'ETH/USD', exchange: 'Bitmex', bid: '2800', ask: '2810' },
  { symbol: 'XRP/USD', exchange: 'Bitmex', bid: '1.05', ask: '1.06' },
  { symbol: 'LTC/USD', exchange: 'Binance', bid: '160', ask: '161' },
  { symbol: 'ADA/USD', exchange: 'Binance', bid: '1.45', ask: '1.46' },
  { symbol: 'DOT/USD', exchange: 'Bitmex', bid: '25', ask: '25.1' },
  { symbol: 'ETH/USD', exchange: 'Bitmex', bid: '2800', ask: '2810' },
  { symbol: 'XRP/USD', exchange: 'Bitmex', bid: '1.05', ask: '1.06' },
  { symbol: 'LTC/USD', exchange: 'Binance', bid: '160', ask: '161' },
  { symbol: 'ADA/USD', exchange: 'Binance', bid: '1.45', ask: '1.46' },
  { symbol: 'DOT/USD', exchange: 'Bitmex', bid: '25', ask: '25.1' },
  { symbol: 'ETH/USD', exchange: 'Bitmex', bid: '2800', ask: '2810' },
  { symbol: 'XRP/USD', exchange: 'Bitmex', bid: '1.05', ask: '1.06' },
  { symbol: 'LTC/USD', exchange: 'Binance', bid: '160', ask: '161' },
  { symbol: 'ADA/USD', exchange: 'Binance', bid: '1.45', ask: '1.46' },
  { symbol: 'DOT/USD', exchange: 'Bitmex', bid: '25', ask: '25.1' },
  { symbol: 'ETH/USD', exchange: 'Bitmex', bid: '2800', ask: '2810' },
  { symbol: 'XRP/USD', exchange: 'Bitmex', bid: '1.05', ask: '1.06' },
  { symbol: 'LTC/USD', exchange: 'Binance', bid: '160', ask: '161' },
  { symbol: 'ADA/USD', exchange: 'Binance', bid: '1.45', ask: '1.46' },
  { symbol: 'DOT/USD', exchange: 'Bitmex', bid: '25', ask: '25.1' },
  { symbol: 'ETH/USD', exchange: 'Bitmex', bid: '2800', ask: '2810' },
  { symbol: 'XRP/USD', exchange: 'Bitmex', bid: '1.05', ask: '1.06' },
  { symbol: 'LTC/USD', exchange: 'Binance', bid: '160', ask: '161' },
  { symbol: 'ADA/USD', exchange: 'Binance', bid: '1.45', ask: '1.46' },
  { symbol: 'DOT/USD', exchange: 'Bitmex', bid: '25', ask: '25.1' },
  { symbol: 'ETH/USD', exchange: 'Bitmex', bid: '2800', ask: '2810' },
  { symbol: 'XRP/USD', exchange: 'Bitmex', bid: '1.05', ask: '1.06' },
  { symbol: 'LTC/USD', exchange: 'Binance', bid: '160', ask: '161' },
  { symbol: 'ADA/USD', exchange: 'Binance', bid: '1.45', ask: '1.46' },
  { symbol: 'DOT/USD', exchange: 'Bitmex', bid: '25', ask: '25.1' }
];

const Trade = () => {
  const getContracts = async () => {
    let contracts = [];
    try {
      const res = await api.get('/consultant/contract_list');
      console.log(res.data);
      contracts = res.data;
    } catch (error) {
      console.log(error);
    }

    return contracts;
  };

  
  return (
    <div className="text-center w-full h-full mt-4 bg-gray-900">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Binance"
          className="mr-2 p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="text"
          placeholder="Bitmex"
          className="p-2 border border-gray-300 rounded text-black"
        />
        <button className="p-2 bg-blue-500 text-white rounded" onClick={getContracts}>Search</button>
      </div>
      <div className="overflow-auto h-full">
        <div className="min-w-full bg-gray-800 shadow-md">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">
                  Symbol
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">
                  Exchange
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">
                  Bid (U$)
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">
                  Ask (U$)
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                    {row.symbol}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                    {row.exchange}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                    {row.bid}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                    {row.ask}
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
