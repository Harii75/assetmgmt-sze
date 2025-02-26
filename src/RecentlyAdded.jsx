import React from "react";

const recentlyAddedData = [
  { id: "INV-1001", name: "Neptun Gazdálkodási modul /SAP/", category: "Szoftver", price: "273,050,000 Ft", status: "Paid" },
  { id: "INV-1002", name: "Szoftver SZEPORTAL", category: "Szoftver", price: "64,426,250 Ft", status: "Out of date" },
  { id: "INV-1003", name: "ACHILES INNOVATIV Okt.támogató rendsz.", category: "Szoftver", price: "55,010,000 Ft", status: "Paid" },
  { id: "INV-1004", name: "Szoftver TPA alapú valós idejű járműzaj szimuláció", category: "Szoftver", price: "48,557,797 Ft", status: "Pending" },
];

const getStatusBadge = (status) => {
  if (status === "Paid") {
    return <span className="bg-green-200 text-green-700 px-2 py-1 rounded">Paid</span>;
  } else if (status === "Out of date") {
    return <span className="bg-red-200 text-red-700 px-2 py-1 rounded">Out of date</span>;
  } else {
    return <span className="bg-yellow-200 text-yellow-700 px-2 py-1 rounded">Pending</span>;
  }
};

const RecentlyAdded = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="font-semibold text-lg mb-4">Nemrég hozzáadva</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border border-gray-200 text-left">Invoice ID</th>
              <th className="p-3 border border-gray-200 text-left">Megnevezés</th>
              <th className="p-3 border border-gray-200 text-left">Kategória</th>
              <th className="p-3 border border-gray-200 text-left">Bruttó érték</th>
              <th className="p-3 border border-gray-200 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentlyAddedData.map((item) => (
              <tr key={item.id} className="border border-gray-200">
                <td className="p-3 border border-gray-200">{item.id}</td>
                <td className="p-3 border border-gray-200">{item.name}</td>
                <td className="p-3 border border-gray-200">{item.category}</td>
                <td className="p-3 border border-gray-200">{item.price}</td>
                <td className="p-3 border border-gray-200">{getStatusBadge(item.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentlyAdded;
