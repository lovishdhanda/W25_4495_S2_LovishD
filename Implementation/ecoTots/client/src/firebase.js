// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ecototsmern-66b2a.firebaseapp.com",
  projectId: "ecototsmern-66b2a",
  storageBucket: "ecototsmern-66b2a.firebasestorage.app",
  messagingSenderId: "251033137769",
  appId: "1:251033137769:web:4d99de31b90d8b0243a8f8"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);