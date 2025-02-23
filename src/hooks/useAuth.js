import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from 'firebase/auth';
import swal from 'sweetalert2'; 

const useAuth = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Subscribe to authentication state changes
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser); // Set user if authenticated
            } else {
                setUser(null); // Set user to null if not authenticated
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Sign up with email and password
    const signUpUser = async (email, password, name, image) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user profile with name and image
            await updateProfile(user, {
                displayName: name,
                photoURL: image,
            });

            setUser(user); // Update the user state

            // Show success message
            swal.fire({
                title: 'Success!',
                text: 'Your account has been created successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            // Redirect to home page
            navigate('/');
        } catch (error) {
            console.error('Error signing up:', error);

            // Show error message
            swal.fire({
                title: 'Error!',
                text: error.message || 'An error occurred during sign-up. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });

            throw error;
        }
    };

    // Sign in with email and password
    const signInUser = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user); // Update the user state

            // Show success message
            swal.fire({
                title: 'Success!',
                text: 'You have signed in successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            // Redirect to home page
            navigate('/');
        } catch (error) {
            console.error('Error signing in:', error);

            // Show error message
            swal.fire({
                title: 'Error!',
                text: error.message || 'An error occurred during sign-in. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });

            throw error;
        }
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            setUser(userCredential.user); // Update the user state

            // Show success message
            swal.fire({
                title: 'Success!',
                text: 'You have signed in successfully with Google!',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            // Redirect to home page
            navigate('/');
        } catch (error) {
            console.error('Error signing in with Google:', error);

            // Show error message
            swal.fire({
                title: 'Error!',
                text: error.message || 'An error occurred during Google sign-in. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });

            throw error;
        }
    };

    // Sign out user
    const signOutUser = async () => {
        try {
            await signOut(auth); // Sign out the user
            setUser(null); // Clear the user state

            // Show success message
            swal.fire({
                title: 'Success!',
                text: 'You have been signed out successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            // Redirect to sign-in page
            navigate('/signin');
        } catch (error) {
            console.error('Error signing out:', error);

            // Show error message
            swal.fire({
                title: 'Error!',
                text: error.message || 'An error occurred during sign-out. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });

            throw error;
        }
    };

    return { user, signUpUser, signInUser, signInWithGoogle, signOutUser }; // Return user and authentication methods
};

export default useAuth;