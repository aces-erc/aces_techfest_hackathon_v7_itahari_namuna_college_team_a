import React, { useState } from 'react';
import { useAuth } from '../../../Context/authContext';

const MedicalHistory = () => {
    const { currentUser } = useAuth();
    const [medicalHistory] = useState(currentUser.healthRecords || []);
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleAccordion = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Medical History</h1>
            {medicalHistory.length === 0 ? (
                <p className="text-gray-600">No medical history available.</p>
            ) : (
                <div className="space-y-4">
                    {medicalHistory.map((record, index) => (
                        <div
                            key={record.id}
                            className="border rounded-md shadow-md overflow-hidden"
                        >
                            <div
                                onClick={() => toggleAccordion(index)}
                                className="flex justify-between items-center bg-blue-100 px-4 py-2 cursor-pointer"
                            >
                                <div>
                                    <p className="font-semibold">{new Date(record.date).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-600">{record.description || 'No description provided'}</p>
                                </div>
                                <button
                                    className="text-blue-500 focus:outline-none hover:underline"
                                >
                                    {expandedIndex === index ? 'Collapse' : 'Expand'}
                                </button>
                            </div>
                            {expandedIndex === index && (
                                <div className="bg-white px-4 py-2">
                                    <p><strong>Blood Pressure:</strong> {record.bloodPressure || 'N/A'}</p>
                                    <p><strong>Sugar Level:</strong> {record.sugarLevel || 'N/A'}</p>
                                    <p><strong>Date Recorded:</strong> {new Date(record.date).toLocaleString()}</p>
                                    <p><strong>Last Updated:</strong> {new Date(record.updatedAt).toLocaleString()}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MedicalHistory;
