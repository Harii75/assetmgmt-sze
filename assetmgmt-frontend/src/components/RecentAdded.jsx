import React, { useEffect, useState } from "react";

const RecentAdded = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://192.168.101.60:8000/api/v1/hardware";
  const API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWYxYzIyZjQxOThmZGVjNTNiNjk4NjFhNDNhZTFlM2UyOTRkN2VjNjJlNjc0ODQ5MWQ1OWI4NTM3NjUwMjk3ZjcwNmU3MjM2YWY0YmFkYjIiLCJpYXQiOjE3Mzk5ODI0MTEuODI0Njc3LCJuYmYiOjE3Mzk5ODI0MTEuODI0Njc5LCJleHAiOjMwMDIyODY0MTEuODIxMjE3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.c6PsoI9u8gqeJKnhz90BU5pgy46WoWCmc_eVuLh_mB77FYFL7bKRi36AbxE9czquoTGmekiOEOJbzchfJ6aphMyZdyLmymp8LuHV4wJr3Qa4GeoNEZvfb2SNkWW3ZV2mbXbBzJ_SDYWAYreWJCUNChWUWWYQCe0CXhynJGCThWRWL_ps3EkYLfUxm_puvFPvk03HfFKpIg0qvVBAYRgpKkWUIDyzuKPyH-tXRcMpeLUuRbPvJXqa7LPIilLm4KLboe8Z2HnlP_UUMTshH_0sCYLHEoEUJ7jZ6n_7eSGp1-DPrhVBxH3yvC8gaikk-q2GPv8Xp67CgFMrJFW2ctInWYX-awXgqgnxqMNGcUFzUfnaTsdoExToLY-4D-DPMN2zSOnmbu6FH3963eSO2FMEdzX4j_fme-LTDsGji7REQ8RslqTcOEMB3vbtGG3LbCXn-r-N_9fVh2cyJvwCrxxd7BeQCiyzO-p4HWqrflCYPSj1VXgDATz6zU_p3imisN5IItSzzOFKU64yp5UQ6uWe3BzTh1G2wVFnAQjJW5mdExtWBvx5HwBD2Mqg2Vey33-k9TCMM6myUFetGiEWUhDEnmTo4KHzNND7DSHWDsQ5Pwy6C6vXf7xKL4SkAL_8W6LCQ3s_EizEmu58bq_M2AqWZ6YyTyjQyxLiVovzgzyXL5o"; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            Accept: "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();

        const parseDate = (dateStr) => {
          if (!dateStr) return null;
          dateStr = dateStr.replace(/"/g, "").trim(); 
          const parts = dateStr.split("-");
  
          if (parts.length === 3) {
            return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
          }
          return null;
        };
  
        const now = new Date();
        const threeYearsAgo = new Date();
        threeYearsAgo.setFullYear(now.getFullYear() - 3);
  
        const filteredData = result.rows?.filter((item) => {
          const dateStr = item.custom_fields?.["Beszerzés Dátuma"]?.value;
          const parsedDate = parseDate(dateStr);
  
          return parsedDate && parsedDate >= threeYearsAgo;
        }) || [];

        const sortedData = filteredData
          .sort((a, b) => {
            const dateA = parseDate(a.custom_fields?.["Beszerzés Dátuma"]?.value);
            const dateB = parseDate(b.custom_fields?.["Beszerzés Dátuma"]?.value);
            return (dateB || 0) - (dateA || 0);
          })
          .slice(0, 10);
  
        setData(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  
  

  return (
    <div className="bg-white shadow-md p-6 rounded-lg m-6">
      <h2 className="text-xl font-semibold mb-4">Utoljára hozzáadva</h2>

      {loading && <p className="text-blue-600">Betöltés...</p>}
      {error && <p className="text-red-600">Hiba: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 rounded-t-lg border-b border-gray-300">
                <th className="p-3 text-left">Azonosító</th>
                <th className="p-3 text-left">Eszköz neve</th>
                <th className="p-3 text-left">Kategória</th>
                <th className="p-3 text-right">Beszerzés dátuma</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="bg-white hover:bg-gray-100 transition border-b border-gray-300">
                  <td className="p-3">{item.asset_tag || "N/A"}</td>
                  <td className="p-3">{item.name || "N/A"}</td>
                  <td className="p-3">{item.custom_fields?.Kategória?.value || "N/A"}</td>
                  <td className="p-3 text-right whitespace-nowrap">
                    {new Date(item.custom_fields?.["Beszerzés Dátuma"]?.value).toLocaleDateString("hu-HU")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentAdded;
