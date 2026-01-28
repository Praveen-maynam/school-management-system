import React from 'react';

// Mock data
const salaries = [
  { id: 1, employee: 'Amit Kumar', base: 40000, deductions: 2000, net: 38000 },
  { id: 2, employee: 'Priya Singh', base: 35000, deductions: 1500, net: 33500 },
];

const SalaryCalculationScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Salary Calculation</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">Employee</th>
              <th className="py-2 px-4 font-medium text-gray-700">Base Salary</th>
              <th className="py-2 px-4 font-medium text-gray-700">Deductions</th>
              <th className="py-2 px-4 font-medium text-gray-700">Net Salary</th>
              <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((s) => (
              <tr key={s.id} className="border-b last:border-b-0">
                <td className="py-2 px-4 whitespace-nowrap">{s.employee}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{s.base.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">₹{s.deductions.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap font-bold">₹{s.net.toLocaleString()}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-green-600 hover:underline">Process</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryCalculationScreen;
