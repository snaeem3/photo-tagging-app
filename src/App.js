// import './App.css';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
// import img1 from './images/wheres-waldo-1.jpg';
import img1 from './images/wheres-waldo-2.png';

const firebaseConfig = {
  apiKey: 'AIzaSyBLjgVXbnLFWZ73Iabe_ttaZtp9eMJP_qc',
  authDomain: 'photo-tagging-app-982d6.firebaseapp.com',
  projectId: 'photo-tagging-app-982d6',
  storageBucket: 'photo-tagging-app-982d6.appspot.com',
  messagingSenderId: '500423775138',
  appId: '1:500423775138:web:89a759051a77d7f81c58fb',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function populateCollection(collectionName, obj) {
  addDoc(collection(db, collectionName), obj);
}

function getCoordinates(imgName) {
  const coords = getDocData(imgName, 'Coordinates');
  return coords;
}

async function getDocData(collectionName, docName) {
  const docRef = doc(db, collectionName, docName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log('Document data found:', docSnap.data());
    return docSnap.data();
  }
  // docSnap.data() will be undefined in this case
  console.error('No such document!');
}

const App = () => {
  const [isFound, setIsFound] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(`Text: ${text}`);
    // console.log(`Num: ${num}`);
    // populateCollection('Test', { [text]: num });
    const coords = await getCoordinates('Image1');
    console.table(coords);
  };

  const handleClick = (event) => {
    console.log(`X position: ${event.pageX - event.target.offsetLeft}`);
    console.log(`Y position: ${event.pageY - event.target.offsetTop}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Photo Tagging App</h1>
        {/* TODO: add Timer here */}
      </header>
      {/* <form action="" onSubmit={handleSubmit}>
        <input type="text" onChange={handleTextChange} value={text} />
        <input type="number" onChange={handleNumChange} value={num} />
        <input type="submit" value="Submit" />
      </form> */}
      {/* <TargetImage name="Image1" isFound={images[0].isFound} imgUrl={img1Url} /> */}
      <img src={img1} alt="Game" onClick={handleClick} />
    </div>
  );
};

export default App;
