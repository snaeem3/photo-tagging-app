import level1Img from './images/levels/wheres-waldo-2.png';
import level2Img from './images/levels/wheres-waldo-1.jpg';
import waldoImg from './images/targets/waldo.jpg';

export const levelData = [
  {
    levelName: 'Beach',
    collectionName: 'Image1',
    imgUrl: level1Img,
    targets: [{ name: 'Waldo', targetImg: waldoImg }],
    difficulty: 'easy',
  },
  {
    levelName: 'Level 2',
    imgUrl: level2Img,
    targets: [{ name: 'Waldo', targetImg: waldoImg }],
  },
];
