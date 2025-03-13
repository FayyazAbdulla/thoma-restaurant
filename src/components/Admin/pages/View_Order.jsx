import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { collection, getDocs } from "firebase/firestore"; // Firestore imports
import { firestore } from "../../../config/firebase"; // Import your Firestore instance
import ClosedOrderList from "../component/closed_orders/ClosedOrderList";
import OrderList from "../component/order_view/OrderList";
import OverviewSection from "../component/OverviewSection/OverviewSection"; // Import the OverviewSection component
import CustomerInsightsSection from "../component/CustomerInsightsSection/CustomerInsightsSection"; // Import the CustomerInsightsSection component

function View_Order() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [view, setView] = useState("Pending");
  const [orders, setOrders] = useState([]); // State to store fetched orders
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Fetch orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(firestore, "closed_orders"); // Reference to the collection
        const ordersSnapshot = await getDocs(ordersCollection); // Fetch documents
        const ordersData = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })); // Map documents to an array of order objects
        setOrders(ordersData); // Update state with fetched orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchOrders(); // Call the fetch function
  }, []);

  // Check if the user is authenticated before rendering the page
  useEffect(() => {
    const adminEmail = sessionStorage.getItem("adminEmail");
    const firebaseToken = sessionStorage.getItem("firebaseToken");

    // If the user is not authenticated, redirect to the login page
    if (!adminEmail || !firebaseToken) {
      navigate("/Admin_login");
    }

    // Retrieve the saved view preference from sessionStorage
    const savedView = sessionStorage.getItem("viewPreference");
    if (savedView) {
      setView(savedView); // Set the view based on user preference
    }
  }, [navigate]);

  // Function to handle view change and save preference
  const handleViewChange = (label) => {
    if (view !== label) {
      setView(label); // Update the view state
      sessionStorage.setItem("viewPreference", label); // Save the preference in sessionStorage
    }
  };

  // Function to render toggle buttons dynamically
  const renderToggleButton = (label) => {
    const isActive = view === label;
    return (
      <button
        onClick={() => handleViewChange(label)}
        className={`px-4 py-2 rounded-full transition-colors font-semibold text-sm md:text-base ${
          isActive
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        aria-pressed={isActive}
      >
        {label}
      </button>
    );
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-20 mt-10">
      {/* Toggle Buttons */}
      <div className="flex space-x-4 mb-8 justify-center md:justify-start">
        {renderToggleButton("Pending")}
        {renderToggleButton("Closed")}
        {renderToggleButton("Overview")}
        {renderToggleButton("Customer Insights")}
      </div>

      {/* Display Component Based on View */}
      <div className="mt-4">
        {view === "Pending" ? (
          <OrderList />
        ) : view === "Closed" ? (
          <ClosedOrderList />
        ) : view === "Overview" ? (
          <OverviewSection orders={orders} />
        ) : (
          <CustomerInsightsSection orders={orders} />
        )}
      </div>
    </div>
  );
}

export default View_Order;