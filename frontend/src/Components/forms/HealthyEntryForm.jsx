import React, { useState } from "react";
import api from "../../utils/axiosInterceptor";

const HealthEntryForm = () => {
  const [formData, setFormData] = useState({
    blood_pressure: {
      SBP: "",
      DBP: "",
      HP: "",
    },
    sugar_level: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.blood_pressure) {
      setFormData((prev) => ({
        ...prev,
        blood_pressure: {
          ...prev.blood_pressure,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await api.post('/user/upload_medical_report',formData);
    console.log("response received", response);
    console.log("Submitted data:", formData);
    // Clear form
    setFormData({
      blood_pressure: {
        SBP: "",
        DBP: "",
        HP: "",
      },
      sugar_level: "",
      description: "",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Health Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="SBP" className="block text-sm font-medium text-gray-700">
            Systolic Blood Pressure (SBP) / Upper limit
          </label>
          <input
            type="number"
            id="SBP"
            name="SBP"
            value={formData.blood_pressure.SBP}
            onChange={handleInputChange}
            placeholder="e.g., 120"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="DBP" className="block text-sm font-medium text-gray-700">
            Diastolic Blood Pressure (DBP) / Lower limit
          </label>
          <input
            type="number"
            id="DBP"
            name="DBP"
            value={formData.blood_pressure.DBP}
            onChange={handleInputChange}
            placeholder="e.g., 80"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="HP" className="block text-sm font-medium text-gray-700">
            Heart Pulse (HP)
          </label>
          <input
            type="number"
            id="HP"
            name="HP"
            value={formData.blood_pressure.HP}
            onChange={handleInputChange}
            placeholder="e.g., 72"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="sugar_level" className="block text-sm font-medium text-gray-700">
            Sugar Level
          </label>
          <input
            type="number"
            id="sugar_level"
            name="sugar_level"
            value={formData.sugar_level}
            onChange={handleInputChange}
            placeholder="e.g., 105"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="e.g., Feeling great today!"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
        >
          Submit Entry
        </button>
      </form>
    </div>
  );
};

export default HealthEntryForm;
