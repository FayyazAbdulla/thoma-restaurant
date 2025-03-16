import React from "react";

const AverageOrderValue = ({ averageOrderValue }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-red-100">
      <h2 className="text-xl font-semibold mb-4 text-red-600">Average Order Value</h2>
      <div className="bg-red-50 p-4 rounded-lg hover:bg-red-100 transition-colors">
        <p className="text-gray-600">AOV</p>
        <p className="text-2xl font-bold text-red-600">
          {averageOrderValue.toFixed(2).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default AverageOrderValue;