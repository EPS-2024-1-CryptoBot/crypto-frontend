import { useContext, useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
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
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-lg text-secondary font-bold">
              Ops... Parece que você ainda não possui chaves cadastradas!
            </p>
            <button
              className="mt-6 px-4 py-2 bg-secondary text-white rounded flex items-center justify-center mx-auto"
              onClick={() => window.location.href = "/profile"}
            >
              Ir para o perfil <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default Consultor;
