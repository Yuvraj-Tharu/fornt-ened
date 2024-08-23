// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "hamroreal-estate.firebaseapp.com",
  projectId: "hamroreal-estate",
  storageBucket: "hamroreal-estate.appspot.com",
  messagingSenderId: "225603715947",
  appId: "1:225603715947:web:d7317a5ac505dd889d022e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
