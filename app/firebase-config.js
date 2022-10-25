import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const db = getFirestore(app);
const app = initializeApp(firebaseConfig);
