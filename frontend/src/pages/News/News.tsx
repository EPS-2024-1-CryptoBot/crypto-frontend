import { useEffect, useState } from 'react';
import arq from "./arq.json"

const News = () => {
    const [news, setNews] = useState([]);


    // const formatDate = (date: Date) => {
    //     console.log(date);
    //     const year = date.getFullYear();
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
    //     const day = date.getDate().toString().padStart(2, '0');
    //     return `${year}-${day}-${month}`;
    //     return "2024-05-05";
    // }
    useEffect(() => {
        const fetchNews = async () => {
            try {

                // const currentDate = formatDate(new Date());  
                // const url = `https://newsapi.org/v2/everything?q=crypto&from=${currentDate}&sortBy=publishedAt&apiKey=2121a18c88f8481693eed0703d3b4121`;
                // const response = await fetch(url);
                // const data = await response.json();
                const data = arq as any;
                // console.log(data);
                setNews(data.articles.filter((article: any) => article.urlToImage));

            } catch (error) {
                console.error('Erro ao buscar notícias:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="w-full h-full bg-gray-100 overflow-auto">
            <div>
                <div className=" p-4 max-h-full">
                    <h1 className="text-3xl font-bold text-center mb-4">Crypto News</h1>
                    <ul className="space-y-4">
                        {news.map((article: any, index: number) => (
                            <div className="flex justify-center  mx-auto min-w-min">
                                <li key={index} className="flex flex-col md:flex-row items-center bg-white p-4 shadow-lg w-full md:w-4/5 lg:w-3/4 xl:w-2/3">
                                    {/* Imagem */}
                                    <div className="w-full md:w-1/2">
                                        <img src={article.urlToImage} alt={article.title} className="w-full object-cover rounded-md h-48" />
                                    </div>
                                    {/* Card de texto */}
                                    <div className="w-full md:w-1/2 md:pl-4 mt-4 md:mt-0">
                                        <h2 className="text-sm font-bold mb-2">{article.title }</h2>
                                        <p className="text-xs text-gray-500 mb-4">{article.description ? article.description.slice(0, 150) : ''}...</p>
                                        <p className="text-xs text-gray-500 mb-4 font-bold">Author: {article.author || 'Unknown'}</p>
                                        <a href={article.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Read more</a>
                                    </div>

                                </li>
                            </div>

                        ))}
                    </ul>
                </div>
            </div>
            <div>
                {/* <footer className="w-full bg-primary text-white text-center py-4">
                <p>Desenvolvido por CryptoBot UnB</p>
            </footer> */}

            </div>
        </div>
    );
}

export default News;
