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

    if (loading) {
        return (
            <div className='text-white font-bold text-xl flex justify-center mt-24'>
              <FadeLoader color="#ffffff" loading={loading} margin={2} />
            </div>
          )
    }

    if (!gameDetails) {
      return (
          <div className='text-white font-bold text-center mt-10'>No game insights available.</div>
      );
  }

    return (
      <section>
        <h1 className='font-extrabold text-3xl text-white ml-10'> Top Performers </h1>
         {/* move loading to here so that headers are displayed ************ */}
        <div className='text-white font-bold'>{gameDetails.away.tops.topScorer}</div>

      </section>
    );
};

export default GameInsights;