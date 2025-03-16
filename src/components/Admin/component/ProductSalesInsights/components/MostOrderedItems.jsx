// ProductSalesInsights/components/MostOrderedItems.jsx
import React from "react";

const MostOrderedItems = ({ mostOrderedItems }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-red-600">Most Ordered Items</h2>
      <ul>
        {mostOrderedItems.map((item, index) => (
          <li key={index} className="mb-4 p-4 bg-red-50 rounded-lg">
            <p className="text-gray-700 font-semibold">{item.itemName}</p>
            <p className="text-red-600 font-bold">{item.quantity}x</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostOrderedItems;