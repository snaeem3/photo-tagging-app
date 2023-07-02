import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  HashRouter,
  useLocation,
} from 'react-router-dom';
import { getCollectionDocs } from './services/firebase';
import LevelSelect from './components/LevelSelect';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';
import helpIcon from './images/icons/help_FILL0_wght400_GRAD0_opsz48.svg';

const App = () => {
  // const [imgName, setImgName] = useState('Image1');
  const [selectedLevel, setSelectedLevel] = useState(0);

  const openHelpModal = () => {
    const helpModal = document.getElementById('help');
    if (helpModal) {
      helpModal.showModal();
    }
  };

  const closeModal = () => {
    const helpModal = document.getElementById('help');
    if (helpModal) {
      helpModal.close();
    }
  };

  return (
    <HashRouter>
      <div className="App">
        <header className="App-header">
          <h1>Photo Tagging App</h1>
          <nav>
            <Link to="/">Level Select</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <button type="button" id="help-btn" onClick={openHelpModal}>
              <img className="help-img icon" src={helpIcon} alt="Help" />
            </button>
          </nav>
        </header>
        <dialog id="help">
          <button type="button" className="close-btn" onClick={closeModal}>
            {/* X */}
          </button>
          <h2>How to Play</h2>

          <ol>
            <li>Choose your level and click Start Game</li>
            <li>Locate and click on each target in the image</li>
            <li>
              Enter your name to submit it to the{' '}
              <Link to="/leaderboard">leaderboard</Link>
            </li>
          </ol>
        </dialog>
        <Routes>
          <Route
            path="/"
            element={
              <LevelSelect
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
              />
            }
          />
          <Route path="/game" element={<Game level={selectedLevel} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
