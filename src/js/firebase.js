import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDYXxo-rVPZZfex_YvH_hzpE1k6f5VzCdw",
    authDomain: "noteballs-e90e4.firebaseapp.com",
    projectId: "noteballs-e90e4",
    storageBucket: "noteballs-e90e4.appspot.com",
    messagingSenderId: "45464731767",
    appId: "1:45464731767:web:29fec7d7856cb01a014672"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export {
    db,
    auth
}