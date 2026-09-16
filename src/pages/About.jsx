import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolio.json';
import Card from '../components/Card';
import '../styling/about.css';

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [experienceData, setExperienceData] = useState([]);

  useEffect(() => {
    setAboutData(portfolioData.about2);
    setExperienceData(portfolioData.about);
  }, []);

  if (!aboutData) return <div>Loading...</div>;

  return (
    <div className="about-page main-page">
      <div className="about-header main-page-header container">
        <h1 className="hero-subtitle">
          <span>
            About Me
          </span>
        </h1>
        <p className="hero-description">{portfolioData.profile.subtitle}</p>
          <h2 className="hero-subtitle">Who Am I?</h2>
          <p className="hero-description">{aboutData.intro}</p>
          <p className="hero-description">{aboutData.interests}</p>
        <div className="about-intro">
        </div>
      </div>

      <div className="cards-container scatter-pattern">
        <div className='container'>

          <div className="about-section ">
            {experienceData.map((exp, ind) => (
              <Card key={exp.title || ind} item={{ 'index': ind + 1, ...exp }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;
