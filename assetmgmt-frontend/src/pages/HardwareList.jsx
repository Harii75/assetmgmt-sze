import React, { useEffect, useState } from "react";

const HardwareList = () => {
  const [hardwareData, setHardwareData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const API_URL = "https://192.168.101.60:8000/api/v1/hardware";
  const API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWYxYzIyZjQxOThmZGVjNTNiNjk4NjFhNDNhZTFlM2UyOTRkN2VjNjJlNjc0ODQ5MWQ1OWI4NTM3NjUwMjk3ZjcwNmU3MjM2YWY0YmFkYjIiLCJpYXQiOjE3Mzk5ODI0MTEuODI0Njc3LCJuYmYiOjE3Mzk5ODI0MTEuODI0Njc5LCJleHAiOjMwMDIyODY0MTEuODIxMjE3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.c6PsoI9u8gqeJKnhz90BU5pgy46WoWCmc_eVuLh_mB77FYFL7bKRi36AbxE9czquoTGmekiOEOJbzchfJ6aphMyZdyLmymp8LuHV4wJr3Qa4GeoNEZvfb2SNkWW3ZV2mbXbBzJ_SDYWAYreWJCUNChWUWWYQCe0CXhynJGCThWRWL_ps3EkYLfUxm_puvFPvk03HfFKpIg0qvVBAYRgpKkWUIDyzuKPyH-tXRcMpeLUuRbPvJXqa7LPIilLm4KLboe8Z2HnlP_UUMTshH_0sCYLHEoEUJ7jZ6n_7eSGp1-DPrhVBxH3yvC8gaikk-q2GPv8Xp67CgFMrJFW2ctInWYX-awXgqgnxqMNGcUFzUfnaTsdoExToLY-4D-DPMN2zSOnmbu6FH3963eSO2FMEdzX4j_fme-LTDsGji7REQ8RslqTcOEMB3vbtGG3LbCXn-r-N_9fVh2cyJvwCrxxd7BeQCiyzO-p4HWqrflCYPSj1VXgDATz6zU_p3imisN5IItSzzOFKU64yp5UQ6uWe3BzTh1G2wVFnAQjJW5mdExtWBvx5HwBD2Mqg2Vey33-k9TCMM6myUFetGiEWUhDEnmTo4KHzNND7DSHWDsQ5Pwy6C6vXf7xKL4SkAL_8W6LCQ3s_EizEmu58bq_M2AqWZ6YyTyjQyxLiVovzgzyXL5o"; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${API_TOKEN}`,
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setHardwareData(result.rows || []);
        setFilteredData(result.rows || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseIntOrZero = (value) => {
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? 0 : parsedValue;
  };

  const formatNumber = (num) => {
    return num.toLocaleString("hu-HU");
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredData(hardwareData);
      return;
    }

    const filtered = hardwareData.filter((item) => {
      return (
        item.asset_tag?.toLowerCase().includes(query) ||
        item.name?.toLowerCase().includes(query) ||
        item.custom_fields?.Kategória?.value?.toLowerCase().includes(query) ||
        item.custom_fields?.Megnevezés?.value?.toLowerCase().includes(query) ||
        item.custom_fields?.["Nyilv hely megnevezése"]?.value?.toLowerCase().includes(query) ||
        item.custom_fields?.Osztály?.value?.toLowerCase().includes(query) ||
        item.custom_fields?.Darab?.value?.toLowerCase().includes(query) ||
        item.custom_fields?.Alszám?.value?.toLowerCase().includes(query) ||
        item.custom_fields?.Személy?.value?.toLowerCase().includes(query) ||
        item.custom_fields?.["Pü-i központ"]?.value?.toLowerCase().includes(query)
      );
    });

    setFilteredData(filtered);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-4">Összes eszköz</h2>

      <div className="mb-3">
        <input
          type="text"
          placeholder="🔍 Keresés..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      {loading && <p className="text-blue-600 text-sm">Betöltés...</p>}
      {error && <p className="text-red-600 text-sm">Hiba: {error}</p>}

      {!loading && !error && (
        <div className="bg-white shadow-sm rounded-md overflow-hidden">
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              <tr className="border-b border-gray-300">
                <th className="p-2 text-left">Azonosító</th>
                <th className="p-2 text-left">Eszköz neve</th>
                <th className="p-2 text-left">Kategória</th>
                <th className="p-2 text-left">Megnevezés</th>
                <th className="p-2 text-left">Szervezeti egység</th>
                <th className="p-2 text-left">Műveletek</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredData.map((item, index) => (
                <React.Fragment key={item.id}>
                  <tr
                    className="border-b border-gray-300 hover:bg-gray-50 text-sm cursor-pointer"
                    onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                  >
                    <td className="p-2">{item.asset_tag || "N/A"}</td>
                    <td className="p-2">{item.name || "N/A"}</td>
                    <td className="p-2">{item.custom_fields?.Kategória?.value || "N/A"}</td>
                    <td className="p-2">{item.custom_fields?.Megnevezés?.value || "N/A"}</td>
                    <td className="p-2">{item.custom_fields?.["Nyilv hely megnevezése"]?.value || "N/A"}</td>
                    <td className="p-2 text-blue-500 text-center">{expanded === item.id ? "▲" : "▼"}</td>
                  </tr>

                  {expanded === item.id && (
                    <tr>
                      <td colSpan="6" className="p-5 bg-gray-50 border-l-5 border-blue-500 rounded-md shadow-sm text-xs">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                          <div className="space-y-3">
                            <div className="flex items-center">
                              <span className="mr-1 text-gray-600 font-medium">Osztály:</span>
                              <span className="text-gray-900">{item.custom_fields?.Osztály?.value || "N/A"}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-1 text-gray-600 font-medium">Darab:</span>
                              <span className="text-gray-900">{item.custom_fields?.Darab?.value || "N/A"}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-1 text-gray-600 font-medium">Alszám:</span>
                              <span className="text-gray-900">{parseIntOrZero(item.custom_fields?.Alszám?.value)}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-1 text-gray-600 font-medium">Beszerzés Dátuma:</span>
                              <span className="text-gray-900">{item.custom_fields?.["Beszerzés Dátuma"]?.value || "N/A"}</span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center">
                              <span className="mr-1 text-gray-600 font-medium">Nettó érték:</span>
                              <span className="text-gray-900">{formatNumber(parseIntOrZero(item.custom_fields?.["Nettó érték"]?.value))} HUF</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-1 text-gray-600 font-medium">Bruttó érték:</span>
                              <span className="text-gray-900">{formatNumber(parseIntOrZero(item.custom_fields?.Brutto_ertek?.value))} HUF</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-1 text-gray-600 font-medium">Nyilv. hely kód:</span>
                              <span className="text-gray-900">{item.custom_fields?.["Nyilv hely kód"]?.value || "N/A"}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-1 text-gray-600 font-medium">Felelős:</span>
                              <span className="text-gray-900 capitalize">
                                {item.custom_fields?.Személy?.value?.toLowerCase() || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>              
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HardwareList;
