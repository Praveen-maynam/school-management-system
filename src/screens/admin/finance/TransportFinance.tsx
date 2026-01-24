import React, { useState } from 'react';
import { Bus, DollarSign, TrendingUp, TrendingDown, Users, Fuel, Wrench, FileText, Wifi, Briefcase, AlertTriangle } from 'lucide-react';

 function TransportFinance() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const incomeData = [
    { name: 'Student Bus Fees', amount: 125000, icon: '🎓' },
    { name: 'Annual Transport Charges', amount: 85000, icon: '📅' },
    { name: 'Late Fee / Fine', amount: 4500, icon: '⏰' },
    { name: 'Route Change Charges', amount: 3200, icon: '🔄' },
    { name: 'Temporary / Monthly Pass', amount: 12800, icon: '🎫' }
  ];

  const expenseCategories = [
    {
      category: 'Staff Payments',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-blue-500',
      items: [
        { name: 'Driver Salaries', amount: 45000 },
        { name: 'Conductor / Helper Salaries', amount: 28000 },
        { name: 'Overtime Payments', amount: 5500 },
        { name: 'Incentives / Allowances', amount: 3200 }
      ]
    },
    {
      category: 'Fuel & Daily Running',
      icon: <Fuel className="w-5 h-5" />,
      color: 'bg-orange-500',
      items: [
        { name: 'Diesel / Petrol / CNG', amount: 65000 },
        { name: 'Engine Oil', amount: 4500 },
        { name: 'Coolant / AdBlue', amount: 1800 },
        { name: 'Monthly Fuel Bills', amount: 68000 }
      ]
    },
    {
      category: 'Maintenance & Repairs',
      icon: <Wrench className="w-5 h-5" />,
      color: 'bg-purple-500',
      items: [
        { name: 'Regular Servicing', amount: 12000 },
        { name: 'Breakdown Repairs', amount: 8500 },
        { name: 'Tyres Replacement', amount: 15000 },
        { name: 'Battery Replacement', amount: 6000 },
        { name: 'Spare Parts', amount: 9500 },
        { name: 'Washing & Cleaning', amount: 2400 }
      ]
    },
    {
      category: 'Legal & Compliance',
      icon: <FileText className="w-5 h-5" />,
      color: 'bg-green-500',
      items: [
        { name: 'Vehicle Insurance', amount: 35000 },
        { name: 'Fitness Certificate (FC)', amount: 2500 },
        { name: 'Pollution Certificate (PUC)', amount: 800 },
        { name: 'Road Tax', amount: 18000 },
        { name: 'Permit Fees', amount: 5500 }
      ]
    },
    {
      category: 'Tracking & Technology',
      icon: <Wifi className="w-5 h-5" />,
      color: 'bg-cyan-500',
      items: [
        { name: 'GPS Subscription', amount: 3600 },
        { name: 'RFID / Student Scan System', amount: 2800 },
        { name: 'CCTV Maintenance', amount: 4200 },
        { name: 'SIM / Internet for Buses', amount: 1500 }
      ]
    },
    {
      category: 'Admin & Operations',
      icon: <Briefcase className="w-5 h-5" />,
      color: 'bg-indigo-500',
      items: [
        { name: 'Transport Office Expenses', amount: 5500 },
        { name: 'Uniforms for Drivers', amount: 4800 },
        { name: 'First Aid & Safety Kits', amount: 1200 },
        { name: 'Fire Extinguishers', amount: 2500 }
      ]
    },
    {
      category: 'Assets & Big Purchases',
      icon: <Bus className="w-5 h-5" />,
      color: 'bg-yellow-500',
      items: [
        { name: 'New Bus Purchase', amount: 0 },
        { name: 'Old Bus Resale', amount: 0 },
        { name: 'Leasing / EMI', amount: 25000 },
        { name: 'Major Upgrades', amount: 12000 }
      ]
    },
    {
      category: 'Fines & Special Costs',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'bg-red-500',
      items: [
        { name: 'Traffic Challans', amount: 2400 },
        { name: 'Accident Repair Costs', amount: 8500 },
        { name: 'Emergency Breakdown Costs', amount: 3200 }
      ]
    }
  ];

  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenseCategories.reduce((sum, cat) => 
    sum + cat.items.reduce((s, item) => s + item.amount, 0), 0
  );
  const netBalance = totalIncome - totalExpense;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-br from-blue-500 to-orange-500 p-3 rounded-xl">
            <Bus className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Admin Dashboard → Finance → Transport</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              Transport Finance Dashboard
            </h1>
          </div>
        </div>
        <p className="text-gray-600 ml-16">Track transport income, expenses, and fleet management costs</p>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Total Income</span>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-600">{formatCurrency(totalIncome)}</div>
          <div className="text-xs text-gray-500 mt-1">Current fiscal year</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Total Expenses</span>
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-600">{formatCurrency(totalExpense)}</div>
          <div className="text-xs text-gray-500 mt-1">Current fiscal year</div>
        </div>

        <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${netBalance >= 0 ? 'border-blue-500' : 'border-orange-500'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Net Balance</span>
            <DollarSign className={`w-5 h-5 ${netBalance >= 0 ? 'text-blue-500' : 'text-orange-500'}`} />
          </div>
          <div className={`text-3xl font-bold ${netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            {formatCurrency(netBalance)}
          </div>
          <div className="text-xs text-gray-500 mt-1">{netBalance >= 0 ? 'Surplus' : 'Deficit'}</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Expense Categories</span>
            <Bus className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-purple-600">{expenseCategories.length}</div>
          <div className="text-xs text-gray-500 mt-1">Active categories</div>
        </div>
      </div>

      {/* Income Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            Transport Income (Money Coming In)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {incomeData.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-lg font-bold text-green-600">{formatCurrency(item.amount)}</span>
                </div>
                <div className="text-sm font-medium text-gray-700">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expenses Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-red-500" />
            Transport Expenses (Money Going Out)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {expenseCategories.map((category, index) => {
              const categoryTotal = category.items.reduce((sum, item) => sum + item.amount, 0);
              return (
                <div
                  key={index}
                  onClick={() => setSelectedCategory(selectedCategory === index ? null : index)}
                  className={`${category.color} bg-opacity-10 rounded-lg p-4 border-2 cursor-pointer transition-all hover:shadow-lg ${
                    selectedCategory === index ? 'border-gray-400 shadow-lg' : 'border-transparent'
                  }`}
                >
                  <div className={`${category.color} bg-opacity-20 w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                    {category.icon}
                  </div>
                  <div className="text-sm font-medium text-gray-600 mb-1">{category.category}</div>
                  <div className="text-xl font-bold text-gray-800">{formatCurrency(categoryTotal)}</div>
                  <div className="text-xs text-gray-500 mt-1">{category.items.length} items</div>
                </div>
              );
            })}
          </div>

          {/* Detailed Items */}
          {selectedCategory !== null && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {expenseCategories[selectedCategory].category} - Detailed Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {expenseCategories[selectedCategory].items.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 flex justify-between items-center border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    <span className="text-sm font-bold text-gray-900">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto mt-6 text-center text-sm text-gray-500">
        Click on any expense category to view detailed breakdown
      </div>
    </div>
  );
};
export default TransportFinance;