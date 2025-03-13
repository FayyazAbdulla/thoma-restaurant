import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for redirection
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS
import { loginHandler } from "../utils/loginHandler";
import BgAnimation from "../hooks/BgAnimation"; // Background Animation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await loginHandler(email, password);
      
      if (user) {
        // Save email in sessionStorage
        sessionStorage.setItem("adminEmail", email);
        
        toast.success("Login successful! Redirecting...", { position: "top-center" });
        
        setTimeout(() => {
          navigate("/View_Order"); // Redirect after a delay
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      toast.error(`Login failed: ${err.message}`, { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">
      <BgAnimation />
      <ToastContainer /> {/* Toastify Container for Notifications */}

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-6 md:mb-8 text-center">
          THOMA <br />
          <span className="text-lg md:text-xl">Admin Portal</span>
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-800 text-sm md:text-base"
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-800 text-sm md:text-base"
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm md:text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-xs md:text-sm">
          © {new Date().getFullYear()} THOMA. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
