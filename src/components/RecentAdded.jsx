const RecentAdded = () => {
  const data = [
    { id: "INV-1001", name: "Neptun Gazdálkodási modul /SAP/", category: "Szoftver", price: "273,050,000 Ft", status: "Paid" },
    { id: "INV-1002", name: "Szoftver SZEPORTAL", category: "Szoftver", price: "64,426,250 Ft", status: "Out of date" },
    { id: "INV-1003", name: "ACHILES INNOVATÍV Okt.támogató rendszer.", category: "Szoftver", price: "55,010,000 Ft", status: "Paid" },
    { id: "INV-1004", name: "Szoftver TPA alapú valós idejű járműzaj szimuláció", category: "Szoftver", price: "48,557,797 Ft", status: "Paid" },
    { id: "INV-1005", name: "Kockázatkezelésben alkalmazott adatbázis", category: "Szoftver", price: "41,640,000 Ft", status: "Paid" },
    { id: "INV-1006", name: "Turnitin szolgáltatás előfizetés", category: "Licensz", price: "14,756,340 Ft", status: "Out of date" },
  ];

  return (
    <div className="bg-gray-100  shadow-md p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Nemrég hozzáadva</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2 text-left">Invoice ID</th>
            <th className="p-2 text-left">Megnevezés</th>
            <th className="p-2 text-left">Kategória</th>
            <th className="p-2 text-left">Bruttó érték</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{item.id}</td>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.category}</td>
              <td className="p-2">{item.price}</td>
              <td className={`p-2 font-bold ${item.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentAdded;
