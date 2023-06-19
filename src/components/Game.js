import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getCollectionDocs, uploadEntry } from '../services/firebase';
import { levelData } from '../levels';
import Stopwatch from './StopWatch';
import GameCanvas from './GameCanvas';
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
  const [foundTargetObjs, setFoundTargetObjs] = useState(
    Array(levelData[level].targets.length).fill({})
  );
  const [time, setTime] = useState(0);
  const [gameStart, setGameStart] = useState(true);
  const [gameEnd, setGameEnd] = useState(false);

  function markFound(targetIndex) {
    const currentTargetsFound = [...isFound];
    currentTargetsFound[targetIndex] = true;
    setIsFound(currentTargetsFound);
  }

  function addTargetObj(targetObj, targetIndex) {
    console.log(targetObj);
    const currentFoundTargetObjs = [...foundTargetObjs];
    currentFoundTargetObjs[targetIndex] = targetObj;
    setFoundTargetObjs(currentFoundTargetObjs);
  }

  useEffect(() => {
    // const c = document.getElementById('canvas');
    // if (c.getContext) {
    //   const ctx = c.getContext('2d');
    //   const img = new Image();
    //   img.onload = () => {
    //     ctx.drawImage(img, 0, 0);
    //   };
    //   img.src = levelData[level].imgUrl;
    // }
  }, [level]);

  useEffect(() => {
    // If game has begun
    if (gameStart) {
      // If every target has been found
      if (isFound.every((targetFound) => targetFound === true)) {
        console.log('Every target found');
        setGameEnd(true);
      }
    }
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
    // const natWidth = event.target.naturalWidth;
    // const natHeight = event.target.naturalHeight;
    const natWidth = event.target.width;
    const natHeight = event.target.height;
    const actualWidth = event.target.offsetWidth;
    const actualHeight = event.target.offsetHeight;
    const xClick = event.pageX - event.target.offsetLeft;
    const yClick = event.pageY - event.target.offsetTop;

    console.log(`width: ${event.target.width}`);
    console.log(`offset width: ${event.target.offsetWidth}`);
    console.log(`X position: ${xClick}`);
    console.log(`Y position: ${yClick}`);

    // Calculate the relative position based on actual vs normal image size
    const relativeX = (xClick / actualWidth) * natWidth;
    const relativeY = (yClick / actualHeight) * natHeight;
    console.log(`relativeX: ${relativeX}`);
    console.log(`relativeY: ${relativeY}`);

    // Get targets from firebase
    const targets = await getTargets(levelData[level].collectionName);
    console.table(targets);

    const targetIndex = targetFoundIndex(relativeX, relativeY, targets);
    console.log(`targetIndex: ${targetIndex}`);
    if (targetIndex >= 0) {
      if (!isFound[targetIndex]) {
        markFound(targetIndex);
        addTargetObj(targets[targetIndex], targetIndex);
      }
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
    <main className="game sticky-container">
      <Stopwatch
        time={time}
        setTime={setTime}
        gameStart={gameStart}
        gameEnd={gameEnd}
      />
      <div className="target-container sticky-element">
        {levelData[level].targets.map((targetInfo, index) => (
          <Target
            name={targetInfo.name}
            imgUrl={targetInfo.targetImg}
            isFound={isFound[index]}
            key={index}
          />
        ))}
      </div>
      <GameCanvas
        imgUrl={levelData[level].imgUrl}
        handleClick={handleClick}
        isFound={isFound}
        foundTargetObjs={foundTargetObjs}
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
    <figure className={`target ${isFound ? 'found' : 'not-found'} trim`}>
      <figcaption className="target-name">{name}</figcaption>
      <img src={imgUrl} alt={name} draggable="false" />
    </figure>
  );
};

export default Game;
