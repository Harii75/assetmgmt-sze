import React, { useState } from "react";

const HibaBejelentesek = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    severity: "Alacsony",
    screenshots: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Generate previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setFormData({
      ...formData,
      screenshots: [...formData.screenshots, ...files],
    });
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Hibabejelentés sikeresen elküldve!");
    console.log("Beküldött adatok:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Hiba bejelentése
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Megnevezés */}
        <div>
          <label className="block font-medium">Hiba megnevezése:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Leírás */}
        <div>
          <label className="block font-medium">Hiba leírása:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>

        {/* Kategória */}
        <div>
          <label className="block font-medium">Kategória:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Súlyosság */}
        <div>
          <label className="block font-medium">Súlyosság:</label>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Alacsony">Alacsony</option>
            <option value="Közepes">Közepes</option>
            <option value="Magas">Magas</option>
            <option value="Kritikus">Kritikus</option>
          </select>
        </div>

        {/* File feltölés */}
        <div>
          <label className="block font-medium">Képernyőkép feltöltése (opcionális):</label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="cursor-pointer bg-gray-700 text-white px-4 py-2 shadow-md hover:bg-gray-800 transition"
            >
              Képek feltöltése
            </label>
          </div>

          {/* Feltöltött filenevek listázása */}
          <div className="mt-3 bg-gray-200 p-2 text-gray-900">
            <h3 className="font-semibold">Feltöltött fájlok:</h3>
            {formData.screenshots.length > 0 ? (
              <ul className="list-disc pl-5">
                {formData.screenshots.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Még nincs fájl feltöltve.</p>
            )}
          </div>

        </div>


        {/* Előnézet */}
        {imagePreviews.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Feltöltött képek előnézete:</p>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {imagePreviews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Bug Screenshot ${index + 1}`}
                  className="rounded-lg shadow-md max-h-32 mx-auto"
                />
              ))}
            </div>
          </div>
        )}

        {/* Submit gomb */}
        <div className="text-center">
          <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition">
            Bejelentés küldése
          </button>
        </div>
      </form>
    </div>
  );
};

export default HibaBejelentesek;
