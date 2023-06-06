// import firebase from 'firebase/app';
// import 'firebase/firestore'; // If you're using Firestore
import 'firebase/auth'; // If you're using Authentication
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBLjgVXbnLFWZ73Iabe_ttaZtp9eMJP_qc',
  authDomain: 'photo-tagging-app-982d6.firebaseapp.com',
  projectId: 'photo-tagging-app-982d6',
  storageBucket: 'photo-tagging-app-982d6.appspot.com',
  messagingSenderId: '500423775138',
  appId: '1:500423775138:web:89a759051a77d7f81c58fb',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getCollectionDocs(collectionName) {
  const q = query(collection(db, collectionName)); // add query parameters
  const querySnapshot = await getDocs(q);
  const result = [];
  querySnapshot.forEach((document) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(document.id, ' => ', document.data());
    const obj = { [document.id]: document.data() };
    // const obj[document.id] = document.data();
    // result.push(obj);
    result.push(document.data());
  });
  return result;
}

async function uploadEntry(name, level, completionTime) {
  // Add a new message entry to the Firebase database.
  try {
    await addDoc(collection(getFirestore(), 'scores'), {
      name,
      time: completionTime,
      level,
      timestamp: serverTimestamp(),
    });
    console.log(`${name} added to Firebase`);
  } catch (error) {
    console.error('Error writing new entry to Firebase Database', error);
  }
}

async function loadScores(level) {
  // Create the query to load the last 12 messages and listen for new ones.
  const scoresQuery = query(
    collection(getFirestore(), 'scores'),
    where('level', '==', level),
    orderBy('time'),
    limit(12)
  );
  console.log(scoresQuery);
  const querySnapshot = await getDocs(scoresQuery);
  const result = [];
  querySnapshot.forEach((document) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(document.id, ' => ', document.data());
    const obj = { [document.id]: document.data() };
    result.push(document.data());
  });
  console.log(result);
  return result;
}

// export const firestore = firebase.firestore();
// export const auth = app.auth();
export default app;
export { getCollectionDocs, uploadEntry, loadScores };
