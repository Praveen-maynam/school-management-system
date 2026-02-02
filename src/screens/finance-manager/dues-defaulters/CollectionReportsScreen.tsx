import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, TrendingDown, Eye, FileText, Lock, ChevronRight, DollarSign, Clock, CreditCard, BarChart3, GraduationCap, Bus, BookOpen, Banknote, Smartphone, FileCheck, AlertCircle } from 'lucide-react';

interface DateDetail {
  date: string;
  collected: number;
  pending: number;
  payments: number;
}

export default function CollectionReportsScreen() {
  const [selectedYear, setSelectedYear] = useState('2025-2026');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [showCloseYearModal, setShowCloseYearModal] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<DateDetail | null>(null);

  // Sample data
  const summaryData = {
    totalCollected: 298000,
    totalPending: 45000,
    totalPayments: 356,
    avgDaily: 9933
  };

  const dateWiseData = [
    { date: '2026-01-25', collected: 12000, pending: 3000, payments: 15 },
    { date: '2026-01-24', collected: 15000, pending: 4500, payments: 18 },
    { date: '2026-01-23', collected: 11000, pending: 2500, payments: 14 },
    { date: '2026-01-22', collected: 13500, pending: 3200, payments: 16 },
    { date: '2026-01-21', collected: 10500, pending: 2800, payments: 13 }
  ];

  const monthlyData = [
    { month: 'January', year: '2026', collected: 98000, payments: 120, change: 6.5 },
    { month: 'December', year: '2025', collected: 92000, payments: 110, change: -2.3 },
    { month: 'November', year: '2025', collected: 94000, payments: 115, change: 4.2 },
    { month: 'October', year: '2025', collected: 90000, payments: 108, change: 1.8 }
  ];

  const categoryData = [
    { category: 'Tuition Fees', collected: 180000, total: 220000, icon: GraduationCap, color: 'bg-blue-100 text-blue-600' },
    { category: 'Transport Fees', collected: 65000, total: 80000, icon: Bus, color: 'bg-green-100 text-green-600' },
    { category: 'Library Fees', collected: 28000, total: 35000, icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
    { category: 'Lab Fees', collected: 18000, total: 25000, icon: FileCheck, color: 'bg-orange-100 text-orange-600' },
    { category: 'Exam Fees', collected: 7000, total: 10000, icon: FileText, color: 'bg-pink-100 text-pink-600' }
  ];

  const paymentMethodData = [
    { method: 'Online Payment', collected: 180000, percentage: 60.4, icon: Smartphone, color: 'bg-indigo-100 text-indigo-600' },
    { method: 'Cash', collected: 75000, percentage: 25.2, icon: Banknote, color: 'bg-green-100 text-green-600' },
    { method: 'Cheque', collected: 30000, percentage: 10.1, icon: FileCheck, color: 'bg-blue-100 text-blue-600' },
    { method: 'Other', collected: 13000, percentage: 4.3, icon: CreditCard, color: 'bg-gray-100 text-gray-600' }
  ];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateStr:string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-1">Collection Reports</h1>
              <p className="text-slate-600">Complete overview of fee collections and pending amounts</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg">
                <Download className="w-4 h-4" />
                <span className="font-medium">Export Summary</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{dateRange}</span>
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-5 border border-emerald-200">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white rounded-lg p-2 shadow-sm">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-emerald-700 text-sm font-semibold">+12.5%</span>
              </div>
              <h3 className="text-slate-600 text-sm font-medium mb-1">Total Collected</h3>
              <p className="text-3xl font-bold text-emerald-700">{formatCurrency(summaryData.totalCollected)}</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-5 border border-orange-200">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white rounded-lg p-2 shadow-sm">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-orange-700 text-sm font-semibold">-3.2%</span>
              </div>
              <h3 className="text-slate-600 text-sm font-medium mb-1">Total Pending</h3>
              <p className="text-3xl font-bold text-orange-700">{formatCurrency(summaryData.totalPending)}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-5 border border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white rounded-lg p-2 shadow-sm">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-blue-700 text-sm font-semibold">+8.1%</span>
              </div>
              <h3 className="text-slate-600 text-sm font-medium mb-1">Total Payments</h3>
              <p className="text-3xl font-bold text-blue-700">{summaryData.totalPayments}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-5 border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white rounded-lg p-2 shadow-sm">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-purple-700 text-sm font-semibold">Avg/Day</span>
              </div>
              <h3 className="text-slate-600 text-sm font-medium mb-1">Avg Daily Collection</h3>
              <p className="text-3xl font-bold text-purple-700">{formatCurrency(summaryData.avgDaily)}</p>
            </div>
          </div>
        </div>

        {/* Date-wise Collection Report */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 px-6 py-4 border-b border-sky-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Date-wise Collection Report</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                Export <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Collected Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Pending Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Payments</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dateWiseData.map((row, idx) => (
                  <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50 transition-colors`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{formatDate(row.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-emerald-600">{formatCurrency(row.collected)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-orange-600">{formatCurrency(row.pending)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {row.payments} payments
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => {
                          setSelectedDetail(row);
                          setShowDetailDrawer(true);
                        }}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Collection Report */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 px-6 py-4 border-b border-violet-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Monthly Collection Report</h2>
              <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1">
                Export <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Total Collected</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Total Payments</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Change</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {monthlyData.map((row, idx) => (
                  <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-purple-50 transition-colors`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {row.month} {row.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-emerald-600">{formatCurrency(row.collected)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        {row.payments} payments
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 text-sm font-semibold ${row.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {row.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(row.change)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category-wise Collection Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-peach-50 to-orange-50 px-6 py-4 border-b border-orange-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Category-wise Collection Breakdown</h2>
              <button className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1">
                Export <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryData.map((category, idx) => {
                const Icon = category.icon;
                const percentage = (category.collected / category.total) * 100;
                return (
                  <div key={idx} className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-5 border-2 border-slate-200 hover:border-blue-300 transition-all hover:shadow-md">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${category.color} rounded-lg p-3 shadow-sm`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-600 mb-1">{category.category}</h3>
                    <p className="text-2xl font-bold text-slate-800 mb-3">{formatCurrency(category.collected)}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span>Collection Progress</span>
                        <span className="font-semibold">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-500">
                        Target: {formatCurrency(category.total)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Payment Method Analysis */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Payment Method Analysis</h2>
              <button className="text-slate-600 hover:text-slate-700 font-medium text-sm flex items-center gap-1">
                Export <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethodData.map((method, idx) => {
                const Icon = method.icon;
                return (
                  <div key={idx} className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-5 border-2 border-slate-200 hover:border-indigo-300 transition-all hover:shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`${method.color} rounded-lg p-3 shadow-sm`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-slate-600">{method.method}</h3>
                          <p className="text-xs text-slate-500">{method.percentage}% of total</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View
                      </button>
                    </div>
                    <div className="mb-3">
                      <p className="text-2xl font-bold text-slate-800">{formatCurrency(method.collected)}</p>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${method.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Year-End Closing & Export */}
        <div className="bg-gradient-to-r from-amber-50 to-red-50 rounded-2xl shadow-md border-2 border-amber-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-amber-200 bg-white bg-opacity-60">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-bold text-slate-800">Year-End Closing & Export</h2>
            </div>
            <p className="text-sm text-slate-600">Export all financial data for the year, close accounts, and archive records. Once closed, the year becomes read-only.</p>
          </div>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-lg px-4 py-2 border-2 border-slate-300">
                  <label className="text-xs text-slate-600 font-medium block mb-1">Financial Year</label>
                  <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="text-sm font-semibold text-slate-800 bg-transparent border-none outline-none"
                  >
                    <option value="2025-2026">2025-2026</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2023-2024">2023-2024</option>
                  </select>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 border-2 border-emerald-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-emerald-700">Year Open</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-emerald-400 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-all font-medium">
                  <FileText className="w-4 h-4" />
                  Export to Excel
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-blue-400 text-blue-700 rounded-lg hover:bg-blue-50 transition-all font-medium">
                  <FileText className="w-4 h-4" />
                  Export to PDF
                </button>
                <button 
                  onClick={() => setShowCloseYearModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all shadow-md hover:shadow-lg font-medium"
                >
                  <Lock className="w-4 h-4" />
                  Close Financial Year
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Close Year Confirmation Modal */}
      {showCloseYearModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4 border-b border-red-200">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 rounded-full p-2">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Close Financial Year</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-slate-700 mb-4">
                Are you sure you want to close the financial year <strong>{selectedYear}</strong>? 
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 rounded">
                <p className="text-sm text-amber-800">
                  <strong>Warning:</strong> This action cannot be undone. Once closed, all records for this year will become read-only and cannot be modified.
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowCloseYearModal(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    // Handle close year logic
                    setShowCloseYearModal(false);
                  }}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all shadow-md font-medium"
                >
                  Confirm Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Drawer */}
      {showDetailDrawer && selectedDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end lg:items-center justify-end z-50">
          <div className="bg-white w-full lg:w-1/2 h-3/4 lg:h-full rounded-t-2xl lg:rounded-l-2xl lg:rounded-r-none shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">Daily Breakdown - {formatDate(selectedDetail.date)}</h3>
              <button 
                onClick={() => setShowDetailDrawer(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto h-full">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                  <p className="text-sm text-slate-600 mb-1">Collected</p>
                  <p className="text-2xl font-bold text-emerald-700">{formatCurrency(selectedDetail.collected)}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <p className="text-sm text-slate-600 mb-1">Pending</p>
                  <p className="text-2xl font-bold text-orange-700">{formatCurrency(selectedDetail.pending)}</p>
                </div>
              </div>
              <p className="text-center text-slate-500 mt-12">Detailed payment list would appear here...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
