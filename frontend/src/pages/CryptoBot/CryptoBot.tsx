import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import Logging from './components/Logging/Logging';
import Strategies from "./components/Strategies/Strategies";
import Trade from './components/Trade/Trade';
import Watchlist from './components/Watchlist/Watchlist';
import { addApiKeyBinanceToUser, decryptApiKeyBinance } from './routes';

const CryptoBot = () => {
  const { user } = useContext(AuthContext);

  const salvarChave = async () => {
    try {
      const res = await addApiKeyBinanceToUser(user);
      console.log(res);
      if (res.api_token_binance !== null) {
        alert('Chave criada com sucesso!');
      }
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  const pegarChave = async () => {
    try {
      console.log("user", user);
      const res = await decryptApiKeyBinance(user);
      console.log(res);
      // if(res.api_token_binance !== null) {
      //   alert('Chave criada com sucesso!');
      // }
      
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <div>
      {/* <button 
        onClick={salvarChave} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4"
      >
        GERAR CHAVE
      </button>
      <button 
        onClick={pegarChave} 
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        PEGAR CHAVE
      </button> */}
      <div className="w-full h-[90vh] bg-gray-900 text-white flex flex-wrap p-4 mt-4 mx-auto">
        <div className="w-[40%] h-[50%] flex items-center justify-center p-4">
          <Trade />
        </div>
        <div className="w-[60%] h-[50%] flex items-center justify-center p-4">
          <Strategies />
        </div>
        <div className="w-[40%] h-[50%] bg-green-500 flex items-center justify-center p-4">
          <Logging />
        </div>
        <div className="w-[60%] h-[50%] flex items-center justify-center p-4">
          <Watchlist />
        </div>
      </div>

    </div>
  );
};

export default CryptoBot;
