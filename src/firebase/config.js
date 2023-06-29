import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
const auth = getAuth(app);

const getCollection = (collectionName) => {
  return db.collection(collectionName);
};

const deleteDocument = async (collectionName, id) => {
  try {
    await db.collection(collectionName).doc(id).delete();
    console.log("Document deleted successfully");
  } catch (error) {
    console.log("Error occurred while deleting the document:", error);
    throw error;
  }
};

export { app, auth, db, getCollection, deleteDocument };
