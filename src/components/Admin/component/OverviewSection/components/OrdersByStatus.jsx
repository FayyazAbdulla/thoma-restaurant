// OverviewSection/components/OrdersByStatus.jsx
import React from "react";

const OrdersByStatus = ({ ordersByStatus }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Orders by Status</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(ordersByStatus).map(([status, count]) => (
          <div key={status} className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600 capitalize">{status}</p>
            <p className="text-2xl font-bold">{count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersByStatus;