import { api } from '../../config/api';

const Exchange = () => {
  const handleMine = async () => {
    const response = await api.post('/wallet/mine');

    console.log('Mine:', response.data);
  };

  const handleBalance = async () => {
    const response = await api.get('/wallet/balance');

    console.log('Balance:', response.data);
  };

  const handleTransactions = async () => {
    const response = await api.get('/wallet/transactions');

    console.log('Transactions:', response.data);
  }

  return (
    <div className="w-full h-full text-center m-5">
      <button className="bg-primary text-white rounded p-4" onClick={handleMine}>
        Mine
      </button>
      <button className="bg-secondary text-white rounded p-4 ml-5" onClick={handleBalance}>
        Get Balance
      </button>
      <button className="bg-tertiary text-white rounded p-4 ml-5" onClick={handleTransactions}>
        Transactions
      </button>
    </div>
  );
};

export default Exchange;
