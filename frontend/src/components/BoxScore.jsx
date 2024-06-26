import { useEffect, useState } from 'react'
import { FadeLoader } from 'react-spinners'

const BoxScore = ({gameId}) => {
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <div className='text-white font-bold text-center mt-10'>No game or series info available.</div>
    )
  }

  const renderTable = (team, teamName) => {
    if (team.length === 0) return null;

    const statCategories = Object.keys(team[0]).filter(key => key !== 'player' && key !== 'comment' && key !== 'face');

    return (
      <div className="mb-8">
        <h3 className="text-2xl mb-4 font-semibold">{teamName}</h3>
        <table className="min-w-full bg-bgNavbar table-fixed">
          <thead className='text-center'>
            <tr>
              <th className="border-b-2 border-gray-600 p-2">Player</th>
              {statCategories.map(category => (
                <th key={category} className="border-b-2 border-gray-600 p-2">{category}</th>
              ))}
              <th className="border-b-2 border-gray-600 p-2">Comment</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {team.map((player, index) => (
              player.player && (
                <tr key={index} className="border-b border-gray-600">
                  <td className="p-2 flex items-center">
                    <img className="h-8 mr-2 rounded-full" src={player.face} alt="" />
                    {player.player}
                  </td>
                  {statCategories.map(category => (
                    <td key={category} className="p-2">{player[category]}</td>
                  ))}
                  <td className="p-2">{player.comment}</td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 text-white">
      {(gameDetails.away && gameDetails.home) ? (
        <div>
          {renderTable(gameDetails.away.players, gameDetails.awayTeam)}
          {renderTable(gameDetails.home.players, gameDetails.homeTeam)}
        </div>
      ) : (
        <div>
          <h2 className="text-3xl mb-8 font-bold">Game hasn't started. Previous Games:</h2>
          {gameDetails.map((game, index) => (
            <div key={index} className="mb-4">
              <p>
                {game.awayTeam.team} {game.awayTeam.score} - {game.homeTeam.team} {game.homeTeam.score}
              </p>
              <p>{game.gameStatus}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default BoxScore