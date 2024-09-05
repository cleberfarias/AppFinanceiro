// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBB5IcrCoM0ekPwC7OVkowa4_AHGedtdZw",
  authDomain: "app-financeiro-94969.firebaseapp.com",
  projectId: "app-financeiro-94969",
  storageBucket: "app-financeiro-94969.appspot.com",
  messagingSenderId: "670583430632",
  appId: "1:670583430632:web:053d4932e8e6c139f9d85d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db, collection, addDoc, getDocs, deleteDoc, doc };
