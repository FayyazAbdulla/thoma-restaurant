import React, { useState } from "react";
import { doc, updateDoc, collection, addDoc, getDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../../../config/firebase";
import { XCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS

const StatusChangeButton = ({ orderId, onStatusChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closingRemark, setClosingRemark] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button

  const handleCloseOrder = async () => {
    if (!closingRemark) {
      toast.warning("Please enter a closing remark.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true); // Start loading

    try {
      // Move the order to the closed_orders collection
      const orderRef = doc(firestore, "orders", orderId);
      const orderSnapshot = await getDoc(orderRef);
      const orderData = orderSnapshot.data();

      // Add the order to the closed_orders collection
      await addDoc(collection(firestore, "closed_orders"), {
        ...orderData,
        closingRemark,
        status: "closed",
        closedAt: new Date(),
      });

      // Delete the order from the orders collection
      await deleteDoc(orderRef);

      // Notify the parent component
      onStatusChange();
      setIsModalOpen(false);

      // Show success toast
      toast.success("Order closed successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error closing order:", error);

      // Show error toast
      toast.error("Failed to close the order. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 border border-red-500 text-red-500 rounded-full shadow-sm hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110"
        title="Close Order"
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <XCircle className="w-6 h-6" />
        )}
      </button>

      {/* Modal for closing order */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4">Close Order</h2>
            <textarea
              placeholder="Enter closing remark..."
              value={closingRemark}
              onChange={(e) => setClosingRemark(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              rows="4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseOrder}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? "Closing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default StatusChangeButton;