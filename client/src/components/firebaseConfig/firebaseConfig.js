// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCNKTKRWIknL8RcG4mtTjCkd3ej9TaHIJQ",
  authDomain: "chatapp-58474.firebaseapp.com",
  projectId: "chatapp-58474",
  storageBucket: "chatapp-58474.appspot.com",
  messagingSenderId: "564594384958",
  appId: "1:564594384958:web:c888569db96058188ab16f",
  measurementId: "G-S60596B3KV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default getFirestore(app)