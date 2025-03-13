// CustomerInsightsSection/components/CustomerOrders.jsx
import React from "react";

const CustomerOrders = ({ customerOrders }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Customer Orders</h2>
      <ul>
        {Object.entries(customerOrders).map(([email, orderCount], index) => (
          <li key={index} className="mb-4">
            <p className="text-gray-700 font-semibold">{email}</p>
            <p className="text-gray-500">Orders: {orderCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerOrders;