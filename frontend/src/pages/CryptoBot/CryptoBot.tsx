import { AuthContext } from '../../contexts/authContext';
import { useContext } from 'react';
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
      <h1>CryptoBot</h1>
      <button onClick={salvarChave}>GERAR CHAVE</button>
      <div></div>
      <button onClick={pegarChave}>PEGAR CHAVE</button>
    </div>
  );
};

export default CryptoBot;
