// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = { // Removed export
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "zuch-72a11.firebaseapp.com",
  projectId: "zuch-72a11",
  storageBucket: "zuch-72a11.firebasestorage.app",
  messagingSenderId: "522778278047",
  appId: "1:522778278047:web:262db82ce20b76b6d4caaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);