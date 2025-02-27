import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 shadow-lg transition-all duration-300 w-64 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      }`}
    >
      {/* Sidebar Header with Close Button */}
      <div className="flex items-center justify-between bg-gray-800 p-6">
        <span className="text-white font-semibold text-lg">Menü</span>
        <button onClick={toggleSidebar} className="text-blue-400 text-xl">
          <AiOutlineClose />
        </button>
      </div>

      {/* Sidebar Menu Items */}
      <div className="p-4 text-white space-y-2">
        <SidebarItem icon="🛠️" title="Hiba bejelentések" path="/hibabejelentesek" />
        <SidebarItem icon="📚" title="Jelentések" path="/jelentesek" />
        <SidebarItem icon="📄" title="Igényfelvétel" path="/igenyfelvetel" />

        {/* Sidebar Statistics */}
        <div className="mt-6 space-y-4">
          <SidebarMain title="Szoftverek" path="/eszkozok" />
          <SidebarMain title="Licenszek" path="/eszkozok" />
          <SidebarMain title="Projektek" path="/eszkozok" />
          <SidebarMain title="Igények" path="/igenyek" />
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, title, path }) => {
  return (
    <Link
      to={path}
      className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer"
    >
      <span className="text-blue-400 text-lg">{icon}</span>
      <span className="text-white">{title}</span>
    </Link>
  );
};

const SidebarMain = ({ title, path }) => {
  return (
    <Link
      to={path}
      className="block bg-gray-800 p-4 rounded-lg shadow-md text-center border border-gray-700 hover:bg-gray-700 transition"
    >
      <h2 className="text-sm text-gray-400">{title}</h2>
    </Link>
  );
};

export default Sidebar;
