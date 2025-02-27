import { Link } from "react-router-dom"; 
import szeLogo from "../assets/sze-logo.svg";
import { FiMenu, FiPower } from "react-icons/fi"; 

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between bg-gray-800 p-4 shadow-md min-h-[60px]">
      <div className="flex items-center space-x-2">
        {!isSidebarOpen && ( 
          <button onClick={toggleSidebar} className="text-white text-2xl">
            <FiMenu />
          </button>
        )}

        <Link to="/" className="flex items-center space-x-2">
          <img src={szeLogo} alt="Logo" className="h-8 w-8 cursor-pointer" />
          <span className="text-white font-semibold text-lg cursor-pointer">SZE - Eszközmenedzsment</span>
        </Link>
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
