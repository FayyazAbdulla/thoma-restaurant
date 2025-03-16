// ProductSalesInsights/components/RevenueByCategory.jsx
import React from "react";

const RevenueByCategory = ({ revenueByCategory }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-red-600">Revenue by Category</h2>
      <ul>
        {Object.entries(revenueByCategory).map(([category, revenue], index) => (
          <li key={index} className="mb-4 p-4 bg-red-50 rounded-lg">
            <p className="text-gray-700 font-semibold">{category}</p>
            <p className="text-red-600 font-bold">LKR {revenue.toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RevenueByCategory;