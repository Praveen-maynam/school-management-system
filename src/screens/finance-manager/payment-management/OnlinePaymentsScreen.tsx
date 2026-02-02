import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Plus,
  Search,
  Filter,
  Eye,
  RefreshCw,
  Edit,
  Trash2,
  X,
  Download,
  Calendar
} from 'lucide-react';

// Types
type PaymentStatus = 'Success' | 'Pending' | 'Failed' | 'Received' | 'Cleared' | 'Bounced' | 'Verified';
type PaymentMethod = 'UPI' | 'Card' | 'Net Banking' | 'Cash' | 'Cheque';
type FeeType = 'Tuition' | 'Transport' | 'Library' | 'Sports' | 'Laboratory';

interface OnlinePayment {
  id: string;
  student: string;
  amount: number;
  date: string;
  method: 'UPI' | 'Card' | 'Net Banking';
  status: 'Success' | 'Pending' | 'Failed';
  transactionId?: string;
}

interface ManualPayment {
  id: string;
  student: string;
  amount: number;
  date: string;
  method: 'Cash' | 'Cheque';
  status: 'Received' | 'Cleared' | 'Bounced' | 'Pending' | 'Verified';
  chequeNumber?: string;
  bankName?: string;
  notes?: string;
}

const OnlinePaymentsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'online' | 'manual'>('online');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<OnlinePayment | ManualPayment | null>(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sample data
  const onlinePayments: OnlinePayment[] = [
    { id: 'OP001', student: 'John Doe', amount: 5000, date: '2026-01-25', method: 'UPI', status: 'Success', transactionId: 'UPI2026012512345' },
    { id: 'OP002', student: 'Jane Smith', amount: 3000, date: '2026-01-25', method: 'Card', status: 'Pending', transactionId: 'CARD2026012567890' },
    { id: 'OP003', student: 'Sam Wilson', amount: 4500, date: '2026-01-24', method: 'Net Banking', status: 'Failed', transactionId: 'NB2026012411111' },
    { id: 'OP004', student: 'Emma Davis', amount: 6000, date: '2026-01-23', method: 'UPI', status: 'Success', transactionId: 'UPI2026012322222' },
    { id: 'OP005', student: 'Michael Brown', amount: 2500, date: '2026-01-23', method: 'Card', status: 'Success', transactionId: 'CARD2026012333333' },
  ];

  const manualPayments: ManualPayment[] = [
    { id: 'MP001', student: 'Chris Green', amount: 2000, date: '2026-01-25', method: 'Cash', status: 'Received' },
    { id: 'MP002', student: 'Diana White', amount: 2500, date: '2026-01-24', method: 'Cheque', status: 'Cleared', chequeNumber: 'CHQ123456', bankName: 'HDFC Bank' },
    { id: 'MP003', student: 'Alice Brown', amount: 4000, date: '2026-01-25', method: 'Cash', status: 'Verified' },
    { id: 'MP004', student: 'Bob Lee', amount: 3500, date: '2026-01-24', method: 'Cheque', status: 'Pending', chequeNumber: 'CHQ789012', bankName: 'ICICI Bank' },
    { id: 'MP005', student: 'Eva Martinez', amount: 1500, date: '2026-01-22', method: 'Cash', status: 'Verified' },
  ];

  // Refund requests data
  const refundRequests = [
    { id: 'REF001', student: 'Sam Wilson', amount: 2000, date: '2026-01-25', status: 'Processed' as const },
    { id: 'REF002', student: 'Jane Smith', amount: 1500, date: '2026-01-24', status: 'Pending' as const },
    { id: 'REF003', student: 'Mark Johnson', amount: 3500, date: '2026-01-23', status: 'Pending' as const },
  ];

  // Payment verification queue
  const verificationQueue = [
    { id: 'ONL-1001', student: 'John Doe', amount: 5000, status: 'Verified' as const, type: 'online' as const },
    { id: 'MAN-2002', student: 'Alice Brown', amount: 4000, status: 'Pending' as const, type: 'manual' as const },
    { id: 'ONL-1003', student: 'Sarah Connor', amount: 7500, status: 'Pending' as const, type: 'online' as const },
    { id: 'MAN-2004', student: 'Tom Hardy', amount: 2800, status: 'Pending' as const, type: 'manual' as const },
  ];

  // Summary stats
  const stats = {
    successful: onlinePayments.filter(p => p.status === 'Success').length,
    pending: onlinePayments.filter(p => p.status === 'Pending').length,
    failed: onlinePayments.filter(p => p.status === 'Failed').length,
    manualToday: manualPayments.filter(p => p.date === '2026-01-25').length,
    totalRevenue: onlinePayments.filter(p => p.status === 'Success').reduce((sum, p) => sum + p.amount, 0) + 
                  manualPayments.filter(p => p.status === 'Verified' || p.status === 'Cleared').reduce((sum, p) => sum + p.amount, 0),
    refundsPending: refundRequests.filter(r => r.status === 'Pending').length,
    verificationPending: verificationQueue.filter(v => v.status === 'Pending').length,
  };

  // Status badge component
  const StatusBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
    const styles: Record<PaymentStatus, string> = {
      Success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      Pending: 'bg-amber-100 text-amber-700 border-amber-200',
      Failed: 'bg-red-100 text-red-700 border-red-200',
      Received: 'bg-blue-100 text-blue-700 border-blue-200',
      Cleared: 'bg-green-100 text-green-700 border-green-200',
      Bounced: 'bg-red-100 text-red-700 border-red-200',
      Verified: 'bg-purple-100 text-purple-700 border-purple-200',
    };

    const icons = {
      Success: <CheckCircle className="w-3 h-3" />,
      Pending: <Clock className="w-3 h-3" />,
      Failed: <XCircle className="w-3 h-3" />,
      Received: <CheckCircle className="w-3 h-3" />,
      Cleared: <CheckCircle className="w-3 h-3" />,
      Bounced: <XCircle className="w-3 h-3" />,
      Verified: <CheckCircle className="w-3 h-3" />,
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  // Method badge component
  const MethodBadge: React.FC<{ method: PaymentMethod }> = ({ method }) => {
    const styles: Record<PaymentMethod, string> = {
      UPI: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      Card: 'bg-blue-50 text-blue-700 border-blue-200',
      'Net Banking': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      Cash: 'bg-gray-50 text-gray-700 border-gray-300',
      Cheque: 'bg-violet-50 text-violet-700 border-violet-200',
    };

    const icons = {
      UPI: '📱',
      Card: '💳',
      'Net Banking': '🏦',
      Cash: '💵',
      Cheque: '🧾',
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[method]}`}>
        <span>{icons[method]}</span>
        {method}
      </span>
    );
  };

  // Add Manual Payment Modal
  const AddManualPaymentModal: React.FC = () => {
    const [formData, setFormData] = useState({
      student: '',
      feeType: 'Tuition' as FeeType,
      amount: '',
      method: 'Cash' as 'Cash' | 'Cheque',
      chequeNumber: '',
      bankName: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add Manual Payment</h2>
              <p className="text-sm text-gray-500 mt-0.5">Record cash or cheque payment</p>
            </div>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Student Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student *</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search student name or ID..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.student}
                  onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                />
              </div>
            </div>

            {/* Fee Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fee Type *</label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.feeType}
                onChange={(e) => setFormData({ ...formData, feeType: e.target.value as FeeType })}
              >
                <option>Tuition</option>
                <option>Transport</option>
                <option>Library</option>
                <option>Sports</option>
                <option>Laboratory</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method *</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFormData({ ...formData, method: 'Cash' })}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.method === 'Cash'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl mb-1 block">💵</span>
                  <span className="text-sm font-medium">Cash</span>
                </button>
                <button
                  onClick={() => setFormData({ ...formData, method: 'Cheque' })}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.method === 'Cheque'
                      ? 'border-violet-500 bg-violet-50 text-violet-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl mb-1 block">🧾</span>
                  <span className="text-sm font-medium">Cheque</span>
                </button>
              </div>
            </div>

            {/* Cheque Details (conditional) */}
            {formData.method === 'Cheque' && (
              <div className="space-y-4 bg-violet-50 p-4 rounded-lg border border-violet-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cheque Number *</label>
                  <input
                    type="text"
                    placeholder="Enter cheque number"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                    value={formData.chequeNumber}
                    onChange={(e) => setFormData({ ...formData, chequeNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <input
                    type="text"
                    placeholder="e.g., HDFC Bank"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Date *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                placeholder="Add any additional notes..."
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle save logic
                setShowAddModal(false);
              }}
              className="px-5 py-2.5 bg-green-600 text-white font-medium hover:bg-green-700 rounded-lg transition-colors shadow-sm"
            >
              Save Payment
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Payment Details Drawer
  const PaymentDetailsDrawer: React.FC = () => {
    if (!selectedPayment) return null;

    const isOnline = 'transactionId' in selectedPayment;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-end z-50">
        <div className="bg-white w-full max-w-md h-full shadow-2xl overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
              <button
                onClick={() => setShowDetailsDrawer(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500">Transaction ID: {selectedPayment.id}</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-100">
              <div className="text-sm text-gray-600 mb-1">Total Amount</div>
              <div className="text-3xl font-bold text-gray-900">₹{selectedPayment.amount.toLocaleString()}</div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Student</span>
                <span className="text-sm font-medium text-gray-900">{selectedPayment.student}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Payment Date</span>
                <span className="text-sm font-medium text-gray-900">{selectedPayment.date}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Method</span>
                <MethodBadge method={selectedPayment.method} />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Status</span>
                <StatusBadge status={selectedPayment.status} />
              </div>
              {isOnline && (
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Transaction ID</span>
                  <span className="text-sm font-mono text-gray-900">{selectedPayment.transactionId}</span>
                </div>
              )}
              {!isOnline && 'chequeNumber' in selectedPayment && selectedPayment.chequeNumber && (
                <>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Cheque Number</span>
                    <span className="text-sm font-mono text-gray-900">{selectedPayment.chequeNumber}</span>
                  </div>
                  {selectedPayment.bankName && (
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Bank Name</span>
                      <span className="text-sm font-medium text-gray-900">{selectedPayment.bankName}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Receipt
              </button>
              {isOnline && selectedPayment.status === 'Success' && (
                <button
                  onClick={() => {
                    setShowDetailsDrawer(false);
                    setShowRefundModal(true);
                  }}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium hover:bg-red-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refund
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Refund Confirmation Modal
  const RefundModal: React.FC = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-7 h-7 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Confirm Refund</h2>
          <p className="text-gray-600">Are you sure you want to refund this payment? This action cannot be undone.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowRefundModal(false)}
            className="flex-1 px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowRefundModal(false)}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium hover:bg-red-700 rounded-lg transition-colors"
          >
            Confirm Refund
          </button>
        </div>
      </div>
    </div>
  );

  // Delete Confirmation Modal
  const DeleteModal: React.FC = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-7 h-7 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Delete Payment</h2>
          <p className="text-gray-600">Are you sure you want to delete this payment record? This action cannot be undone.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="flex-1 px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium hover:bg-red-700 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 via-indigo-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments Management</h1>
          <p className="text-gray-600">Track online and offline fee transactions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-5 shadow-md border-2 border-emerald-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{stats.successful}</span>
            </div>
            <h3 className="text-sm font-semibold text-emerald-900">Successful Payments</h3>
            <p className="text-xs text-emerald-600 mt-1">All time record</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 shadow-md border-2 border-amber-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{stats.pending}</span>
            </div>
            <h3 className="text-sm font-semibold text-amber-900">Pending Payments</h3>
            <p className="text-xs text-amber-600 mt-1">Awaiting confirmation</p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-5 shadow-md border-2 border-red-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">{stats.failed}</span>
            </div>
            <h3 className="text-sm font-semibold text-red-900">Failed Payments</h3>
            <p className="text-xs text-red-600 mt-1">Needs attention</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 shadow-md border-2 border-blue-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{stats.manualToday}</span>
            </div>
            <h3 className="text-sm font-semibold text-blue-900">Manual Entries Today</h3>
            <p className="text-xs text-blue-600 mt-1">Cash & Cheque</p>
          </div>
        </div>

        {/* Additional Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-5 shadow-md border-2 border-purple-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-xl">💰</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">₹{stats.totalRevenue.toLocaleString()}</span>
            </div>
            <h3 className="text-sm font-semibold text-purple-900">Total Revenue</h3>
            <p className="text-xs text-purple-600 mt-1">Collected this month</p>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-5 shadow-md border-2 border-rose-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                <RefreshCw className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">{stats.refundsPending}</span>
            </div>
            <h3 className="text-sm font-semibold text-rose-900">Pending Refunds</h3>
            <p className="text-xs text-rose-600 mt-1">Requires processing</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-5 shadow-md border-2 border-cyan-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">{stats.verificationPending}</span>
            </div>
            <h3 className="text-sm font-semibold text-cyan-900">Pending Verification</h3>
            <p className="text-xs text-cyan-600 mt-1">Awaiting review</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 px-6 pt-4">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('online')}
                className={`px-5 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === 'online'
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Online Payments
                </div>
              </button>
              <button
                onClick={() => setActiveTab('manual')}
                className={`px-5 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === 'manual'
                    ? 'bg-green-50 text-green-700 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Cash / Cheque Payments
                </div>
              </button>
            </div>
          </div>

          {/* Online Payments Tab */}
          {activeTab === 'online' && (
            <div className="p-6">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search student..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm">
                  <option>All Status</option>
                  <option>Success</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm">
                  <option>All Methods</option>
                  <option>UPI</option>
                  <option>Card</option>
                  <option>Net Banking</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Date Range
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg border border-indigo-100">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-indigo-50 to-blue-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Method</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {onlinePayments.map((payment) => (
                      <tr
                        key={payment.id}
                        onClick={() => {
                          setSelectedPayment(payment);
                          setShowDetailsDrawer(true);
                        }}
                        className="hover:bg-indigo-50/30 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{payment.student}</div>
                          <div className="text-xs text-gray-500">{payment.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">₹{payment.amount.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payment.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <MethodBadge method={payment.method} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={payment.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPayment(payment);
                                setShowDetailsDrawer(true);
                              }}
                              className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {payment.status === 'Success' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPayment(payment);
                                  setShowRefundModal(true);
                                }}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Refund"
                              >
                                <RefreshCw className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Manual Payments Tab */}
          {activeTab === 'manual' && (
            <div className="p-6">
              {/* Header with Add Button */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 min-w-[250px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search student..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm">
                    <option>All Methods</option>
                    <option>Cash</option>
                    <option>Cheque</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-green-600 text-white font-medium hover:bg-green-700 rounded-lg transition-colors text-sm flex items-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Entry
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg border border-green-100">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-green-50 to-emerald-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Method</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {manualPayments.map((payment) => (
                      <tr
                        key={payment.id}
                        onClick={() => {
                          setSelectedPayment(payment);
                          setShowDetailsDrawer(true);
                        }}
                        className="hover:bg-green-50/30 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{payment.student}</div>
                          <div className="text-xs text-gray-500">{payment.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">₹{payment.amount.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payment.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <MethodBadge method={payment.method} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={payment.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle edit
                              }}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPayment(payment);
                                setShowDeleteModal(true);
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Verification Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Pending Verification</h3>
                  <span className="text-sm text-gray-500">2 items awaiting verification</span>
                </div>
                <div className="overflow-x-auto rounded-lg border border-purple-100">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-purple-50 to-violet-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Method</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {manualPayments.filter(p => p.status === 'Pending' || p.status === 'Received').map((payment) => (
                        <tr key={payment.id} className="hover:bg-purple-50/30 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{payment.student}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">₹{payment.amount.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payment.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <MethodBadge method={payment.method} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <button className="px-3 py-1.5 bg-purple-600 text-white text-xs font-medium hover:bg-purple-700 rounded-lg transition-colors">
                                Verify
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedPayment(payment);
                                  setShowDeleteModal(true);
                                }}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Refund Processing Section */}
        <div className="mt-8 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl shadow-lg border-2 border-rose-200 overflow-hidden">
          <div className="bg-gradient-to-r from-rose-100 to-pink-100 px-6 py-4 border-b-2 border-rose-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                  <RefreshCw className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-rose-900">Refund Processing</h2>
                  <p className="text-sm text-rose-600">Manage refund requests and processing</p>
                </div>
              </div>
              <span className="px-4 py-2 bg-white rounded-lg text-sm font-semibold text-rose-700 shadow-sm border border-rose-200">
                {refundRequests.filter(r => r.status === 'Pending').length} Pending
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="overflow-x-auto rounded-lg border-2 border-rose-200 shadow-sm">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-rose-100 to-pink-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-rose-900 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-rose-900 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-rose-900 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-rose-900 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-rose-900 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-rose-100">
                  {refundRequests.map((refund) => (
                    <tr key={refund.id} className="hover:bg-rose-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center font-semibold text-rose-700">
                            {refund.student.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{refund.student}</div>
                            <div className="text-xs text-gray-500">{refund.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base font-bold text-rose-600">₹{refund.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{refund.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {refund.status === 'Processed' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-2 border-emerald-300">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Processed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-2 border-amber-300">
                            <Clock className="w-3.5 h-3.5" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1.5 bg-white border-2 border-rose-300 text-rose-700 text-xs font-semibold hover:bg-rose-50 rounded-lg transition-all shadow-sm">
                            <Eye className="w-3.5 h-3.5 inline mr-1" />
                            View
                          </button>
                          {refund.status === 'Pending' && (
                            <button className="px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-semibold hover:from-rose-600 hover:to-pink-600 rounded-lg transition-all shadow-md">
                              Process
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Payment Verification Queue */}
        <div className="mt-8 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl shadow-lg border-2 border-cyan-200 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-100 to-teal-100 px-6 py-4 border-b-2 border-cyan-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-cyan-900">Payment Verification</h2>
                  <p className="text-sm text-cyan-600">Review and verify payment transactions</p>
                </div>
              </div>
              <span className="px-4 py-2 bg-white rounded-lg text-sm font-semibold text-cyan-700 shadow-sm border border-cyan-200">
                {verificationQueue.filter(v => v.status === 'Pending').length} Pending
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="overflow-x-auto rounded-lg border-2 border-cyan-200 shadow-sm">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-cyan-100 to-teal-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-cyan-900 uppercase tracking-wider">Payment ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-cyan-900 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-cyan-900 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-cyan-900 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-cyan-900 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-cyan-900 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-cyan-100">
                  {verificationQueue.map((item) => (
                    <tr key={item.id} className="hover:bg-cyan-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${item.status === 'Verified' ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`}></span>
                          <span className="text-sm font-mono font-semibold text-gray-900">{item.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center font-semibold text-cyan-700 text-sm">
                            {item.student.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{item.student}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base font-bold text-cyan-600">₹{item.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.type === 'online' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 border border-indigo-300">
                            💳 Online
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300">
                            💵 Manual
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.status === 'Verified' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-2 border-emerald-300">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-2 border-amber-300">
                            <Clock className="w-3.5 h-3.5" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {item.status === 'Pending' && (
                            <>
                              <button className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-semibold hover:from-emerald-600 hover:to-green-600 rounded-lg transition-all shadow-md">
                                ✓ Verify
                              </button>
                              <button className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-semibold hover:from-red-600 hover:to-rose-600 rounded-lg transition-all shadow-md">
                                ✕ Reject
                              </button>
                            </>
                          )}
                          {item.status === 'Verified' && (
                            <button className="px-3 py-1.5 bg-white border-2 border-cyan-300 text-cyan-700 text-xs font-semibold hover:bg-cyan-50 rounded-lg transition-all shadow-sm">
                              <Eye className="w-3.5 h-3.5 inline mr-1" />
                              View
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals and Drawers */}
      {showAddModal && <AddManualPaymentModal />}
      {showDetailsDrawer && <PaymentDetailsDrawer />}
      {showRefundModal && <RefundModal />}
      {showDeleteModal && <DeleteModal />}
    </div>
  );
};

export default OnlinePaymentsScreen;