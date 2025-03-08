import { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import StatCard from "./components/StatCard.jsx";
import RecentAdded from "./components/RecentAdded.jsx";
import YearlySoftwareChart from "./components/YearlySoftwareChart";

import NotFound from "./pages/NotFound.jsx";
import Igenyek from "./pages/Igenyek.jsx";
import HibaBejelentesek from "./pages/HibaBejelentesek.jsx";
import Igényfelvétel from "./pages/Igenyfelvetel.jsx";
import HardwareList from "./pages/HardwareList.jsx";
import FilteredHardwareList from "./pages/FilteredHardwareList.jsx";
import Hibak from "./pages/Hibak.jsx";
import LoginPage from "./pages/LoginPage"; // Import Login Page

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
          <Header isSidebarOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
          <main className="p-6">
            <Routes>
              <Route path="/" element={
                <>
                  <StatCard />
                  <YearlySoftwareChart/>
                  <RecentAdded />
                </>
              }/>
              <Route path="/login" element={<LoginPage />} /> 
              <Route path="/eszkozok" element={<HardwareList/>} />
              <Route path="/igenyek" element={<Igenyek />} />
              <Route path="/hibabejelentesek" element={<HibaBejelentesek />} />
              <Route path="/igenyfelvetel" element={<Igényfelvétel />} />
              <Route path="/eszkozok" element={<HardwareList />} />
              <Route path="/eszkozok/szoftverek" element={<FilteredHardwareList category="Szoftver" />} />
              <Route path="/eszkozok/licenszek" element={<FilteredHardwareList category="Licensz" />} />
              <Route path="/eszkozok/projektek" element={<FilteredHardwareList category="Projektek" />} />
              <Route path="/hibak" element={<Hibak/>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
