// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//donc our first sdk firestore
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXJopeqo0j9Scc8KNu4vs3T_d48FWtlt8",
  authDomain: "marketplace-d3b19.firebaseapp.com",
  projectId: "marketplace-d3b19",
  storageBucket: "marketplace-d3b19.appspot.com",
  messagingSenderId: "189067099995",
  appId: "1:189067099995:web:9db50e54bdc67dbb68a47e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()