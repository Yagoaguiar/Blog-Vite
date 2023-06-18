import { initializeApp } from "firebase/app";
import { getFirestore } from "firabase/firabase";


const firebaseConfig = {
  apiKey: "AIzaSyAbe2dvmR-D8ESwTD6LJbweiq5IfUYDqPM",
  authDomain: "blog-9b753.firebaseapp.com",
  projectId: "blog-9b753",
  storageBucket: "blog-9b753.appspot.com",
  messagingSenderId: "733934706609",
  appId: "1:733934706609:web:0efaac6535b2107c716790"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };