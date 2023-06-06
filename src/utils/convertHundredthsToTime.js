export default function convertHundredthsToTime(hundredths) {
  const totalSeconds = hundredths / 100;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return [minutes, seconds];
}
