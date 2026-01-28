
import React, { useState } from 'react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

// Mock school data
type SchoolStatus = 'Active' | 'Inactive' | 'Pending' | 'Suspended';
type SchoolPlan = 'Free' | 'Basic' | 'Premium' | 'Custom';

interface School {
  id: string;
  name: string;
  status: SchoolStatus;
  plan: SchoolPlan;
  storageUsed: number; // GB
  storageLimit: number; // GB
  smsUsed: number;
  smsLimit: number;
}

const mockSchools: School[] = [
  {
    id: 'SCH-001',
    name: 'Springfield High School',
    status: 'Active',
    plan: 'Premium',
    storageUsed: 45,
    storageLimit: 100,
    smsUsed: 800,
    smsLimit: 2000,
  },
  {
    id: 'SCH-002',
    name: 'Shelbyville Academy',
    status: 'Pending',
    plan: 'Basic',
    storageUsed: 10,
    storageLimit: 50,
    smsUsed: 120,
    smsLimit: 500,
  },
  {
    id: 'SCH-003',
    name: 'Westfield School',
    status: 'Suspended',
    plan: 'Custom',
    storageUsed: 200,
    storageLimit: 500,
    smsUsed: 3000,
    smsLimit: 5000,
  },
  {
    id: 'SCH-004',
    name: 'Eastside Elementary',
    status: 'Inactive',
    plan: 'Free',
    storageUsed: 2,
    storageLimit: 10,
    smsUsed: 0,
    smsLimit: 100,
  },
];

const statusColor = {
  Active: 'bg-green-100 text-green-700',
  Inactive: 'bg-gray-100 text-gray-700',
  Pending: 'bg-yellow-100 text-yellow-800',
  Suspended: 'bg-red-100 text-red-700',
};

const planColor = {
  Free: 'bg-gray-100 text-gray-700',
  Basic: 'bg-blue-100 text-blue-700',
  Premium: 'bg-purple-100 text-purple-700',
  Custom: 'bg-orange-100 text-orange-700',
};

const SchoolListScreen: React.FC = () => {
  const [schools, setSchools] = useState<School[]>(mockSchools);

  // Placeholder action handlers
  const handleApprove = (id: string) => {};
  const handleReject = (id: string) => {};
  const handleSuspend = (id: string) => {};
  const handleReactivate = (id: string) => {};
  const handleDelete = (id: string) => {};
  const handleViewProfile = (id: string) => {};

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">School Management</h1>
        <Button /> {/* Replace with real button for adding new school */}
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Storage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SMS</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schools.map((school) => (
              <tr key={school.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-semibold">{school.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColor[school.status]}`}>{school.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${planColor[school.plan]}`}>{school.plan}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span>{school.storageUsed} / {school.storageLimit} GB</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span>{school.smsUsed} / {school.smsLimit}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  {school.status === 'Pending' && (
                    <>
                      <button className="text-green-600 hover:underline" onClick={() => handleApprove(school.id)}>Approve</button>
                      <button className="text-red-600 hover:underline" onClick={() => handleReject(school.id)}>Reject</button>
                    </>
                  )}
                  {school.status === 'Active' && (
                    <button className="text-yellow-600 hover:underline" onClick={() => handleSuspend(school.id)}>Suspend</button>
                  )}
                  {school.status === 'Suspended' && (
                    <button className="text-green-600 hover:underline" onClick={() => handleReactivate(school.id)}>Reactivate</button>
                  )}
                  <button className="text-blue-600 hover:underline" onClick={() => handleViewProfile(school.id)}>Profile</button>
                  <button className="text-gray-600 hover:underline" onClick={() => handleDelete(school.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolListScreen;
