import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import Brand from '../components/Form/Brand';
import Button from '../components/Form/Button';
import GoogleSignIn from '../components/Form/GoogleSignIn';
import TextField from '../components/Form/TextField';
import useAuth from '../hooks/useAuth';

const SignUp = () => {
    const [userInput, setUserInput] = useState({
        name: '',
        email: '',
        image: '',
        password: '',
    });
    const { signUpUser } = useAuth();
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        const { value, name } = e.target;
        setUserInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUpUser(userInput.email, userInput.password, userInput.name, userInput.image);
            swal.fire({
                title: 'Success!',
                text: 'Your account has been created successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
            navigate('/signin'); // Redirect to the sign-in page
        } catch (error) {
            let errorMessage = 'An error occurred during signup. Please try again.';

            // Handle specific Firebase errors
            if (error.code === 'auth/weak-password') {
                errorMessage = 'Password should be at least 6 characters.';
            } else if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'The email address is already in use.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'The email address is invalid.';
            }

            // Display the error message using swal
            swal.fire({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    // Form inputs
    const Inputs = [
        { id: 1, type: 'text', placeholder: 'Name', value: userInput.name, name: 'name' },
        { id: 2, type: 'email', placeholder: 'Email', value: userInput.email, name: 'email' },
        // { id: 3, type: 'text', placeholder: 'Profile Picture Link', value: userInput.image, name: 'image' },
        { id: 3, type: 'password', placeholder: 'Password', value: userInput.password, name: 'password' },
    ];

    return (
        <main className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            <div className="flex flex-col items-center w-full max-w-md p-6 bg-white rounded-lg shadow-2xl border border-gray-300">
                {/* Logo */}
                <Brand className="text-6xl" />

                {/* Sign-up form */}
                <form className="w-full mt-6 space-y-4" onSubmit={handleSubmit}>
                    {Inputs.map((input) => (
                        <TextField
                            key={input.id}
                            type={input.type}
                            placeholder={input.placeholder}
                            value={input.value}
                            name={input.name}
                            onChange={handleChange}
                        />
                    ))}

                    <Button text="Sign Up" className="w-full mt-4" />

                    <Link to="/signin">
                        <p className="text-sm md:text-base text-gray-600 text-center mt-4 hover:underline">
                            Already have an account?
                        </p>
                    </Link>

                    <GoogleSignIn text="Sign Up With Google" className="w-full mt-4" />
                </form>
            </div>
        </main>
    );
};

export default SignUp;