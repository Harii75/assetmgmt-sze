import React, { useState, useEffect } from "react";

const Greeting = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Frissíti az időt másodpercenként
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Idő formázása
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
    greetingText = "Jó éjt";
  } else if (hour < 12) {
    greetingText = "Jó reggelt";
  } else if (hour < 18) {
    greetingText = "Jó napot";
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 text-center">
      <h1 className="text-2xl font-semibold">{greetingText}, István!</h1>
      <p className="text-gray-600 text-lg mt-2">{formattedDate}</p>
      <p className="text-gray-700 font-bold text-xl mt-1">{formattedTime}</p>
    </div>
  );
};

export default Greeting;
