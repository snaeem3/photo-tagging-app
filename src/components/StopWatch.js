import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = (props) => {
  const { time, setTime, gameStart, gameEnd } = props;
  const startTimeRef = useRef(null);

  useEffect(() => {
    let intervalId;
    if (gameStart && !gameEnd) {
      // Start the stopwatch by setting the current time using performance.now()
      startTimeRef.current = performance.now();

      // Set up an interval to update the stopwatch time every 10 milliseconds
      intervalId = setInterval(() => {
        const currentTime = performance.now();
        const elapsedTime = currentTime - startTimeRef.current;
        setTime(Math.floor(elapsedTime / 10));
      }, 10);
    } else {
      // Stop the stopwatch by clearing the interval and resetting the start time
      clearInterval(intervalId);
      startTimeRef.current = null;
    }

    // Clean up the interval when the component unmounts or when gameStart/gameEnd changes
    return () => clearInterval(intervalId);
  }, [gameStart, gameEnd, setTime]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

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
