
import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Dropdown from '../../../components/ui/Dropdown';
import Button from '../../../components/ui/Button';

// Mock plans
const plans = [
  { label: 'Free', value: 'free', description: 'Basic access, limited features' },
  { label: 'Basic', value: 'basic', description: 'Standard features for small schools' },
  { label: 'Premium', value: 'premium', description: 'All features, priority support' },
  { label: 'Custom', value: 'custom', description: 'Custom plan for large/unique needs' },
];

const mockSchool = {
  name: 'Springfield High School',
  id: 'SCH-2026-001',
  currentPlan: 'Basic',
  storageLimit: 50, // GB
  smsLimit: 1000, // per month
};

const PlanAssignmentScreen: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>(mockSchool.currentPlan.toLowerCase());
  const [storageLimit, setStorageLimit] = useState<number>(mockSchool.storageLimit);
  const [smsLimit, setSmsLimit] = useState<number>(mockSchool.smsLimit);
  const [saving, setSaving] = useState(false);

  // Placeholder handlers for UI components
  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedPlan(e.target.value);
  const handleStorageChange = (e: React.ChangeEvent<HTMLInputElement>) => setStorageLimit(Number(e.target.value));
  const handleSmsChange = (e: React.ChangeEvent<HTMLInputElement>) => setSmsLimit(Number(e.target.value));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1200); // Simulate API call
    // TODO: Integrate with backend
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Assign Plan to School</h1>
      <div className="mb-4">
        <div className="text-gray-600 text-sm mb-1">School Name</div>
        <div className="font-semibold text-lg">{mockSchool.name}</div>
        <div className="text-xs text-gray-400">ID: {mockSchool.id}</div>
      </div>
      <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Plan</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            value={selectedPlan}
            onChange={handlePlanChange}
          >
            {plans.map(plan => (
              <option key={plan.value} value={plan.value}>{plan.label} - {plan.description}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Storage Limit (GB)</label>
          <input
            type="number"
            min={1}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            value={storageLimit}
            onChange={handleStorageChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">SMS Limit (per month)</label>
          <input
            type="number"
            min={0}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            value={smsLimit}
            onChange={handleSmsChange}
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded text-white font-semibold transition ${saving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Assign Plan'}
        </button>
      </form>
    </div>
  );
};

export default PlanAssignmentScreen;
