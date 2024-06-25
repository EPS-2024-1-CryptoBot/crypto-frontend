import React, { useState, useEffect } from 'react';
import logoBot from '../../assets/logobot.png';
import { api } from './api';

const Home = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayedResponse, setDisplayedResponse] = useState('');
  const scrollRef = React.createRef<HTMLDivElement>();
  const prompt =
    'Você é um chatbot muito inteligente da área de criptomoedas! Você irá me ajudar a responder coisas apenas sobre criptomoedas e mercado financeiro. Qualquer outro assunto será respondido com um "Desculpe, eu sou um chatbot e só posso responder perguntas sobre criptomoedas e mercado financeiro."';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedResponse]);

  useEffect(() => {
    if (response) {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedResponse((prev) => prev + response[index - 1]);
        index++;
        if (index >= response.length) {
          clearInterval(interval);
        }
      }, 10); // 10ms
      return () => clearInterval(interval);
    }
  }, [response]);

  const handleInputChange = (e: any) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse('');
    setDisplayedResponse('');

    try {
      const res = await postWithRetry('pitch/completion', { question: question + '\n\n\n' + prompt });
      console.log(res);
      setResponse(res.completion);
    } catch (err) {
      setError('Erro ao obter a resposta do chatbot.');
    } finally {
      setLoading(false);
    }
  };

  const postWithRetry = async (url: string, data: any, retries = 3, timeout = 15000) => {
    const makeRequest = () => api.post(url, data);

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const res: any = await Promise.race([
          makeRequest(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), timeout)
          )
        ]);
        return res.data;
      } catch (error: any) {
        if (error.message === 'Request timed out') {
          console.warn(`Attempt ${attempt + 1} failed due to timeout, retrying...`);
        } else {
          throw error;
        }
      }
    }

    throw new Error('All attempts to complete the request failed');
  };

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row items-center justify-center p-4 bg-gray-100">
      <div className="flex items-center justify-center w-full lg:w-1/2 mb-4 lg:mb-0">
        <img
          src={logoBot}
          alt="funny bot"
          className="max-w-[300px] lg:max-w-[500px] max-h-[300px] lg:max-h-[500px] rounded-full"
        />
      </div>
      <div className="w-full lg:w-1/2 p-4 bg-white rounded shadow-md">
        <h1 className="text-2xl mb-4 text-center">Chatbot</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-4"
            placeholder="Digite sua pergunta..."
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
            disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
        {displayedResponse && (
          <div className="mt-4 p-2 bg-gray-100 rounded max-h-64 overflow-y-auto" ref={scrollRef}>
            <strong>Resposta:</strong>
            <p>{displayedResponse}</p>
          </div>
        )}
        {error && (
          <div className="mt-4 p-2 bg-red-100 rounded">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
