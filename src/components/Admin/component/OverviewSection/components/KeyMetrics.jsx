// OverviewSection/components/KeyMetrics.jsx
import React from "react";

const KeyMetrics = ({ totalOrders, totalSales }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">Total Sales Revenue</p>
          <p className="text-2xl font-bold">₹{totalSales.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;