// OverviewSection/OverviewSection.jsx
import React from "react";
import KeyMetrics from "./components/KeyMetrics";
import OrdersByStatus from "./components/OrdersByStatus";
import AverageOrderValue from "./components/AverageOrderValue";
import { calculateMetrics } from "./utils/calculateMetrics";

const OverviewSection = ({ orders }) => {
  const { totalOrders, totalSales, ordersByStatus, averageOrderValue } =
    calculateMetrics(orders);

  return (
    <div className="p-4">
      <KeyMetrics totalOrders={totalOrders} totalSales={totalSales} />
      <OrdersByStatus ordersByStatus={ordersByStatus} />
      <AverageOrderValue averageOrderValue={averageOrderValue} />
    </div>
  );
};

export default OverviewSection;