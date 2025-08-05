// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_SEOAL5JNJtJP4C6M3SvyD2lgBq70TxQ",
  authDomain: "zuch-72a11.firebaseapp.com",
  projectId: "zuch-72a11",
  storageBucket: "zuch-72a11.appspot.com",
  messagingSenderId: "522778278047",
  appId: "1:522778278047:web:262db82ce20b76b6d4caaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
