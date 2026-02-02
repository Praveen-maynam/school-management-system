
import React from 'react';
import clsx from 'clsx';

export type InputType = 'text' | 'email' | 'number' | 'password';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	type?: InputType;
	fullWidth?: boolean;
}

/**
 * Reusable Input component supporting types, validation, error display, and accessibility.
 * @param {InputProps} props - Input props
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			error,
			type = 'text',
			className,
			fullWidth = false,
			id,
			...rest
		},
		ref
	) => {
		const inputId = id || React.useId();
		return (
			<div className={clsx('mb-2', fullWidth && 'w-full')}>
				{label && (
					<label htmlFor={inputId} className="block mb-1 text-sm font-medium text-gray-700">
						{label}
					</label>
				)}
				<input
					ref={ref}
					id={inputId}
					type={type}
					className={clsx(
						'block rounded border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-60 disabled:cursor-not-allowed',
						error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
						fullWidth && 'w-full',
						className
					)}
					aria-invalid={!!error}
					aria-describedby={error ? `${inputId}-error` : undefined}
					{...rest}
				/>
				{error && (
					<span id={`${inputId}-error`} className="mt-1 text-xs text-red-600 block">
						{error}
					</span>
				)}
			</div>
		);
	}
);
Input.displayName = 'Input';

export default Input;
