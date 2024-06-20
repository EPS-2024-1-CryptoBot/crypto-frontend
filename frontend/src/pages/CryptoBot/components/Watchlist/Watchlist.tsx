const Watchlist = () => {
  return (
    <div className="text-center w-full h-full">
      <div className="overflow-auto h-full">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Time</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Symbol</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Exchange</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Strategy</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Side</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Quantity</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Status</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">PNL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">12:00</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">BTC/USD</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Binance</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Scalping</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Buy</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">1.5</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Open</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">+10%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Watchlist;
