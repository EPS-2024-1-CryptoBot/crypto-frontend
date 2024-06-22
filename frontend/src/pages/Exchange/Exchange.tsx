import { useState } from 'react';
import CoinHistory from './CoinHistory';
import CoinSummary from './CoinSummary';

const Exchange = () => {
  const [coinName, setCoinName] = useState<string>('');
  const [, setIsLoadingChart] = useState<boolean>(false);

  return (
    <div className="w-full h-full text-center m-5">
      <div className="mt-4 w-full">
        <input
          type="text"
          placeholder="Digite o nome da moeda"
          className="border rounded p-1 mr-2 mb-2 border-black"
          value={coinName}
          onChange={(e) => setCoinName(e.target.value)}
        />
        <CoinHistory coinName={coinName} setIsLoadingChart={setIsLoadingChart} />
      </div>
      <CoinSummary />
    </div>
  );
};

export default Exchange;
