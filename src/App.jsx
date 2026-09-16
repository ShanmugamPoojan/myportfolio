import { Routes, Route } from 'react-router-dom';
import './styling/App.css';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import MyJourney from './pages/MyJourney';
import Header from './components/Header';
import Footer from './components/Footer';
import Terminal from './components/Terminal';

const terminalLines = [
  "const developer = 'Poojan';",
  "cd developer/life/interests",
  "ls",
  "i love coding.build",
  "i love anime.watch",
  "i love crochet.make",
  "i love art.draw",
  "i love you.flirt",
  ": ) // just kidding",
  "repeat",
];

function App() {
  return (
    <div id='main' className='main'>
      <Terminal title="poojan@quick-infos ~ %" lines={terminalLines} popOnScroll />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/about' element={<About />} />
        <Route path='/myjourney' element={<MyJourney />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
