import { AiOutlineClose } from "react-icons/ai";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 shadow-lg transition-all duration-300 w-64 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      }`}
    >
      {/* Bezárás gomb a fejléc jobb oldalán */}
      <div className="flex items-center justify-between bg-gray-800 p-6.5">
        <span className="text-white font-semibold text-lg">Menü</span>
        <button onClick={toggleSidebar} className="text-blue-400 text-xl">
          <AiOutlineClose />
        </button>
      </div>

      {/* Menü elemek */}
      <div className="p-4 text-white space-y-2">
        <SidebarItem icon="🛠️" title="Hiba bejelentések" />
        <SidebarItem icon="📚" title="Jelentések" />
        <SidebarItem icon="📄" title="Igényfelvétel" />

        {/* Statisztikai értékek a sidebarban, formázva a referencia kép alapján */}
        <div className="mt-6 space-y-4">
          <SidebarMain title="Szoftverek" />
          <SidebarMain title="Licenszek" />
          <SidebarMain title="Projektek"/>
          <SidebarMain title="Igények"/>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, title }) => {
  return (
    <div className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
      <span className="text-blue-400 text-lg">{icon}</span>
      <span className="text-white">{title}</span>
    </div>
  );
};

const SidebarMain = ({ title, value }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-center border border-gray-700">
      <h2 className="text-sm text-gray-400">{title}</h2>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  );
};

export default Sidebar;
