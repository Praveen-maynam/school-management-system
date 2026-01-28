
import React from 'react';

// Mock system health data
const health = {
  status: 'Healthy',
  uptime: '99.98%',
  responseTime: '180ms',
  errorRate: '0.02%',
  lastChecked: '2026-01-28 10:00',
};

const statusColor = {
  Healthy: 'bg-green-100 text-green-700',
  Warning: 'bg-yellow-100 text-yellow-800',
  Critical: 'bg-red-100 text-red-700',
};

// Mock alerts/incidents
const alerts = [
  { id: 'AL-001', type: 'Downtime', severity: 'Critical', message: 'API outage detected', time: '2026-01-25 14:22' },
  { id: 'AL-002', type: 'Performance', severity: 'Warning', message: 'High response time', time: '2026-01-24 09:10' },
  { id: 'AL-003', type: 'Error', severity: 'Warning', message: 'Increased error rate', time: '2026-01-23 16:45' },
];

const severityColor = {
  Critical: 'bg-red-100 text-red-700',
  Warning: 'bg-yellow-100 text-yellow-800',
  Info: 'bg-blue-100 text-blue-700',
};

const SystemHealthScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">System Health Monitoring</h1>
      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className={`px-3 py-1 rounded text-sm font-semibold mb-2 ${statusColor[health.status as keyof typeof statusColor]}`}>{health.status}</div>
          <div className="text-gray-500 text-sm">Status</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold mb-2">{health.uptime}</div>
          <div className="text-gray-500 text-sm">Uptime</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold mb-2">{health.responseTime}</div>
          <div className="text-gray-500 text-sm">Avg. Response Time</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold mb-2">{health.errorRate}</div>
          <div className="text-gray-500 text-sm">Error Rate</div>
        </div>
      </div>

      {/* Last Checked */}
      <div className="mb-8 text-right text-xs text-gray-400">Last checked: {health.lastChecked}</div>

      {/* Alerts Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Alerts & Incidents</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-mono">{alert.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{alert.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${severityColor[alert.severity as keyof typeof severityColor]}`}>{alert.severity}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{alert.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{alert.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthScreen;
