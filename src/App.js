// import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

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

const App = () => {
  const [text, setText] = useState('');
  const [num, setNum] = useState(0);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
  };

  const handleNumChange = (event) => {
    const newNum = event.target.value;
    setNum(newNum);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Text: ${text}`);
    console.log(`Num: ${num}`);
    populateCollection('Test', { [text]: num });
  };

  return (
    <div className="App">
      <header className="App-header">Photo Tagging App</header>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" onChange={handleTextChange} value={text} />
        <input type="number" onChange={handleNumChange} value={num} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default App;
