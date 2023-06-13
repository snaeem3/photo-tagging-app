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
      // Once the image is loaded, we will get the width & height of the image
      const loadedImageWidth = img.width;
      const loadedImageHeight = img.height;

      // get the scale
      // it is the min of the 2 ratios
      const scaleFactor = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );

      // Get the new width and height based on the scale factor
      const newWidth = img.width * scaleFactor;
      const newHeight = img.height * scaleFactor;

      // get the top left position of the image
      // in order to center the image within the canvas
      const x = canvas.width / 2 - newWidth / 2;
      const y = canvas.height / 2 - newHeight / 2;
      // context.imageSmoothingEnabled = true;
      canvas.width = img.width;
      canvas.height = img.height;
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
