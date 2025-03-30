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
    relatedToPrevious: "nem",
    previousDevelopment: "",
    knownSoftware: "nem",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
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

    try {
      const response = await fetch("/api/igenyfelvetel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          department: formData.department,
          subject: formData.subject,
          description: formData.description,
          discussed_internally: formData.discussedInternally,
          funding_available: formData.fundingAvailable,
          related_to_previous: formData.relatedToPrevious,
          previous_development: formData.previousDevelopment,
          known_software: formData.knownSoftware,
        }),
      });

      if (!response.ok) {
        throw new Error("Hiba történt az adatok mentésekor!");
      }

      setMessage({ type: "success", text: "Javaslat sikeresen beküldve!" });

      setFormData({
        fullName: "",
        email: "",
        department: "",
        subject: "",
        description: "",
        discussedInternally: "nem",
        fundingAvailable: "nem",
        relatedToPrevious: "nem",
        previousDevelopment: "",
        knownSoftware: "nem",
      });
    } catch (error) {
      setMessage({ type: "error", text: "Hiba történt az űrlap beküldésekor!" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center p-10">
      <div className="w-full max-w-[99%] bg-white p-10 rounded-md shadow-md border border-gray-300">
        <h1 className="text-2xl font-semibold mb-6">Informatikai fejlesztési bejelentés űrlap</h1>

        {message && (
          <div className={`p-3 mb-4 rounded-md text-center ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md bg-white focus:outline-none peer ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
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
              className={`w-full p-3 border rounded-md bg-white focus:outline-none peer ${errors.email ? "border-red-500" : "border-gray-300"}`}
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
              className={`w-full p-3 border rounded-md bg-white focus:outline-none peer ${errors.department ? "border-red-500" : "border-gray-300"}`}
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
              className={`w-full p-3 border rounded-md bg-white focus:outline-none peer ${errors.subject ? "border-red-500" : "border-gray-300"}`}
              placeholder="Javaslat tárgya *"
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </div>

          <div className="relative">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full p-3 border rounded-md bg-white focus:outline-none peer ${errors.description ? "border-red-500" : "border-gray-300"}`}
              placeholder="Javaslat rövid leírása *"
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {[
            { label: "Történt korábban egyeztetés?", name: "discussedInternally" },
            { label: "Van anyagi forrás?", name: "fundingAvailable" },
            { label: "Kapcsolódik korábbi fejlesztéshez?", name: "relatedToPrevious" },
            { label: "Ismert szoftver?", name: "knownSoftware" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block font-medium">{label}</label>
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded bg-white"
              >
                <option value="nem">Nem</option>
                <option value="igen">Igen</option>
              </select>
            </div>
          ))}

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

          <div className="text-center mt-6">
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition flex items-center justify-center mx-auto">
              📥 Beküldés
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Igenyfelvetel;
