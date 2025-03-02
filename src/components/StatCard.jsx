import React, { useEffect, useState } from "react";
import { FiBarChart2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const API_URL = "https://192.168.101.60:8000/api/v1/hardware";
const API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWYxYzIyZjQxOThmZGVjNTNiNjk4NjFhNDNhZTFlM2UyOTRkN2VjNjJlNjc0ODQ5MWQ1OWI4NTM3NjUwMjk3ZjcwNmU3MjM2YWY0YmFkYjIiLCJpYXQiOjE3Mzk5ODI0MTEuODI0Njc3LCJuYmYiOjE3Mzk5ODI0MTEuODI0Njc5LCJleHAiOjMwMDIyODY0MTEuODIxMjE3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.c6PsoI9u8gqeJKnhz90BU5pgy46WoWCmc_eVuLh_mB77FYFL7bKRi36AbxE9czquoTGmekiOEOJbzchfJ6aphMyZdyLmymp8LuHV4wJr3Qa4GeoNEZvfb2SNkWW3ZV2mbXbBzJ_SDYWAYreWJCUNChWUWWYQCe0CXhynJGCThWRWL_ps3EkYLfUxm_puvFPvk03HfFKpIg0qvVBAYRgpKkWUIDyzuKPyH-tXRcMpeLUuRbPvJXqa7LPIilLm4KLboe8Z2HnlP_UUMTshH_0sCYLHEoEUJ7jZ6n_7eSGp1-DPrhVBxH3yvC8gaikk-q2GPv8Xp67CgFMrJFW2ctInWYX-awXgqgnxqMNGcUFzUfnaTsdoExToLY-4D-DPMN2zSOnmbu6FH3963eSO2FMEdzX4j_fme-LTDsGji7REQ8RslqTcOEMB3vbtGG3LbCXn-r-N_9fVh2cyJvwCrxxd7BeQCiyzO-p4HWqrflCYPSj1VXgDATz6zU_p3imisN5IItSzzOFKU64yp5UQ6uWe3BzTh1G2wVFnAQjJW5mdExtWBvx5HwBD2Mqg2Vey33-k9TCMM6myUFetGiEWUhDEnmTo4KHzNND7DSHWDsQ5Pwy6C6vXf7xKL4SkAL_8W6LCQ3s_EizEmu58bq_M2AqWZ6YyTyjQyxLiVovzgzyXL5o"; 
const CACHE_KEY = "categoryCountsCache";
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 ora

const StatCards = () => {
  const [stats, setStats] = useState({
    Szoftverek: 0,
    Licenszek: 0,
    Projektek: 0,
    Igények: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log("API Response:", result);

        // Count categories dynamically
        const categoryCounts = result.rows.reduce((acc, item) => {
          const category = item.category?.name || "Unknown";
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        console.log("Category Counts:", categoryCounts);

        // Store in state and cache
        const updatedStats = {
          Szoftverek: categoryCounts["Szoftver"] || 0,
          Licenszek: categoryCounts["Licensz"] || 0,
          Projektek: categoryCounts["Projekt"] || 0,
          Igények: categoryCounts["Igény"] || 0,
        };

        setStats(updatedStats);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: updatedStats }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Check cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRATION) {
        console.log("Using Cached Data");
        setStats(data);
        setLoading(false);
        return;
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6 w-full px-6 mb-10 mt-4">
      {loading && <p className="text-blue-600">Betöltés...</p>}
      {error && <p className="text-red-600">Hiba: {error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
          <StatCard title="Szoftverek" value={`${stats.Szoftverek} db`} color="text-green-500" />
          <StatCard title="Licenszek" value={`${stats.Licenszek} db`} color="text-blue-500" />
          <StatCard title="Projektek" value={`${stats.Projektek} db`} color="text-yellow-500" />
          <StatCard title="Igények" value={`${stats.Igények} db`} color="text-red-500" />
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  const navigate = useNavigate();
  const route = title === "Igények" ? "/igenyek" : "/eszkozok";

return (
    <div
      onClick={() => navigate(route)}
      className="w-full max-w-6xl mx-auto p-10 rounded-lg shadow-md bg-white flex justify-between items-center cursor-pointer hover:bg-gray-200 transition"
    >
      <div>
        <h2 className="text-sm text-gray-600">{title}</h2>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <FiBarChart2 className={`text-6xl ${color}`} />
    </div>
  );
}

export default StatCards;
