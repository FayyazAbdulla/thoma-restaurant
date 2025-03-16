import React from "react";
import DownloadClosedOrders from "./DownloadClosedOrders";
import DownloadOrders from "./DownloadOrders";
import Foods from "./Foods";
import DownloadClosedOrdersExcel from "./DownloadClosedOrdersExcel";
import DailySalesPDF from "./DailySalesPDF";
import ProductSoldSummaryPDF from "./ProductSoldSummaryPDF";

const DataDownloadPanel = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Data Download Center</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DownloadClosedOrders />
        <DownloadOrders />
        <Foods />
        <DownloadClosedOrdersExcel />
        <DailySalesPDF />
        <ProductSoldSummaryPDF />
      </div>
    </div>
  );
};

export default DataDownloadPanel;