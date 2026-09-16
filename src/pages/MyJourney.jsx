import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolio.json';
import Card from '../components/Card';
import '../styling/myjourney.css';

function MyJourney() {
  const [journeyData, setJourneyData] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    setJourneyData([...portfolioData.journey].reverse());
    setAchievements(portfolioData.achievements);
  }, []);

  return (
    <div className="journey-page main-page">
      <div className="journey-header main-page-header container">
        <h1 className="hero-subtitle">
          <span>
            My Journey
          </span>
        </h1>
        <p className="hero-description">My journey into the world of technology has been shaped by curiosity, determination, and a desire to create something of my own. From the beginning of my educational journey, I was interested in computers and technology. I was also one of the brighter students in my class and always had a curiosity to explore new things. I would describe myself as an ambivert—someone who can enjoy both social interactions and personal time.</p>
      </div>

      <div className="cards-container scatter-pattern">
        <div className='container'>
          {achievements.length > 0 && (
            <div className="achievements-section">
              <h1 className="hero-subtitle">Achievements</h1>
              <ul className="achievements-list">
                {achievements.map((item) => (
                  <li className="skill-card" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {journeyData.map((item, index) => (
            <Card key={item.title || index} item={{ 'index': item.id, ...item }} />
          ))}

        </div>
      </div>

    </div>
  );
}

export default MyJourney;

