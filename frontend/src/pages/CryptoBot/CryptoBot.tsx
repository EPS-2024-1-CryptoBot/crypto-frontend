import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import Logging from './components/Logging/Logging';
import Strategies from './components/Strategies/Strategies';
import Trade from './components/Trade/Trade';
import Watchlist from './components/Watchlist/Watchlist';
// import { addApiKeyBinanceToUser, decryptApiKeyBinance } from './routes';
import { Link } from 'react-router-dom';

const CryptoBot = () => {
  const { user, setCurrentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [apiTokenBinance, setApiTokenBinance] = useState('');
  const [binanceApiSecret, setBinanceApiSecret] = useState('');

  useEffect(() => {
    console.log('user no useEffect', user);
    if (user && user.api_token_binance && user.binance_api_secret) {
      setApiTokenBinance(user.api_token_binance);
      setBinanceApiSecret(user.binance_api_secret);
    } 
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {(apiTokenBinance && binanceApiSecret) ?
      <div className="w-full h-screen bg-gray-900 text-white">
        <div className="w-full h-[90vh] flex flex-wrap border-2 border-gray-600">
          <div className="w-[40%] h-[50%] border-2 border-gray-600">
            <Trade />
          </div>
          <div className="w-[60%] h-[100%] overflow-auto border-2 border-gray-600">
            <Strategies />
          </div>
          <div className="w-[40%] h-[50%] overflow-auto border-2 border-gray-600">
            <Logging />
          </div>
          <div className="w-[60%] h-[50%] overflow-auto border-2 border-gray-600">
            <Watchlist />
          </div>
        </div>
      </div>
      :
      <div>
        <div className="flex justify-center items-center h-screen">
          <div>
           <Link to="/profile">Adicione uma chave de API para continuar</Link>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default CryptoBot;
