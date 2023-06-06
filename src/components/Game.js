import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getCollectionDocs, uploadEntry } from '../services/firebase';
import { levelData } from '../levels';
import Stopwatch from './StopWatch';
import convertHundredthsToTime from '../utils/convertHundredthsToTime';

function getTargets(imgName) {
  return getCollectionDocs(imgName);
}

function coordInRange(x, y, targetObj) {
  return (
    x <= targetObj['x max'] &&
    x >= targetObj['x min'] &&
    y <= targetObj['y max'] &&
    y >= targetObj['y min']
  );
}

function targetFoundIndex(x, y, targetObjArray) {
  let result = -1;
  for (let i = 0; i < targetObjArray.length; i++) {
    if (coordInRange(x, y, targetObjArray[i])) {
      result = i;
    }
  }
  return result;
}

const Game = (props) => {
  const { level } = props;

  const [isFound, setIsFound] = useState(
    Array(levelData[level].targets.length).fill(false) // Set each target as false/Not Found
  );
  const [time, setTime] = useState(0);
  const [gameStart, setGameStart] = useState(true);
  const [gameEnd, setGameEnd] = useState(false);

  function markFound(targetIndex) {
    const currentTargetsFound = [...isFound];
    currentTargetsFound[targetIndex] = true;
    setIsFound(currentTargetsFound);
  }

  useEffect(() => {
    // If game has begun
    if (gameStart) {
      // If every target has been found
      if (isFound.every((targetFound) => targetFound === true)) {
        console.log('Every target found');
        setGameEnd(true);
      }
    }
    // return () => clearInterval(intervalId);
  }, [gameStart, isFound]);

  useEffect(() => {
    const openVictoryModal = () => {
      const victoryModal = document.getElementById('victory-modal');
      if (victoryModal) {
        victoryModal.showModal();
      }
    };

    if (gameEnd) {
      openVictoryModal();
    }
  }, [gameEnd]);

  const handleClick = async (event) => {
    const xClick = event.pageX - event.target.offsetLeft;
    const yClick = event.pageY - event.target.offsetTop;
    console.log(`X position: ${xClick}`);
    console.log(`Y position: ${yClick}`);
    const targets = await getTargets(levelData[level].collectionName);
    console.table(targets);
    const targetIndex = targetFoundIndex(xClick, yClick, targets);
    if (targetIndex >= 0) {
      markFound(targetIndex);
      console.log(`Found ${targets[targetIndex].name}`);
    } else {
      console.log('Nothing found here');
    }
  };

  const handleLeaderboardEntrySubmit = (event) => {
    event.preventDefault();
    const name = document.querySelector('input#name').value;
    uploadEntry(name, level + 1, time);
    closeVictoryModal();
  };

  const closeVictoryModal = () => {
    const victoryModal = document.getElementById('victory-modal');
    if (victoryModal) {
      victoryModal.close();
    }
  };

  return (
    <main className="game">
      <Stopwatch
        time={time}
        setTime={setTime}
        gameStart={gameStart}
        gameEnd={gameEnd}
      />
      {levelData[level].targets.map((targetInfo, index) => (
        <Target
          name={targetInfo.name}
          imgUrl={targetInfo.targetImg}
          isFound={isFound[index]}
          key={index}
        />
      ))}
      <img
        src={levelData[level].imgUrl}
        alt="Game"
        onClick={handleClick}
        draggable="false"
      />
      <dialog id="victory-modal">
        <button type="button" className="close-btn" onClick={closeVictoryModal}>
          X
        </button>
        <h2>You Found Everyone!</h2>
        <p className="finish-time">
          {`${convertHundredthsToTime(time)[0]} minutes ${
            Math.round(
              (convertHundredthsToTime(time)[1] + Number.EPSILON) * 100
            ) / 100
          } seconds`}
        </p>
        <form onSubmit={handleLeaderboardEntrySubmit}>
          <label htmlFor="name">
            Enter your name:
            <input type="text" name="name" id="name" minLength="1" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </dialog>
    </main>
  );
};

const Target = (props) => {
  const { name, imgUrl, isFound } = props;

  return (
    <figure className={`target ${isFound ? 'found' : 'not-found'}`}>
      <img src={imgUrl} alt={name} draggable="false" />
      <figcaption className="target-name">{name}</figcaption>
    </figure>
  );
};

export default Game;
