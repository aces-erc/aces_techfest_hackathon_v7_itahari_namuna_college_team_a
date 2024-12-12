import React, { useState } from 'react';
import { Calendar, Eye, EyeOff } from 'lucide-react';
import { FaCalendarAlt } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaAddressBook } from "react-icons/fa6";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const UserCreation = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    dob: '',
    gender: '',
    email: '',
    address: '',
    password: '',
    phone: '',
    balance: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Get insurance_company_id from localStorage
      const insurance_company_id = localStorage.getItem('insurance_company_id');

      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          insurance_company_id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Handle success - you can add your own logic here
      alert('Form submitted successfully!');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

      <div className="flex flex-col justify-end">
        <h3 className="w-full text-4xl font-bold">Register</h3>
        <form
          action=""
          method="post"
          className="flex flex-col justify-center gap-4 mt-5 items-start "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-5 w-[80%]">
            <div className="flex gap-2 w-full">
              <div className="flex items-center w-full relative">
                <FaUserAlt className="absolute" />
                <input
                  type="text"
                  name="first_name"
                  id="fname"
                  placeholder="Enter First Name"
                  className="outline-none font-semibold border-0 !border-b-2 w-[100%] border-black border-botton px-8"
                  onChange={handleChange}
                />
              </div>
              <div className="flex w-full relative">
                <FaUserAlt className="absolute" />
                <input
                  type="text"
                  name="last_name"
                  id="lname"
                  placeholder="Enter last Name"
                  className="outline-none font-semibold border-0 !border-b-2 w-[100%] border-black border-botton px-8"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center w-full relative">
              <FaCalendarAlt className="absolute" />
              <input
                type="date"
                name="dob"
                id="dob"
                placeholder="Enter DOB"
                className="outline-none font-semibold border-0 !border-b-2 w-[100%] border-black border-botton px-8"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-6 font-bold justify-start items-center w-full relative">
              {/* <FaCalendarAlt className="absolute" /> */}
              Gender:
              <div className='flex gap-2'>
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value='male'
                  className="outline-none font-semibold border-0 !border-b-2 w-[100%] border-black border-botton px-8"
                  onChange={handleChange}
                /> Male
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  value='female'
                  id="female"
                  className="outline-none font-semibold border-0 !border-b-2 w-[100%] border-black border-botton px-8"
                  onChange={handleChange}
                /> Female
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  id="other"
                  value='other'
                  className="outline-none font-semibold border-0 !border-b-2 w-[100%] border-black border-botton px-8"
                  onChange={handleChange}
                /> Others

              </div>
            </div>
            <div className="flex items-center w-full relative">
              <FaAddressBook className="absolute" />
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter Full Address"
                className="outline-none font-semibold border-0 !border-b-2 w-[100%] border-black border-botton px-8"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center w-full relative">
              <FaPhoneSquareAlt className="absolute" />
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Enter your phone "
                className="outline-none font-semibold border-0 !border-b-2 w-[100%] border-black border-botton px-8"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center w-full relative">
              <MdEmail className="absolute" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email Address"
                className="outline-none font-semibold border-0 !border-b-2 w-[100%] border-black border-botton px-8"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center w-full relative">
              <RiLockPasswordFill className="absolute" />
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                className="outline-none font-semibold border-0 !border-b-2 w-[100%] border-black border-botton px-8"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center w-full relative">
              <RiLockPasswordFill className="absolute" />
              <input
                type="number"
                name="balance"
                placeholder="Enter balance"
                defaultValue={100000}
                // value={100000}
                className="outline-none font-semibold border-0 !border-b-2 w-[100%] border-black border-botton px-8"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <input
              className="cursor-pointer"
              type="checkbox"
              name="check"
              id=""
            />
            <span className="pl-2 font-semibold">
              {" "}
              I agree your terms and conditions
            </span>
          </div>
          <button className="bg-primary p-2 px-4 font-bold rounded-sm hover:bg-[#79db7c] transition-colors duration-200 mt-4" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserCreation;