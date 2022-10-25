import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// Initialize Firebase
//add from the github web

const firebaseConfig = {
  apiKey: "AIzaSyA-z_kREcNdfv96h9h08kEigpYkXIgwOuQ",
  authDomain: "peon-app-a92ac.firebaseapp.com",
  projectId: "peon-app-a92ac",
  storageBucket: "peon-app-a92ac.appspot.com",
  messagingSenderId: "376243520267",
  appId: "1:376243520267:web:674520eb183ca686d5580e",
  measurementId: "G-SZ4SXNHMR2",
};

// Initialize Firebase
//add from the github web
export const db = getFirestore(app);
const app = initializeApp(firebaseConfig);
