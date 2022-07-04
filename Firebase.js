import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdb79jH2gh7S5JljJrZptOVPtv0mhxliI",
  authDomain: "clone-bc6d2.firebaseapp.com",
  projectId: "clone-bc6d2",
  storageBucket: "clone-bc6d2.appspot.com",
  messagingSenderId: "747667022351",
  appId: "1:747667022351:web:74da4e025c9dc3a188797a"
};

// Initialize Firebase
const app = !getApps.length? initializeApp(firebaseConfig):getApp();
const db = getFirestore()

export {db, app}