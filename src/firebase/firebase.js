// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHVp4cs-HfGFWdrJEF2VefgjG4T7cM9Dg",
  authDomain: "instagram-clone-78f5f.firebaseapp.com",
  projectId: "instagram-clone-78f5f",
  storageBucket: "instagram-clone-78f5f.appspot.com",
  messagingSenderId: "187824298664",
  appId: "1:187824298664:web:96f7c2ebbc693f6791809d",
  measurementId: "G-KBRL7FF70P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
