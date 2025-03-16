// ProductSalesInsights/ProductSalesInsights.jsx
import React from "react";
import MostOrderedItems from "./components/MostOrderedItems";
import RevenueByCategory from "./components/RevenueByCategory";
import SalesByItemTypeChart from "./components/SalesByItemTypeChart";
import SalesTrendsChart from "./components/SalesTrendsChart";
import { calculateProductSalesInsights, formatDataForCharts } from "./utils/calculateProductSalesInsights";

const ProductSalesInsights = ({ orders }) => {
  const { mostOrderedItems, revenueByCategory } = calculateProductSalesInsights(orders);
  const { salesByItemType, salesTrends } = formatDataForCharts(orders);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MostOrderedItems mostOrderedItems={mostOrderedItems} />
      <RevenueByCategory revenueByCategory={revenueByCategory} />
      <SalesByItemTypeChart salesByItemType={salesByItemType} />
      <SalesTrendsChart salesTrends={salesTrends} />
    </div>
  );
};

export default ProductSalesInsights;