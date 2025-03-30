import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import NotFound from "./pages/NotFound.jsx";
import Igenyek from "./pages/Igenyek.jsx";
import HibaBejelentesek from "./pages/HibaBejelentesek.jsx";
import Igényfelvétel from "./pages/Igenyfelvetel.jsx";
import HardwareList from "./pages/HardwareList.jsx";
import FilteredHardwareList from "./pages/FilteredHardwareList.jsx";
import Hibak from "./pages/Hibak.jsx";
import LoginPage from "./pages/LoginPage";
import StatCard from "./components/StatCard";
import YearlySoftwareChart from "./components/YearlySoftwareChart";
import RecentAdded from "./components/RecentAdded";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

function App() {
    return (
        <AuthProvider>
            <Router>
                <MainContent />
            </Router>
        </AuthProvider>
    );
}

const MainContent = () => {
    const { user, loading } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const hideLayout = location.pathname === "/unauthorized";

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen text-white text-xl">Loading...</div>;
    }

    return (
        <div className="flex">
            {user && !hideLayout && (
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
            )}
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
                {user && !hideLayout && (
                    <Header isSidebarOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                )}
                <main>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <StatCard />
                                        <YearlySoftwareChart />
                                        <RecentAdded />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/unauthorized" element={<Unauthorized />} />
                        <Route path="/eszkozok" element={<ProtectedRoute><HardwareList /></ProtectedRoute>} />
                        <Route path="/igenyek" element={<ProtectedRoute><Igenyek /></ProtectedRoute>} />
                        <Route path="/hibabejelentesek" element={<ProtectedRoute><HibaBejelentesek /></ProtectedRoute>} />
                        <Route path="/igenyfelvetel" element={<ProtectedRoute><Igényfelvétel /></ProtectedRoute>} />
                        <Route path="/eszkozok/szoftverek" element={<ProtectedRoute><FilteredHardwareList category="Szoftver" /></ProtectedRoute>} />
                        <Route path="/eszkozok/licenszek" element={<ProtectedRoute><FilteredHardwareList category="Licensz" /></ProtectedRoute>} />
                        <Route path="/eszkozok/projektek" element={<ProtectedRoute><FilteredHardwareList category="Projektek" /></ProtectedRoute>} />
                        <Route path="/hibak" element={<ProtectedRoute><Hibak /></ProtectedRoute>} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default App;
