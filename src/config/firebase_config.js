import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyC1QcRcq05BfcXPy_SaRxyhI7ipUrRm3hU",
    authDomain: "new-project-aabd1.firebaseapp.com",
    projectId: "new-project-aabd1",
    storageBucket: "new-project-aabd1.appspot.com",
    messagingSenderId: "482968890260",
    appId: "1:482968890260:web:8ae0ed7c1bf19a111c3d81"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
