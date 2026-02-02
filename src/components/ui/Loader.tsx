import React from 'react';
import clsx from 'clsx';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
  label?: string;
}

/**
 * Loader/Spinner component supporting sizes, colors, accessibility, and custom className.
 * @param {LoaderProps} props - Loader props
 */
const Loader: React.FC<LoaderProps> = ({ size = 'md', color = 'text-blue-600', className, label }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-10 w-10',
  };
  return (
    <span className={clsx('inline-flex items-center', className)} role="status" aria-live="polite">
      <svg
        className={clsx('animate-spin', color, sizes[size])}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden={label ? 'false' : 'true'}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      {label && <span className="ml-2 text-sm">{label}</span>}
    </span>
  );
};

export default Loader;
