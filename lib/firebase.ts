// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqLhPh3rmshsKD3l4REe1AsJScS17i6xc",
  authDomain: "k2s-corner.firebaseapp.com",
  projectId: "k2s-corner",
  storageBucket: "k2s-corner.firebasestorage.app",
  messagingSenderId: "346091619888",
  appId: "1:346091619888:web:891f26c33b84d18c764ff5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
