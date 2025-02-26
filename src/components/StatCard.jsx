import React from "react";
import { FiBarChart2, FiTrendingUp, FiPlusCircle } from "react-icons/fi"; // Icons

const StatCards = () => {
  return (
    <div className="flex flex-col items-center space-y-6 w-full px-6 my-10">

      {/* Responsive Stat Cards - Ensuring Full Width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
        <StatCard title="Szoftverek" value="874db" change="+2.6%" color="text-green-500" bgColor="bg-gray-100" />
        <StatCard title="Licenszek" value="1 283db" change="+0.2%" color="text-blue-500" bgColor="bg-gray-100" />
        <StatCard title="Projektek" value="1 286db" change="-1.4%" color="text-yellow-500" bgColor="bg-gray-100" />
        <StatCard title="Igények" value="350db" change="+3.1%" color="text-red-500" bgColor="bg-gray-100" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, color, bgColor }) => {
  return (
    <div className={`p-10 rounded-lg shadow-md ${bgColor} flex justify-between items-center w-full`}>
      <div>
        <h2 className="text-sm text-gray-600">{title}</h2>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="flex items-center text-sm text-gray-500 mt-1">
          <FiTrendingUp className={`${color} mr-1`} /> {change} az elmúlt 7 napban
        </p>
      </div>
      <FiBarChart2 className={`text-3xl ${color}`} />
    </div>
  );
};

export default StatCards;
