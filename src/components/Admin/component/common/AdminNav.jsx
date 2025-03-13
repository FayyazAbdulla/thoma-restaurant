import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import AdminIndicator from "./AdminIndicator";
import { toast } from "react-toastify"; // Import Toastify
import { firestore } from "../../../../config/firebase"; // Import Firestore
import { deleteDoc, doc } from "firebase/firestore"; // Import Firestore functions

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false); // State to track logout process

  useEffect(() => {
    // Get the email from sessionStorage if available
    const email = sessionStorage.getItem("adminEmail");
    if (email) {
      setAdminEmail(email);
    }
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true); // Start logout process
    try {
      // Get the user ID and token from sessionStorage
      const userId = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("firebaseToken");

      if (userId && token) {
        // Delete token from Firestore
        await deleteTokenFromFirestore(userId);
      }

      // Clear sessionStorage
      sessionStorage.removeItem("adminEmail");
      sessionStorage.removeItem("firebaseToken");
      sessionStorage.removeItem("userId");

      // Show logout success message
      toast.success("Successfully logged out!", { position: "top-center" });

      // Delay navigation and reload to allow toast to appear
      setTimeout(() => {
        navigate("/Admin_login");
        window.location.reload(); // Ensure fresh state after redirection
      }, 2000); // 2-second delay to show toast notification
    } catch (error) {
      console.error("Error during logout:", error.message);
      toast.error("Failed to logout. Please try again.", {
        position: "top-center",
      });
    } finally {
      setIsLoggingOut(false); // End logout process
    }
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to delete token from Firestore
  const deleteTokenFromFirestore = async (userId) => {
    try {
      // Delete the token document from Firestore
      await deleteDoc(doc(firestore, "tokens", userId));
      console.log("Token deleted from Firestore successfully");
    } catch (error) {
      console.error("Error deleting token from Firestore:", error.message);
      throw error;
    }
  };

  return (
    <header className="bg-black fixed z-50 top-0 left-0 w-full shadow-md">
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto px-6 py-3">
        <h1
          className="text-4xl font-extrabold text-red-600 cursor-pointer hover:text-red-800 transition-colors"
          onClick={() => navigate("/")}
          role="heading"
          aria-level="1"
        >
          THOMA <span className="text-lg font-medium">Admin Portal</span>
        </h1>

        {/* Move this block inside useEffect to ensure it updates on state change */}
        {adminEmail && (
          <div className="hidden md:flex items-center space-x-6 text-white">
            {/* Display admin email if logged in */}
            <AdminIndicator email={adminEmail} />

            {/* Logout Button, only display if adminEmail is available */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut} // Disable button during logout
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-transparent hover:bg-red-600 hover:text-white transition duration-300 ease-in-out"
            >
              {isLoggingOut ? (
                // Loading spinner during logout
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-2">Logging out...</span>
                </div>
              ) : (
                // Normal logout button content
                <>
                  <FiLogOut
                    size={22}
                    className="transition-transform duration-300 group-hover:rotate-[-10deg]"
                  />
                  <span>Logout</span>
                </>
              )}
            </button>
          </div>
        )}

        <button
          className="md:hidden text-white text-2xl"
          onClick={handleMenuToggle}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          {/* Sidebar Container */}
          <div className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-gray-900 text-white shadow-xl transform transition-transform duration-300 ease-in-out translate-x-0">
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <HiX size={28} />
            </button>

            {/* Sidebar Content */}
            <div className="flex flex-col items-center mt-16 space-y-6 px-6">
              {/* Admin Email & Indicator */}
              {adminEmail && (
                <div className="flex items-center space-x-3">
                  <AdminIndicator email={adminEmail} />
                </div>
              )}

              {/* Logout Button */}
              {adminEmail && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  disabled={isLoggingOut}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out"
                >
                  {isLoggingOut ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="ml-2">Logging out...</span>
                    </div>
                  ) : (
                    <>
                      <FiLogOut size={22} />
                      <span>Logout</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
