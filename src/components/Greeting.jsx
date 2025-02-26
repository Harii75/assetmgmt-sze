import React, { useState, useEffect } from "react";
import { FiClock } from "react-icons/fi"; // Óra ikon

const Greeting = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Frissíti az időt másodpercenként
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Idő és dátum formázása
  const formattedTime = currentTime.toLocaleTimeString("hu-HU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = currentTime.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  // Napszak meghatározása
  const hour = currentTime.getHours();
  let greetingText = "Jó estét";
  if (hour < 6) {
    greetingText = "Jó estét";
  } else if (hour < 12) {
    greetingText = "Jó reggelt";
  } else if (hour < 18) {
    greetingText = "Jó napot";
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6 text-center ">
      <h1 className="text-3xl font-bold text-gray-800">{greetingText}, Gábor!</h1>
      <p className="text-gray-500 text-lg mt-2">{formattedDate}</p>
      
      <div className="flex justify-center items-center space-x-2 mt-2 ">
        <FiClock className="text-gray-700 text-xl" />
        <p className="text-gray-700 font-bold text-xl">{formattedTime}</p>
      </div>
    </div>
  );
};

export default Greeting;
