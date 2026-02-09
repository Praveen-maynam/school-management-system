import React from 'react';

const mockPerformance = [
  { id: 1, athlete: 'Michael Jordan', sport: 'Basketball', metric: 'Points/Game', value: 30 },
  { id: 2, athlete: 'Serena Williams', sport: 'Tennis', metric: 'Win %', value: 85 },
  { id: 3, athlete: 'Usain Bolt', sport: 'Track', metric: '100m Time', value: '9.58s' },
];

const PerformanceTrackingScreen = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 text-blue-900">Performance Tracking</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-100 text-blue-900">
            <th className="py-2 px-4 text-left">Athlete</th>
            <th className="py-2 px-4 text-left">Sport</th>
            <th className="py-2 px-4 text-left">Metric</th>
            <th className="py-2 px-4 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          {mockPerformance.map(p => (
            <tr key={p.id} className="border-b hover:bg-blue-50">
              <td className="py-2 px-4">{p.athlete}</td>
              <td className="py-2 px-4">{p.sport}</td>
              <td className="py-2 px-4">{p.metric}</td>
              <td className="py-2 px-4">{p.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PerformanceTrackingScreen;
