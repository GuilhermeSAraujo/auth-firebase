// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEC9Sf2Qg7bTILvOugLlaiZg4LhGVKLeM",
  authDomain: "ecommerce-4870e.firebaseapp.com",
  projectId: "ecommerce-4870e",
  storageBucket: "ecommerce-4870e.appspot.com",
  messagingSenderId: "379922350333",
  appId: "1:379922350333:web:6d8105611c8e3740e57e94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
