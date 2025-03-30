import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center px-6">
            <h1 className="text-3xl font-bold mb-4">Hozzáférés megtagadva</h1>
            <p className="mb-6 max-w-lg">
                Az oldal csak az SZE munkatársai számára érhető el. Ha mégis probléma lenne, vegye fel a kapcsolatot az illetékessel.
            </p>
            <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            >
                Kijelentkezés
            </button>
        </div>
    );
};

export default Unauthorized;
