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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "A mező kitöltése kötelező!";
    if (!formData.email.trim()) newErrors.email = "A mező kitöltése kötelező!";
    if (!formData.department.trim()) newErrors.department = "A mező kitöltése kötelező!";
    if (!formData.subject.trim()) newErrors.subject = "A mező kitöltése kötelező!";
    if (!formData.description.trim()) newErrors.description = "A mező kitöltése kötelező!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Űrlap sikeresen elküldve!");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center p-10">
      <div className="w-full max-w-[99%] bg-white p-10 rounded-md shadow-md border border-gray-300">
        <h1 className="text-2xl font-semibold mb-6">
          Igénybejelentő űrlap
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className={`w-full p-3 border rounded-md bg-white focus:outline-none peer ${
                errors.fullName ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-400"
              }`}
              placeholder="Teljes név *"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full p-3 border rounded-md bg-white focus:outline-none peer ${
                errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-400"
              }`}
              placeholder="E-mail cím *"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className={`w-full p-3 border rounded-md bg-white focus:outline-none peer ${
                errors.department ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-400"
              }`}
              placeholder="Szervezeti egység *"
            />
            {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
          </div>

          <div className="relative">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className={`w-full p-3 border rounded-md bg-white focus:outline-none peer ${
                errors.subject ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-400"
              }`}
              placeholder="Javaslat tárgya *"
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </div>

          <div className="relative">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className={`w-full p-3 border rounded-md bg-white focus:outline-none peer ${
                errors.description ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-400"
              }`}
              placeholder="Javaslat rövid leírása *"
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block font-medium">Történt korábban egyeztetés?</label>
            <select
              name="discussedInternally"
              value={formData.discussedInternally}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded bg-white"
            >
              <option value="nem">Nem</option>
              <option value="igen">Igen</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Van anyagi forrás?</label>
            <select
              name="fundingAvailable"
              value={formData.fundingAvailable}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded bg-white"
            >
              <option value="nem">Nem</option>
              <option value="igen">Igen</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Kapcsolódik korábbi fejlesztéshez?</label>
            <select
              name="relatedToPrevious"
              value={formData.relatedToPrevious}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded bg-white"
            >
              <option value="nem">Nem</option>
              <option value="igen">Igen</option>
            </select>
          </div>

          {formData.relatedToPrevious === "igen" && (
            <div className="relative">
              <input
                type="text"
                name="previousDevelopment"
                value={formData.previousDevelopment}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded bg-white"
                placeholder="Kapcsolódó fejlesztés"
              />
            </div>
          )}

          <div>
            <label className="block font-medium">Ismert szoftver?</label>
            <select
              name="knownSoftware"
              value={formData.knownSoftware}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded bg-white"
            >
              <option value="nem">Nem</option>
              <option value="igen">Igen</option>
            </select>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition flex items-center justify-center mx-auto"
            >
              📥 Küldés
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Igenyfelvetel;
