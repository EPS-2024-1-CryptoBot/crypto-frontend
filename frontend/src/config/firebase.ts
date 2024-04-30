// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA9gsfTDB9OLD6KajAw3Dn3VoJwVZDsZQw",
  authDomain: "crypto-dev-c6903.firebaseapp.com",
  projectId: "crypto-dev-c6903",
  storageBucket: "crypto-dev-c6903.appspot.com",
  messagingSenderId: "1085628621676",
  appId: "1:1085628621676:web:86cbd64bc26b724dc88949",
  measurementId: "G-BCKP7SMVEV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);