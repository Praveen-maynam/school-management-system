import React, { useState } from 'react';
import { ArrowLeft, Calendar, Download, DollarSign, FileText, TrendingUp, GraduationCap, CheckCircle } from 'lucide-react';

function PaySlipsPage() {
  const [selectedMonth, setSelectedMonth] = useState('2025-12');

  const paySlips = [
    {
      month: 'December 2025',
      icon: '💰',
      fromDate: '01 Dec 2025',
      toDate: '31 Dec 2025',
      amount: 45000,
      status: 'Paid',
      payDate: '30 Dec 2025',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      month: 'November 2025',
      icon: '💵',
      fromDate: '01 Nov 2025',
      toDate: '30 Nov 2025',
      amount: 42000,
      status: 'Paid',
      payDate: '30 Nov 2025',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      month: 'October 2025',
      icon: '💸',
      fromDate: '01 Oct 2025',
      toDate: '31 Oct 2025',
      amount: 40000,
      status: 'Paid',
      payDate: '30 Oct 2025',
      color: 'from-purple-500 to-pink-500'
    },
    {
      month: 'September 2025',
      icon: '💳',
      fromDate: '01 Sep 2025',
      toDate: '30 Sep 2025',
      amount: 40000,
      status: 'Paid',
      payDate: '30 Sep 2025',
      color: 'from-orange-500 to-amber-500'
    },
    {
      month: 'August 2025',
      icon: '🏦',
      fromDate: '01 Aug 2025',
      toDate: '31 Aug 2025',
      amount: 40000,
      status: 'Paid',
      payDate: '30 Aug 2025',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  // Calculate total
  const totalPaid = paySlips.reduce((sum, slip) => sum + slip.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-emerald-100 px-6 py-3 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-semibold text-slate-800">School ERP</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">Academic Year: 2025-26</span>
          </div>
        </div>
      </nav>

      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <button className="hover:bg-white/20 p-2 rounded-lg transition-all">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Pay Slips</h1>
              <p className="text-emerald-100 text-sm mt-1">View and download your salary slips</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - Summary */}
          <div className="col-span-4 space-y-6">
            {/* Month Selector */}
            <div className="bg-white rounded-3xl shadow-lg border border-emerald-100 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">Filter by Month</h3>
              </div>
              <div className="p-6">
                <div className="relative">
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-emerald-50 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-700"
                  />
                  <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-600 pointer-events-none" size={20} />
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="bg-white rounded-3xl shadow-lg border border-emerald-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Total Earnings</h3>
                    <p className="text-emerald-100 text-sm">This year</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                  <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    ₹{totalPaid.toLocaleString('en-IN')}
                  </div>
                  <p className="text-sm text-slate-600">Total from {paySlips.length} months</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-3xl shadow-lg border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Latest Salary</h3>
                    <p className="text-blue-100 text-sm">Most recent</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    ₹{paySlips[0].amount.toLocaleString('en-IN')}
                  </div>
                  <p className="text-sm text-slate-600">{paySlips[0].month}</p>
                  <div className="flex items-center mt-3 text-emerald-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span className="text-xs font-semibold">Paid on {paySlips[0].payDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Pay Slips List */}
          <div className="col-span-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">All Pay Slips</h2>
              <p className="text-slate-600">Download your salary slips for record keeping</p>
            </div>

            <div className="space-y-4">
              {paySlips.map((slip, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-3xl shadow-lg border-2 border-emerald-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className={`bg-gradient-to-r ${slip.color} px-6 py-4`}>
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-2xl">
                          {slip.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{slip.month}</h3>
                          <p className="text-xs opacity-90">Salary Statement</p>
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <p className="text-xs opacity-90">Status</p>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4" />
                          <span className="font-bold">{slip.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {/* Period */}
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <p className="text-xs font-medium text-slate-500">Period From</p>
                        </div>
                        <p className="text-sm font-bold text-slate-800">{slip.fromDate}</p>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <p className="text-xs font-medium text-slate-500">Period To</p>
                        </div>
                        <p className="text-sm font-bold text-slate-800">{slip.toDate}</p>
                      </div>
                    </div>

                    {/* Amount Section */}
                    <div className={`bg-gradient-to-br ${slip.color.replace('500', '50')} rounded-2xl p-5 mb-6 border-2 ${slip.color.replace('from-', 'border-').replace(' to-teal-500', '').replace(' to-indigo-500', '').replace(' to-pink-500', '').replace(' to-amber-500', '').replace(' to-cyan-500', '')}-200`}>
                      <div className="flex items-baseline justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-600 mb-1">Net Salary</p>
                          <p className={`text-4xl font-bold bg-gradient-to-r ${slip.color} bg-clip-text text-transparent`}>
                            ₹{slip.amount.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">Paid On</p>
                          <p className="text-sm font-semibold text-slate-700">{slip.payDate}</p>
                        </div>
                      </div>
                    </div>

                    {/* Download Button */}
                    <button className={`w-full bg-gradient-to-r ${slip.color} text-white py-4 rounded-xl font-bold text-base flex items-center justify-center hover:shadow-xl transition-all transform hover:-translate-y-0.5 group`}>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 mr-3 group-hover:bg-white/30 transition-all">
                        <Download size={20} />
                      </div>
                      Download Pay Slip
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <FileText className="w-5 h-5 text-emerald-600" />
              <h4 className="font-bold text-slate-800">Need Help?</h4>
            </div>
            <p className="text-sm text-slate-600">
              If you have any questions about your pay slips or need assistance, please contact the HR department at <span className="font-semibold text-emerald-600">hr@school.edu</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaySlipsPage;