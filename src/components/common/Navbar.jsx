import React from 'react';
import { BsCart2 } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
    return (
        <header className="bg-white fixed z-50 top-0 left-0 w-full shadow-md">
            <nav className="flex items-center max-w-screen-xl mx-auto px-6 py-3">
                {/* Left Section */}
                <div className="flex flex-grow">
                    <h1 className="text-3xl font-black text-red-600 cursor-pointer">THOMA</h1>
                </div>

                {/* Right Section - Logged In State */}
                <div className="flex items-center justify-end space-x-4">
                    {/* <a href="/admin" className="text-gray-600">Admin</a> */}
                    <div className="relative flex cursor-pointer">
                        <span className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white poppins absolute -right-2 -top-2">0</span>
                        <BsCart2 className="cursor-pointer w-6 h-6 text-gray-700" />
                    </div>
                    {/* <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full" />
                    <p className="text-gray-700 poppins hidden md:block lg:block">John Doe</p> */}
                    <FiLogOut className="cursor-pointer w-6 h-6 text-gray-700" />
                </div>

                {/* Right Section - Logged Out State */}
                {/* Uncomment this section if you want to show the logged-out state */}
                {/* 
                <div className="flex items-center justify-end space-x-6">
                    <button className="poppins">Sign In</button>
                    <button className="bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105">Sign Up</button>
                </div>
                */}
            </nav>
        </header>
    );
};

export default Navbar;