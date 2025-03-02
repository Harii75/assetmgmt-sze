import { useNavigate } from "react-router-dom";
import szeLogo from "../assets/sze-logo.svg";
import { FiMenu, FiPower } from "react-icons/fi";

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between bg-[#41465C] p-1 shadow-md min-h-[60px]">
      <div className="flex items-center space-x-2">
        {!isSidebarOpen && (
          <>
            <button
              onClick={toggleSidebar}
              className="flex items-center space-x-2 text-white text-lg"
            >
              <FiMenu className="text-2xl ml-10" />
            </button>

            {/* Hide when sidebar is open */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <img src={szeLogo} alt="Logo" className="h-8 w-8 ml-5" />
              <span className="font-semibold text-2xl text-white">
                Eszközmenedzsment
              </span>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex flex-col items-center text-white">
          <span className="text-lg font-semibold">Harangozó Gábor</span>
          <span className="text-sm text-gray-300">(Felhasználó)</span>
        </div>
        <button className="text-white text-xl hover:text-red-400 mr-8 ml-8">
          <FiPower />
        </button>
      </div>
    </header>
  );
};

export default Header;
