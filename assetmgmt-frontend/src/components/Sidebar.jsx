import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import szeLogo from "../assets/sze-logo.svg";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[#242943] shadow-lg transition-all duration-300 w-64 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      }`}
    >
      <div className="flex flex-col bg-[#242943] px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={szeLogo} alt="Logo" className="h-8 w-8" />
            <span className="text-white font-semibold text-2xl">Eszközök</span>
          </Link>
          <button onClick={toggleSidebar} className="text-blue-400 text-xl">
            <AiOutlineClose />
          </button>
        </div>
        <div className="w-full border-b border-gray-600 mt-4"></div>
      </div>

      <div className="px-4 pb-4 text-white space-y-2">
        <SidebarItem icon="🛠️" title="Hibabejelentés" path="/hibabejelentesek" />
        <SidebarItem icon="📄" title="Igényfelvétel" path="/igenyfelvetel" />
        <div className="w-full border-b border-gray-600 my-4"></div>
        <SidebarItem icon="🖥️" title="Összes eszköz" path="/eszkozok" />
        <div className="w-full border-b border-gray-600 my-4"></div>
        <SidebarItem icon="💾" title="Szoftverek" path="/eszkozok/szoftverek" />
        <SidebarItem icon="🔑" title="Licenszek" path="/eszkozok/licenszek" />
        <SidebarItem icon="📂" title="Projektek" path="/eszkozok/projektek" />
        <div className="w-full border-b border-gray-600 my-4"></div>
        <SidebarItem icon="📌" title="Leadott igények" path="/igenyek" />
        <SidebarItem icon="🔧" title="Bejelentett hibák" path="/hibak" />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, title, path }) => {
  return (
    <Link
      to={path}
      className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[#41465C] cursor-pointer"
    >
      <span className="text-blue-400 text-lg">{icon}</span>
      <span className="text-white">{title}</span>
    </Link>
  );
};

export default Sidebar;
