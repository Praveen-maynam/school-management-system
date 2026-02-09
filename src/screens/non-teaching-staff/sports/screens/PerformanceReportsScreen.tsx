import React from 'react';

const reports = [
  {
    id: 1,
    student: 'Alice Johnson',
    sport: 'Basketball',
    performance: 'Excellent',
    score: 95,
  },
  {
    id: 2,
    student: 'Bob Smith',
    sport: 'Football',
    performance: 'Good',
    score: 82,
  },
  {
    id: 3,
    student: 'Cathy Lee',
    sport: 'Swimming',
    performance: 'Average',
    score: 70,
  },
  {
    id: 4,
    student: 'David Kim',
    sport: 'Tennis',
    performance: 'Excellent',
    score: 98,
  },
];

const performanceColor = (performance: string) => {
  switch (performance) {
    case 'Excellent':
      return 'text-green-600';
    case 'Good':
      return 'text-blue-600';
    case 'Average':
      return 'text-yellow-600';
    default:
      return 'text-gray-600';
  }
};

const PerformanceReportsScreen = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Performance Reports</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Student</th>
              <th className="px-4 py-2 text-left">Sport</th>
              <th className="px-4 py-2 text-left">Performance</th>
              <th className="px-4 py-2 text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={report.id} className="border-b hover:bg-blue-50">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2 font-medium">{report.student}</td>
                <td className="px-4 py-2">{report.sport}</td>
                <td className={`px-4 py-2 font-semibold ${performanceColor(report.performance)}`}>{report.performance}</td>
                <td className="px-4 py-2">{report.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceReportsScreen;
