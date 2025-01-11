// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// import {getFirestore} from 'firebase/firestore'
import {getDatabase, ref, set} from 'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMDb_K9CFVilKacUIQr3zod5GJdQ9GPHo",
  authDomain: "hackathon-real-e47db.firebaseapp.com",
  databaseURL: "https://hackathon-real-e47db-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hackathon-real-e47db",
  storageBucket: "hackathon-real-e47db.firebasestorage.app",
  messagingSenderId: "929871905545",
  appId: "1:929871905545:web:b4367d93d13ae4e59649d8",
  measurementId: "G-C21DJEXP3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth =getAuth(app);
// export const db = getFirestore(app);
export const db = getDatabase(app); 
export default app; 
