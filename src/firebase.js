// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ⬅️ أضفنا هادي

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ6G0cIKY6HbKXs7yPVmctrOTCnXYxNHU",
  authDomain: "jiminbirthday-c6826.firebaseapp.com",
  databaseURL: "https://jiminbirthday-c6826-default-rtdb.firebaseio.com",
  projectId: "jiminbirthday-c6826",
  storageBucket: "jiminbirthday-c6826.firebasestorage.app",
  messagingSenderId: "582092093025",
  appId: "1:582092093025:web:ebdbdc4aca44277a511c20",
  measurementId: "G-9RWZWHTWQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app); // ⬅️ أضفنا هادي باش نستعملو Firestore
export { analytics };
