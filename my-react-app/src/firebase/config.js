// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDtJXKUIaS9RgZWSejMiADyTkIi-meI7W0",
  authDomain: "fast-touch-f11ab.firebaseapp.com",
  projectId: "fast-touch-f11ab",
  storageBucket: "fast-touch-f11ab.firebasestorage.app",
  messagingSenderId: "197253475460",
  appId: "1:197253475460:web:e42567edcc2b4bd42526d1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };   