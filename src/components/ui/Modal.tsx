
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	widthClass?: string;
	className?: string;
	children: React.ReactNode;
}

/**
 * Production-level Modal component with overlay/escape close, focus trap, ARIA, and custom className.
 * @param {ModalProps} props - Modal props
 */
const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	widthClass = 'max-w-lg',
	className,
	children,
}) => {
	const overlayRef = useRef<HTMLDivElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	// Close on escape key
	useEffect(() => {
		if (!isOpen) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
			// Focus trap
			if (e.key === 'Tab' && modalRef.current) {
				const focusable = modalRef.current.querySelectorAll<HTMLElement>(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
				);
				if (focusable.length === 0) return;
				const first = focusable[0];
				const last = focusable[focusable.length - 1];
				if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				} else if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				}
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, onClose]);

	// Focus modal on open
	useEffect(() => {
		if (isOpen && modalRef.current) {
			setTimeout(() => {
				const focusable = modalRef.current!.querySelector<HTMLElement>(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
				);
				focusable?.focus();
			}, 0);
		}
	}, [isOpen]);

	if (!isOpen) return null;
	return (
	  <div
	    ref={overlayRef}
	    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
	    data-testid="modal-overlay"
 	    onClick={e => {
 	      // Only close if the overlay itself is clicked (not the modal)
 	      if (e.target === overlayRef.current) onClose();
 	    }}
	    aria-modal="true"
	    role="dialog"
	    tabIndex={-1}
	  >
	    <div
	      ref={modalRef}
	      className={clsx(
	        'bg-white rounded-lg shadow-lg w-full relative',
	        widthClass,
	        className
	      )}
	      role="document"
	      aria-labelledby={title ? 'modal-title' : undefined}
 	      onClick={e => e.stopPropagation()}
	    >
	      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
	        {title && (
	          <h3 id="modal-title" className="text-lg font-semibold text-gray-900">
	            {title}
	          </h3>
	        )}
	        <button
	          onClick={onClose}
	          className="text-gray-400 hover:text-gray-600 focus:outline-none"
	          aria-label="Close modal"
	        >
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
