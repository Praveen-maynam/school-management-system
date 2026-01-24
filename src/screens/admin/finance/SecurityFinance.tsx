import React, { useState } from 'react';
import { Shield, DollarSign, TrendingDown, Users, Camera, Shirt } from 'lucide-react';

 function SecurityFinance() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const expenseCategories = [
    {
      category: 'Security Staff Payments',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-blue-500',
      items: [
        { name: 'Security Guard Salaries', amount: 85000 },
        { name: 'Head Guard / Supervisor Salary', amount: 28000 },
        { name: 'Night Shift Allowance', amount: 12000 },
        { name: 'Overtime Payments', amount: 8500 },
        { name: 'Contract Agency Payments', amount: 45000 }
      ]
    },
    {
      category: 'CCTV & Surveillance',
      icon: <Camera className="w-5 h-5" />,
      color: 'bg-purple-500',
      items: [
        { name: 'CCTV Camera Purchase', amount: 35000 },
        { name: 'DVR / NVR Systems', amount: 25000 },
        { name: 'Hard Disks / Storage', amount: 8500 },
        { name: 'Camera Installation Charges', amount: 12000 },
        { name: 'Annual Maintenance (AMC)', amount: 15000 }
      ]
    },
    {
      category: 'Uniforms & Safety Gear',
      icon: <Shirt className="w-5 h-5" />,
      color: 'bg-green-500',
      items: [
        { name: 'Uniforms', amount: 18000 },
        { name: 'Shoes & Raincoats', amount: 8500 },
        { name: 'Jackets / Caps', amount: 6200 },
        { name: 'Whistles', amount: 1200 },
        { name: 'Body Cameras', amount: 22000 }
      ]
    }
  ];

  const totalExpense = expenseCategories.reduce((sum, cat) => 
    sum + cat.items.reduce((s, item) => s + item.amount, 0), 0
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Admin Dashboard → Finance → Security</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Security Finance Dashboard
            </h1>
          </div>
        </div>
        <p className="text-gray-600 ml-16">Track security expenses, surveillance costs, and safety investments</p>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Total Security Expenses</span>
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-600">{formatCurrency(totalExpense)}</div>
          <div className="text-xs text-gray-500 mt-1">Current fiscal year</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Staff Payments</span>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {formatCurrency(expenseCategories[0].items.reduce((sum, item) => sum + item.amount, 0))}
          </div>
          <div className="text-xs text-gray-500 mt-1">Salaries & allowances</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Surveillance Investment</span>
            <Camera className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-purple-600">
            {formatCurrency(expenseCategories[1].items.reduce((sum, item) => sum + item.amount, 0))}
          </div>
          <div className="text-xs text-gray-500 mt-1">CCTV & monitoring</div>
        </div>
      </div>

      {/* Category Overview Grid */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            Security Expenses Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {expenseCategories.map((category, index) => {
              const categoryTotal = category.items.reduce((sum, item) => sum + item.amount, 0);
              const percentage = ((categoryTotal / totalExpense) * 100).toFixed(1);
              
              return (
                <div
                  key={index}
                  onClick={() => setSelectedCategory(selectedCategory === index ? null : index)}
                  className={`${category.color} bg-opacity-10 rounded-xl p-6 border-2 cursor-pointer transition-all hover:shadow-xl ${
                    selectedCategory === index ? 'border-gray-400 shadow-xl scale-105' : 'border-transparent'
                  }`}
                >
                  <div className={`${category.color} bg-opacity-20 w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                    {category.icon}
                  </div>
                  <div className="text-sm font-medium text-gray-600 mb-2">{category.category}</div>
                  <div className="text-2xl font-bold text-gray-800 mb-2">{formatCurrency(categoryTotal)}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{category.items.length} items</span>
                    <span className="text-xs font-semibold text-gray-600 bg-white px-2 py-1 rounded-md shadow-sm">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Items */}
          {selectedCategory !== null && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-inner">
              <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                <div className={`${expenseCategories[selectedCategory].color} bg-opacity-20 p-2 rounded-lg`}>
                  {expenseCategories[selectedCategory].icon}
                </div>
                {expenseCategories[selectedCategory].category} - Detailed Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expenseCategories[selectedCategory].items.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 flex justify-between items-center border border-gray-200 hover:shadow-md transition-all hover:border-blue-300">
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    <span className="text-base font-bold text-gray-900">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t-2 border-blue-200 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Category Total:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatCurrency(expenseCategories[selectedCategory].items.reduce((sum, item) => sum + item.amount, 0))}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expense Breakdown Chart */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-500" />
            Expense Distribution
          </h2>
          <div className="space-y-5">
            {expenseCategories.map((category, index) => {
              const categoryTotal = category.items.reduce((sum, item) => sum + item.amount, 0);
              const percentage = ((categoryTotal / totalExpense) * 100).toFixed(1);
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`${category.color} w-4 h-4 rounded-md shadow-sm`}></div>
                      <span className="text-sm font-medium text-gray-700">{category.category}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(categoryTotal)}</span>
                      <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-md min-w-[55px] text-center">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                    <div
                      className={`${category.color} h-3 rounded-full transition-all duration-700 shadow-sm`}
                      style={{ width: `${percentage}%` } as React.CSSProperties}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-xs text-gray-600 mb-1">Highest Expense</div>
                <div className="text-lg font-bold text-blue-600">Staff Payments</div>
                <div className="text-sm text-gray-700">{formatCurrency(expenseCategories[0].items.reduce((sum, item) => sum + item.amount, 0))}</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="text-xs text-gray-600 mb-1">Technology Investment</div>
                <div className="text-lg font-bold text-purple-600">CCTV & Surveillance</div>
                <div className="text-sm text-gray-700">{formatCurrency(expenseCategories[1].items.reduce((sum, item) => sum + item.amount, 0))}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="text-xs text-gray-600 mb-1">Safety Equipment</div>
                <div className="text-lg font-bold text-green-600">Uniforms & Gear</div>
                <div className="text-sm text-gray-700">{formatCurrency(expenseCategories[2].items.reduce((sum, item) => sum + item.amount, 0))}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto mt-6 text-center text-sm text-gray-500">
        🛡️ Click on any expense category card to view detailed breakdown
      </div>
    </div>
  );
};
export default SecurityFinance;