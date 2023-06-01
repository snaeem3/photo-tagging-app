import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  HashRouter,
} from 'react-router-dom';
import { getCollectionDocs } from './services/firebase';
import Game from './components/Game';
import img1 from './images/levels/wheres-waldo-2.png';

const App = () => {
  const [imgName, setImgName] = useState('Image1');

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
          {/* TODO: add Timer here */}
          <button type="button" id="help-btn" onClick={openHelpModal}>
            ?
          </button>
        </header>
        <Game level={0} />
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
      </div>
    </BrowserRouter>
  );
};

export default App;
