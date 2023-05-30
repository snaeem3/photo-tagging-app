import firebase from 'firebase/app';
import 'firebase/firestore'; // If you're using Firestore
import 'firebase/auth'; // If you're using Authentication

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

export const firestore = firebase.firestore();
export const auth = app.auth();
export default app;
