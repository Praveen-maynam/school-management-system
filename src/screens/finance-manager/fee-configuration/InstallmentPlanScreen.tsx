import React from 'react';

// Mock data
const installmentPlans = [
  { id: 1, name: 'Quarterly', installments: 4, interest: '0%' },
  { id: 2, name: 'Half-Yearly', installments: 2, interest: '2%' },
  { id: 3, name: 'Monthly', installments: 12, interest: '5%' },
];

const InstallmentPlanScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Installment Plans</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Plan Name</th>
              <th className="py-2 px-4 font-medium text-gray-700">Installments</th>
              <th className="py-2 px-4 font-medium text-gray-700">Interest</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {installmentPlans.map((plan) => (
              <tr key={plan.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{plan.name}</td>
                <td className="py-2 px-4 whitespace-nowrap">{plan.installments}</td>
                <td className="py-2 px-4 whitespace-nowrap">{plan.interest}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">Add Installment Plan</button>
      </div>
    </div>
  );
};

export default InstallmentPlanScreen;
