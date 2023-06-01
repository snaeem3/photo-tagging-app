import React, { useState, useEffect } from 'react';
import { getCollectionDocs } from '../services/firebase';
import { levelData } from '../levels';

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

  function markFound(targetIndex) {
    const currentTargetsFound = [...isFound];
    currentTargetsFound[targetIndex] = true;
    setIsFound(currentTargetsFound);
  }

  const handleClick = async (event) => {
    const xClick = event.pageX - event.target.offsetLeft;
    const yClick = event.pageY - event.target.offsetTop;
    console.log(`X position: ${xClick}`);
    console.log(`Y position: ${yClick}`);
    const targets = await getTargets(levelData[level].collectionName);
    console.table(targets);
    const targetIndex = targetFoundIndex(xClick, yClick, targets);
    // console.log(targetIndex >= 0 ? targets[targetIndex].name : 'invalid');
    if (targetIndex >= 0) {
      markFound(targetIndex);
      console.log(`Found ${targets[targetIndex].name}`);
    } else {
      console.log('Nothing found here');
    }
  };

  return (
    <main className="game">
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
