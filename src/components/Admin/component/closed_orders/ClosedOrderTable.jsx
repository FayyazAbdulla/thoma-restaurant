import React, { useState } from "react";
import OrderDetailsModal from "../common/OrderDetailsModal";
import { Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ClosedOrderTable = ({ closedOrders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Function to convert price to LKR
  const convertToLKR = (price) => {
    const exchangeRate = 300; // Example: 1 USD = 300 LKR
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price * exchangeRate);
  };

  // Function to handle opening the modal
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="mt-20 mb-20 p-4">
      {/* Table Container with Horizontal Scroll for Mobile */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-red-500 text-white sticky top-0">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Closed At</th>
              <th className="py-3 px-4 text-left">Customer Name</th>
              <th className="py-3 px-4 text-left">Customer Email</th>
              <th className="py-3 px-4 text-left">Customer Phone</th>
              <th className="py-3 px-4 text-left">Closing Remark</th>
              <th className="py-3 px-4 text-left">Total Price (LKR)</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {closedOrders.map((order, index) => {
                const closedAt = order.closedAt
                  ? new Date(order.closedAt).toLocaleString()
                  : "N/A";

                return (
                  <motion.tr
                    key={order.orderId}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-red-100 transition-colors`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="py-3 px-4 border-b">{order.orderId}</td>
                    <td className="py-3 px-4 border-b">{closedAt}</td>
                    <td className="py-3 px-4 border-b">
                      {order.customerDetails?.name || "N/A"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {order.customerDetails?.email || "N/A"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {order.customerDetails?.phone || "N/A"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {order.closingRemark || "N/A"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {convertToLKR(order.totalAmount)}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <div className="flex items-center gap-3">
                        {/* View Details Button */}
                        <motion.button
                          onClick={() => handleViewDetails(order)}
                          className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
                          title="View Details"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={handleCloseModal}
            convertToLKR={convertToLKR}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClosedOrderTable;