// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ecotots-61935.firebaseapp.com",
  projectId: "ecotots-61935",
  storageBucket: "ecotots-61935.firebasestorage.app",
  messagingSenderId: "841537503992",
  appId: "1:841537503992:web:d707fb4ebe8c029fa3310d",
  measurementId: "G-R1ND6LJGHE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);