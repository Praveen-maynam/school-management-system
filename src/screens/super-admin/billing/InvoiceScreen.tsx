
import React, { useState } from 'react';
import Modal from '../../../components/ui/Modal';

// Mock invoice data
const mockInvoices = [
  {
    id: 'INV-20260101-001',
    school: 'Springfield High School',
    amount: 199.00,
    status: 'Paid',
    date: '2026-01-01',
    dueDate: '2026-01-10',
    items: [
      { desc: 'Premium Plan - January', price: 199.00 }
    ],
  },
  {
    id: 'INV-20260115-002',
    school: 'Shelbyville Academy',
    amount: 49.00,
    status: 'Pending',
    date: '2026-01-15',
    dueDate: '2026-01-25',
    items: [
      { desc: 'Basic Plan - January', price: 49.00 }
    ],
  },
  {
    id: 'INV-20260120-003',
    school: 'Westfield School',
    amount: 199.00,
    status: 'Failed',
    date: '2026-01-20',
    dueDate: '2026-01-30',
    items: [
      { desc: 'Premium Plan - January', price: 199.00 }
    ],
  },
];

const statusColor = {
  Paid: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-800',
  Failed: 'bg-red-100 text-red-700',
};

const InvoiceScreen: React.FC = () => {
  const [invoices] = useState(mockInvoices);
  const [modal, setModal] = useState<{ open: boolean; invoice?: typeof mockInvoices[0] }>({ open: false, invoice: undefined });
  const [processing, setProcessing] = useState(false);

  const openModal = (invoice: typeof mockInvoices[0]) => setModal({ open: true, invoice });
  const closeModal = () => setModal({ open: false, invoice: undefined });

  // Placeholder handlers
  const handleDownload = (id: string) => {};
  const handleResend = (id: string) => {};
  const handleMarkPaid = (id: string) => {};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Invoice Management</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-mono">{invoice.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.school}</td>
                <td className="px-6 py-4 whitespace-nowrap">${invoice.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColor[invoice.status as keyof typeof statusColor]}`}>{invoice.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.date}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button className="text-blue-600 hover:underline" onClick={() => openModal(invoice)}>View</button>
                  <button className="text-green-600 hover:underline" onClick={() => handleDownload(invoice.id)}>Download</button>
                  <button className="text-yellow-600 hover:underline" onClick={() => handleResend(invoice.id)}>Resend</button>
                  {invoice.status !== 'Paid' && (
                    <button className="text-purple-600 hover:underline" onClick={() => handleMarkPaid(invoice.id)}>Mark as Paid</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Details Modal */}
      <Modal isOpen={modal.open} onClose={closeModal} title={modal.invoice ? `Invoice: ${modal.invoice.id}` : ''} widthClass="max-w-lg">
        {modal.invoice && (
          <div>
            <div className="mb-2">
              <span className="font-semibold">School:</span> {modal.invoice.school}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Date:</span> {modal.invoice.date}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Due Date:</span> {modal.invoice.dueDate}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Status:</span> <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColor[modal.invoice.status as keyof typeof statusColor]}`}>{modal.invoice.status}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold">Amount:</span> ${modal.invoice.amount.toFixed(2)}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Items:</span>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {modal.invoice.items.map((item, i) => (
                  <li key={i}>{item.desc} - ${item.price.toFixed(2)}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                onClick={closeModal}
                disabled={processing}
              >
                Close
              </button>
              <button
                className={`px-4 py-2 rounded text-white font-semibold ${processing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                onClick={() => { setProcessing(true); setTimeout(() => { setProcessing(false); closeModal(); }, 1200); }}
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Download PDF'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InvoiceScreen;
