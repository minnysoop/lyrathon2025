// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsE0Iy-ryBHY0ePSeI_k_UrTP93OVNW3o",
  authDomain: "lyrathon2025.firebaseapp.com",
  projectId: "lyrathon2025",
  storageBucket: "lyrathon2025.firebasestorage.app",
  messagingSenderId: "865862672056",
  appId: "1:865862672056:web:e3ac7be9aeec96ecd9de4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);