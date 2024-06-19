import { Link } from 'react-router-dom'

const ScoreCard = ({ game }) => {
  if (!game) {
    return null;
  }

  return (
    <Link to={ `/game/${game.gameId}` }>
      <div className="bg-bgNavbar w-72 h-72 p-4 rounded-xl mr-5 flex flex-col justify-evenly">
        <p className="text-white text-center font-bold text-xl">{game.seriesInfo}</p>
        <div className="flex flex-row"> 
          <div className="flex flex-col items-center flex-1">
              <img src={game.awayTeam.logo} alt="awayLogo" className="mb-4 h-20" />
              <p className="text-gray-400 font-bold text-xl">{game.awayTeam.name}</p>
              <p className="text-white font-bold text-3xl">{game.awayTeam.score}</p>
            </div>
            <div className="flex flex-col items-center flex-1">
              <img src={game.homeTeam.logo} alt="homeLogo" className="mb-4 h-20"/>
              <p className="text-gray-400 font-bold text-xl">{game.homeTeam.name}</p>
              <p className="text-white font-bold text-3xl">{game.homeTeam.score}</p>
            </div>
        </div>
        <div className=" flex flex-row justify-center text-white text-2xl font-semibold">
          <p> { game.gameStatus } </p>
        </div>
    </div>
    </Link>
  )
}

export default ScoreCard
