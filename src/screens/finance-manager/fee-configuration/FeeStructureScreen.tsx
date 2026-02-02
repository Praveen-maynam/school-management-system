import React, { useState } from 'react';
import { Plus, Edit2, Trash2, DollarSign, TrendingUp, AlertCircle, Search } from 'lucide-react';

// Type definitions
interface FeeStructure {
  id: number;
  name: string;
  amount: number;
  frequency: 'Annual' | 'Monthly' | 'Quarterly';
}

interface FeeCategory {
  id: number;
  category: string;
  description: string;
  icon: string;
}

interface DiscountRule {
  id: number;
  name: string;
  value: number;
  criteria: string;
  enabled: boolean;
}

interface LateFeeRule {
  id: number;
  daysLate: number;
  amount: number;
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

// Delete Confirmation Modal Component
const DeleteConfirmationModal: React.FC<DeleteModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemName 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-rose-600" />
          </div>
          <h3 className="text-2xl font-serif text-slate-800">Confirm Deletion</h3>
        </div>
        <p className="text-slate-600 mb-6">
          Are you sure you want to delete <span className="font-semibold text-slate-800">"{itemName}"</span>? 
          This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-6 py-2.5 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Frequency Badge Component
const FrequencyBadge: React.FC<{ frequency: string }> = ({ frequency }) => {
  const colors = {
    Annual: 'bg-teal-100 text-teal-700 border-teal-200',
    Monthly: 'bg-amber-100 text-amber-700 border-amber-200',
    Quarterly: 'bg-violet-100 text-violet-700 border-violet-200',
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[frequency as keyof typeof colors]}`}>
      {frequency}
    </span>
  );
};

// Main Component
const FeesStructureScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'structures' | 'categories' | 'discounts' | 'latefees'>('structures');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    itemName: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    itemName: '',
    onConfirm: () => {},
  });

  // Sample data states
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([
    { id: 1, name: 'Primary', amount: 15000, frequency: 'Annual' },
    { id: 2, name: 'Secondary', amount: 18000, frequency: 'Annual' },
    { id: 3, name: 'Transport', amount: 3000, frequency: 'Monthly' },
    { id: 4, name: 'Hostel', amount: 8000, frequency: 'Quarterly' },
  ]);

  const [feeCategories, setFeeCategories] = useState<FeeCategory[]>([
    { id: 1, category: 'Tuition', description: 'Covers academic fees', icon: '🎓' },
    { id: 2, category: 'Transport', description: 'Bus/van charges', icon: '🚌' },
    { id: 3, category: 'Library', description: 'Library usage fees', icon: '📚' },
    { id: 4, category: 'Sports', description: 'Sports and activities', icon: '⚽' },
  ]);

  const [discountRules, setDiscountRules] = useState<DiscountRule[]>([
    { id: 1, name: 'Sibling Discount', value: 10, criteria: 'For siblings', enabled: true },
    { id: 2, name: 'Merit Scholarship', value: 15, criteria: 'Top 5% students', enabled: true },
    { id: 3, name: 'Early Bird', value: 5, criteria: 'Paid before 1st April', enabled: false },
  ]);

  const [lateFeeRules, setLateFeeRules] = useState<LateFeeRule[]>([
    { id: 1, daysLate: 5, amount: 100 },
    { id: 2, daysLate: 10, amount: 250 },
    { id: 3, daysLate: 20, amount: 500 },
  ]);

  // Utility functions
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDelete = (itemName: string, onConfirm: () => void) => {
    setDeleteModal({ isOpen: true, itemName, onConfirm });
  };

  const toggleDiscount = (id: number) => {
    setDiscountRules(discountRules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-teal-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slideUp">
          <h1 className="text-4xl font-serif text-slate-800 mb-2">Fee Management</h1>
          <p className="text-slate-600">Manage fee structures, categories, discounts, and penalties</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-teal-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slideUp">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-teal-700" />
              </div>
              <span className="text-2xl font-bold text-slate-800">{feeStructures.length}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">Fee Structures</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
              <span className="text-2xl font-bold text-slate-800">{feeCategories.length}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">Fee Categories</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-violet-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-violet-700" />
              </div>
              <span className="text-2xl font-bold text-slate-800">
                {discountRules.filter(d => d.enabled).length}
              </span>
            </div>
            <p className="text-sm text-slate-600 font-medium">Active Discounts</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-rose-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-rose-700" />
              </div>
              <span className="text-2xl font-bold text-slate-800">{lateFeeRules.length}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">Late Fee Rules</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 mb-6 p-2 flex gap-2 animate-slideUp">
          {[
            { key: 'structures' as const, label: 'Fee Structures' },
            { key: 'categories' as const, label: 'Categories' },
            { key: 'discounts' as const, label: 'Discounts' },
            { key: 'latefees' as const, label: 'Late Fees' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Fee Structures Section */}
        {activeTab === 'structures' && (
          <div className="bg-white rounded-2xl border border-teal-100 overflow-hidden animate-slideUp">
            <div className="bg-gradient-to-r from-teal-50 to-teal-100/50 px-6 py-5 border-b border-teal-200 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-serif text-slate-800 mb-1">Fee Structure Setup</h2>
                <p className="text-sm text-slate-600">Define different fee structures applied to students</p>
              </div>
              <button className="bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg">
                <Plus className="w-5 h-5" />
                Add Fee Structure
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search fee structures..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Name
                      </th>
                      <th className="text-right py-4 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Amount
                      </th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Frequency
                      </th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeStructures.map((structure) => (
                      <tr 
                        key={structure.id} 
                        className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-teal-50/30 hover:to-transparent transition-colors"
                      >
                        <td className="py-4 px-4">
                          <span className="font-semibold text-slate-800">{structure.name}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-lg font-bold text-teal-700">
                            {formatCurrency(structure.amount)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex justify-center">
                            <FrequencyBadge frequency={structure.frequency} />
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-2 text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all hover:scale-110">
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleDelete(structure.name, () => {
                                setFeeStructures(feeStructures.filter(s => s.id !== structure.id));
                              })}
                              className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all hover:scale-110"
                            >
                              <Trash2 className="w-5 h-5" />
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

        {/* Fee Categories Section */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden animate-slideUp">
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 px-6 py-5 border-b border-emerald-200 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-serif text-slate-800 mb-1">Fee Category Management</h2>
                <p className="text-sm text-slate-600">Manage fee types used across the system</p>
              </div>
              <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg">
                <Plus className="w-5 h-5" />
                Add Category
              </button>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Category
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Description
                      </th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeCategories.map((category) => (
                      <tr 
                        key={category.id} 
                        className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-emerald-50/30 hover:to-transparent transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{category.icon}</span>
                            <span className="font-semibold text-slate-800">{category.category}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-slate-600">{category.description}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all hover:scale-110">
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleDelete(category.category, () => {
                                setFeeCategories(feeCategories.filter(c => c.id !== category.id));
                              })}
                              className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all hover:scale-110"
                            >
                              <Trash2 className="w-5 h-5" />
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

        {/* Discount Rules Section */}
        {activeTab === 'discounts' && (
          <div className="bg-white rounded-2xl border border-violet-100 overflow-hidden animate-slideUp">
            <div className="bg-gradient-to-r from-violet-50 to-violet-100/50 px-6 py-5 border-b border-violet-200 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-serif text-slate-800 mb-1">Discount Rules</h2>
                <p className="text-sm text-slate-600">Define automatic fee discounts</p>
              </div>
              <button className="bg-violet-600 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-violet-700 transition-colors shadow-md hover:shadow-lg">
                <Plus className="w-5 h-5" />
                Add Discount
              </button>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Name
                      </th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Value
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Criteria
                      </th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Status
                      </th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {discountRules.map((rule) => (
                      <tr 
                        key={rule.id} 
                        className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-violet-50/30 hover:to-transparent transition-colors"
                      >
                        <td className="py-4 px-4">
                          <span className="font-semibold text-slate-800">{rule.name}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-block bg-violet-600 text-white px-4 py-1.5 rounded-full text-sm font-bold">
                            {rule.value}%
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-slate-600 text-sm">{rule.criteria}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => toggleDiscount(rule.id)}
                            className={`relative w-11 h-6 rounded-full transition-colors ${
                              rule.enabled ? 'bg-emerald-500' : 'bg-slate-300'
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                                rule.enabled ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-2 text-slate-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all hover:scale-110">
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleDelete(rule.name, () => {
                                setDiscountRules(discountRules.filter(r => r.id !== rule.id));
                              })}
                              className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all hover:scale-110"
                            >
                              <Trash2 className="w-5 h-5" />
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

        {/* Late Fee Rules Section */}
        {activeTab === 'latefees' && (
          <div className="bg-white rounded-2xl border border-rose-100 overflow-hidden animate-slideUp">
            <div className="bg-gradient-to-r from-rose-50 to-rose-100/50 px-6 py-5 border-b border-rose-200 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-serif text-slate-800 mb-1">Late Fee Configuration</h2>
                <p className="text-sm text-slate-600">Apply penalties for late payments</p>
              </div>
              <button className="bg-rose-600 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-rose-700 transition-colors shadow-md hover:shadow-lg">
                <Plus className="w-5 h-5" />
                Add Late Fee Rule
              </button>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Days Late
                      </th>
                      <th className="text-right py-4 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Penalty Amount
                      </th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {lateFeeRules.map((rule) => (
                      <tr 
                        key={rule.id} 
                        className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-rose-50/30 hover:to-transparent transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                              <AlertCircle className="w-5 h-5 text-rose-600" />
                            </div>
                            <div>
                              <span className="font-semibold text-slate-800">After {rule.daysLate} days</span>
                              <p className="text-xs text-slate-500">Penalty applies</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-xl font-bold text-rose-600">
                            {formatCurrency(rule.amount)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all hover:scale-110">
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleDelete(`${rule.daysLate} days late fee`, () => {
                                setLateFeeRules(lateFeeRules.filter(r => r.id !== rule.id));
                              })}
                              className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all hover:scale-110"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Timeline visualization */}
              <div className="mt-8 p-6 bg-gradient-to-br from-rose-50 to-amber-50 rounded-xl border border-rose-100">
                <h3 className="font-serif text-lg text-slate-800 mb-4">Late Fee Timeline</h3>
                <div className="flex items-center gap-4 overflow-x-auto">
                  {lateFeeRules.map((rule, index) => (
                    <React.Fragment key={rule.id}>
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-16 h-16 bg-white border-2 border-rose-300 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-sm font-bold text-rose-700">{rule.daysLate}d</span>
                        </div>
                        <div className="mt-2 text-center">
                          <p className="text-xs text-slate-600 font-medium">
                            {formatCurrency(rule.amount)}
                          </p>
                        </div>
                      </div>
                      {index < lateFeeRules.length - 1 && (
                        <div className="flex-1 min-w-[2rem] h-0.5 bg-gradient-to-r from-rose-300 to-rose-200"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        onConfirm={deleteModal.onConfirm}
        itemName={deleteModal.itemName}
      />
    </div>
  );
};

export default FeesStructureScreen;