import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCollectionDocs } from '../services/firebase';
import { levelData } from '../levels';

const LevelSelect = (props) => {
  const { selectedLevel, setSelectedLevel } = props;

  return (
    <div className="level-select radio-toolbar">
      <ul className="level-list">
        {levelData.map((level, index) => (
          <li
            key={index}
            className={selectedLevel === index ? 'selected-level' : ''}
          >
            <button type="button" onClick={(e) => setSelectedLevel(index)}>
              <img
                className="thumbnail"
                src={level.imgUrl}
                alt={level.levelName}
              />
              <h2 className="level-name">
                Level {level.levelNumber}- {level.levelName}
              </h2>
            </button>
          </li>
        ))}
      </ul>
      <Link
        to={{
          pathname: `/game`,
        }}
        state={{ level: selectedLevel }}
      >
        <button type="submit" className="start-btn">
          Start Game
        </button>
      </Link>
    </div>
  );
};

export default LevelSelect;
