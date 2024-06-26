import { useContext } from 'react'
import { NBADataContext } from '../features/NBADataContext'
import { FadeLoader } from 'react-spinners'
import ScoreCard from '../components/ScoreCard'
import DateTabs from '../components/DateTabs'

const NBApage = () => {
  const { scores, loading } = useContext(NBADataContext);

  return (
    <section className="min-h-screen relative">
      <h1 className='ml-7 font-bold text-3xl text-white mb-3 mt-2'>NBA Scores</h1>
      <DateTabs />
      { loading &&
            <div className='text-white font-bold text-xl flex justify-center mt-24'>
            <FadeLoader color="#ffffff" loading={loading} margin={2} />
          </div> }
      { !loading
        && ( scores.length === 0 
          ? (
            <div>
              <p className="ml-5 text-white text-center font-extrabold text-2xl">No scores available</p>
            </div>
            )
          : (
          <div className="ml-5 flex flex-wrap items-center">
            {scores.map((game, index) => (
              <div className='mb-8'>
                <ScoreCard key={index} game={game} />
              </div>
            ))}
          </div>
          )
        )
      }
    </section>
  )
}

export default NBApage
