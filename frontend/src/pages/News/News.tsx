import { useEffect, useState } from 'react';
import { api } from './api';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // const fetchNews = async () => {
    //   try {
    //     const response = await api.get('news/top', {
    //       params: {
    //         search: 'crypto'
    //       }
    //     });
    //     console.log('response.data', response.data);
    //     setNews(response.data.data);
    //   } catch (error) {
    //     console.error('Erro ao buscar notícias:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchNews();
  }, []);

  if (loading) {
    return <div className="w-full h-full flex justify-center items-center">Carregando...</div>;
  }

  return (
    <div className="w-full h-full bg-gray-100 overflow-auto">
      <div>
        <div className=" p-4 max-h-full">
          <h1 className="text-3xl font-bold text-center mb-4">Crypto News</h1>
          <ul className="space-y-4">
            {news.map((article: any, index: number) => (
              <div className="flex justify-center  mx-auto min-w-min">
                <li
                  key={index}
                  className="flex flex-col md:flex-row items-center bg-white p-4 shadow-lg w-full md:w-4/5 lg:w-3/4 xl:w-2/3">
                  {/* Imagem */}
                  <div className="w-full md:w-1/2">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full object-cover rounded-md h-48"
                    />
                  </div>
                  {/* Card de texto */}
                  <div className="w-full md:w-1/2 md:pl-4 mt-4 md:mt-0">
                    <h2 className="text-sm font-bold mb-2">{article.title}</h2>
                    <p className="text-xs text-gray-500 mb-4">
                      {article.description ? article.description.slice(0, 150) : ''}...
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 text-sm">
                      Leia mais
                    </a>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default News;
