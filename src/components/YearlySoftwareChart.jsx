import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const API_URL = "https://192.168.101.60:8000/api/v1/hardware";
const API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWYxYzIyZjQxOThmZGVjNTNiNjk4NjFhNDNhZTFlM2UyOTRkN2VjNjJlNjc0ODQ5MWQ1OWI4NTM3NjUwMjk3ZjcwNmU3MjM2YWY0YmFkYjIiLCJpYXQiOjE3Mzk5ODI0MTEuODI0Njc3LCJuYmYiOjE3Mzk5ODI0MTEuODI0Njc5LCJleHAiOjMwMDIyODY0MTEuODIxMjE3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.c6PsoI9u8gqeJKnhz90BU5pgy46WoWCmc_eVuLh_mB77FYFL7bKRi36AbxE9czquoTGmekiOEOJbzchfJ6aphMyZdyLmymp8LuHV4wJr3Qa4GeoNEZvfb2SNkWW3ZV2mbXbBzJ_SDYWAYreWJCUNChWUWWYQCe0CXhynJGCThWRWL_ps3EkYLfUxm_puvFPvk03HfFKpIg0qvVBAYRgpKkWUIDyzuKPyH-tXRcMpeLUuRbPvJXqa7LPIilLm4KLboe8Z2HnlP_UUMTshH_0sCYLHEoEUJ7jZ6n_7eSGp1-DPrhVBxH3yvC8gaikk-q2GPv8Xp67CgFMrJFW2ctInWYX-awXgqgnxqMNGcUFzUfnaTsdoExToLY-4D-DPMN2zSOnmbu6FH3963eSO2FMEdzX4j_fme-LTDsGji7REQ8RslqTcOEMB3vbtGG3LbCXn-r-N_9fVh2cyJvwCrxxd7BeQCiyzO-p4HWqrflCYPSj1VXgDATz6zU_p3imisN5IItSzzOFKU64yp5UQ6uWe3BzTh1G2wVFnAQjJW5mdExtWBvx5HwBD2Mqg2Vey33-k9TCMM6myUFetGiEWUhDEnmTo4KHzNND7DSHWDsQ5Pwy6C6vXf7xKL4SkAL_8W6LCQ3s_EizEmu58bq_M2AqWZ6YyTyjQyxLiVovzgzyXL5o"; 
const CACHE_KEY = "yearlySoftwareData";
const CACHE_TIME = 60 * 60 * 1000; // 1 ora

const YearlySoftwareChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check cache
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

        if (cachedData && cachedTimestamp && Date.now() - cachedTimestamp < CACHE_TIME) {
          console.log("Using cached data");
          setChartData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        console.log("Fetching new data from API...");
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

        const yearlyCounts = {};

        result.rows?.forEach((item) => {
          const dateStr = item.custom_fields?.["Beszerzés Dátuma"]?.value;
          if (dateStr) {
            const year = dateStr.split("-")[0]; 
            if (!yearlyCounts[year]) {
              yearlyCounts[year] = 0;
            }
            yearlyCounts[year] += 1;
          }
        });

        const formattedData = Object.entries(yearlyCounts)
          .map(([year, count]) => ({ year, count }))
          .sort((a, b) => a.year - b.year);

        localStorage.setItem(CACHE_KEY, JSON.stringify(formattedData));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now());

        setChartData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg m-6 mb-10 p-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800 pb-3">Évente Beszerzett Szoftverek és Licenszek</h2>

      {loading && <p className="text-blue-600 text-center">Betöltés...</p>}
      {error && <p className="text-red-600 text-center">Hiba: {error}</p>}

      {!loading && !error && (
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 40, left: 40, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 14, fill: "#4B5563" }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 14, fill: "#4B5563" }} />
              <Tooltip contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "6px" }} />
              <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default YearlySoftwareChart;
