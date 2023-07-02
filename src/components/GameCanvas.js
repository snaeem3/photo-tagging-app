import React, { useState, useEffect, useRef } from 'react';

const GameCanvas = (props) => {
  const { imgUrl, handleClick, isFound, foundTargetObjs } = props;
  const canvasRef = useRef(null);

  function drawBox(ctx, xMax, xMin, yMax, yMin, lineColor = '#ff0000') {
    ctx.beginPath();
    ctx.moveTo(xMin, yMin);
    ctx.lineTo(xMin, yMax);
    ctx.lineTo(xMax, yMax);
    ctx.lineTo(xMax, yMin);
    ctx.closePath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fill();
    ctx.stroke();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      // Get the available space in the parent container
      const parentWidth = canvas.parentElement.clientWidth;
      const parentHeight = canvas.parentElement.clientHeight;

      // Get the scale
      const scaleFactor = Math.min(
        parentWidth / img.width,
        parentHeight / img.height
      );

      // Get the new width and height based on the scale factor
      const newWidth = img.width * scaleFactor;
      const newHeight = img.height * scaleFactor;

      // Center the canvas
      const x = parentWidth / 2 - newWidth / 2;
      const y = parentHeight / 2 - newHeight / 2;

      // Set the canvas dimensions and draw the image
      canvas.width = newWidth;
      canvas.height = newHeight;
      context.drawImage(img, x, y, newWidth, newHeight);
    };
  }, [imgUrl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    foundTargetObjs.forEach((targetObj) => {
      drawBox(
        context,
        targetObj['x max'],
        targetObj['x min'],
        targetObj['y max'],
        targetObj['y min']
      );
    });
  }, [foundTargetObjs]);

  return <canvas onClick={handleClick} ref={canvasRef} />;
};

export default GameCanvas;
