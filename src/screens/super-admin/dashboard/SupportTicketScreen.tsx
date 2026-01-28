
import React, { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import Avatar from '../../../components/ui/Avatar';

// Mock ticket data
type TicketStatus = 'Open' | 'In Progress' | 'Closed';
type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

interface SupportTicket {
  id: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignedTo?: string;
  createdAt: string;
  requester: string;
}

const mockTickets: SupportTicket[] = [
  {
    id: 'TCK-1001',
    subject: 'Unable to login',
    status: 'Open',
    priority: 'High',
    assignedTo: 'Support Agent 1',
    createdAt: '2026-01-27 10:15',
    requester: 'admin@school.com',
  },
  {
    id: 'TCK-1002',
    subject: 'Billing issue',
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: 'Support Agent 2',
    createdAt: '2026-01-26 14:30',
    requester: 'parent1@example.com',
  },
  {
    id: 'TCK-1003',
    subject: 'Feature request: Dark mode',
    status: 'Closed',
    priority: 'Low',
    assignedTo: 'Support Agent 3',
    createdAt: '2026-01-25 09:00',
    requester: 'teacher1@example.com',
  },
];

const statusColor = {
  Open: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  Closed: 'bg-green-100 text-green-700',
};

const priorityColor = {
  Low: 'bg-gray-100 text-gray-700',
  Medium: 'bg-yellow-100 text-yellow-800',
  High: 'bg-orange-100 text-orange-800',
  Urgent: 'bg-red-100 text-red-700',
};

const SupportTicketScreen: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleView = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTicket(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Support Ticket Management</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requester</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-mono">{ticket.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColor[ticket.status]}`}>{ticket.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityColor[ticket.priority]}`}>{ticket.priority}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.assignedTo || <span className="text-gray-400">Unassigned</span>}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  <Avatar size={24} />
                  <span>{ticket.requester}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => handleView(ticket)}
                  >
                    View
                  </button>
                  <button className="text-green-600 hover:underline">Assign</button>
                  <button className="text-red-600 hover:underline ml-2">Close</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ticket Details Modal */}
      <Modal isOpen={modalOpen} onClose={handleCloseModal} title={selectedTicket ? `Ticket: ${selectedTicket.id}` : ''} widthClass="max-w-2xl">
        {selectedTicket && (
          <div>
            <div className="mb-4">
              <div className="font-semibold">Subject:</div>
              <div>{selectedTicket.subject}</div>
            </div>
            <div className="mb-4 flex gap-4">
              <div>
                <div className="font-semibold">Status:</div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColor[selectedTicket.status]}`}>{selectedTicket.status}</span>
              </div>
              <div>
                <div className="font-semibold">Priority:</div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityColor[selectedTicket.priority]}`}>{selectedTicket.priority}</span>
              </div>
              <div>
                <div className="font-semibold">Assigned To:</div>
                <span>{selectedTicket.assignedTo || <span className="text-gray-400">Unassigned</span>}</span>
              </div>
            </div>
            <div className="mb-4">
              <div className="font-semibold">Requester:</div>
              <div className="flex items-center gap-2">
                <Avatar size={24} />
                <span>{selectedTicket.requester}</span>
              </div>
            </div>
            <div className="mb-4">
              <div className="font-semibold">Created At:</div>
              <div>{selectedTicket.createdAt}</div>
            </div>
            {/* TODO: Add ticket conversation, notes, and response form */}
            <div className="flex justify-end gap-2 mt-6">
              <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300" onClick={handleCloseModal}>Close</button>
              <button className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">Respond</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SupportTicketScreen;
