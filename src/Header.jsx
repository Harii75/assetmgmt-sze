import szeLogo from "./sze-logo.svg";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-gray-800 p-4 shadow-md min-h-[60px]">
      <div className="flex items-center space-x-2">
        <img src={szeLogo} alt="Logo" className="h-8 w-8" />
        <span className="text-white font-semibold text-lg">SZE - Eszközmenedzsment</span>
      </div>

      <button className="text-white bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600">
        Főmenű
      </button>
    </header>
  );
};

export default Header;
