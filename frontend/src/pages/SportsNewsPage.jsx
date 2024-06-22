import { FadeLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import { FaBaseballBatBall , FaBasketball, FaFootball, FaHockeyPuck,
    FaArrowUpRightFromSquare,
 } from 'react-icons/fa6';

const SportsNewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/sports-news');
                const data = await response.json();
                setNews(data.articles);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sports news', error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className='text-white mt-4'>
            <h1 className=' font-extrabold text-3xl justify-center flex items-center my-8'>
                <FaBasketball className='mr-5 text-orange-400'/>
                <FaFootball className='mr-5 text-amber-800'/>
                <p>Latest Sports News</p>
                <FaHockeyPuck className='ml-5 text-blue-300'/>
                <FaBaseballBatBall className='ml-5 text-red-400'/>
            </h1>
            { loading ? (
                <div className='mt-20 flex justify-center items-center'> <FadeLoader color='#ffffff'/> </div>
            ) : (
                <ul className='mx-10'>
                    {news.map((article, index) => (
                        article.title !== '[Removed]' &&
                            <li key={index} className='bg-bgNavbar rounded-lg flex flex-col px-8 py-4 my-4'>
                                <h2 className='font-extrabold text-2xl text-red-400 italic'>{article.title}</h2>
                                <p className='pl-8 font-bold text-lg text-white mt-2 mb-4'> {article.description && <> - {article.description}</>}</p>
                                <a className='ml-8 px-4 w-fit flex items-center text-white hover:text-blue-400' href={article.url} target="_blank" rel="noopener noreferrer">
                                    <p className='text-base font-semibold'> Read More </p>
                                    <FaArrowUpRightFromSquare className='ml-2'/>
                                </a>
                            </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SportsNewsPage;