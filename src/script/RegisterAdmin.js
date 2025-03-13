import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase Configuration
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
const auth = getAuth(app);
const db = getFirestore(app);

// User credentials (Make sure it's correctly defined)
const credentials = [
    {
        email: "admin@thoma.lk",
        role: "Admin",
        password: "admin123"
    }
];

export const registerUser = async () => {
    console.log("Starting user registration...");

    // Check if credentials exist and are properly formatted
    if (!Array.isArray(credentials) || credentials.length === 0) {
        console.error("No credentials found.");
        return;
    }

    for (let user of credentials) {
        if (!user || !user.email || !user.password) {
            console.error("Invalid user data:", user);
            continue; // Skip invalid user entries
        }

        try {
            console.log(`Registering user: ${user.email}`);
            
            const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
            const userId = userCredential.user.uid;

            // Store user role in Firestore
            await setDoc(doc(db, "users", userId), {
                email: user.email,
                role: user.role
            });

            console.log(`User ${user.email} registered successfully with role ${user.role}`);
        } catch (error) {
            console.error(`Error registering user ${user.email}:`, error.message);
        }
    }
};
