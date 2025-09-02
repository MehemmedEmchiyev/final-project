import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
      apiKey: "AIzaSyBeCax8bjDmVaKanB5g8VWzSX2D2oqezgU",
      authDomain: "epic-games.ramazanismayilovh.me",
      projectId: "epic-games-f494e",
      storageBucket: "epic-games-f494e.firebasestorage.app",
      messagingSenderId: "289372212276",
      appId: "1:289372212276:web:ea92909410e4b0d6570e61",
      measurementId: "G-VX9S713ZV4"
    };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
