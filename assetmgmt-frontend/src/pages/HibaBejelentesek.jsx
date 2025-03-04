import React, { useState } from "react";

const HibaBejelentesek = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    screenshots: [],
  });

  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setFormData({
      ...formData,
      screenshots: [...formData.screenshots, ...files],
    });
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.title.trim()) newErrors.title = "A mező kitöltése kötelező!";
    if (!formData.description.trim()) newErrors.description = "A mező kitöltése kötelező!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);

    formData.screenshots.forEach((file) => {
      formDataToSend.append("screenshots", file);
    });

    try {
      const response = await fetch("http://localhost:5000/api/hibabejelentes", {
        method: "POST",
        body: formDataToSend, 
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Hibabejelentés sikeresen elküldve!" });
        setFormData({ title: "", description: "", screenshots: [] });
        setImagePreviews([]);
      } else {
        setMessage({ type: "error", text: "Hiba történt a mentés során!" });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Nem sikerült kapcsolódni a szerverhez!" });
    }
  };

  return (
    <div className="w-full bg-gray-100 flex justify-center items-center p-10">
      <div className="w-full max-w-[99%] bg-white p-10 rounded-md shadow-md border border-gray-300">
        <h1 className="text-2xl font-semibold mb-6">Hibabejelentő űrlap</h1>

        {message && (
          <div className={`p-3 mb-4 rounded-md text-center ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={`w-full p-3 border rounded-md bg-white focus:outline-none peer ${
                errors.title ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-400"
              }`}
              placeholder="Cím *"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
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
              placeholder="Leírás *"
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div className="border-t border-gray-300 pt-4">
            <label className="block font-medium text-gray-600 mb-2">Képek</label>
            <div className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
              {imagePreviews.length === 0 ? "Nincsenek képek feltöltve!" : "Feltöltött képek:"}
            </div>
          </div>

          <div>
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
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition inline-flex items-center space-x-2"
            >
              <span>📤</span>
              <span>Kép(ek) feltöltése</span>
            </label>
          </div>

          {imagePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview.url}
                    alt={`Preview ${index + 1}`}
                    className="rounded-md shadow-md max-h-32 object-cover w-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-6">
            <button
              type="submit"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition inline-flex items-center space-x-2"
            >
              📥 Bejelentés
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HibaBejelentesek;
