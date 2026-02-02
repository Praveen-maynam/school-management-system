
import React from 'react';
import clsx from 'clsx';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
	checked?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	label?: string;
	className?: string;
	disabled?: boolean;
}

/**
 * Reusable Switch/Toggle component supporting controlled/uncontrolled, accessibility, and custom className.
 * @param {SwitchProps} props - Switch props
 */
const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
	({ checked, onChange, label, className, disabled, ...rest }, ref) => (
		<label className={clsx('inline-flex items-center cursor-pointer', className, disabled && 'opacity-60 cursor-not-allowed')}>
			<input
				ref={ref}
				type="checkbox"
				className="sr-only peer"
				checked={checked}
				onChange={onChange}
				disabled={disabled}
				{...rest}
			/>
			<div
				className={clsx(
					'w-10 h-6 bg-gray-300 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 transition peer-checked:bg-blue-600 relative',
					disabled && 'bg-gray-200'
				)}
			>
				<span
					className={clsx(
						'absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition peer-checked:translate-x-4',
						disabled && 'bg-gray-100'
					)}
				/>
			</div>
			{label && <span className="ml-3 text-sm text-gray-900">{label}</span>}
		</label>
	)
);
Switch.displayName = 'Switch';

export default Switch;
