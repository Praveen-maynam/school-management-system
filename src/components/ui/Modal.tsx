import React from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	widthClass?: string;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, widthClass = 'max-w-lg', children }) => {
	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
			<div className={`bg-white rounded-lg shadow-lg w-full ${widthClass} relative`}>
				<div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
					<button onClick={onClose} className="text-gray-400 hover:text-gray-600 focus:outline-none">
						<span className="sr-only">Close</span>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div className="px-6 py-4">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
