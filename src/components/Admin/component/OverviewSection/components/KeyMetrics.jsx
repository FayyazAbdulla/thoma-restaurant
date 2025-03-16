import React from "react";

const KeyMetrics = ({ totalOrders, totalSales }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-red-100">
      <h2 className="text-xl font-semibold mb-4 text-red-600">Key Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50 p-4 rounded-lg hover:bg-red-100 transition-colors">
          <p className="text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold text-red-600">
            {totalOrders.toLocaleString()}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg hover:bg-red-100 transition-colors">
          <p className="text-gray-600">Total Sales Revenue</p>
          <p className="text-2xl font-bold text-red-600">
            {totalSales.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;