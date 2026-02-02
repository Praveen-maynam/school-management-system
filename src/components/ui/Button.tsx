
import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	fullWidth?: boolean;
}

/**
 * Reusable Button component supporting variants, sizes, loading, and accessibility.
 * @param {ButtonProps} props - Button props
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			variant = 'primary',
			size = 'md',
			loading = false,
			disabled = false,
			fullWidth = false,
			className,
			...rest
		},
		ref
	) => {
		const base =
			'inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed';
		const variants: Record<ButtonVariant, string> = {
			primary: 'bg-blue-600 text-white hover:bg-blue-700',
			secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
			danger: 'bg-red-600 text-white hover:bg-red-700',
			outline: 'border border-gray-300 text-gray-900 bg-white hover:bg-gray-50',
			ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
		};
		const sizes: Record<ButtonSize, string> = {
			sm: 'px-3 py-1.5 text-sm',
			md: 'px-4 py-2 text-base',
			lg: 'px-6 py-3 text-lg',
		};
		return (
			<button
				ref={ref}
				type={rest.type || 'button'}
				className={clsx(
					base,
					variants[variant],
					sizes[size],
					fullWidth && 'w-full',
					className
				)}
				aria-busy={loading}
				aria-disabled={disabled || loading}
				disabled={disabled || loading}
				{...rest}
			>
				{loading && (
					<svg
						className="animate-spin mr-2 h-4 w-4 text-current"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						aria-hidden="true"
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
				)}
				{children}
			</button>
		);
	}
);
Button.displayName = 'Button';

export default Button;
