
import React, { useState } from 'react';
import Modal from '../../../components/ui/Modal';

// Mock plans data
const mockPlans = [
  {
    id: 'plan-free',
    name: 'Free',
    price: 0,
    features: ['Basic access', 'Community support'],
    status: 'Active',
  },
  {
    id: 'plan-basic',
    name: 'Basic',
    price: 49,
    features: ['All Free features', 'Email support', 'Up to 1000 users'],
    status: 'Active',
  },
  {
    id: 'plan-premium',
    name: 'Premium',
    price: 199,
    features: ['All Basic features', 'Priority support', 'Unlimited users'],
    status: 'Inactive',
  },
  {
    id: 'plan-custom',
    name: 'Custom',
    price: 0,
    features: ['Custom features', 'Dedicated manager'],
    status: 'Active',
  },
];

const BillingPlansScreen: React.FC = () => {
  const [plans, setPlans] = useState(mockPlans);
  const [modal, setModal] = useState<{ open: boolean; plan?: typeof mockPlans[0]; isEdit?: boolean }>({ open: false, plan: undefined, isEdit: false });
  const [processing, setProcessing] = useState(false);

  const openModal = (plan?: typeof mockPlans[0]) => setModal({ open: true, plan, isEdit: !!plan });
  const closeModal = () => setModal({ open: false, plan: undefined, isEdit: false });

  // Placeholder handlers
  const handleActivate = (id: string) => {};
  const handleDeactivate = (id: string) => {};
  const handleDelete = (id: string) => {};

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      closeModal();
    }, 1200); // Simulate API call
    // TODO: Integrate with backend
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pricing Plan Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700" onClick={() => openModal()}>Add Plan</button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price (USD)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Features</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {plans.map((plan) => (
              <tr key={plan.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-semibold">{plan.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{plan.price === 0 ? 'Free' : `$${plan.price}`}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${plan.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>{plan.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button className="text-blue-600 hover:underline" onClick={() => openModal(plan)}>Edit</button>
                  {plan.status === 'Active' ? (
                    <button className="text-yellow-600 hover:underline" onClick={() => handleDeactivate(plan.id)}>Deactivate</button>
                  ) : (
                    <button className="text-green-600 hover:underline" onClick={() => handleActivate(plan.id)}>Activate</button>
                  )}
                  <button className="text-red-600 hover:underline" onClick={() => handleDelete(plan.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Plan Modal */}
      <Modal isOpen={modal.open} onClose={closeModal} title={modal.isEdit ? 'Edit Plan' : 'Add Plan'} widthClass="max-w-lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Plan Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              defaultValue={modal.plan?.name || ''}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price (USD)</label>
            <input
              type="number"
              min={0}
              className="w-full border border-gray-300 rounded px-3 py-2"
              defaultValue={modal.plan?.price || 0}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Features (comma separated)</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              defaultValue={modal.plan?.features.join(', ') || ''}
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
              onClick={closeModal}
              disabled={processing}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white font-semibold ${processing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={processing}
            >
              {processing ? 'Saving...' : 'Save Plan'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BillingPlansScreen;
