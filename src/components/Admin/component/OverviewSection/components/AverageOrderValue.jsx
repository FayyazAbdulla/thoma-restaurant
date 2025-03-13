// OverviewSection/components/AverageOrderValue.jsx
import React from "react";

const AverageOrderValue = ({ averageOrderValue }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Average Order Value</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-600">AOV</p>
        <p className="text-2xl font-bold">₹{averageOrderValue.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default AverageOrderValue;