import { useState } from 'react';
import { api } from '../../config/api';

const Exchange = () => {
  const [coinName, setCoinName] = useState('');
  const handleGetCoins = async () => {
    const response = await api.get('/consultant/coin_list_with_summary');

    console.log('Coins:', response.data);
  };

  const handleGetChart = async () => {
    const response = await api.get(`/consultant/coin_history`, {
      params: {
        coin: coinName
      }
    });

    console.log('Coin History:', response.data);
  };

  return (
    <div className="w-full h-full text-center m-5">
      <button className="bg-primary text-white rounded p-4" onClick={handleGetCoins}>
        Available Coins and its values
      </button>

      <div className="mt-4 w-full">
        <input
          type="text"
          placeholder="Enter the coin name"
          className="border rounded p-1 mr-2 border-black"
          value={coinName}
          onChange={(e) => setCoinName(e.target.value)}
        />
        <button className="bg-secondary text-white rounded p-4" onClick={handleGetChart}>
          Get Coin History
        </button>
      </div>
    </div>
  );
};

export default Exchange;
