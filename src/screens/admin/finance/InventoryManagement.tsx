import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, BookOpen, Laptop, Armchair, Briefcase, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';

const InventoryManagement = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedExpenseType, setSelectedExpenseType] = useState('all');

  const inventoryCategories = [
    {
      category: 'Academic Inventory',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'bg-blue-500',
      items: [
        { name: 'Textbooks', quantity: 3500, value: 875000, status: 'good', expenseType: 'New Purchase' },
        { name: 'Notebooks', quantity: 2800, value: 168000, status: 'good', expenseType: 'New Purchase' },
        { name: 'Question Papers', quantity: 1200, value: 36000, status: 'good', expenseType: 'New Purchase' },
        { name: 'Charts & Models', quantity: 150, value: 45000, status: 'good', expenseType: 'Replacement' },
        { name: 'Smart Class Devices', quantity: 25, value: 625000, status: 'excellent', expenseType: 'Upgrade' },
        { name: 'Project Materials', quantity: 500, value: 125000, status: 'good', expenseType: 'New Purchase' }
      ]
    },
    {
      category: 'IT & Electronics Inventory',
      icon: <Laptop className="w-5 h-5" />,
      color: 'bg-purple-500',
      items: [
        { name: 'Computers / Laptops', quantity: 85, value: 3400000, status: 'excellent', expenseType: 'New Purchase' },
        { name: 'Projectors', quantity: 15, value: 450000, status: 'good', expenseType: 'Replacement' },
        { name: 'Printers / Scanners', quantity: 12, value: 240000, status: 'good', expenseType: 'AMC / Warranty' },
        { name: 'Routers / Switches', quantity: 20, value: 100000, status: 'excellent', expenseType: 'Upgrade' },
        { name: 'CCTV Devices', quantity: 45, value: 675000, status: 'excellent', expenseType: 'New Purchase' },
        { name: 'Biometric Machines', quantity: 8, value: 120000, status: 'good', expenseType: 'AMC / Warranty' },
        { name: 'UPS / Batteries', quantity: 30, value: 450000, status: 'needs-repair', expenseType: 'Repair' }
      ]
    },
    {
      category: 'Furniture & Classroom Assets',
      icon: <Armchair className="w-5 h-5" />,
      color: 'bg-green-500',
      items: [
        { name: 'Student Benches & Desks', quantity: 420, value: 1260000, status: 'good', expenseType: 'Replacement' },
        { name: 'Teacher Tables & Chairs', quantity: 55, value: 275000, status: 'good', expenseType: 'New Purchase' },
        { name: 'Cupboards', quantity: 75, value: 375000, status: 'good', expenseType: 'New Purchase' },
        { name: 'Whiteboards / Smart Boards', quantity: 48, value: 480000, status: 'excellent', expenseType: 'Upgrade' },
        { name: 'Notice Boards', quantity: 30, value: 90000, status: 'good', expenseType: 'New Purchase' }
      ]
    },
    {
      category: 'Office & Admin Inventory',
      icon: <Briefcase className="w-5 h-5" />,
      color: 'bg-orange-500',
      items: [
        { name: 'Papers (Reams)', quantity: 500, value: 75000, status: 'good', expenseType: 'New Purchase' },
        { name: 'Printer Ink / Toner', quantity: 85, value: 127500, status: 'good', expenseType: 'New Purchase' },
        { name: 'Files & Folders', quantity: 800, value: 80000, status: 'good', expenseType: 'New Purchase' },
        { name: 'Registers', quantity: 250, value: 62500, status: 'good', expenseType: 'New Purchase' },
        { name: 'ID Cards', quantity: 1200, value: 120000, status: 'excellent', expenseType: 'New Purchase' },
        { name: 'Stamp & Seals', quantity: 15, value: 7500, status: 'good', expenseType: 'Replacement' }
      ]
    }
  ];

  const expenseTypes = [
    { type: 'New Purchase', icon: '🆕', color: 'bg-blue-100 text-blue-700 border-blue-300' },
    { type: 'Replacement', icon: '🔄', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    { type: 'Repair', icon: '🔧', color: 'bg-red-100 text-red-700 border-red-300' },
    { type: 'AMC / Warranty', icon: '📋', color: 'bg-green-100 text-green-700 border-green-300' },
    { type: 'Upgrade', icon: '⬆️', color: 'bg-purple-100 text-purple-700 border-purple-300' },
    { type: 'Disposal / Scrap', icon: '🗑️', color: 'bg-gray-100 text-gray-700 border-gray-300' }
  ];

  const getFilteredItems = () => {
    if (selectedExpenseType === 'all') return inventoryCategories;
    
    return inventoryCategories.map(cat => ({
      ...cat,
      items: cat.items.filter(item => item.expenseType === selectedExpenseType)
    })).filter(cat => cat.items.length > 0);
  };

  const totalItems = inventoryCategories.reduce((sum, cat) => 
    sum + cat.items.reduce((s, item) => s + item.quantity, 0), 0
  );
  
  const totalValue = inventoryCategories.reduce((sum, cat) => 
    sum + cat.items.reduce((s, item) => s + item.value, 0), 0
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: string } = {
      'excellent': 'bg-green-100 text-green-700 border-green-300',
      'good': 'bg-blue-100 text-blue-700 border-blue-300',
      'needs-repair': 'bg-red-100 text-red-700 border-red-300'
    };
    return badges[status] || badges.good;
  };

  const filteredCategories = getFilteredItems();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
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
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Admin Dashboard → Finance → Inventory</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Inventory Management Dashboard
            </h1>
          </div>
        </div>
        <p className="text-gray-600 ml-16">Track assets, equipment, and inventory across all categories</p>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Total Items</span>
            <Package className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-indigo-600">{totalItems.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Across all categories</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Total Inventory Value</span>
            <DollarSign className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-purple-600">{formatCurrency(totalValue)}</div>
          <div className="text-xs text-gray-500 mt-1">Current valuation</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Categories</span>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600">{inventoryCategories.length}</div>
          <div className="text-xs text-gray-500 mt-1">Active categories</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Needs Attention</span>
            <AlertCircle className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-orange-600">
            {inventoryCategories.reduce((sum, cat) => 
              sum + cat.items.filter(item => item.status === 'needs-repair').length, 0
            )}
          </div>
          <div className="text-xs text-gray-500 mt-1">Items requiring repair</div>
        </div>
      </div>

      {/* Expense Type Filter */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Filter by Expense Type</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedExpenseType('all')}
              className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                selectedExpenseType === 'all' 
                  ? 'bg-indigo-500 text-white border-indigo-500 shadow-md' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-300'
              }`}
            >
              All Types
            </button>
            {expenseTypes.map((expense, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedExpenseType(expense.type)}
                className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                  selectedExpenseType === expense.type 
                    ? expense.color + ' shadow-md' 
                    : 'bg-white text-gray-700 border-gray-300 hover:' + expense.color.split(' ')[0]
                }`}
              >
                <span className="mr-2">{expense.icon}</span>
                {expense.type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Overview Grid */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-indigo-600" />
            Inventory Categories Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {inventoryCategories.map((category, index) => {
              const categoryTotal = category.items.reduce((sum, item) => sum + item.value, 0);
              const categoryQuantity = category.items.reduce((sum, item) => sum + item.quantity, 0);
              
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
                  <div className="text-2xl font-bold text-gray-800 mb-1">{formatCurrency(categoryTotal)}</div>
                  <div className="text-xs text-gray-500">{categoryQuantity} items • {category.items.length} types</div>
                </div>
              );
            })}
          </div>

          {/* Detailed Items */}
          {selectedCategory !== null && (
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 shadow-inner">
              <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                <div className={`${inventoryCategories[selectedCategory].color} bg-opacity-20 p-2 rounded-lg`}>
                  {inventoryCategories[selectedCategory].icon}
                </div>
                {inventoryCategories[selectedCategory].category} - Detailed Breakdown
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {inventoryCategories[selectedCategory].items.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 mb-1">{item.name}</div>
                        <div className="flex gap-2 flex-wrap">
                          <span className={`text-xs px-2 py-1 rounded border ${getStatusBadge(item.status)}`}>
                            {item.status.replace('-', ' ').toUpperCase()}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded border ${
                            expenseTypes.find(e => e.type === item.expenseType)?.color
                          }`}>
                            {expenseTypes.find(e => e.type === item.expenseType)?.icon} {item.expenseType}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{formatCurrency(item.value)}</div>
                        <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t-2 border-indigo-200 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Category Total:</span>
                <span className="text-2xl font-bold text-indigo-600">
                  {formatCurrency(inventoryCategories[selectedCategory].items.reduce((sum, item) => sum + item.value, 0))}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filtered Results */}
      {selectedExpenseType !== 'all' && (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {expenseTypes.find(e => e.type === selectedExpenseType)?.icon} {selectedExpenseType} Items
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCategories.map((category, catIdx) => (
                <div key={catIdx}>
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    {category.icon}
                    {category.category}
                  </h3>
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-gray-50 rounded-lg p-3 mb-2 flex justify-between items-center">
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">{formatCurrency(item.value)}</div>
                        <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto mt-6 text-center text-sm text-gray-500">
        📦 Click on any category card to view detailed inventory breakdown
      </div>
    </div>
  );
};

export default InventoryManagement;