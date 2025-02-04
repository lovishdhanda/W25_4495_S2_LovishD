// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ecotots-lovishgurkanwal.firebaseapp.com",
  projectId: "ecotots-lovishgurkanwal",
  storageBucket: "ecotots-lovishgurkanwal.firebasestorage.app",
  messagingSenderId: "488658971452",
  appId: "1:488658971452:web:cb3109bc4175cfcab40c39"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);