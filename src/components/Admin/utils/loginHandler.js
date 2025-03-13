import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../../config/firebase"; // Ensure the correct path
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions

export const loginHandler = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Generate Firebase token
    const token = await user.getIdToken();
    
    // Save token to sessionStorage
    sessionStorage.setItem("firebaseToken", token);
    sessionStorage.setItem("userId", user.uid); // Save user ID for later use
    
    // Save token to Firestore
    await saveTokenToFirestore(user.uid, token);
    
    console.log("User logged in:", user);
    return user; // Return the user for redirection
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw new Error(error.message); // Ensure error is correctly thrown
  }
};

// Function to save token to Firestore
const saveTokenToFirestore = async (userId, token) => {
  try {
    // Save the token in Firestore under a "tokens" collection
    await setDoc(doc(firestore, "tokens", userId), {
      token: token,
      createdAt: new Date().toISOString(), // Optional: Add a timestamp
    });
    
    console.log("Token saved to Firestore successfully");
  } catch (error) {
    console.error("Error saving token to Firestore:", error.message);
    throw error;
  }
};