const Statistics = () => {
    return (
      <div className="grid grid-cols-3 gap-4 mt-6">
        {/* Összes Eszköz */}
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-300">
          <div>
            <p className="text-gray-500 text-sm">Összes Eszköz</p>
            <p className="text-2xl font-bold">500db</p>
            <p className="text-green-500 text-sm font-semibold">▲ +5% elmúlt 7 nap</p>
          </div>
          <div>📊</div> {/* Placeholder for an icon */}
        </div>
  
        {/* Új eszközök (2 év) */}
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-300">
          <div>
            <p className="text-gray-500 text-sm">Új eszközök (2 év)</p>
            <p className="text-2xl font-bold">56db</p>
            <p className="text-green-500 text-sm font-semibold">▲ +3% elmúlt 7 nap</p>
          </div>
          <div>📈</div>
        </div>
  
        {/* Eszközök össz értéke */}
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-300">
          <div>
            <p className="text-gray-500 text-sm">Eszközök össz értéke</p>
            <p className="text-2xl font-bold">16.600.055 FT</p>
            <p className="text-green-500 text-sm font-semibold">▲ +2.6% elmúlt 7 nap</p>
          </div>
          <div>💰</div>
        </div>
  
        {/* Utoljára frissítve */}
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-300">
          <div>
            <p className="text-gray-500 text-sm">Utoljára frissítve</p>
            <p className="text-2xl font-bold">Ma</p>
            <p className="text-gray-500 text-sm">Nincs új változás</p>
          </div>
          <div>🔄</div>
        </div>
  
        {/* Helyszínek */}
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-300">
          <div>
            <p className="text-gray-500 text-sm">Helyszínek</p>
            <p className="text-2xl font-bold">12db</p>
            <p className="text-green-500 text-sm font-semibold">▲ +1% elmúlt 7 nap</p>
          </div>
          <div>📍</div>
        </div>
  
        {/* Összes személy */}
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-300">
          <div>
            <p className="text-gray-500 text-sm">Összes személy</p>
            <p className="text-2xl font-bold">22 személy</p>
            <p className="text-green-500 text-sm font-semibold">▲ +4% elmúlt 7 nap</p>
          </div>
          <div>👥</div>
        </div>
      </div>
    );
  };
  
  export default Statistics;
  