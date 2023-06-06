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
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Photo Tagging App</h1>
          <button type="button" id="help-btn" onClick={openHelpModal}>
            ?
          </button>
          <Link to="/">Level Select</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </header>
        <dialog id="help">
          <button type="button" className="close-btn" onClick={closeModal}>
            X
          </button>
          <h2>How to Play</h2>

          <ol>
            <li>Choose your level and click Start Game</li>
            <li>Locate and click on each target in the image</li>
            <li>
              If you find all the targets in a short time, check to see if you
              made the leader board!
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
      </div>
    </BrowserRouter>
  );
};

export default App;
