import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BoxScore from '../components/BoxScore';
import Comments from '../components/Comments';
import GameInsights from '../components/GameInsights';

const GameDetailPage = () => {
  const [ activePage, setActivePage ] = useState('BoxScore');
  const { gameId } = useParams();

  const handleActivePage = (page) => {
    setActivePage(page)
  }
  return (
    <>
    <div className='text-white font-bold mt-4'>
      <button className="bg-bgNavbar py-2 px-4 rounded-lg ml-4 hover:bg-zinc-700" onClick={() => handleActivePage('BoxScore')}>
        Box Score
      </button>
      <button className="bg-bgNavbar py-2 px-4 rounded-lg ml-2 hover:bg-zinc-700" onClick={() => handleActivePage('Comments')}>
        Comments
      </button>
      <button className="bg-bgNavbar py-2 px-4 rounded-lg ml-2 hover:bg-zinc-700" onClick={() => handleActivePage('GameInsights')}>
        Game Insights
      </button>
    </div>
    <section>
      {activePage === 'BoxScore' && <BoxScore gameId={gameId}/>}
      {activePage === 'Comments' && <Comments gameId={gameId}/>}
      {activePage === 'GameInsights' && <GameInsights gameId={gameId}/>}
    </section>
    </>
  );
};

export default GameDetailPage;
