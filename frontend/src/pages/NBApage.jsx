import { useContext } from 'react'
import { NBADataContext } from '../features/NBADataContext'
import { ScaleLoader } from 'react-spinners'
import ScoreCard from '../components/ScoreCard'
import DateTabs from '../components/DateTabs'

const NBApage = () => {
  const { scores, loading } = useContext(NBADataContext);

  return (
    <section className="min-h-screen relative">
      <h1 className='ml-7 font-bold text-3xl text-white mb-3 mt-2'>Scores</h1>
      <DateTabs />
      { loading &&
            <div className='w-72 h-72 ml-32 mt-16'>
              <ScaleLoader color="#ffffff" loading={loading} height={35} width={4} radius={2} margin={2} />
            </div> }
      { !loading
        && ( scores.length === 0 
          ? (
            <div>
              <p className="ml-5 text-white">No scores available</p>
            </div>
            )
          : (
          <div className="ml-5 flex flex-row items-center">
            {scores.map((game, index) => (
              <ScoreCard key={index} game={game} />
            ))}
          </div>
          )
        )
      }
    </section>
  )
}

export default NBApage
