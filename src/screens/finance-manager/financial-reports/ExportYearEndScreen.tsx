import React from 'react';

const ExportYearEndScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Year-End Closing & Export</h1>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <p className="mb-4 text-gray-700">Export all financial data for the year to Excel or PDF. Close the year and archive records.</p>
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">Export to Excel</button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition">Export to PDF</button>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition">Close Year</button>
        </div>
      </div>
    </div>
  );
};

export default ExportYearEndScreen;
