import React from 'react';
import { Bell, Settings, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">☰ Finance Management</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-sm text-gray-600 hover:text-gray-900">Dashboard</button>
            <button className="text-sm text-gray-600 hover:text-gray-900">Reports</button>
            <button className="text-sm text-blue-600 font-medium border-b-2 border-blue-600 pb-4 -mb-4">Finance</button>
            <button className="text-sm text-gray-600 hover:text-gray-900">Settings</button>
            <Bell className="w-5 h-5 text-gray-600" />
            <Settings className="w-5 h-5 text-gray-600" />
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Finance Categories Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Finance Categories</h2>
              <p className="text-sm text-gray-600 mt-1">Manage all financial aspects of your institution</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
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