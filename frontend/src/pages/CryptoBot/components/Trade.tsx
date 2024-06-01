const Trade = () => {
  return (
    <div className="text-center w-full h-full mt-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Binance"
          className="mr-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Bitmex"
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="overflow-auto h-full">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Symbol</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Exchange</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Bid</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Ask</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">BTC/USD</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Binance</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">45000</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">45100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trade;
