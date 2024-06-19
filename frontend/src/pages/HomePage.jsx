import hoopSky from '../assets/hoopSky.png';

const HomePage = () => {
  return (
    <div className="homepage text-white text-center relative h-screen">
      <div
        className="hero-section w-full -mt-20 h-4/5 bg-cover bg-center"
        style={{ backgroundImage: `url(${hoopSky})`, zIndex: 0 }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div> {/* Overlay for better text visibility */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full">
          <h1 className="hero-title text-6xl font-extrabold mb-10">Welcome to GameFeed</h1>
          <p className="hero-subtitle text-2xl font-bold mb-12">Your Ultimate Sports Companion</p>
        </div>
      </div>
      <div className="features-section flex justify-around -mt-8 animate-slideIn px-4">
        <div className="feature bg-bgCards p-8 rounded-lg transform transition-transform duration-300 hover:scale-105 w-full max-w-xs">
          <h2 className="text-2xl font-semibold mb-4">Live Scores</h2>
          <p>Get real-time updates on your favorite games and teams.</p>
        </div>
        <div className="feature bg-bgCards p-8 rounded-lg transform transition-transform duration-300 hover:scale-105 w-full max-w-xs">
          <h2 className="text-2xl font-semibold mb-4">News & Updates</h2>
          <p>Stay informed with the latest news in the world of sports.</p>
        </div>
        <div className="feature bg-bgCards p-8 rounded-lg transform transition-transform duration-300 hover:scale-105 w-full max-w-xs">
          <h2 className="text-2xl font-semibold mb-4">Player Stats</h2>
          <p>Track the performance of your favorite players.</p>
        </div>
      </div>
      <footer className="footer mt-16 py-4 w-full bg-bgNavbar">
        <p>&copy; 2024 GameFeed. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
