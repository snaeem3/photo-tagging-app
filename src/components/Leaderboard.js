import React, { useState, useEffect } from 'react';
import { levelData } from '../levels';
import { loadScores } from '../services/firebase';
import convertHundredthsToTime from '../utils/convertHundredthsToTime';

async function getScores(level) {
  const scores = await loadScores(level + 1);
  return scores;
}

const Leaderboard = (props) => {
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const loadedScores = await getScores(selectedLevel);
      setScores(loadedScores);
    };

    fetchData();
  }, [selectedLevel]);

  console.log(scores);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul className="level-list">
        {levelData.map((level, index) => (
          <li key={index}>
            <button
              type="button"
              className={selectedLevel === index ? 'selected-level' : ''}
              onClick={(e) => setSelectedLevel(index)}
            >
              <h2 className="level-name">{level.levelName}</h2>
            </button>
          </li>
        ))}
      </ul>
      <h3>Level {selectedLevel + 1} High Scores</h3>
      <table className="scores-table">
        <tr className="header-row">
          <th>Name</th>
          <th>Completion Time</th>
          <th>Date</th>
        </tr>
        {scores.map((score, index) => (
          <tr key={index}>
            <td>{score.name}</td>
            <td>
              {convertHundredthsToTime(score.time)[0] > 0
                ? `${convertHundredthsToTime(score.time)[0]} min `
                : ''}
              {Math.round(
                (convertHundredthsToTime(score.time)[1] + Number.EPSILON) * 100
              ) / 100}{' '}
              s
            </td>
            <td>{score.timestamp.toDate().toLocaleDateString('en-US')}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Leaderboard;
