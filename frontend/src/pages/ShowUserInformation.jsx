import React from "react";
import { useParams } from "react-router-dom";

const ShowUserInformation = () => {
  const { userId } = useParams(); // Dynamic user ID from the route

  // Dummy data simulating a user's complete medical details
  const user = {
    id: userId,
    first_name: "Sagar",
    middle_name: "-",
    last_name: "Adhikari",
    dob: "2004-01-01",
    gender: "Male",
    age: 19,
    bloodGroup: "B+",
    address: "Itahari-8, Koshi",
    phone: "9812345678",
    insurance_company: {
      company_name: "Nepal Life Insurance",
    },
    healthRecords: [
      {
        date: "2023-12-01",
        bloodPressure: { systolic: 120, diastolic: 80 },
        sugarLevel: 95,
        description: "Routine check-up",
        xrayImage: "https://www.labsmartlis.com/images/pathology/blood-sugar-fasting-and-pp-report-format.png",
      },
      {
        date: "2023-11-01",
        bloodPressure: { systolic: 130, diastolic: 85 },
        sugarLevel: 105,
        description: "Follow-up for elevated sugar levels",
        xrayImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTihQ2scSBTVMY5p27jWppHbbSgipe2FP7M5Q&s",
      },
    ],
  };

  return (
    <div className="bg-green-50 min-h-screen flex flex-col items-center p-6">
      <div className="bg-green-500 text-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center">Patient Details</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg mt-6 p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-green-500 text-center">Personal Information</h2>
        <div className="mt-4 text-center">
          <p><strong>First Name:</strong> {user.first_name}</p>
          <p><strong>Middle Name:</strong> {user.middle_name}</p>
          <p><strong>Last Name:</strong> {user.last_name}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Full Address:</strong> {user.address}</p>
          <p><strong>Phone Number:</strong> {user.phone}</p>
          <p><strong>Insurance Company:</strong> {user.insurance_company.company_name}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg mt-6 p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-green-500 text-center">Health Records</h2>
        {user.healthRecords.map((record, index) => (
          <div key={index} className="mt-6 border-t pt-4">
            <p><strong>Date:</strong> {record.date}</p>
            <p><strong>Blood Pressure:</strong> {record.bloodPressure.systolic}/{record.bloodPressure.diastolic} mmHg</p>
            <p><strong>Sugar Level:</strong> {record.sugarLevel} mg/dL</p>
            <p><strong>Description:</strong> {record.description}</p>
            <div className="mt-4">
              <img
                src={record.xrayImage}
                alt={`X-ray for record on ${record.date}`}
                className="w-48 h-48 mx-auto border rounded-lg shadow-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowUserInformation;
