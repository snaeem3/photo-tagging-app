import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCollectionDocs } from '../services/firebase';
import { levelData } from '../levels';

const LevelSelect = (props) => {
  const { selectedLevel, setSelectedLevel } = props;

  return (
    <main className="level-select">
      <figure className="level-preview-container">
        <img
          className="level-preview"
          alt="Level Preview"
          src={levelData[selectedLevel].imgUrl}
        />
        <figcaption className="level-name">
          <h2>{levelData[selectedLevel].levelName}</h2>
        </figcaption>
      </figure>
      <div className="buttons-container">
        <ul className="level-list">
          {levelData.map((level, index) => (
            <li
              key={index}
              className={selectedLevel === index ? 'selected-level' : ''}
            >
              <button type="button" onClick={(e) => setSelectedLevel(index)}>
                <h2 className="level-number level-difficulty">
                  Level {level.levelNumber}- {level.difficulty}
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
          className="start-btn-container"
        >
          <button type="submit" className="start-btn box-shadow">
            Start Game
          </button>
        </Link>
      </div>
    </main>
  );
};

export default LevelSelect;
