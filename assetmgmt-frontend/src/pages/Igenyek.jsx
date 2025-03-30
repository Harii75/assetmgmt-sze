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
        <div className="grid grid-cols-[4fr_1fr_1fr_1fr_0.5fr] gap-4 p-4 border-b border-gray-300 font-semibold text-gray-700 bg-gray-200 min-w-[800px]">
          <span>Javaslat neve és leírása</span>
          <span>Állapot</span>
          <span>Kapcsolattartó</span>
          <span>Dátum</span>
          <span className="text-center">Művelet</span>
        </div>

        {requests.length === 0 ? (
          <p className="text-gray-500 text-lg text-center p-4">Nincsenek igények.</p>
        ) : (
          requests.map((request) => {
            const allowedTransitions = STATUS_TRANSITIONS[request.status] || [];
            const isExpanded = expandedRequest === request.id;
            const formattedDate = request.created_at
              ? new Date(request.created_at).toLocaleDateString("hu-HU")
              : "N/A";

            return (
              <div key={request.id} className="border-b border-gray-300 hover:bg-gray-50 transition">
                <div
                  className="grid grid-cols-[4fr_1fr_1fr_1fr_0.5fr] gap-4 items-center p-4 min-w-[800px] cursor-pointer"
                  onClick={() => setExpandedRequest(isExpanded ? null : request.id)}
                >
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800">{request.subject}</h2>
                    <p className="text-gray-600 text-sm text-justify">{request.description}</p>
                  </div>

                  <div className="w-full" onClick={(e) => e.stopPropagation()}>
                    {allowedTransitions.length > 0 ? (
                      <select
                        value={request.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateStatus(request.id, e.target.value);
                        }}
                        disabled={STATUS_TRANSITIONS[request.status].length === 0}
                        className={`border rounded-md p-2 w-full text-sm shadow-sm cursor-pointer
                          ${STATUS_TRANSITIONS[request.status].length === 0 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-gray-100 text-gray-800"}`}
                      >
                        <option value={request.status}>{STATUS_OPTIONS[request.status]}</option>
                        {STATUS_TRANSITIONS[request.status].map((status) => (
                          <option key={status} value={status}>
                            {STATUS_OPTIONS[status]}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="p-2 rounded-md bg-gray-200 text-gray-800 text-sm block text-center">
                        {STATUS_OPTIONS[request.status]}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <p className="text-gray-700 font-medium">{request.full_name}</p>
                    <p className="text-blue-500 text-sm">{request.email}</p>
                  </div>

                  <span className="text-gray-700">{formattedDate}</span>

                  <span className="text-center text-blue-500 text-xl">
                    <span
                      className={`inline-block transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </span>
                </div>

                {isExpanded && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-md">
                    <div className="flex flex-col">
                      <p className="text-gray-600">
                        <strong>Szervezeti egység:</strong> {request.department}
                      </p>
                      <p className="text-gray-600">
                        <strong>Anyagi forrás:</strong> {request.funding_available === "igen" ? "Van" : "Nincs"}
                      </p>
                      <p className="text-gray-600">
                        <strong>Előzetes egyeztetés:</strong> {request.discussed_internally === "igen" ? "Igen" : "Nem"}
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <p className="text-gray-600">
                        <strong>Kapcsolódó fejlesztés:</strong>{" "}
                        {request.related_to_previous === "igen" ? request.previous_development : "N/A"}
                      </p>
                      <p className="text-gray-600">
                        <strong>Ismert szoftver:</strong> {request.known_software === "igen" ? "Igen" : "Nem"}
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <p className="text-gray-600">
                        <strong>Igénylő:</strong> {request.full_name}
                      </p>
                      <p className="text-gray-600">
                        <strong>Email:</strong> {request.email}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Igenyek;
