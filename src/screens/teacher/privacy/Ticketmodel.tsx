import React from 'react';
import { Check } from 'lucide-react';

interface TicketModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ 
  isOpen = true, 
  onClose = () => console.log('Modal closed') 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-12 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-48 h-48 bg-blue-600 rounded-full flex items-center justify-center">
            <Check className="w-24 h-24 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your ticket has been submitted!
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-500 mb-10">
          Our support team will reach out within 24 hours.
        </p>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-5 px-8 rounded-2xl transition-colors duration-200"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TicketModal;
