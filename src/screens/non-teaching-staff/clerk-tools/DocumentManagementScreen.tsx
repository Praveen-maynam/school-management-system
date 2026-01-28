import React from 'react';

// Mock data
const documents = [
  { id: 1, name: 'Admission Form', type: 'PDF', uploaded: '2026-01-20' },
  { id: 2, name: 'Transfer Certificate', type: 'DOCX', uploaded: '2026-01-18' },
];

const DocumentManagementScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Document Management</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Name</th>
              <th className="py-2 px-4 font-medium text-gray-700">Type</th>
              <th className="py-2 px-4 font-medium text-gray-700">Uploaded</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((d) => (
              <tr key={d.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{d.name}</td>
                <td className="py-2 px-4 whitespace-nowrap">{d.type}</td>
                <td className="py-2 px-4 whitespace-nowrap">{d.uploaded}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">View</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">Upload Document</button>
      </div>
    </div>
  );
};

export default DocumentManagementScreen;
