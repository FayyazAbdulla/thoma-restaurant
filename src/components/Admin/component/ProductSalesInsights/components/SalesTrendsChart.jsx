// ProductSalesInsights/components/SalesTrendsChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesTrendsChart = ({ salesTrends }) => {
  const data = {
    labels: Object.keys(salesTrends),
    datasets: [
      {
        label: "Sales Trends",
        data: Object.values(salesTrends),
        borderColor: "#DC2626", // Red color
        backgroundColor: "rgba(220, 38, 38, 0.2)", // Light red fill
        fill: true,
        tension: 0.4, // Smooth line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#DC2626", // Red color for legend
        },
      },
      title: {
        display: true,
        text: "Sales Trends",
        color: "#DC2626", // Red color for title
      },
    },
    scales: {
      x: {
        grid: {
          color: "#F3F4F6", // Light gray grid lines
        },
        ticks: {
          color: "#6B7280", // Gray text
        },
      },
      y: {
        grid: {
          color: "#F3F4F6", // Light gray grid lines
        },
        ticks: {
          color: "#6B7280", // Gray text
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesTrendsChart;