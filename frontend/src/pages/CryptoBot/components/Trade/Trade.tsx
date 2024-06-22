
const rows = [
  { symbol: 'BTC/USD', bid: '45000', ask: '45100' },
  { symbol: 'ETH/USD', bid: '1.05', ask: '1.06' },
  { symbol: 'LTC/USD', bid: '160', ask: '161' },
  { symbol: 'ADA/USD', bid: '1.45', ask: '1.46' },
  { symbol: 'DOT/USD',bid: '25', ask: '25.1' }
];

const Trade = () => {
  return (
    <div className="text-center w-full h-full mt-4">
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
      </div>
      <div className="overflow-auto h-full">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Cripto</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Compra (U$)</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Venda (U$)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{row.symbol}</td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{row.bid}</td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{row.ask}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trade;
