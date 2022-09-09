import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export function firesbaseInit() {
  const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
  };

  const firebaseApp = initializeApp(firebaseConfig, "word");
  const db = getFirestore(firebaseApp);
  return db;
}
