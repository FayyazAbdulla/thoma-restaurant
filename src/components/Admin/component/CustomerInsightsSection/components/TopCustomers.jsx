import React from "react";

const TopCustomers = ({ topCustomers }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-red-100">
      <h2 className="text-xl font-semibold mb-4 text-red-600">Top Customers</h2>
      <ul className="max-h-96 overflow-y-auto">
        {topCustomers.map((customer, index) => (
          <li key={index} className="mb-4 p-4 border-b border-red-50 hover:bg-red-50 transition-colors">
            <p className="text-gray-700 font-semibold">{customer.email}</p>
            <p className="text-gray-500">
              Total Spending: {customer.totalSpending.toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCustomers;