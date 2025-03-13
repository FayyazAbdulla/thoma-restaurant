// CustomerInsightsSection/components/TopCustomers.jsx
import React from "react";

const TopCustomers = ({ topCustomers }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Top Customers</h2>
      <ul>
        {topCustomers.map((customer, index) => (
          <li key={index} className="mb-4">
            <p className="text-gray-700 font-semibold">{customer.email}</p>
            <p className="text-gray-500">
              Total Spending: ₹{customer.totalSpending.toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCustomers;