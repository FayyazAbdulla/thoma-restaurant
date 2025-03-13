// CustomerInsightsSection/CustomerInsightsSection.jsx
import React from "react";
import RecentCustomers from "./components/RecentCustomers";
import TopCustomers from "./components/TopCustomers";
import CustomerOrders from "./components/CustomerOrders";
import { calculateCustomerInsights } from "./utils/calculateCustomerInsights";

const CustomerInsightsSection = ({ orders }) => {
  const { recentCustomers, topCustomers, customerOrders } =
    calculateCustomerInsights(orders);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
      <RecentCustomers recentCustomers={recentCustomers} />
      <TopCustomers topCustomers={topCustomers} />
      <CustomerOrders customerOrders={customerOrders} />
    </div>
  );
};

export default CustomerInsightsSection;