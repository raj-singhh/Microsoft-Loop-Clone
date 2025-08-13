// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "loop-clone-48ea9.firebaseapp.com",
  projectId: "loop-clone-48ea9",
  storageBucket: "loop-clone-48ea9.firebasestorage.app",
  messagingSenderId: "316971772216",
  appId: "1:316971772216:web:4a22d1cc39e16be9a0f9cd",
  measurementId: "G-941X7EEE7P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
// const analytics = getAnalytics(app);