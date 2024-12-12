import React, { useState, useEffect } from 'react';
import api from '../../../utils/axiosInterceptor';

const MedicalHistory = () => {
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);

    // Dummy data for fallback
    const dummyData = [
        {
            id: 1,
            fileName: 'Blood_Test_Report_2024.pdf',
            url: '/dummy/Blood_Test_Report_2024.pdf',
            uploadedAt: new Date('2024-01-15T10:00:00'),
            type: 'Report',
        },
        {
            id: 2,
            fileName: 'Xray_Lung.jpg',
            url: '/dummy/Xray_Lung.jpg',
            uploadedAt: new Date('2024-02-20T14:30:00'),
            type: 'X-ray',
        },
    ];

    // Function to fetch data
    const fetchMedicalHistory = async () => {
        setLoading(true);
        try {
            const response = await api.get('/user/get_all_user_uploaded_files');
            setMedicalHistory(response.data.reports || []);
        } catch (err) {
            setMedicalHistory(dummyData); // Use dummy data on error
        } finally {
            setLoading(false);
        }
    };

    // Fetch medical history on component mount
    useEffect(() => {
        fetchMedicalHistory();
    }, []);

    const toggleAccordion = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-4xl p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Medical History</h1>
            {loading ? (
                <p className="text-gray-600">Loading medical history...</p>
            ) : (
                <>
                    {error && (
                        <p className="text-yellow-600 mb-4">
                            {error} Showing sample data instead.
                        </p>
                    )}
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
                                            <p className="font-semibold">
                                                {new Date(record.uploadedAt).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {record.type || 'Unknown Type'}
                                            </p>
                                        </div>
                                        <button
                                            className="text-blue-500 focus:outline-none hover:underline"
                                        >
                                            {expandedIndex === index ? 'Collapse' : 'Expand'}
                                        </button>
                                    </div>
                                    {expandedIndex === index && (
                                        <div className="bg-white px-4 py-2">
                                            <p>
                                                <strong>File Name:</strong> {record.fileName || 'N/A'}
                                            </p>
                                            <p>
                                                <strong>Uploaded At:</strong>{' '}
                                                {new Date(record.uploadedAt).toLocaleString()}
                                            </p>
                                            <p>
                                                <strong>Type:</strong> {record.type || 'N/A'}
                                            </p>
                                            <p>
                                                <a
                                                    href={record.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline"
                                                >
                                                    View File
                                                </a>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MedicalHistory;
