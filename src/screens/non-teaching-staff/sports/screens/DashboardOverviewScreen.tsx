import React from 'react';

const DashboardOverviewScreen = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 text-blue-900">Sports Dashboard Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
        <div className="text-3xl font-bold text-slate-900 mb-1">1,245</div>
        <div className="text-sm text-slate-600">Active Athletes</div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
        <div className="text-3xl font-bold text-slate-900 mb-1">12</div>
        <div className="text-sm text-slate-600">Ongoing Events</div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
        <div className="text-3xl font-bold text-slate-900 mb-1">24</div>
        <div className="text-sm text-slate-600">Active Sports</div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
        <div className="text-3xl font-bold text-slate-900 mb-1">18</div>
        <div className="text-sm text-slate-600">Facilities</div>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Upcoming Events</h2>
      <div className="space-y-4">
        <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
          <h3 className="font-semibold text-slate-900 mb-2">Basketball Championship</h3>
          <div className="grid grid-cols-3 gap-2 text-sm text-slate-600">
            <div>Feb 15, 2026</div>
            <div>10:00 AM</div>
            <div>Main Arena</div>
          </div>
        </div>
        <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
          <h3 className="font-semibold text-slate-900 mb-2">Swimming Competition</h3>
          <div className="grid grid-cols-3 gap-2 text-sm text-slate-600">
            <div>Feb 18, 2026</div>
            <div>02:00 PM</div>
            <div>Aquatic Center</div>
          </div>
        </div>
        <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
          <h3 className="font-semibold text-slate-900 mb-2">Track & Field Meet</h3>
          <div className="grid grid-cols-3 gap-2 text-sm text-slate-600">
            <div>Feb 22, 2026</div>
            <div>09:00 AM</div>
            <div>Athletic Stadium</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardOverviewScreen;
