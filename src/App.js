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

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Photo Tagging App</h1>
          {/* TODO: add Timer here */}
        </header>
        {/* <img src={img1} alt="Game" onClick={handleClick} draggable="false" /> */}
        <Game level={0} />
      </div>
    </BrowserRouter>
  );
};

export default App;
