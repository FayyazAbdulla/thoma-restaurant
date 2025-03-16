import React from "react";

const RecentCustomers = ({ recentCustomers }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-red-100">
      <h2 className="text-xl font-semibold mb-4 text-red-600">Recent Customers</h2>
      <ul className="max-h-96 overflow-y-auto">
        {recentCustomers.map((customer, index) => (
          <li key={index} className="mb-4 p-4 border-b border-red-50 hover:bg-red-50 transition-colors">
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