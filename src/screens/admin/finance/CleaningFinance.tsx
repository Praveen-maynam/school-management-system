import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, DollarSign, TrendingDown, Users, ShoppingCart, Wrench, Shield, Trash2 } from 'lucide-react';

 function CleaningFinance() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const expenseCategories = [
    {
      category: 'Cleaning Staff Payments',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-blue-500',
      items: [
        { name: 'Cleaning Staff Salaries', amount: 52000 },
        { name: 'Supervisor Salary', amount: 18000 },
        { name: 'Overtime Payments', amount: 6500 },
        { name: 'Contract Staff Payments', amount: 25000 }
      ]
    },
    {
      category: 'Cleaning Supplies & Consumables',
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'bg-green-500',
      items: [
        { name: 'Floor Cleaner / Phenyl', amount: 4500 },
        { name: 'Hand Wash / Sanitizers', amount: 3800 },
        { name: 'Detergents', amount: 3200 },
        { name: 'Dustbins & Garbage Bags', amount: 2500 },
        { name: 'Mops, Brooms, Brushes', amount: 2800 },
        { name: 'Tissue Papers', amount: 4200 },
        { name: 'Disinfectant Sprays', amount: 3500 },
        { name: 'Room Fresheners', amount: 2200 }
      ]
    },
    {
      category: 'Equipment & Tools',
      icon: <Wrench className="w-5 h-5" />,
      color: 'bg-purple-500',
      items: [
        { name: 'Vacuum Cleaners', amount: 15000 },
        { name: 'Floor Scrubbers', amount: 25000 },
        { name: 'Pressure Washers', amount: 12000 },
        { name: 'Carpet Cleaners', amount: 8500 },
        { name: 'Window Cleaning Tools', amount: 3200 },
        { name: 'Steam Cleaners', amount: 18000 }
      ]
    },
    {
      category: 'Maintenance & Repairs',
      icon: <Wrench className="w-5 h-5" />,
      color: 'bg-orange-500',
      items: [
        { name: 'Machine Repairs', amount: 5500 },
        { name: 'Replacement Parts', amount: 4200 },
        { name: 'Annual Service (AMC)', amount: 12000 }
      ]
    },
    {
      category: 'Safety & Uniform',
      icon: <Shield className="w-5 h-5" />,
      color: 'bg-cyan-500',
      items: [
        { name: 'Gloves, Masks, Caps', amount: 3800 },
        { name: 'Aprons / Uniforms', amount: 6500 },
        { name: 'Shoes / Gum Boots', amount: 4200 },
        { name: 'First Aid for Staff', amount: 1500 }
      ]
    },
    {
      category: 'Waste Management',
      icon: <Trash2 className="w-5 h-5" />,
      color: 'bg-red-500',
      items: [
        { name: 'Garbage Collection Charges', amount: 8500 },
        { name: 'Bio-waste Disposal', amount: 6200 },
        { name: 'Septic Tank Cleaning', amount: 4500 },
        { name: 'E-waste Handling', amount: 2800 }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 p-6">
      {/* Back Button */}
      <button
        className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 mb-6"
        onClick={() => navigate('/admin/finance')}
        aria-label="Back to Finance Dashboard"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back
      </button>
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-3 rounded-xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Admin Dashboard → Finance → Cleaning</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Cleaning Finance Dashboard
            </h1>
          </div>
        </div>
        <p className="text-gray-600 ml-16">Track cleaning expenses, supplies, and maintenance costs</p>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Total Expenses</span>
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-600">{formatCurrency(totalExpense)}</div>
          <div className="text-xs text-gray-500 mt-1">Current fiscal year</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Expense Categories</span>
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-purple-600">{expenseCategories.length}</div>
          <div className="text-xs text-gray-500 mt-1">Active categories</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Staff Payments</span>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {formatCurrency(expenseCategories[0].items.reduce((sum, item) => sum + item.amount, 0))}
          </div>
          <div className="text-xs text-gray-500 mt-1">Salaries & contracts</div>
        </div>
      </div>

      {/* Category Overview Grid */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-red-500" />
            Cleaning Expenses Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {expenseCategories.map((category, index) => {
              const categoryTotal = category.items.reduce((sum, item) => sum + item.amount, 0);
              const percentage = ((categoryTotal / totalExpense) * 100).toFixed(1);
              
              return (
                <div
                  key={index}
                  onClick={() => setSelectedCategory(selectedCategory === index ? null : index)}
                  className={`${category.color} bg-opacity-10 rounded-lg p-5 border-2 cursor-pointer transition-all hover:shadow-lg ${
                    selectedCategory === index ? 'border-gray-400 shadow-lg scale-105' : 'border-transparent'
                  }`}
                >
                  <div className={`${category.color} bg-opacity-20 w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                    {category.icon}
                  </div>
                  <div className="text-sm font-medium text-gray-600 mb-1">{category.category}</div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{formatCurrency(categoryTotal)}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{category.items.length} items</span>
                    <span className="text-xs font-semibold text-gray-600 bg-white px-2 py-1 rounded">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Items */}
          {selectedCategory !== null && (
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                {expenseCategories[selectedCategory].icon}
                {expenseCategories[selectedCategory].category} - Detailed Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {expenseCategories[selectedCategory].items.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 flex justify-between items-center border border-gray-200 hover:shadow-md transition-shadow">
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    <span className="text-base font-bold text-gray-900">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-300 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Category Total:</span>
                <span className="text-xl font-bold text-blue-600">
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
          <div className="space-y-4">
            {expenseCategories.map((category, index) => {
              const categoryTotal = category.items.reduce((sum, item) => sum + item.amount, 0);
              const percentage = ((categoryTotal / totalExpense) * 100).toFixed(1);
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`${category.color} w-4 h-4 rounded`}></div>
                      <span className="text-sm font-medium text-gray-700">{category.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(categoryTotal)}</span>
                      <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded min-w-[50px] text-center">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                    <div
                      className={`${category.color} h-2.5 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` } as React.CSSProperties}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto mt-6 text-center text-sm text-gray-500">
        Click on any expense category card to view detailed breakdown
      </div>
    </div>
  );
};
export default CleaningFinance;