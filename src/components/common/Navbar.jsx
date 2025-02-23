import React from "react";
import { useNavigate } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { useOrder } from '../../context/OrderProvider';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, signOutUser } = useAuth();
    const { order = [] } = useOrder();

    // Calculate the total number of items in the cart
    const totalItemsInCart = (order || []).reduce((total, item) => total + (item.quantity || 0), 0);

    // Handle logout
    const handleLogout = async () => {
        try {
            await signOutUser();
            navigate("/signin");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <header className="bg-white fixed z-50 top-0 left-0 w-full shadow-md">
            <nav className="flex items-center max-w-screen-xl mx-auto px-6 py-3">
                {/* Left Section */}
                <div className="flex flex-grow">
                    <h1
                        className="text-3xl font-black text-red-600 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        THOMA
                    </h1>
                </div>

                {/* Center Section - Hotline Number */}
                <div className="hidden md:flex lg:flex items-center space-x-2 mx-4">
                    <span className="text-gray-700 poppins text-sm">Shop Hotline:</span>
                    <a
                        href="tel:0772882363"
                        className="text-primary poppins text-sm font-semibold hover:text-red-600 transition duration-300"
                    >
                        0772 882 363
                    </a>
                </div>

                {/* Right Section */}
                <div className="flex items-center justify-end space-x-4">
                    {/* Cart Icon */}
                    <div className="relative flex cursor-pointer" onClick={() => navigate("/place-order")}>
                        <span className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white poppins absolute -right-2 -top-2">
                            {totalItemsInCart}
                        </span>
                        <BsCart2 className="cursor-pointer w-6 h-6 text-gray-700" />
                    </div>

                    {/* Conditional Rendering Based on User State */}
                    {user ? (
                        // Logged In State
                        <div className="flex items-center space-x-4">
                            {/* User Profile Picture */}
                            {user.photoURL && (
                                <img
                                    src={user.photoURL}
                                    alt="User"
                                    className="w-10 h-10 rounded-full"
                                />
                            )}
                            {/* User Name */}
                            <p className="text-gray-700 poppins hidden md:block lg:block">
                                {user.displayName || "User"}
                            </p>
                            {/* Logout Button */}
                            <FiLogOut
                                className="cursor-pointer w-6 h-6 text-gray-700"
                                onClick={handleLogout}
                            />
                        </div>
                    ) : (
                        // Logged Out State
                        <div className="flex items-center space-x-6">
                            <button
                                className="poppins"
                                onClick={() => navigate("/signin")}
                            >
                                Sign In
                            </button>
                            <button
                                className="bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
                                onClick={() => navigate("/signup")}
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile Hotline Number */}
            <div className="md:hidden lg:hidden bg-gray-100 py-2 text-center">
                <span className="text-gray-700 poppins text-sm">Shop Hotline:</span>
                <a
                    href="tel:0772882363"
                    className="text-primary poppins text-sm font-semibold hover:text-red-600 transition duration-300 ml-2"
                >
                    0772 882 363
                </a>
            </div>
        </header>
    );
};

export default Navbar;