
import React from 'react';
import clsx from 'clsx';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	className?: string;
}

/**
 * Reusable Checkbox component supporting controlled/uncontrolled, group, accessibility, and custom className.
 * @param {CheckboxProps} props - Checkbox props
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, error, className, ...rest }, ref) => (
		<label className={clsx('inline-flex items-center space-x-2', className)}>
			<input
				ref={ref}
				type="checkbox"
				className={clsx(
					'form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500',
					error && 'border-red-500 focus:ring-red-500'
				)}
				aria-invalid={!!error}
				{...rest}
			/>
			{label && <span className="text-sm text-gray-900">{label}</span>}
			{error && <span className="ml-2 text-xs text-red-600">{error}</span>}
		</label>
	)
);
Checkbox.displayName = 'Checkbox';

export default Checkbox;
