import React, { useEffect } from 'react';
import clsx from 'clsx';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number; // ms
  onClose?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * Toast/Notification component supporting types, auto-dismiss, manual close, stacking, and accessibility.
 * @param {ToastProps} props - Toast props
 */
const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 4000,
  onClose,
  actionLabel,
  onAction,
  className,
}) => {
  useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const typeStyles: Record<ToastType, string> = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        'flex items-center border rounded px-4 py-3 shadow-md mb-2 animate-fade-in',
        typeStyles[type],
        className
      )}
    >
      <span className="flex-1 mr-2">{message}</span>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="ml-2 px-2 py-1 rounded bg-white text-sm font-medium border border-gray-200 hover:bg-gray-50"
        >
          {actionLabel}
        </button>
      )}
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Toast;
