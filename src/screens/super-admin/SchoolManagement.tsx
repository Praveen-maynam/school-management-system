import React, { useState } from 'react';
import { Eye, Edit2, Trash2, MoreVertical, Plus, Filter } from 'lucide-react';

const mockSchools = [
  {
    id: '1',
    name: 'Riverside Academy',
    email: 'contact@riverside.edu',
    plan: 'Basic',
    status: 'active',
    students: 680,
    teachers: 45,
    storageUsed: 180,
    storageLimit: 500,
    revenue: 1200,
  },
  {
    id: '2',
    name: 'Lakeside Elementary',
    email: 'contact@lakeside.edu',
    plan: 'Basic',
    status: 'pending',
    students: 480,
    teachers: 32,
    storageUsed: 120,
    storageLimit: 500,
    revenue: 1200,
  },
];

const plans = ['All', 'Free', 'Basic', 'Premium', 'Custom'];
const statuses = ['All', 'active', 'pending', 'inactive'];

const badgeColor = (status: string) => {
  if (status === 'active') return 'bg-green-100 text-green-700 border border-green-200';
  if (status === 'pending') return 'bg-yellow-50 text-yellow-800 border border-yellow-200';
  return 'bg-gray-200 text-gray-600 border border-gray-300';
};

const SchoolManagement: React.FC = () => {
  const [planFilter, setPlanFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredSchools = mockSchools.filter(s =>
    (planFilter === 'All' || s.plan === planFilter) &&
    (statusFilter === 'All' || s.status === statusFilter) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-8">
      <div className="flex flex-wrap gap-3 items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[180px]"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="7" /><line x1="16" y1="16" x2="12.5" y2="12.5" /></svg></span>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"><Filter className="w-4 h-4" /> Plan</button>
            <select
              className="absolute left-0 top-full mt-1 w-full border border-gray-300 rounded-lg bg-white shadow focus:outline-none"
              value={planFilter}
              onChange={e => setPlanFilter(e.target.value)}
              style={{ opacity: 0, height: 36, cursor: 'pointer', position: 'absolute', zIndex: 10 }}
            >
              {plans.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="relative">
            <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"><Filter className="w-4 h-4" /> Status</button>
            <select
              className="absolute left-0 top-full mt-1 w-full border border-gray-300 rounded-lg bg-white shadow focus:outline-none"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{ opacity: 0, height: 36, cursor: 'pointer', position: 'absolute', zIndex: 10 }}
            >
              {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>
        </div>
        <button className="ml-auto bg-[#6c5ce7] text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 shadow hover:bg-[#5e50a1] text-base"><Plus className="w-5 h-5" /> Add School</button>
      </div>
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full">
          <thead>
            <tr className="text-gray-500 text-xs uppercase">
              <th className="px-6 py-3 text-left">School</th>
              <th className="px-6 py-3 text-left">Plan</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Users</th>
              <th className="px-6 py-3 text-left">Storage</th>
              <th className="px-6 py-3 text-left">Revenue</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchools.map(school => (
              <tr key={school.id} className="border-b last:border-0">
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="font-bold text-lg text-gray-900">{school.name}</div>
                  <div className="text-gray-400 text-sm">{school.email}</div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full border text-xs font-semibold bg-blue-50 text-blue-600 border-blue-200">{school.plan}</span>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor(school.status)}`}>{school.status}</span>
                </td>
                <td className="px-6 py-5">
                  <div className="font-bold text-base text-gray-900">{school.students} <span className="font-normal text-sm">students</span></div>
                  <div className="text-gray-400 text-sm">{school.teachers} teachers</div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-2 bg-purple-500 rounded-full" style={{ width: `${(school.storageUsed / school.storageLimit) * 100}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-700">{school.storageUsed}GB / {school.storageLimit}GB</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="font-bold text-lg text-gray-900">${school.revenue.toLocaleString()}</div>
                  <div className="text-gray-400 text-xs">per month</div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-3 items-center">
                    <button className="text-[#6c5ce7] hover:bg-gray-100 p-2 rounded-full"><Eye className="w-5 h-5" /></button>
                    <button className="text-green-600 hover:bg-gray-100 p-2 rounded-full"><Edit2 className="w-5 h-5" /></button>
                    <button className="text-red-600 hover:bg-gray-100 p-2 rounded-full"><Trash2 className="w-5 h-5" /></button>
                    <button className="text-gray-400 hover:bg-gray-100 p-2 rounded-full"><MoreVertical className="w-5 h-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolManagement;
