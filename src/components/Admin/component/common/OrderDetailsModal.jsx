import React from "react";

const OrderDetailsModal = ({ order = {}, onClose, convertToLKR }) => {
  // Ensure order exists and prevent errors
  const orderId = order.orderId || "N/A";
  const createdAt = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString()
    : "N/A";

  // Calculate the total price in LKR
  const totalPriceLKR = convertToLKR(order.totalAmount || 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-11/12 max-w-3xl shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-red-600 mb-2">Order Receipt</h2>
          <p className="text-gray-600 text-lg">Thank you for your purchase!</p>
        </div>

        {/* Order ID and Date */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <span className="font-semibold text-gray-700">Order ID:</span> {orderId}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Date:</span> {createdAt}
          </div>
        </div>

        {/* Customer Details */}
        <div className="mb-6 border-b pb-4">
          <h3 className="text-2xl font-semibold text-red-600 mb-4">Customer Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <span className="font-semibold">Name:</span> {order.customerDetails?.name || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {order.customerDetails?.email || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {order.customerDetails?.phone || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {order.customerDetails?.flatno || "N/A"}, 
              {order.customerDetails?.roadNo || "N/A"}
            </p>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="mb-6 border-b pb-4">
          <h3 className="text-2xl font-semibold text-red-600 mb-4">Order Items</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-red-50">
                  <th className="py-2 px-4 border text-left">Item</th>
                  <th className="py-2 px-4 border text-left">Description</th>
                  <th className="py-2 px-4 border text-left">Quantity</th>
                  <th className="py-2 px-4 border text-left">Price (LKR)</th>
                  <th className="py-2 px-4 border text-left">Total (LKR)</th>
                </tr>
              </thead>
              <tbody>
                {(order.items || []).length > 0 ? (
                  order.items.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border">{item.title || "N/A"}</td>
                      <td className="py-2 px-4 border">{item.description || "N/A"}</td>
                      <td className="py-2 px-4 border">{item.quantity || 0}</td>
                      <td className="py-2 px-4 border">{convertToLKR(item.price) || "0.00"}</td>
                      <td className="py-2 px-4 border">
                        {convertToLKR(item.price * item.quantity) || "0.00"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">
                      No items in this order
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Price */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-2xl font-semibold text-red-600">Total Price:</p>
          <p className="text-2xl font-bold text-red-600">{totalPriceLKR}</p>
        </div>

        {/* Close Button */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors text-lg"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;