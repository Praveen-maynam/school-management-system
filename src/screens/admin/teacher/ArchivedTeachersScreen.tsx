import React from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy data for demonstration
const teachers = [
  {
    id: 2,
    employeeId: 'EMP-002',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.s@email.com',
    department: 'Science',
    phone: '9123456789',
    status: 'Inactive',
    subjects: 'Physics',
    classes: '8A',
  },
];

const ArchivedTeachersScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Archived Teachers</h2>
        <button className="btn-secondary" onClick={() => navigate('/admin/teachers')}>Back to List</button>
      </div>
      {teachers.length === 0 ? (
        <div className="text-gray-500 py-8 text-center">No archived teachers found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Employee ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="border-b">
                  <td className="px-4 py-2">{teacher.employeeId}</td>
                  <td className="px-4 py-2">{teacher.firstName} {teacher.lastName}</td>
                  <td className="px-4 py-2">{teacher.department}</td>
                  <td className="px-4 py-2">{teacher.phone}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-200 text-gray-500">{teacher.status}</span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-green-600 hover:underline text-sm" onClick={() => alert('Restored (dummy)')}>Restore</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ArchivedTeachersScreen;
