import React, { useState } from 'react';
import { Bell, Settings, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Simple Modal Component
const Modal = ({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        {children}
      </div>
    </div>
  );
};

const FinanceDashboard = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'Students',
      icon: '🎓',
      description: 'Tuition fees, scholarships, and student payments',
      amount: '$458,230',
      status: 'Active',
      color: 'bg-blue-50'
    },
    {
      title: 'Teaching Staff',
      icon: '💚',
      description: 'Salaries, bonuses, and benefits for teachers',
      amount: '$285,400',
      status: 'Active',
      color: 'bg-green-50'
    },
    {
      title: 'Non-Teaching Staff',
      icon: '👥',
      description: 'Salaries and expenses for support staff',
      amount: '$142,850',
      status: 'Active',
      color: 'bg-purple-50'
    }
  ];

  const subCategories = [
    {
      title: 'Library',
      icon: '📚',
      description: 'Library & assistants',
      amount: '$28,500',
      staff: '12 Staff',
      color: 'bg-orange-50'
    },
    {
      title: 'Transport',
      icon: '🚌',
      description: 'Drivers & coordinators',
      amount: '$45,200',
      staff: '18 Staff',
      color: 'bg-blue-50'
    },
    {
      title: 'Cleaning',
      icon: '🧹',
      description: 'Cleaning staff',
      amount: '$32,400',
      staff: '24 Staff',
      color: 'bg-green-50'
    },
    {
      title: 'Security',
      icon: '🛡️',
      description: 'Security guards',
      amount: '$38,750',
      staff: '16 Staff',
      color: 'bg-red-50'
    },
    {
      title: 'Inventory',
      icon: '📦',
      description: 'Store managers',
      amount: '$18,000',
      staff: '6 Staff',
      color: 'bg-purple-50'
    }
  ];

  const transactions = [
    {
      date: 'Jan 15, 2024',
      category: 'Non-Teaching',
      subcategory: 'Security',
      description: 'Monthly salary payment',
      amount: '$3,850',
      status: 'Paid'
    }
  ];

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    date: '',
    category: '',
    subcategory: '',
    description: '',
    amount: '',
    status: 'Paid',
  });
  const [formError, setFormError] = useState('');

  // Handle form change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (stub for production integration)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!form.date || !form.category || !form.description || !form.amount) {
      setFormError('Please fill all required fields.');
      return;
    }
    setFormError('');
    // TODO: Integrate with transaction API
    // await createTransaction(form)
    setShowModal(false);
    // Optionally, refresh transactions list
  };

  return (
    <div className="min-h-screen bg-gray-50">
     

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Finance Categories Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Finance Categories</h2>
              <p className="text-sm text-gray-600 mt-1">Manage all financial aspects of your institution</p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setShowModal(true)}
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
                {/* Add Transaction Modal */}
                <Modal open={showModal} onClose={() => setShowModal(false)}>
                  <h3 className="text-lg font-bold mb-4">Add Transaction</h3>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Date<span className="text-red-500">*</span></label>
                      <input type="date" name="date" value={form.date} onChange={handleFormChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Category<span className="text-red-500">*</span></label>
                      <input type="text" name="category" value={form.category} onChange={handleFormChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Subcategory</label>
                      <input type="text" name="subcategory" value={form.subcategory} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description<span className="text-red-500">*</span></label>
                      <input type="text" name="description" value={form.description} onChange={handleFormChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Amount<span className="text-red-500">*</span></label>
                      <input type="number" name="amount" value={form.amount} onChange={handleFormChange} className="w-full border rounded px-3 py-2" required min="0" step="0.01" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Status</label>
                      <select name="status" value={form.status} onChange={handleFormChange} className="w-full border rounded px-3 py-2">
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>
                    {formError && <div className="text-red-500 text-sm">{formError}</div>}
                    <div className="flex justify-end gap-2">
                      <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowModal(false)}>Cancel</button>
                      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add</button>
                    </div>
                  </form>
                </Modal>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className={`${cat.color} rounded-lg p-6 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow`}
                onClick={() => {
                  if (cat.title === 'Students') {
                    navigate('/admin/finance/students');
                  } else if (cat.title === 'Teaching Staff') {
                    navigate('/admin/finance/teaching-staff');
                  }
                }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{cat.icon}</div>
                  <span className="text-xs text-green-600 font-medium">{cat.status}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{cat.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{cat.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{cat.amount}</span>
                  <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Non-Teaching Staff Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Non-Teaching Staff Categories</h2>
              <p className="text-sm text-gray-600 mt-1">Detailed breakdown of non-teaching staff expenses</p>
            </div>
            <button className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {subCategories.map((sub, idx) => (
              <div key={idx} className={`${sub.color} rounded-lg p-4 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow`}
                onClick={() => {
                  const routes: { [key: string]: string } = {
                    'Library': '/admin/finance/library',
                    'Transport': '/admin/finance/transport',
                    'Cleaning': '/admin/finance/cleaning',
                    'Security': '/admin/finance/security',
                    'Inventory': '/admin/finance/inventory'
                  };
                  if (routes[sub.title]) {
                    navigate(routes[sub.title]);
                  }
                }}>
                <div className="text-2xl mb-3 text-center">{sub.icon}</div>
                <h3 className="text-sm font-semibold text-gray-900 text-center mb-1">{sub.title}</h3>
                <p className="text-xs text-gray-600 text-center mb-3">{sub.description}</p>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{sub.amount}</div>
                  <div className="text-xs text-gray-600">{sub.staff}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All →
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{txn.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{txn.category}<br/><span className="text-xs text-gray-600">{txn.subcategory}</span></td>
                    <td className="px-6 py-4 text-sm text-gray-900">{txn.description}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{txn.amount}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;