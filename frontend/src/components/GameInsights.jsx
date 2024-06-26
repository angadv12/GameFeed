import { useEffect, useState } from 'react'
import { FadeLoader } from 'react-spinners'

const GameInsights = ({gameId}) => {
    const [gameDetails, setGameDetails] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const fetchGameDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/game-details/${gameId}`);
          const data = await response.json();
          setGameDetails(data);
        } catch (error) {
          console.error('Error fetching game details:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchGameDetails();
    }, [gameId]);

    if (!gameDetails) {
      return (
          <div className='text-white font-bold text-center mt-10'>No game insights available.</div>
      );
  }

    return (
      <section>
        <h1 className='font-extrabold text-4xl text-white ml-10 mt-4'> Top Performers </h1>
        { loading ? (
          <div className='text-white font-bold text-xl flex justify-center mt-24'>
            <FadeLoader color="#ffffff" loading={loading} margin={2} />
          </div>
        ) : (
          <section className='ml-10 flex items-center'>
            <div className='text-white ml-2'>
              <h1 className='font-extrabold text-2xl mt-4'> Away Team</h1>
              <h2 className='font-bold text-xl mt-2'> Top Scorer: </h2>
              <p className='flex items-center'> <img src={gameDetails.away.tops.topScorer.face} alt="" className='h-12 w-12 object-cover rounded-full mr-2'/>{gameDetails.away.tops.topScorer.player}, {gameDetails.away.tops.topScorer.count} </p>
              <h2 className='font-bold text-xl mt-2'> Top Rebounder: </h2>
              <p className='flex items-center'> <img src={gameDetails.away.tops.topRebounder.face} alt="" className='h-12 w-12 object-cover rounded-full mr-2'/>{gameDetails.away.tops.topRebounder.player}, {gameDetails.away.tops.topRebounder.count}  </p>
              <h2 className='font-bold text-xl mt-2'> Top Assister: </h2>
              <p className='flex items-center'> <img src={gameDetails.away.tops.topAssister.face} alt="" className='h-12 w-12 object-cover rounded-full mr-2'/>{gameDetails.away.tops.topAssister.player}, {gameDetails.away.tops.topAssister.count} </p>
              <h2 className='font-bold text-xl mt-2'> Top Shot-blocker: </h2>
              <p className='flex items-center'> <img src={gameDetails.away.tops.topBlocker.face} alt="" className='h-12 w-12 object-cover rounded-full mr-2'/>{gameDetails.away.tops.topBlocker.player}, {gameDetails.away.tops.topBlocker.count} </p>
              <h2 className='font-bold text-xl mt-2'> Top Ball-stealer: </h2>
              <p className='flex items-center'> <img src={gameDetails.away.tops.topStealer.face} alt="" className='h-12 w-12 object-cover rounded-full mr-2'/>{gameDetails.away.tops.topStealer.player}, {gameDetails.away.tops.topStealer.count} </p>
            </div>
            <div className='text-white ml-2'>
              <h1 className='font-extrabold text-2xl mt-4'> Home Team</h1>
              <h2 className='font-bold text-xl mt-2'> Top Scorer: </h2>
              <p className='flex items-center'> <img src={gameDetails.home.tops.topScorer.face} alt="" className='h-12 w-12 object-cover rounded-full mr-2'/>{gameDetails.home.tops.topScorer.player}, {gameDetails.home.tops.topScorer.count} </p>
              <h2 className='font-bold text-xl mt-2'> Top Rebounder: </h2>
              <p className='flex items-center'> <img src={gameDetails.home.tops.topRebounder.face} alt="" className='h-12 w-12 object-cover rounded-full mr-2'/>{gameDetails.home.tops.topRebounder.player}, {gameDetails.home.tops.topRebounder.count}  </p>
              <h2 className='font-bold text-xl mt-2'> Top Assister: </h2>
              <p className='flex items-center'> <img src={gameDetails.home.tops.topAssister.face} alt="" className='h-12 w-12 object-cover rounded-full mr-2'/>{gameDetails.home.tops.topAssister.player}, {gameDetails.home.tops.topAssister.count} </p>
              <h2 className='font-bold text-xl mt-2'> Top Shot-blocker: </h2>
              <p className='flex items-center'> <img src={gameDetails.home.tops.topBlocker.face} alt="" className='h-12 w-12 object-cover rounded-full mr-2'/>{gameDetails.home.tops.topBlocker.player}, {gameDetails.home.tops.topBlocker.count} </p>
              <h2 className='font-bold text-xl mt-2'> Top Ball-stealer: </h2>
              <p className='flex items-center'> <img src={gameDetails.home.tops.topStealer.face} alt="" className='h-12 w-12 object-cover rounded-full mr-2'/>{gameDetails.home.tops.topStealer.player}, {gameDetails.home.tops.topStealer.count} </p>
            </div>
          </section>
        )
        }

      </section>
    );
};

export default GameInsights;