import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import Trade from './components/Trade/Trade';

const Consultor = () => {
  const { user, setCurrentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [apiTokenBinance, setApiTokenBinance] = useState('');
  const [binanceApiSecret, setBinanceApiSecret] = useState('');

  useEffect(() => {
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
    <div className="h-screen">
      {(apiTokenBinance && binanceApiSecret) ?
        <div className="w-full h-full bg-gray-900 text-white">
          <div className="w-full h-full flex flex-wrap border-2 border-gray-600">
            <div className="w-[30%] h-full border-2 border-gray-600">
              <Trade />
            </div>
            <div className="w-[70%] h-full border-2 border-gray-600">
              <PlaceOrder />
            </div>
          </div>
        </div>
        :
        <div className="flex justify-center items-center h-screen">
          <div>
            <Link to="/profile">Adicione uma chave de API para continuar</Link>
          </div>
        </div>
      }
    </div>
  );
};

export default Consultor;
