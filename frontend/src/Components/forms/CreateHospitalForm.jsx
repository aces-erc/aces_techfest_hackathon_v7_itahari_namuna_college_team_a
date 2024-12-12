import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "./HospitalValidation"; 
import api from "../../utils/axiosInterceptor";

const CreateHospitalForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    hospital_name: "",
    hospital_address: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const response = api.post('/insurance/create_hospital',values);

        if (response.ok) {
            // TODO: add this route where the insurance comapny will see all its hospitals 
          navigate("/hospitals");
        } else {
          const data = await response.json();
          setErrorMessage(data.error || "Failed to create hospital");
        }
      } catch (error) {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-gray-100">
      <div className="bg-white w-[40%] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Hospital</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="hospital_name" className="block text-gray-700 font-semibold">
              Hospital Name
            </label>
            <input
              type="text"
              name="hospital_name"
              id="hospital_name"
              placeholder="Enter hospital name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={values.hospital_name}
              onChange={handleInputChange}
            />
            {errors.hospital_name && <p className="text-red-600 text-sm mt-1">{errors.hospital_name}</p>}
          </div>
          <div>
            <label htmlFor="hospital_address" className="block text-gray-700 font-semibold">
              Address
            </label>
            <input
              type="text"
              name="hospital_address"
              id="hospital_address"
              placeholder="Enter hospital address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={values.hospital_address}
              onChange={handleInputChange}
            />
            {errors.hospital_address && <p className="text-red-600 text-sm mt-1">{errors.hospital_address}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter a secure password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={values.password}
              onChange={handleInputChange}
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>
          {errorMessage && <p className="text-red-600 text-sm mt-1">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
          >
            Create Hospital
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHospitalForm;
