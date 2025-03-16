import React, { useEffect, useState } from "react";
import axios from "axios";

const STATUS_OPTIONS = {
  new: "Új",
  pending: "Függőben",
  solving: "Megoldás alatt",
  solved: "Megoldva",
};

const STATUS_TRANSITIONS = {
  new: ["pending", "solving"],
  pending: ["solving", "solved"],
  solving: ["solved"],
  solved: [],
};

const API_URL = "http://192.168.101.60:5000/api/hibabejelentesek";

const Hibak = () => {
  const [reports, setReports] = useState([]);
  const [expandedReport, setExpandedReport] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [confirming, setConfirming] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Hiba történt az adatok lekérésekor.");

      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Hiba:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    if (newStatus === "solved") {
      setConfirming({ id, status: newStatus });
      return;
    }
    await sendStatusUpdate(id, newStatus);
  };

  const confirmStatusChange = async () => {
    if (confirming) {
      await sendStatusUpdate(confirming.id, confirming.status);
      setConfirming(null);
    }
  };

  const sendStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Nem sikerült frissíteni az állapotot.");

      setReports((prev) =>
        prev.map((report) =>
          report.id === id ? { ...report, status } : report
        )
      );
    } catch (error) {
      console.error("Hiba frissítés közben:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Bejelentett hibák</h1>

      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 p-4 border-b border-gray-300 font-semibold text-gray-700 bg-gray-200 rounded-t-lg">
          <span>Hiba részletei</span>
          <span>Állapot</span>
          <span>Képek</span>
          <span>Dátum</span>
        </div>

        {reports.length === 0 ? (
          <p className="text-gray-500 text-lg text-center p-4">Nincsenek hibabejelentések.</p>
        ) : (
          reports.map((report) => {
            const isExpanded = expandedReport === report.id;
            const formattedDate = report.created_at
              ? new Date(report.created_at).toLocaleDateString("hu-HU")
              : "N/A";

            return (
              <div
                key={report.id}
                className="border-b border-gray-300 hover:bg-gray-50 transition cursor-pointer"
                onClick={() => setExpandedReport(isExpanded ? null : report.id)}
              >
                <div className="grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 items-center p-4">
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800">{report.title}</h2>
                    <p className="text-gray-600 text-sm">{report.description}</p>
                  </div>

                  <div className="w-full" onClick={(e) => e.stopPropagation()}>
                      {report.status === "solved" ? (
                        <span className="p-2 rounded-md bg-gray-200 text-gray-800 text-sm block text-center">
                          {STATUS_OPTIONS[report.status]}
                        </span>
                      ) : (
                        <select
                          value={report.status}
                          onChange={(e) => updateStatus(report.id, e.target.value)}
                          className="border rounded-md p-2 w-full text-sm bg-gray-100 text-gray-800 shadow-sm"
                        >
                          {Object.entries(STATUS_OPTIONS).map(([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>


                  <div className="flex space-x-2">
                    {report.screenshots && report.screenshots.length > 0 ? (
                      report.screenshots.map((url, index) => (
                        <img
                          key={index}
                          src={`http://192.168.101.60:5000${url}`}
                          alt="screenshot"
                          className="w-16 h-16 rounded-md shadow-md object-cover cursor-pointer hover:scale-110 transition"
                          onClick={() => setSelectedImage(`http://192.168.101.60:5000${url}`)}
                        />
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">Nincs kép</span>
                    )}
                  </div>

                  <span className="text-gray-700">{formattedDate}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative">
            <img src={selectedImage} alt="Preview" className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-6 bg-red-500 text-white px-3 py-2 rounded-full text-lg shadow-md hover:bg-red-600 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {confirming && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">
              Biztosan véglegesíti az állapotot: {STATUS_OPTIONS[confirming.status]}?
            </h2>
            <button onClick={confirmStatusChange} className="bg-green-600 text-white px-4 py-2 rounded-md">
              Igen
            </button>
            <button onClick={() => setConfirming(null)} className="bg-red-500 text-white px-4 py-2 rounded-md ml-4">
              Mégse
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hibak;
