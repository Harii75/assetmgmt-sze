import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Eszkozok = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const location = useLocation();

  // Get category from URL (e.g., ?category=softwares)
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "all";

  useEffect(() => {
    // Fetch all items once
    fetch("https://api.example.com/devices") // Replace with actual API
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Filter items based on the category
    if (category === "all") {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) => item.category === category));
    }
  }, [category, items]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800">Eszközök</h1>
      <p className="text-gray-600 mt-2">
        {category === "all" ? "Az összes eszköz" : `Kategória: ${category}`}
      </p>

      {/* Render the filtered list */}
      <ul className="mt-4">
        {filteredItems.map((item) => (
          <li key={item.id} className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-500">{item.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Eszkozok;
