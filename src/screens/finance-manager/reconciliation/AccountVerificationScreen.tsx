import React from 'react';

// Mock data
const accounts = [
  { id: 1, name: 'Bank Account', status: 'Verified' },
  { id: 2, name: 'Cash Account', status: 'Pending' },
];

const AccountVerificationScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Account Verification</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Account</th>
              <th className="py-2 px-4 font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{a.name}</td>
                <td className={`py-2 px-4 whitespace-nowrap font-semibold ${a.status === 'Verified' ? 'text-green-600' : 'text-yellow-600'}`}>{a.status}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Verify</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountVerificationScreen;
