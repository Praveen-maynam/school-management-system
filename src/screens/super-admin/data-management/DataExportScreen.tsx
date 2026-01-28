
import React, { useState } from 'react';
import Modal from '../../../components/ui/Modal';

// Mock school data
const mockSchools = [
  {
    id: 'SCH-001',
    name: 'Springfield High School',
    lastBackup: '2026-01-27 22:00',
    lastExport: '2026-01-27 21:00',
  },
  {
    id: 'SCH-002',
    name: 'Shelbyville Academy',
    lastBackup: '2026-01-25 18:30',
    lastExport: '2026-01-25 18:00',
  },
  {
    id: 'SCH-003',
    name: 'Westfield School',
    lastBackup: '2026-01-20 10:00',
    lastExport: '2026-01-20 09:30',
  },
];

const DataExportScreen: React.FC = () => {
  const [schools] = useState(mockSchools);
  const [modal, setModal] = useState<{ open: boolean; action: string; school?: typeof mockSchools[0] }>({ open: false, action: '', school: undefined });
  const [processing, setProcessing] = useState(false);

  const openModal = (action: string, school: typeof mockSchools[0]) => setModal({ open: true, action, school });
  const closeModal = () => setModal({ open: false, action: '', school: undefined });

  const handleAction = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      closeModal();
    }, 1200); // Simulate API call
    // TODO: Integrate with backend
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Data Export & Backup</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Backup</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Export</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schools.map((school) => (
              <tr key={school.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-semibold">{school.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{school.lastBackup}</td>
                <td className="px-6 py-4 whitespace-nowrap">{school.lastExport}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button className="text-blue-600 hover:underline" onClick={() => openModal('export', school)}>Export</button>
                  <button className="text-green-600 hover:underline" onClick={() => openModal('backup', school)}>Backup</button>
                  <button className="text-yellow-600 hover:underline" onClick={() => openModal('restore', school)}>Restore</button>
                  <button className="text-red-600 hover:underline" onClick={() => openModal('delete', school)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={modal.open} onClose={closeModal} title={modal.action ? `${modal.action.charAt(0).toUpperCase() + modal.action.slice(1)} Data` : ''} widthClass="max-w-md">
        {modal.school && (
          <div>
            <p className="mb-4">
              Are you sure you want to <span className="font-semibold">{modal.action}</span> data for <span className="font-semibold">{modal.school.name}</span>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                onClick={closeModal}
                disabled={processing}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded text-white font-semibold ${processing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                onClick={handleAction}
                disabled={processing}
              >
                {processing ? 'Processing...' : `Confirm ${modal.action.charAt(0).toUpperCase() + modal.action.slice(1)}`}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DataExportScreen;
