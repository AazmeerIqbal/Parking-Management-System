import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Component for Occupancy Rate Card
const OccupancyRateCard = ({ stats }) => {
  const data = {
    labels: ["Occupied", "Available"],
    datasets: [
      {
        data: [stats.occupancyRate, 100 - stats.occupancyRate], // Percentage data
        backgroundColor: ["#3b82f6", "#e5e7eb"], // Colors
        hoverBackgroundColor: ["#2563eb", "#d1d5db"], // Hover colors
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%", // Creates the "donut" effect
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        backgroundColor: "#1e293b", // Modern tooltip background
        titleColor: "#fff", // Tooltip title color
        bodyColor: "#fff", // Tooltip body color
        displayColors: false, // Hide color indicators in tooltip
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Occupancy Rate</h2>
      <div className="relative w-32 h-32">
        <Doughnut data={data} options={options} />
        {/* Display percentage in the center of the chart */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-blue-600">
            {stats.occupancyRate}%
          </p>
          <p className="text-sm text-gray-500">Occupancy</p>
        </div>
      </div>
    </div>
  );
};

// Main Statistics Component
const Statistics = ({ stats }) => {
  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">
        Parking Statistics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Occupancy Rate Card with Doughnut Chart */}
        <OccupancyRateCard stats={stats} />

        {/* Average Duration */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-center">
          <h3 className="text-lg font-medium text-gray-500 mb-2">
            Avg. Duration
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.averageDuration}m
          </p>
        </div>

        {/* Total Cars */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-center">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Total Cars</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalCars}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
