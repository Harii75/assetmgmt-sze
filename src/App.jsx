import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import StatCard from "./components/StatCard.jsx";
import RecentAdded from "./components/RecentAdded.jsx";
import Greeting from "./components/Greeting.jsx";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
  <>
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <Greeting/>  
        <main className="p-6">
          {/* Négy modern statisztikai kártya egy sorban */}
          <div>
            <StatCard/>

          </div>
          <RecentAdded />
        </main>
      </div>
    </div>
  </>
  );
}

export default App;
