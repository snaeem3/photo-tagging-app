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

  return (
    <main className="leaderboard">
      <h2>Leaderboard</h2>
      <ul className="level-list">
        {levelData.map((level, index) => (
          <li
            key={index}
            className={selectedLevel === index ? 'selected-level' : ''}
          >
            <button type="button" onClick={(e) => setSelectedLevel(index)}>
              <h2 className="level-name">{level.levelName}</h2>
            </button>
          </li>
        ))}
      </ul>
      <h3>Level {selectedLevel + 1} High Scores</h3>
      <table className="scores-table box-shadow">
        <thead>
          <tr className="header-row">
            <th>Place</th>
            <th>Name</th>
            <th>Completion Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{score.name}</td>
              <td>
                {convertHundredthsToTime(score.time)[0] > 0
                  ? `${convertHundredthsToTime(score.time)[0]} min `
                  : ''}
                {Math.round(
                  (convertHundredthsToTime(score.time)[1] + Number.EPSILON) *
                    100
                ) / 100}{' '}
                s
              </td>
              <td>{score.timestamp.toDate().toLocaleDateString('en-US')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Leaderboard;
