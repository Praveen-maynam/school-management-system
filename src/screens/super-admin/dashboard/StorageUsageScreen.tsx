import React from 'react';


// Mock data for storage usage

type StorageSummary = {
  total: number;
  used: number;
  free: number;
  percent: number;
};


const totalStorage = 2000; // GB
const usedStorage = 1340; // GB
const freeStorage = totalStorage - usedStorage;
const percentUsed = Math.round((usedStorage / totalStorage) * 100);

const storageSummary: StorageSummary = {
  total: totalStorage,
  used: usedStorage,
  free: freeStorage,
  percent: percentUsed,
};

const schoolStorage = [
  { name: 'Greenwood High', used: 320, total: 500 },
  { name: 'Sunrise Academy', used: 210, total: 300 },
  { name: 'Riverdale School', used: 180, total: 250 },
  { name: 'Hilltop Prep', used: 400, total: 600 },
  { name: 'Lakeside Institute', used: 230, total: 350 },
];

const StorageUsageScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Storage Usage Monitoring</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <div className="text-3xl font-bold">{storageSummary.total} GB</div>
          <div className="text-gray-500 text-sm">Total Storage</div>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <div className="text-3xl font-bold">{storageSummary.used} GB</div>
          <div className="text-gray-500 text-sm">Used Storage</div>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <div className="text-3xl font-bold">{storageSummary.free} GB</div>
          <div className="text-gray-500 text-sm">Free Storage</div>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <div className="text-3xl font-bold">{storageSummary.percent}%</div>
          <div className="text-gray-500 text-sm">Usage</div>
        </div>
      </div>

      {/* Usage Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-blue-700">Overall Usage</span>
          <span className="text-sm font-medium text-blue-700">{storageSummary.percent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${storageSummary.percent}%` }}
          ></div>
        </div>
      </div>

      {/* Storage Usage Table */}
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Storage Usage by School</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 font-medium text-gray-700">School</th>
              <th className="py-2 px-4 font-medium text-gray-700">Used</th>
              <th className="py-2 px-4 font-medium text-gray-700">Total</th>
              <th className="py-2 px-4 font-medium text-gray-700">Usage</th>
            </tr>
          </thead>
          <tbody>
            {schoolStorage.map((school) => {
              const percent = Math.round((school.used / school.total) * 100);
              return (
                <tr key={school.name} className="border-b last:border-b-0">
                  <td className="py-2 px-4 whitespace-nowrap">{school.name}</td>
                  <td className="py-2 px-4">{school.used} GB</td>
                  <td className="py-2 px-4">{school.total} GB</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${percent > 85 ? 'bg-red-500' : percent > 65 ? 'bg-yellow-400' : 'bg-green-500'}`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-gray-700">{percent}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StorageUsageScreen;
