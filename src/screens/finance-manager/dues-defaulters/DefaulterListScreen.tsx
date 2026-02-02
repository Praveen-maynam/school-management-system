import React, { useState } from 'react';
import { 
  AlertCircle,
  DollarSign,
  Clock,
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  X,
  Eye,
  Calendar,
  Search,
  Filter,
  Download,
  TrendingUp,
  Users,
  IndianRupee,
  Bell,
  RefreshCw,
  Trash2,
  Edit
} from 'lucide-react';

// Types
type ReminderStatus = 'Sent' | 'Pending' | 'Failed';
type ReminderChannel = 'SMS' | 'WhatsApp' | 'Email';
type PaymentMethod = 'Cash' | 'Online' | 'Cheque' | 'UPI' | 'Card';

interface Defaulter {
  id: string;
  student: string;
  class: string;
  dueAmount: number;
  lastPaidDate: string;
  contact: string;
  overdueDays: number;
}

interface DueTracking {
  id: string;
  student: string;
  class: string;
  totalFee: number;
  paidAmount: number;
  dueAmount: number;
  lastPaymentDate: string;
}

interface Reminder {
  id: string;
  student: string;
  dueAmount: number;
  contact: string;
  status: ReminderStatus;
  channel: ReminderChannel;
  sentDate?: string;
}

const DefaulterDueManagementScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'defaulters' | 'tracking' | 'reminders'>('defaulters');
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBreakdownDrawer, setShowBreakdownDrawer] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Defaulter | DueTracking | Reminder | null>(null);

  // Sample Data
  const defaulters: Defaulter[] = [
    { id: 'D001', student: 'John Doe', class: 'Class 10-A', dueAmount: 3000, lastPaidDate: '2025-12-15', contact: '9876543210', overdueDays: 45 },
    { id: 'D002', student: 'Jane Smith', class: 'Class 9-B', dueAmount: 4500, lastPaidDate: '2025-11-20', contact: '9876543211', overdueDays: 70 },
    { id: 'D003', student: 'Sam Wilson', class: 'Class 8-C', dueAmount: 2000, lastPaidDate: '2025-10-10', contact: '9876543212', overdueDays: 110 },
    { id: 'D004', student: 'Emily Davis', class: 'Class 11-A', dueAmount: 5500, lastPaidDate: '2025-12-01', contact: '9876543213', overdueDays: 59 },
    { id: 'D005', student: 'Michael Brown', class: 'Class 7-B', dueAmount: 1800, lastPaidDate: '2026-01-05', contact: '9876543214', overdueDays: 25 },
  ];

  const dueTracking: DueTracking[] = [
    { id: 'DT001', student: 'John Doe', class: 'Class 10-A', totalFee: 15000, paidAmount: 12000, dueAmount: 3000, lastPaymentDate: '2025-12-15' },
    { id: 'DT002', student: 'Jane Smith', class: 'Class 9-B', totalFee: 18000, paidAmount: 13500, dueAmount: 4500, lastPaymentDate: '2025-11-20' },
    { id: 'DT003', student: 'Sam Wilson', class: 'Class 8-C', totalFee: 12000, paidAmount: 10000, dueAmount: 2000, lastPaymentDate: '2025-10-10' },
    { id: 'DT004', student: 'Emily Davis', class: 'Class 11-A', totalFee: 20000, paidAmount: 14500, dueAmount: 5500, lastPaymentDate: '2025-12-01' },
  ];

  const reminders: Reminder[] = [
    { id: 'R001', student: 'John Doe', dueAmount: 3000, contact: '9876543210', status: 'Sent', channel: 'SMS', sentDate: '2026-01-28' },
    { id: 'R002', student: 'Jane Smith', dueAmount: 4500, contact: '9876543211', status: 'Pending', channel: 'WhatsApp' },
    { id: 'R003', student: 'Sam Wilson', dueAmount: 2000, contact: '9876543212', status: 'Sent', channel: 'Email', sentDate: '2026-01-29' },
    { id: 'R004', student: 'Emily Davis', dueAmount: 5500, contact: '9876543213', status: 'Failed', channel: 'SMS', sentDate: '2026-01-27' },
    { id: 'R005', student: 'Michael Brown', dueAmount: 1800, contact: '9876543214', status: 'Pending', channel: 'Email' },
  ];

  // Summary Stats
  const stats = {
    totalDefaulters: defaulters.length,
    totalDueAmount: defaulters.reduce((sum, d) => sum + d.dueAmount, 0),
    overdue30Days: defaulters.filter(d => d.overdueDays > 30).length,
    remindersSentToday: reminders.filter(r => r.sentDate === '2026-01-30').length,
  };

  // Send Reminder Modal Component
  const SendReminderModal: React.FC = () => {
    const [selectedChannel, setSelectedChannel] = useState<ReminderChannel>('SMS');
    const [message, setMessage] = useState('Dear Parent, Your ward has a pending fee of ₹{amount}. Please clear the dues at the earliest. - School Admin');

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-md">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Send Payment Reminder</h2>
                  <p className="text-sm text-gray-600">Choose channel and customize message</p>
                </div>
              </div>
              <button
                onClick={() => setShowReminderModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Student Info */}
            {selectedStudent && 'student' in selectedStudent && (
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-xl border-2 border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Student</div>
                    <div className="text-lg font-semibold text-gray-900">{selectedStudent.student}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Due Amount</div>
                    <div className="text-2xl font-bold text-red-600">₹{selectedStudent.dueAmount.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Channel Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Select Channel</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedChannel('SMS')}
                  className={`px-4 py-4 rounded-xl border-2 transition-all ${
                    selectedChannel === 'SMS'
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <Phone className={`w-6 h-6 mx-auto mb-2 ${selectedChannel === 'SMS' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div className={`text-sm font-semibold ${selectedChannel === 'SMS' ? 'text-blue-700' : 'text-gray-600'}`}>SMS</div>
                  <div className="text-xs text-gray-500 mt-1">160 chars</div>
                </button>

                <button
                  onClick={() => setSelectedChannel('WhatsApp')}
                  className={`px-4 py-4 rounded-xl border-2 transition-all ${
                    selectedChannel === 'WhatsApp'
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <MessageSquare className={`w-6 h-6 mx-auto mb-2 ${selectedChannel === 'WhatsApp' ? 'text-green-600' : 'text-gray-400'}`} />
                  <div className={`text-sm font-semibold ${selectedChannel === 'WhatsApp' ? 'text-green-700' : 'text-gray-600'}`}>WhatsApp</div>
                  <div className="text-xs text-gray-500 mt-1">Instant</div>
                </button>

                <button
                  onClick={() => setSelectedChannel('Email')}
                  className={`px-4 py-4 rounded-xl border-2 transition-all ${
                    selectedChannel === 'Email'
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <Mail className={`w-6 h-6 mx-auto mb-2 ${selectedChannel === 'Email' ? 'text-purple-600' : 'text-gray-400'}`} />
                  <div className={`text-sm font-semibold ${selectedChannel === 'Email' ? 'text-purple-700' : 'text-gray-600'}`}>Email</div>
                  <div className="text-xs text-gray-500 mt-1">Detailed</div>
                </button>
              </div>
            </div>

            {/* Message Template */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message Template</label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">Use {'{amount}'} for dynamic amount insertion</p>
                <span className="text-xs text-gray-600 font-medium">{message.length} characters</span>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-2 mb-2">
                <Bell className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm font-semibold text-blue-900">Preview</div>
              </div>
              <div className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-blue-200">
                {message.replace('{amount}', selectedStudent && 'dueAmount' in selectedStudent ? `₹${selectedStudent.dueAmount.toLocaleString()}` : '₹0')}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-gray-50 border-t-2 border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
            <button
              onClick={() => setShowReminderModal(false)}
              className="px-5 py-2.5 text-gray-700 font-semibold hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle send
                setShowReminderModal(false);
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:from-blue-600 hover:to-indigo-600 rounded-lg transition-all shadow-md flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Reminder
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Mark Paid Modal Component
  const MarkPaidModal: React.FC = () => {
    const [formData, setFormData] = useState({
      amount: selectedStudent && 'dueAmount' in selectedStudent ? selectedStudent.dueAmount.toString() : '',
      method: 'Cash' as PaymentMethod,
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full">
          <div className="sticky top-0 bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Mark as Paid</h2>
                  <p className="text-sm text-gray-600">Record payment details</p>
                </div>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Student Info */}
            {selectedStudent && 'student' in selectedStudent && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200">
                <div className="text-sm text-gray-600 mb-1">Student</div>
                <div className="text-lg font-semibold text-gray-900">{selectedStudent.student}</div>
              </div>
            )}

            {/* Amount Paid */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Amount Paid *</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method *</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Cash', 'Online', 'Cheque', 'UPI', 'Card'] as PaymentMethod[]).map((method) => (
                  <button
                    key={method}
                    onClick={() => setFormData({ ...formData, method })}
                    className={`px-3 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${
                      formData.method === method
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Date *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</label>
              <textarea
                rows={3}
                placeholder="Add any additional notes..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="sticky bottom-0 bg-gray-50 border-t-2 border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="px-5 py-2.5 text-gray-700 font-semibold hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle mark as paid
                setShowPaymentModal(false);
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:from-green-600 hover:to-emerald-600 rounded-lg transition-all shadow-md flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Fee Breakdown Drawer
  const FeeBreakdownDrawer: React.FC = () => {
    if (!selectedStudent || !('student' in selectedStudent)) return null;

    const feeBreakdown = [
      { type: 'Tuition Fee', amount: 8000, paid: 8000, status: 'Paid' },
      { type: 'Transport Fee', amount: 3000, paid: 2000, status: 'Partial' },
      { type: 'Library Fee', amount: 1500, paid: 1500, status: 'Paid' },
      { type: 'Sports Fee', amount: 2000, paid: 500, status: 'Due' },
      { type: 'Laboratory Fee', amount: 500, paid: 0, status: 'Due' },
    ];

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-end z-50">
        <div className="bg-white w-full max-w-lg h-full shadow-2xl overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-rose-50 to-red-50 border-b-2 border-rose-200 px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-gray-900">Fee Breakdown</h2>
              <button
                onClick={() => setShowBreakdownDrawer(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <div className="text-sm text-gray-600">Student</div>
              <div className="text-lg font-semibold text-gray-900">{selectedStudent.student}</div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-5 rounded-xl border-2 border-red-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total Due</div>
                  <div className="text-2xl font-bold text-red-600">₹{selectedStudent.dueAmount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Last Paid</div>
                  <div className="text-sm font-semibold text-gray-900">{'lastPaidDate' in selectedStudent ? selectedStudent.lastPaidDate : 'N/A'}</div>
                </div>
              </div>
            </div>

            {/* Fee Items */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Fee Components</h3>
              <div className="space-y-3">
                {feeBreakdown.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-semibold text-gray-900">{item.type}</div>
                      <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Paid' ? 'bg-green-100 text-green-700' :
                        item.status === 'Partial' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Paid: ₹{item.paid}</span>
                      <span className="font-semibold text-gray-900">Total: ₹{item.amount}</span>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.status === 'Paid' ? 'bg-green-500' : item.status === 'Partial' ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${(item.paid / item.amount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  setShowBreakdownDrawer(false);
                  setShowReminderModal(true);
                }}
                className="flex-1 px-4 py-3 bg-white border-2 border-blue-300 text-blue-700 font-semibold hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Reminder
              </button>
              <button
                onClick={() => {
                  setShowBreakdownDrawer(false);
                  setShowPaymentModal(true);
                }}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:from-green-600 hover:to-emerald-600 rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Mark Paid
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fee Defaulters & Due Tracking</h1>
              <p className="text-gray-600">Monitor outstanding fees and follow up effectively</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-5 shadow-md border-2 border-red-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">{stats.totalDefaulters}</span>
            </div>
            <h3 className="text-sm font-semibold text-red-900">Total Defaulters</h3>
            <p className="text-xs text-red-600 mt-1">Students with pending fees</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 shadow-md border-2 border-orange-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">₹{stats.totalDueAmount.toLocaleString()}</span>
            </div>
            <h3 className="text-sm font-semibold text-orange-900">Total Due Amount</h3>
            <p className="text-xs text-orange-600 mt-1">Outstanding balance</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 shadow-md border-2 border-amber-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">{stats.overdue30Days}</span>
            </div>
            <h3 className="text-sm font-semibold text-amber-900">Overdue &gt; 30 Days</h3>
            <p className="text-xs text-amber-600 mt-1">Critical attention needed</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 shadow-md border-2 border-blue-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{stats.remindersSentToday}</span>
            </div>
            <h3 className="text-sm font-semibold text-blue-900">Reminders Sent Today</h3>
            <p className="text-xs text-blue-600 mt-1">Follow-ups completed</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
          <div className="border-b-2 border-gray-200 px-6 pt-4">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('defaulters')}
                className={`px-5 py-3 text-sm font-semibold rounded-t-lg transition-all ${
                  activeTab === 'defaulters'
                    ? 'bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-b-2 border-red-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Defaulter List
                </div>
              </button>
              <button
                onClick={() => setActiveTab('tracking')}
                className={`px-5 py-3 text-sm font-semibold rounded-t-lg transition-all ${
                  activeTab === 'tracking'
                    ? 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-b-2 border-amber-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Due Amount Tracking
                </div>
              </button>
              <button
                onClick={() => setActiveTab('reminders')}
                className={`px-5 py-3 text-sm font-semibold rounded-t-lg transition-all ${
                  activeTab === 'reminders'
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Payment Reminders
                </div>
              </button>
            </div>
          </div>

          {/* TAB 1: Defaulter List */}
          {activeTab === 'defaulters' && (
            <div className="p-6">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="relative flex-1 min-w-[250px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search student..."
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <select className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm font-medium">
                  <option>All Classes</option>
                  <option>Class 10-A</option>
                  <option>Class 9-B</option>
                  <option>Class 8-C</option>
                </select>
                <select className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm font-medium">
                  <option>Overdue Days</option>
                  <option>&gt; 30 Days</option>
                  <option>&gt; 60 Days</option>
                  <option>&gt; 90 Days</option>
                </select>
                <button className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold hover:from-red-600 hover:to-rose-600 rounded-lg transition-all shadow-md flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border-2 border-red-200 shadow-sm">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-red-100 to-rose-100 sticky top-0">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-red-900 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-red-900 uppercase tracking-wider">Due Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-red-900 uppercase tracking-wider">Last Paid Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-red-900 uppercase tracking-wider">Overdue Days</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-red-900 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-red-900 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-red-100">
                    {defaulters.map((defaulter, idx) => (
                      <tr
                        key={defaulter.id}
                        onClick={() => {
                          setSelectedStudent(defaulter);
                          setShowBreakdownDrawer(true);
                        }}
                        className={`hover:bg-red-50/50 cursor-pointer transition-colors ${idx % 2 === 1 ? 'bg-red-50/20' : ''}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-rose-100 rounded-full flex items-center justify-center font-semibold text-red-700">
                              {defaulter.student.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{defaulter.student}</div>
                              <div className="text-xs text-gray-500">{defaulter.class}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-bold text-red-600">₹{defaulter.dueAmount.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{defaulter.lastPaidDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${
                            defaulter.overdueDays > 90 ? 'bg-red-100 text-red-700 border-2 border-red-300' :
                            defaulter.overdueDays > 60 ? 'bg-orange-100 text-orange-700 border-2 border-orange-300' :
                            defaulter.overdueDays > 30 ? 'bg-amber-100 text-amber-700 border-2 border-amber-300' :
                            'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                          }`}>
                            <Clock className="w-3 h-3" />
                            {defaulter.overdueDays} days
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Phone className="w-3.5 h-3.5" />
                            {defaulter.contact}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedStudent(defaulter);
                                setShowReminderModal(true);
                              }}
                              className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold hover:from-blue-600 hover:to-indigo-600 rounded-lg transition-all shadow-sm"
                            >
                              <Send className="w-3.5 h-3.5 inline mr-1" />
                              Remind
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedStudent(defaulter);
                                setShowPaymentModal(true);
                              }}
                              className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold hover:from-green-600 hover:to-emerald-600 rounded-lg transition-all shadow-sm"
                            >
                              <CheckCircle className="w-3.5 h-3.5 inline mr-1" />
                              Mark Paid
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Due Amount Tracking */}
          {activeTab === 'tracking' && (
            <div className="p-6">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="relative flex-1 min-w-[250px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search student..."
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                  />
                </div>
                <select className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-medium">
                  <option>All Classes</option>
                  <option>Class 10-A</option>
                  <option>Class 9-B</option>
                </select>
                <select className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-medium">
                  <option>Due Amount Range</option>
                  <option>₹0 - ₹2,000</option>
                  <option>₹2,000 - ₹5,000</option>
                  <option>&gt; ₹5,000</option>
                </select>
                <button className="px-4 py-2.5 border-2 border-amber-300 text-amber-700 font-semibold hover:bg-amber-50 rounded-lg transition-all flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  More Filters
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border-2 border-amber-200 shadow-sm">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-amber-100 to-yellow-100 sticky top-0">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-amber-900 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-amber-900 uppercase tracking-wider">Total Fee</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-amber-900 uppercase tracking-wider">Paid Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-amber-900 uppercase tracking-wider">Due Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-amber-900 uppercase tracking-wider">Progress</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-amber-900 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-amber-100">
                    {dueTracking.map((item, idx) => {
                      const percentage = (item.paidAmount / item.totalFee) * 100;
                      return (
                        <tr
                          key={item.id}
                          onClick={() => {
                            setSelectedStudent(item);
                            setShowBreakdownDrawer(true);
                          }}
                          className={`hover:bg-amber-50/50 cursor-pointer transition-colors ${idx % 2 === 1 ? 'bg-amber-50/20' : ''}`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center font-semibold text-amber-700">
                                {item.student.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-gray-900">{item.student}</div>
                                <div className="text-xs text-gray-500">{item.class}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">₹{item.totalFee.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-green-600">₹{item.paidAmount.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-lg font-bold text-red-600">₹{item.dueAmount.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="w-32">
                              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                <span>{percentage.toFixed(0)}%</span>
                              </div>
                              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedStudent(item);
                                  setShowReminderModal(true);
                                }}
                                className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold hover:from-blue-600 hover:to-indigo-600 rounded-lg transition-all shadow-sm"
                              >
                                Remind
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedStudent(item);
                                  setShowPaymentModal(true);
                                }}
                                className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold hover:from-green-600 hover:to-emerald-600 rounded-lg transition-all shadow-sm"
                              >
                                Mark Paid
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Payment Reminders */}
          {activeTab === 'reminders' && (
            <div className="p-6">
              {/* Filters & Actions */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="relative flex-1 min-w-[250px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search student..."
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <select className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium">
                  <option>All Channels</option>
                  <option>SMS</option>
                  <option>WhatsApp</option>
                  <option>Email</option>
                </select>
                <select className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium">
                  <option>All Status</option>
                  <option>Sent</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>
                <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:from-blue-600 hover:to-indigo-600 rounded-lg transition-all shadow-md flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Bulk Reminders
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border-2 border-blue-200 shadow-sm">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-100 to-indigo-100 sticky top-0">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Due Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Channel</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-blue-100">
                    {reminders.map((reminder, idx) => (
                      <tr
                        key={reminder.id}
                        className={`hover:bg-blue-50/50 transition-colors ${idx % 2 === 1 ? 'bg-blue-50/20' : ''}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center font-semibold text-blue-700">
                              {reminder.student.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{reminder.student}</div>
                              <div className="text-xs text-gray-500">{reminder.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-base font-bold text-red-600">₹{reminder.dueAmount.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Phone className="w-3.5 h-3.5" />
                            {reminder.contact}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {reminder.channel === 'SMS' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-300">
                              <Phone className="w-3 h-3" />
                              SMS
                            </span>
                          )}
                          {reminder.channel === 'WhatsApp' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-300">
                              <MessageSquare className="w-3 h-3" />
                              WhatsApp
                            </span>
                          )}
                          {reminder.channel === 'Email' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-300">
                              <Mail className="w-3 h-3" />
                              Email
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {reminder.status === 'Sent' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border-2 border-green-300">
                              <CheckCircle className="w-3 h-3" />
                              Sent
                              {reminder.sentDate && <span className="text-[10px] ml-1">({reminder.sentDate})</span>}
                            </span>
                          )}
                          {reminder.status === 'Pending' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border-2 border-amber-300">
                              <Clock className="w-3 h-3" />
                              Pending
                            </span>
                          )}
                          {reminder.status === 'Failed' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border-2 border-red-300">
                              <X className="w-3 h-3" />
                              Failed
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {(reminder.status === 'Pending' || reminder.status === 'Failed') && (
                              <button className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold hover:from-blue-600 hover:to-indigo-600 rounded-lg transition-all shadow-sm">
                                <RefreshCw className="w-3.5 h-3.5 inline mr-1" />
                                Resend
                              </button>
                            )}
                            <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
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
          )}
        </div>
      </div>

      {/* Modals and Drawers */}
      {showReminderModal && <SendReminderModal />}
      {showPaymentModal && <MarkPaidModal />}
      {showBreakdownDrawer && <FeeBreakdownDrawer />}
    </div>
  );
};

export default DefaulterDueManagementScreen;