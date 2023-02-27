// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import firebase from 'firebase/compat/app';
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage';
import {getFirestore, collection} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu--dYTQHuNcxbbZTW3YR77gdN8DUuHMs",
  authDomain: "instrgram-reels.firebaseapp.com",
  projectId: "instrgram-reels",
  storageBucket: "instrgram-reels.appspot.com",
  messagingSenderId: "682098966276",
  appId: "1:682098966276:web:f6e1ee5e8926daa2619a51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const auth = getAuth();

export {app, auth};

export const database = {
  users :collection(firestore,"users"), 
  posts :collection(firestore,"posts"),
  comments:collection(firestore,"comments"),
}

export const storage = getStorage(app)