import React, { useState } from 'react';
import { ChevronLeft, Calendar, Download } from 'lucide-react';

 function PaySlipsPage() {
  const [selectedDate, setSelectedDate] = useState('24-12-2025');

  const paySlips = [
    {
      month: 'June',
      icon: '💰',
      fromDate: '30-10-2025',
      toDate: '30-10-2025',
      amount: '₹40,000'
    },
    {
      month: 'Jully',
      icon: '💰',
      fromDate: '30-10-2025',
      toDate: '30-10-2025',
      amount: '₹40,000'
    },
    {
      month: 'August',
      icon: '💰',
      fromDate: '30-10-2025',
      toDate: '30-10-2025',
      amount: '₹40,000'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-4 flex items-center">
        <button className="mr-4">
          <ChevronLeft className="text-white" size={44} />
        </button>
        <h1 className="text-white text-xl font-semibold">Pay Slips</h1>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Date Picker */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <div className="relative">
            <input
              type="text"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Pay Slips List */}
        <div className="space-y-4">
          {paySlips.map((slip, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-start mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl">{slip.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{slip.month}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      From: {slip.fromDate}
                    </span>
                    <span className="mx-2">|</span>
                    <span className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      To: {slip.toDate}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-2xl font-bold text-gray-800">{slip.amount}</p>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Download size={20} className="mr-2" />
                Download Payslip
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PaySlipsPage;