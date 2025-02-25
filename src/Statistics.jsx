const Statistics = () => {
    return (
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center font-semibold border-2 border-gray-300">
          Összes Eszköz <br />
          <span className="text-xl font-bold">500db</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center font-semibold border-2 border-gray-300">
          Új eszközök (2év) <br />
          <span className="text-xl font-bold">56db</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center font-semibold border-2 border-gray-300">
          Eszközök össz értéke <br />
          <span className="text-xl font-bold">16.600.055 FT</span>
        </div>
      </div>
    );
  };
  
  export default Statistics;
  