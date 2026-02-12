import React, { useState } from 'react';
import { CreditCard, Download, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function FeesScreen() {
  const [selectedStudent, setSelectedStudent] = useState('aarav');
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const students = [
    { id: 'aarav', name: 'Aarav', class: 'Class 8 A' },
    { id: 'ananya', name: 'Ananya', class: 'Class 5 B' }
  ];

  const feeData = {
    totalFee: 45000,
    paidAmount: 30000,
    dueAmount: 15000,
    academicYear: '2025–26'
  };

  const feeTerms = [
    { id: 1, term: 'Term 1', amount: 15000, dueDate: '15 Jun 2025', status: 'paid' },
    { id: 2, term: 'Term 2', amount: 15000, dueDate: '15 Feb 2026', status: 'due' },
    { id: 3, term: 'Term 3', amount: 15000, dueDate: '15 May 2026', status: 'upcoming' }
  ];

  const paymentHistory = [
    { id: 1, date: '10 Jun 2025', amount: 15000, mode: 'UPI', receipt: 'RCP001' },
    { id: 2, date: '05 Oct 2025', amount: 15000, mode: 'Net Banking', receipt: 'RCP002' }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'due':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'partial':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'upcoming':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'due':
        return <AlertCircle className="w-4 h-4" />;
      case 'upcoming':
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handlePayment = (termId: number) => {
    setProcessingPayment(true);
    setTimeout(() => {
      setProcessingPayment(false);
    }, 2000);
  };

  const currentStudent = students.find(s => s.id === selectedStudent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Top Header - Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Fees</h1>
              <p className="text-sm text-gray-600 mt-1">Fee summary & payment details</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Student Selector */}
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} – {student.class}
                  </option>
                ))}
              </select>
              {/* Academic Year Badge */}
              <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">
                {feeData.academicYear}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Important Alert */}
        {feeData.dueAmount > 0 && (
          <div className="mb-6 bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-orange-900">Fee due by 15 Feb 2026</p>
                <p className="text-sm text-orange-700 mt-1">Late fee applies after due date</p>
              </div>
            </div>
          </div>
        )}

        {/* Fee Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Fee Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="text-sm font-medium text-gray-600 mb-2">Annual Fee</div>
            <div className="text-3xl font-bold text-gray-900">₹{feeData.totalFee.toLocaleString('en-IN')}</div>
            <div className="mt-3 text-xs text-gray-500">Total Fee</div>
          </div>

          {/* Paid Amount Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-sm font-medium text-gray-600">Paid Amount</div>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200">
                Paid
              </span>
            </div>
            <div className="text-3xl font-bold text-green-600">₹{feeData.paidAmount.toLocaleString('en-IN')}</div>
            <div className="mt-3 text-xs text-gray-500">Amount Received</div>
          </div>

          {/* Due Amount Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-red-200 bg-red-50">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-sm font-medium text-gray-900">Due Amount</div>
              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full border border-red-200">
                Payment Pending
              </span>
            </div>
            <div className="text-3xl font-bold text-red-600">₹{feeData.dueAmount.toLocaleString('en-IN')}</div>
            <div className="mt-3 text-xs text-gray-600">Outstanding Balance</div>
          </div>
        </div>

        {/* Processing Payment State */}
        {processingPayment && (
          <div className="mb-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <p className="font-medium text-blue-900">Processing payment... please do not refresh</p>
            </div>
          </div>
        )}

        {/* Fee Details Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Fee Details</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Term</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {feeTerms.map((term, index) => (
                  <tr key={term.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">{term.term}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-gray-900">₹{term.amount.toLocaleString('en-IN')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-700">{term.dueDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(term.status)}`}>
                        {getStatusIcon(term.status)}
                        {term.status.charAt(0).toUpperCase() + term.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {term.status === 'due' ? (
                        <button
                          onClick={() => handlePayment(term.id)}
                          disabled={processingPayment}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <CreditCard className="w-4 h-4" />
                          Pay Now
                        </button>
                      ) : term.status === 'paid' ? (
                        <span className="text-sm text-green-600 font-medium">✓ Paid</span>
                      ) : (
                        <span className="text-sm text-gray-500">Upcoming</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Methods Info */}
        {feeData.dueAmount > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Methods</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg">
                <span className="font-medium text-purple-900">UPI</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="font-medium text-blue-900">Debit / Credit Card</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                <span className="font-medium text-green-900">Net Banking</span>
              </div>
            </div>
          </div>
        )}

        {/* Empty State - All Paid */}
        {feeData.dueAmount === 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-md p-12 text-center mb-8 border border-green-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-900 mb-2">🎉 All fees are paid</h3>
            <p className="text-green-700">for this academic year</p>
          </div>
        )}

        {/* Payment History - Collapsible */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <button
            onClick={() => setShowPaymentHistory(!showPaymentHistory)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform ${showPaymentHistory ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showPaymentHistory && (
            <div className="p-6">
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">₹{payment.amount.toLocaleString('en-IN')}</div>
                        <div className="text-sm text-gray-600">{payment.date} • {payment.mode}</div>
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                      <Download className="w-4 h-4" />
                      Download Receipt
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}