import React, { useState } from 'react';
import { Calendar, Plus, Download, Search, RefreshCw, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, LayoutGrid, List } from 'lucide-react';

export default function HolidayManagement() {
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [selectedMonth, setSelectedMonth] = useState('All');

  const holidays = [
    { id: 1, date: '24-11-2025', day: 'Monday', title: 'Holi - Festival of Colors', description: 'A vibrant festival symbolizing the victory of good over evil', type: 'Festival', status: 'Upcoming' },
    { id: 2, date: '06-11-2025', day: 'Thursday', title: 'Holi - Festival of Colors', description: 'A vibrant festival symbolizing the victory of good over evil', type: 'Festival', status: 'Upcoming' },
    { id: 3, date: '26-06-2025', day: 'Thursday', title: 'Diwali - Festival of Lights', description: 'A five-day celebration of light over darkness', type: 'Festival', status: 'Upcoming' },
    { id: 4, date: '18-06-2025', day: 'Wednesday', title: 'Holi - Festival of Colors', description: 'A vibrant festival symbolizing the victory of good over evil', type: 'Festival', status: 'Upcoming' },
    { id: 5, date: '14-06-2025', day: 'Saturday', title: 'Republic Day (India-specific)', description: 'Honoring the day the Constitution came into effect', type: 'National', status: 'Upcoming' },
    { id: 6, date: '11-06-2025', day: 'Wednesday', title: 'New Year\'s Day', description: 'Celebrate the beginning of a brand new year', type: 'National', status: 'Upcoming' }
  ];

  const stats = [
    { label: 'Total Holidays', value: '24', icon: '📅', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Upcoming Holidays', value: '18', icon: '🟢', bgColor: 'bg-green-50', textColor: 'text-green-600' },
    { label: 'This Month', value: '3', icon: '🟡', bgColor: 'bg-amber-50', textColor: 'text-amber-600' }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      'Upcoming': 'bg-green-100 text-green-700 border-green-200',
      'Past': 'bg-gray-100 text-gray-600 border-gray-200',
      'Active': 'bg-blue-100 text-blue-700 border-blue-200'
    } as const;
    return styles[status as keyof typeof styles] || styles['Upcoming'];
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      'National': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Academic': 'bg-blue-100 text-blue-700 border-blue-200',
      'Festival': 'bg-purple-100 text-purple-700 border-purple-200'
    } as const;
    return styles[type as keyof typeof styles] || styles['Festival'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* PAGE HEADER */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-slate-800">Manage Holidays</h1>
              </div>
              <p className="text-slate-500 text-sm ml-14">View and manage academic year holidays</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-medium">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-200 font-medium">
                <Plus className="w-4 h-4" />
                <span>Add Holiday</span>
              </button>
            </div>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
                <div className={`w-14 h-14 ${stat.bgColor} rounded-2xl flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FILTERS & SEARCH */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Session Year</label>
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-slate-700"
                >
                  <option>2024-2025</option>
                  <option>2025-2026</option>
                  <option>2023-2024</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Month</label>
                <select 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-slate-700"
                >
                  <option>All</option>
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search holidays..."
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <button className="p-2.5 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all duration-200">
                <RefreshCw className="w-5 h-5 text-slate-600" />
              </button>
              <div className="flex border border-slate-300 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-all duration-200 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-all duration-200 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* HOLIDAY TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-hidden">
            <table className="w-full table-fixed text-[10px]">
              <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '19%' }} />
                <col style={{ width: '26%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-1.5 py-2 text-left text-[9px] font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap truncate">No.</th>
                  <th className="px-1.5 py-2 text-left text-[9px] font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap truncate">Date</th>
                  <th className="px-1.5 py-2 text-left text-[9px] font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap truncate">Day</th>
                  <th className="px-1.5 py-2 text-left text-[9px] font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap truncate">Title</th>
                  <th className="px-1.5 py-2 text-left text-[9px] font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap truncate">Description</th>
                  <th className="px-1.5 py-2 text-left text-[9px] font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap truncate">Type</th>
                  <th className="px-1.5 py-2 text-left text-[9px] font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap truncate">Status</th>
                  <th className="px-1.5 py-2 text-left text-[9px] font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap truncate">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {holidays.map((holiday, index) => (
                  <tr 
                    key={holiday.id} 
                    className={`transition-colors duration-150 hover:bg-blue-50/50 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}
                  >
                    <td className="px-1.5 py-2 text-[10px] font-medium text-slate-900 whitespace-nowrap">{holiday.id}</td>
                    <td className="px-1.5 py-2 text-[10px] text-slate-700 font-medium whitespace-nowrap">{holiday.date}</td>
                    <td className="px-1.5 py-2 text-[10px] text-slate-600 whitespace-nowrap truncate" title={holiday.day}>{holiday.day}</td>
                    <td className="px-1.5 py-2 text-[10px] font-medium text-slate-900 whitespace-nowrap truncate" title={holiday.title}>{holiday.title}</td>
                    <td className="px-1.5 py-2 text-[10px] text-slate-600 whitespace-nowrap truncate" title={holiday.description}>{holiday.description}</td>
                    <td className="px-1.5 py-2 whitespace-nowrap truncate" title={holiday.type}>
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium border ${getTypeBadge(holiday.type)}`}>
                        {holiday.type}
                      </span>
                    </td>
                    <td className="px-1.5 py-2 whitespace-nowrap truncate" title={holiday.status}>
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium border ${getStatusBadge(holiday.status)}`}>
                        {holiday.status}
                      </span>
                    </td>
                    <td className="px-1.5 py-2 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button className="p-1 border border-blue-200 text-blue-600 rounded-md hover:bg-blue-50 transition-all duration-200" title="View">
                          <Eye className="w-3 h-3" />
                        </button>
                        <button className="p-1 border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50 transition-all duration-200" title="Edit">
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button className="p-1 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-all duration-200" title="Delete">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>Showing 1–6 of 6 holidays</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-600">Rows per page:</label>
                  <select className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                    <ChevronLeft className="w-4 h-4 text-slate-600" />
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">1</button>
                  <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-200">2</button>
                  <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-200">3</button>
                  <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition-all duration-200">
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}