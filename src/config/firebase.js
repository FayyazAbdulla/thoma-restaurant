import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB9a2LNuH_Q9Ggb5fFxa_Inj32N7zWljCg",
    authDomain: "thoma-db.firebaseapp.com",
    projectId: "thoma-db",
    storageBucket: "thoma-db.firebasestorage.app",
    messagingSenderId: "881242519331",
    appId: "1:881242519331:web:e8524cb96a78d26aa97e96",
    measurementId: "G-HTJ1ZJP82L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

// Export Firebase services
export { auth, firestore, app };