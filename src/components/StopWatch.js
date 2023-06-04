import React, { useState, useEffect } from 'react';

const Stopwatch = (props) => {
  const { time, setTime, gameStart, gameEnd } = props;

  useEffect(() => {
    let intervalId;
    if (gameStart && !gameEnd) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [gameStart, gameEnd, setTime, time]);

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
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}:
        {milliseconds.toString().padStart(2, '0')}
      </p>
      {/* TO-DO Pause button */}
    </div>
  );
};

export default Stopwatch;