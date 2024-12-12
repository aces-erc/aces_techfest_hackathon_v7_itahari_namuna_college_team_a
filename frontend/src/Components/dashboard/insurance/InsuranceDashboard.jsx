import React from 'react';
import { Users, Hospital, CreditCard, TrendingUp, Bell, Calendar } from 'lucide-react';

const InsuranceDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Policies</p>
                <p className="text-2xl font-bold text-green-500">2,543</p>
                <p className="text-sm text-gray-500 mt-1">+12% this month</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Partner Hospitals</p>
                <p className="text-2xl font-bold text-green-500">156</p>
                <p className="text-sm text-gray-500 mt-1">+3 this month</p>
              </div>
              <Hospital className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Premium Collected</p>
                <p className="text-2xl font-bold text-green-500">$1.2M</p>
                <p className="text-sm text-gray-500 mt-1">+8% this month</p>
              </div>
              <CreditCard className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Claims</p>
                <p className="text-2xl font-bold text-green-500">89</p>
                <p className="text-sm text-gray-500 mt-1">Processing</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.user}</p>
                  </div>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Partners */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">New Partner Hospitals</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {newPartners.map((partner) => (
              <div key={partner.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{partner.name}</p>
                    <p className="text-sm text-gray-500">{partner.location}</p>
                  </div>
                  <span className="px-3 py-1 text-sm text-green-500 bg-green-100 rounded-full">
                    New Partner
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo Data
const recentActivities = [
  { id: 1, action: "New policy purchased", user: "John Smith", date: "2 hours ago" },
  { id: 2, action: "Hospital partnership added", user: "City Hospital", date: "5 hours ago" },
  { id: 3, action: "Claim processed", user: "Sarah Johnson", date: "1 day ago" },
  { id: 4, action: "Premium payment received", user: "Michael Brown", date: "1 day ago" },
];

const newPartners = [
  { id: 1, name: "City General Hospital", location: "New York, NY" },
  { id: 2, name: "Memorial Healthcare", location: "Los Angeles, CA" },
  { id: 3, name: "St. Mary's Medical Center", location: "Chicago, IL" },
];

export default InsuranceDashboard;