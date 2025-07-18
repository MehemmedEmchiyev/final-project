import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBspVgxt9VBC3acgaAklaqw95Sjljcq6D4",
  authDomain: "epic-e450a.firebaseapp.com",
  projectId: "epic-e450a",
  storageBucket: "epic-e450a.firebasestorage.app",
  messagingSenderId: "383798869303",
  appId: "1:383798869303:web:ab1ed82ca1db958fdbeeb2",
  measurementId: "G-RY5ESNDN7H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
