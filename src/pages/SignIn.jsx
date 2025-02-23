import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import Brand from '../components/Form/Brand';
import Button from '../components/Form/Button';
import GoogleSignIn from '../components/Form/GoogleSignIn';
import TextField from '../components/Form/TextField';
import useAuth from '../hooks/useAuth';

const SignIn = () => {
    const [userInput, setUserInput] = useState({
        email: '',
        password: '',
    });
    const { signInUser, signInWithGoogle } = useAuth();
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
            await signInUser(userInput.email, userInput.password);
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    // Form inputs
    const Inputs = [
        { id: 1, type: 'email', placeholder: 'Email', value: userInput.email, name: 'email' },
        { id: 2, type: 'password', placeholder: 'Password', value: userInput.password, name: 'password' },
    ];

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-xl border">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <Brand className="text-3xl sm:text-4xl text-gray-800" />
                </div>

                {/* Sign-in Form */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                    <Button text="Sign In" className="w-full" />
                </form>

                {/* Links */}
                <div className="text-center mt-4 sm:mt-6">
                    <Link to="/signup" className="text-blue-600 hover:underline text-sm sm:text-base">
                        Need an account?
                    </Link>
                </div>

                {/* Google Sign-In */}
                <div className="mt-4 sm:mt-6">
                    <GoogleSignIn text="Sign In With Google" />
                </div>
            </div>
        </main>
    );
};

export default SignIn;