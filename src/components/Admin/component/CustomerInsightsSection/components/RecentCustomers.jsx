// CustomerInsightsSection/components/RecentCustomers.jsx
import React from "react";

const RecentCustomers = ({ recentCustomers }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Customers</h2>
      <ul>
        {recentCustomers.map((customer, index) => (
          <li key={index} className="mb-4">
            <p className="text-gray-700 font-semibold">{customer.name}</p>
            <p className="text-gray-500">{customer.email}</p>
            <p className="text-gray-500">{customer.phone}</p>
            <p className="text-gray-500 text-sm">
              Last Order: {new Date(customer.lastOrderDate).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentCustomers;