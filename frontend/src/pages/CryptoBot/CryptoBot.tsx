import React, { useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { useContext } from 'react';
import { addApiKeyBinanceToUser, decryptApiKeyBinance } from './routes';

const CryptoBot = () => {
  const { user, setCurrentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [apiKeyResponse, setApiKeyResponse] = useState('');

  useEffect(() => {
    console.log('user no useEffect', user);
    if (user && user.api_token_binance) {
      setApiKey(user.api_token_binance);
      setApiKeyResponse(user.api_token_binance);
    } else {
      setApiKey('');
      setApiKeyResponse('');
    }
    setLoading(false);
  }, [user]);

  const salvarChave = async () => {
    try {
      setLoading(true);
      console.log('user no salvarChave', user);
      const res = await addApiKeyBinanceToUser(user, apiKey);
      console.log(res);
      if (res.api_token_binance !== null) {
        setCurrentUser(res);
      }
      setLoading(false);
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const pegarChave = async () => {
    try {
      console.log('user no pegarChave', user);
      const res = await decryptApiKeyBinance(user);
      console.log(res);
      if (res) {
        setApiKeyResponse(res);
        alert('Chave recuperada com sucesso!');
      }
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
          {user && (
            <>
              {apiKeyResponse ? (
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                  <h1 className="text-2xl font-bold mb-4 text-center">CryptoBot</h1>
                  <div className="mb-4">
                    <label htmlFor="apiKey" className="block text-gray-700 text-sm font-bold mb-2">
                      API Key Criptografada
                    </label>
                    <input
                      id="apiKey"
                      type="text"
                      value={apiKeyResponse}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      disabled
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={pegarChave}
                      className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-700">
                      Recuperar Chave
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                  <h1 className="text-2xl font-bold mb-4 text-center">CryptoBot</h1>
                  <div className="mb-4">
                    <label htmlFor="apiKey" className="block text-gray-700 text-sm font-bold mb-2">
                      API Key
                    </label>
                    <input
                      id="apiKey"
                      type="text"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Insira sua API Key"
                    />
                  </div>
                  <button
                    onClick={salvarChave}
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700 mb-4">
                    Gerar Chave
                  </button>
                  <button
                    onClick={pegarChave}
                    className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-700">
                    Pegar Chave
                  </button>
                  <div className="mt-4">
                    {apiKeyResponse && (
                      <div className="bg-gray-200 p-4 rounded">
                        <p className="text-gray-700">{apiKeyResponse}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CryptoBot;
