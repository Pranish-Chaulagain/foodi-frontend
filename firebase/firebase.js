// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbLw0TssVK-P57ORWUfOUnv45OdP-4agE",
  authDomain: "food-i-47423.firebaseapp.com",
  projectId: "food-i-47423",
  storageBucket: "food-i-47423.appspot.com",
  messagingSenderId: "460440892962",
  appId: "1:460440892962:web:d3b3d44600c3be5f25fc7b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
