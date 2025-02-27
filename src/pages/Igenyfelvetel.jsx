import React, { useState } from "react";

const Igenyfelvetel = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "",
    subject: "",
    description: "",
    discussedInternally: "nem",
    fundingAvailable: "nem",
    relatedToPrevious: "igen",
    previousDevelopment: "",
    knownSoftware: "nem",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Űrlap sikeresen elküldve!");
    console.log("Kitöltött adatok:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Informatikai rendszerfejlesztési javaslat bejelentő űrlap
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block font-medium">Teljes név:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">E-mail cím:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Department */}
        <div>
          <label className="block font-medium">Szervezeti egység:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block font-medium">Javaslat tárgya:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Javaslat rövid leírása:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>

        {/* Discussed Internally */}
        <div>
          <label className="block font-medium">
            Történt korábban egyeztetés a javaslatról az egyetem belül?
          </label>
          <select
            name="discussedInternally"
            value={formData.discussedInternally}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="nem">Nem</option>
            <option value="igen">Igen</option>
          </select>
        </div>

        {/* Funding Available */}
        <div>
          <label className="block font-medium">Van anyagi forrás a fejlesztésre?</label>
          <select
            name="fundingAvailable"
            value={formData.fundingAvailable}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="nem">Nem</option>
            <option value="igen">Igen</option>
          </select>
        </div>

        {/* Related to Previous Development */}
        <div>
          <label className="block font-medium">A javaslat kapcsolódik korábbi egyetemi fejlesztéshez?</label>
          <select
            name="relatedToPrevious"
            value={formData.relatedToPrevious}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="nem">Nem</option>
            <option value="igen">Igen</option>
          </select>
        </div>

        {/* Previous Development (only if relatedToPrevious is "igen") */}
        {formData.relatedToPrevious === "igen" && (
          <div>
            <label className="block font-medium">Kapcsolódó korábbi fejlesztés:</label>
            <input
              type="text"
              name="previousDevelopment"
              value={formData.previousDevelopment}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        {/* Known Software for Implementation */}
        <div>
          <label className="block font-medium">
            Ismer olyan rendszert vagy szoftverterméket amivel a javaslat megvalósítható?
          </label>
          <select
            name="knownSoftware"
            value={formData.knownSoftware}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="nem">Nem</option>
            <option value="igen">Igen</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
            Küldés
          </button>
        </div>
      </form>
    </div>
  );
};

export default Igenyfelvetel;
