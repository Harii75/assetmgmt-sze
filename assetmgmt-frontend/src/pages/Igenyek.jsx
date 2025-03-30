import { useEffect, useState } from "react";

const STATUS_OPTIONS = {
  new: "Új",
  pending: "Függőben",
  reviewing: "Felülvizsgálat alatt",
  rejected: "Elutasítva",
  in_progress: "Folyamatban",
  completed: "Teljesítve",
};

const STATUS_TRANSITIONS = {
  new: ["pending", "reviewing"],
  pending: ["reviewing", "in_progress", "rejected"],
  reviewing: ["in_progress", "rejected"],
  in_progress: ["completed", "rejected"],
  rejected: ["pending", "in_progress", "reviewing", "completed"],
  completed: ["pending", "in_progress", "reviewing", "rejected"],
};

const API_URL = "/api/igenyfelvetel";

const Igenyek = () => {
  const [requests, setRequests] = useState([]);
  const [expandedRequest, setExpandedRequest] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Hiba történt az adatok lekérésekor.");
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Hiba:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    const currentStatus = requests.find((r) => r.id === id)?.status || "new";
    if (!STATUS_TRANSITIONS[currentStatus]?.includes(newStatus)) return;
    await sendUpdate(id, { status: newStatus });
  };

  const sendUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Nem sikerült frissíteni az állapotot.");

      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: updatedData.status } : req
        )
      );
    } catch (error) {
      console.error("Hiba frissítés közben:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Javaslatok</h1>

      <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        <table className="min-w-[900px] w-full table-auto">
          <thead className="bg-gray-200 text-gray-700 font-semibold border-b border-gray-300">
            <tr>
              <th className="text-left px-4 py-3 w-[40%]">Javaslat neve és leírása</th>
              <th className="text-left px-4 py-3">Állapot</th>
              <th className="text-left px-4 py-3">Kapcsolattartó</th>
              <th className="text-left px-4 py-3">Dátum</th>
              <th className="text-center px-4 py-3">Művelet</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  Nincsenek igények.
                </td>
              </tr>
            ) : (
              requests.map((request) => {
                const allowedTransitions = STATUS_TRANSITIONS[request.status] || [];
                const isExpanded = expandedRequest === request.id;
                const formattedDate = request.created_at
                  ? new Date(request.created_at).toLocaleDateString("hu-HU")
                  : "N/A";

                return (
                  <>
                    <tr
                      key={request.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                      onClick={() => setExpandedRequest(isExpanded ? null : request.id)}
                    >
                      <td className="px-4 py-3 cursor-pointer">
                        <div className="font-semibold text-gray-800">{request.subject}</div>
                        <div className="text-sm text-gray-600 text-justify">{request.description}</div>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={request.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateStatus(request.id, e.target.value);
                          }}
                          disabled={allowedTransitions.length === 0}
                          className={`border rounded-md p-2 w-full text-sm shadow-sm cursor-pointer
                            ${allowedTransitions.length === 0
                              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                              : "bg-gray-100 text-gray-800"}`}
                        >
                          <option value={request.status}>{STATUS_OPTIONS[request.status]}</option>
                          {allowedTransitions.map((status) => (
                            <option key={status} value={status}>
                              {STATUS_OPTIONS[status]}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-700">{request.full_name}</div>
                        <div className="text-sm text-blue-500">{request.email}</div>
                      </td>
                      <td className="px-4 py-3">{formattedDate}</td>
                      <td className="px-4 py-3 text-center text-xl text-blue-500">
                        <span className={`inline-block transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                          ▼
                        </span>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan="5" className="bg-gray-50 px-4 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <p className="text-gray-600">
                                <strong>Szervezeti egység:</strong> {request.department}
                              </p>
                              <p className="text-gray-600">
                                <strong>Anyagi forrás:</strong>{" "}
                                {request.funding_available === "igen" ? "Van" : "Nincs"}
                              </p>
                              <p className="text-gray-600">
                                <strong>Előzetes egyeztetés:</strong>{" "}
                                {request.discussed_internally === "igen" ? "Igen" : "Nem"}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">
                                <strong>Kapcsolódó fejlesztés:</strong>{" "}
                                {request.related_to_previous === "igen"
                                  ? request.previous_development
                                  : "N/A"}
                              </p>
                              <p className="text-gray-600">
                                <strong>Ismert szoftver:</strong>{" "}
                                {request.known_software === "igen" ? "Igen" : "Nem"}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">
                                <strong>Igénylő:</strong> {request.full_name}
                              </p>
                              <p className="text-gray-600">
                                <strong>Email:</strong> {request.email}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Igenyek;
