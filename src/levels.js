import level1Img from './images/levels/wheres-waldo-2.png';
import level2Img from './images/levels/wheres-waldo-ski.jpg';
import level3Img from './images/levels/wheres-waldo-robinhood.jpg';
import waldoImg from './images/targets/waldo.jpg';
import odlawImg from './images/targets/Character.Odlaw.webp';
import whitebeardImg from './images/targets/wizard.gif';
import wilmaImg from './images/targets/WilmaUmbrella.webp';

export const levelData = [
  {
    levelName: 'Beach',
    levelNumber: 1,
    collectionName: 'Image1',
    imgUrl: level1Img,
    targets: [{ name: 'Waldo', targetImg: waldoImg }],
    difficulty: 'easy',
  },
  {
    levelName: 'Ski Slopes',
    levelNumber: 2,
    collectionName: 'SkiImage',
    imgUrl: level2Img,
    targets: [
      { name: 'Waldo', targetImg: waldoImg },
      { name: 'Odlaw', targetImg: odlawImg },
      { name: 'WhiteBeard', targetImg: whitebeardImg },
      { name: 'Wilma', targetImg: wilmaImg },
    ],
    difficulty: 'medium',
  },
  {
    levelName: 'Robin Hood',
    levelNumber: 3,
    collectionName: 'RobinHoodImage',
    imgUrl: level3Img,
    targets: [
      { name: 'Waldo', targetImg: waldoImg },
      { name: 'Odlaw', targetImg: odlawImg },
      { name: 'WhiteBeard', targetImg: whitebeardImg },
      { name: 'Wilma', targetImg: wilmaImg },
    ],
    difficulty: 'hard',
  },
];
