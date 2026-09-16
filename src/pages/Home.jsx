import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolio.json';
import '../styling/home.css'
import Card from '../components/Card.jsx';
import MacEyes from '../components/MacEyes.jsx';


function Home() {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    setHomeData(portfolioData.home);
  }, []);

  if (!homeData) return <div>Loading...</div>;

  return (
    <div className="home-page main-page">
      <div className='hero-section'>
        <div className='hero-content'>
          <h1 className='hero-title'>
            <span className='typewriter'>Hello world, <br />I'm Poojan</span>
          </h1>
          <div className="hero-subcontent">
          </div>
          <div>
            <p className='hero-subtitle'>{homeData.hero.subtitle}</p>
            <p className='hero-description'>{homeData.hero.description}</p>
          </div>
        </div>
        <div className="hero-image">
          <MacEyes />
        </div>
      </div>
      <div className='cards-container scatter-pattern'>
        <div className='container'>
          {homeData.overview.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
