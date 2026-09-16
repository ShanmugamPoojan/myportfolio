import { Link } from 'react-router-dom';
import portfolioData from '../data/portfolio.json';
import '../styling/footer.css';

function Footer() {
  const { social, profile } = portfolioData;

  return (
    <footer className="footer">

      <div className="footer-top">
        <div className="footer-socials">
          <a href={social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          <b>{`<>`}</b> Inspired from <a href="https://mac-template.webflow.io/" target="_blank" rel="noopener noreferrer"> <u>mac-template</u></a> <b>{`</>`}</b>
        </p>
        <p>You can, if you think you can!</p>
      </div>

    </footer>
  );
}

export default Footer;