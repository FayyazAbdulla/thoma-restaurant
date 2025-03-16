import React from "react";

const OrdersByStatus = ({ ordersByStatus }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-red-100">
      <h2 className="text-xl font-semibold mb-4 text-red-600">Orders by Status</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(ordersByStatus).map(([status, count]) => (
          <div
            key={status}
            className="bg-red-50 p-4 rounded-lg hover:bg-red-100 transition-colors"
          >
            <p className="text-gray-600 capitalize">{status}</p>
            <p className="text-2xl font-bold text-red-600">
              {count.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersByStatus;