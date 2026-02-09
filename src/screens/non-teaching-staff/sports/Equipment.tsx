import React, { useState } from 'react';
import { Plus, Eye, Edit2 } from 'lucide-react';

// Type definitions
export type EquipmentCondition = 'excellent' | 'good' | 'fair' | 'poor';

export interface Equipment {
  id: string;
  name: string;
  sport: string;
  totalQuantity: number;
  availableQuantity: number;
  condition: EquipmentCondition;
  location: string;
  lastMaintenance: string;
}

// Condition Badge Component
interface ConditionBadgeProps {
  condition: EquipmentCondition;
}

const ConditionBadge: React.FC<ConditionBadgeProps> = ({ condition }) => {
  const conditionStyles = {
    excellent: 'bg-green-100 text-green-700 border-green-200',
    good: 'bg-blue-100 text-blue-700 border-blue-200',
    fair: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    poor: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium border ${conditionStyles[condition]}`}
    >
      {condition}
    </span>
  );
};

// Table Row Component
interface EquipmentRowProps {
  equipment: Equipment;
  onView?: (equipment: Equipment) => void;
  onEdit?: (equipment: Equipment) => void;
}

const EquipmentRow: React.FC<EquipmentRowProps> = ({ equipment, onView, onEdit }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
      {/* Equipment Name */}
      <td className="px-6 py-4">
        <span className="text-base font-semibold text-gray-900">
          {equipment.name}
        </span>
      </td>

      {/* Sport */}
      <td className="px-6 py-4">
        <span className="text-base text-gray-700">{equipment.sport}</span>
      </td>

      {/* Total Quantity */}
      <td className="px-6 py-4">
        <span className="text-base text-gray-900">{equipment.totalQuantity}</span>
      </td>

      {/* Available Quantity */}
      <td className="px-6 py-4">
        <span className="text-base font-semibold text-green-600">
          {equipment.availableQuantity}
        </span>
      </td>

      {/* Condition */}
      <td className="px-6 py-4">
        <ConditionBadge condition={equipment.condition} />
      </td>

      {/* Location */}
      <td className="px-6 py-4">
        <span className="text-base text-gray-700">{equipment.location}</span>
      </td>

      {/* Last Maintenance */}
      <td className="px-6 py-4">
        <span className="text-base text-gray-700">{equipment.lastMaintenance}</span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onView?.(equipment)}
            className="text-orange-600 hover:text-orange-700 transition-colors duration-150"
            aria-label="View details"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => onEdit?.(equipment)}
            className="text-blue-600 hover:text-blue-700 transition-colors duration-150"
            aria-label="Edit equipment"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Main Equipment Management Component
const EquipmentManagementApp: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([
    {
      id: '1',
      name: 'Cricket Bats',
      sport: 'Cricket',
      totalQuantity: 25,
      availableQuantity: 18,
      condition: 'good',
      location: 'Sports Room A',
      lastMaintenance: '15/1/2024',
    },
    {
      id: '2',
      name: 'Footballs',
      sport: 'Football',
      totalQuantity: 30,
      availableQuantity: 22,
      condition: 'excellent',
      location: 'Sports Room B',
      lastMaintenance: '20/1/2024',
    },
    {
      id: '3',
      name: 'Badminton Rackets',
      sport: 'Badminton',
      totalQuantity: 40,
      availableQuantity: 28,
      condition: 'good',
      location: 'Indoor Storage',
      lastMaintenance: '10/1/2024',
    },
    {
      id: '4',
      name: 'Basketball Balls',
      sport: 'Basketball',
      totalQuantity: 20,
      availableQuantity: 15,
      condition: 'excellent',
      location: 'Indoor Court Storage',
      lastMaintenance: '25/1/2024',
    },
  ]);

  const handleView = (equipment: Equipment) => {
    console.log('View equipment:', equipment);
    // Implement view logic
  };

  const handleEdit = (equipment: Equipment) => {
    console.log('Edit equipment:', equipment);
    // Implement edit logic
  };

  // Add Equipment Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    sport: '',
    totalQuantity: 1,
    availableQuantity: 1,
    condition: 'good' as EquipmentCondition,
    location: '',
    lastMaintenance: ''
  });

  const handleAddEquipment = () => {
    setShowAddModal(true);
  };

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEquipment: Equipment = {
      id: (equipmentList.length + 1).toString(),
      ...addForm,
    };
    setEquipmentList([...equipmentList, newEquipment]);
    setShowAddModal(false);
    setAddForm({
      name: '',
      sport: '',
      totalQuantity: 1,
      availableQuantity: 1,
      condition: 'good',
      location: '',
      lastMaintenance: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Equipment Management</h1>
          <button
            onClick={handleAddEquipment}
            className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-150"
          >
            <Plus className="w-5 h-5" />
            Add Equipment
          </button>
        </div>

        {/* Add Equipment Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowAddModal(false)}>
                <span className="text-2xl">×</span>
              </button>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Equipment</h2>
              <form onSubmit={handleAddSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Name *</label>
                  <input
                    type="text"
                    required
                    value={addForm.name}
                    onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Cricket Bat"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sport *</label>
                  <input
                    type="text"
                    required
                    value={addForm.sport}
                    onChange={e => setAddForm({ ...addForm, sport: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Cricket"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Quantity *</label>
                    <input
                      type="number"
                      min={1}
                      required
                      value={addForm.totalQuantity}
                      onChange={e => setAddForm({ ...addForm, totalQuantity: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Quantity *</label>
                    <input
                      type="number"
                      min={0}
                      max={addForm.totalQuantity}
                      required
                      value={addForm.availableQuantity}
                      onChange={e => setAddForm({ ...addForm, availableQuantity: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition *</label>
                  <select
                    value={addForm.condition}
                    onChange={e => setAddForm({ ...addForm, condition: e.target.value as EquipmentCondition })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    required
                    value={addForm.location}
                    onChange={e => setAddForm({ ...addForm, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Sports Room A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Maintenance *</label>
                  <input
                    type="date"
                    required
                    value={addForm.lastMaintenance}
                    onChange={e => setAddForm({ ...addForm, lastMaintenance: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
                  >
                    Add Equipment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Equipment
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Sport
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Total Qty
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Available
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Condition
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Last Maintenance
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {equipmentList.map((equipment) => (
                  <EquipmentRow
                    key={equipment.id}
                    equipment={equipment}
                    onView={handleView}
                    onEdit={handleEdit}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {equipmentList.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No equipment yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start by adding your first piece of equipment
              </p>
              <button
                onClick={handleAddEquipment}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-150"
              >
                <Plus className="w-5 h-5" />
                Add Equipment
              </button>
            </div>
          )}
        </div>

        {/* Summary Statistics */}
        {equipmentList.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {equipmentList.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xl text-blue-600">📦</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Quantity</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {equipmentList.reduce((sum, e) => sum + e.totalQuantity, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-xl text-green-600">📊</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Available Now</p>
                  <p className="text-2xl font-bold text-green-600">
                    {equipmentList.reduce((sum, e) => sum + e.availableQuantity, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-xl text-green-600">✓</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">In Use</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {equipmentList.reduce(
                      (sum, e) => sum + (e.totalQuantity - e.availableQuantity),
                      0
                    )}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-xl text-orange-600">🏃</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentManagementApp;