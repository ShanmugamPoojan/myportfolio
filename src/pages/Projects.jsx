import { useEffect, useState } from "react";
import Gallery from "../components/Gallery";
import portfolioData from "../data/portfolio.json";
import '../styling/projects.css';

function Projects() {
  const [items, setItems] = useState([]);
  const [expanded, setExpanded] = useState(false);


  const [skillsList, setSkillsList] = useState([]);

  useEffect(() => {
    setItems([...portfolioData.projects].reverse());
    setSkillsList(portfolioData.skillsList);
  }, []);

  return (
    <div className="projects-page main-page">
      <div className="projects-header main-page-header container ">
        <h1 className="hero-subtitle"><span>Projects</span></h1>
        <p className="hero-description">Showcasing my best work and technical skills</p>
      </div>
      <div className="cards-container scatter-pattern">
        <div className="container">
          <h1 className="hero-subtitle"><span>My Skills</span></h1>
          {skillsList.length > 0 && (
            <div className="skills-section">
              <div className="skills-grid-cards">
                {(expanded ? skillsList : skillsList.slice(0, 2)).map((skill) => (
                  <div key={skill.name} className="skill-card">
                    <span className="skill-card-tag">-skill</span>
                    <h3>{skill.name}</h3>
                    <p>{skill.description}</p>
                    <span className="skill-card-category">{skill.category}</span>
                  </div>
                ))}
              </div>
              <button
                className="button"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "View Less <<" : "View More >>"}
              </button>
            </div>
          )}
          <h1 className="hero-subtitle"><span>My Work</span></h1>
          {items.map((item, ind) => (
            <Gallery key={item.title || ind} item={{ 'index': ind + 1, ...item }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;

