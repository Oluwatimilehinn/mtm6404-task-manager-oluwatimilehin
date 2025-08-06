// /src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDtnTWHGpDtG3thMJPOTELyoiBq2E4gK44",
  authDomain: "task-manager-12911.firebaseapp.com",
  projectId: "task-manager-12911",
  storageBucket: "task-manager-12911.appspot.com",
  messagingSenderId: "199091093359",
  appId: "1:199091093359:web:9d9ff7ec79c3b72103b29a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
