import React, { useState, useEffect } from 'react';

const Stopwatch = (props) => {
  const { time, setTime, gameStart, gameEnd } = props;
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let intervalId;
    if (gameStart && !gameEnd) {
      setStartTime(performance.now());
      intervalId = setInterval(() => {
        const currentTime = performance.now();
        const elapsedTime = currentTime - startTime;
        setTime(Math.floor(elapsedTime / 10));
      }, 10);
    }
    return () => {
      clearInterval(intervalId);
      setStartTime(null);
    };
  }, [gameStart, gameEnd, setTime, startTime]);

  const hours = Math.floor(time / 360000);

  const minutes = Math.floor((time % 360000) / 6000);

  const seconds = Math.floor((time % 6000) / 100);

  const milliseconds = time % 100;

  // Method to reset timer back to 0
  // const reset = () => {
  //   setTime(0);
  // };

  return (
    <div className="stopwatch-container">
      <h2 className="stopwatch-time">
        {hours > 0 ? `${hours}:` : ''}
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}:
        {milliseconds.toString().padStart(2, '0')}
      </h2>
      {/* TO-DO Pause button */}
    </div>
  );
};

export default Stopwatch;
