
import React from 'react';

export interface QuickAction {
	id: string;
	label: string;
	icon?: React.ReactNode;
	onClick: () => void;
	color?: string;
	disabled?: boolean;
	loading?: boolean;
}

export interface QuickActionsWidgetProps {
	actions?: QuickAction[];
	className?: string;
}

// Example icons (replace with your own or use a library)
const defaultActions: QuickAction[] = [
	{
		id: '1',
		label: 'Add Student',
		icon: <span role="img" aria-label="Add Student">👨‍🎓</span>,
		onClick: () => alert('Add Student'),
		color: 'bg-blue-500',
	},
    {
		id: '2',
		label: 'Add teacher',
		icon: <span role="img" aria-label="Add teacher">👨‍�</span>,
		onClick: () => alert('Add teacher'),
		color: 'bg-blue-500',
	},
	{
		id: '3',
		label: 'Send Notification',
		icon: <span role="img" aria-label="Send Notification">📢</span>,
		onClick: () => alert('Send Notification'),
		color: 'bg-green-500',
	},
	{
		id: '4',
		label: 'Generate Report',
		icon: <span role="img" aria-label="Generate Report">📄</span>,
		onClick: () => alert('Generate Report'),
		color: 'bg-yellow-500',
		disabled: false,
	},
];

const QuickActionsWidget: React.FC<QuickActionsWidgetProps> = ({
	actions = defaultActions,
	className = '',
}) => {
	return (
		<div className={`bg-white rounded-xl shadow p-4 h-full flex flex-col ${className}`} aria-label="Quick Actions">
			<h3 className="font-semibold text-lg mb-2">Quick Actions</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{actions.length === 0 ? (
					<div className="text-gray-500 py-8 text-center col-span-2">No quick actions available.</div>
				) : (
					actions.map((action) => (
						<button
							key={action.id}
							onClick={action.onClick}
							disabled={action.disabled || action.loading}
							className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 ${action.color || 'bg-blue-500'} ${action.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
							aria-label={action.label}
						>
							{action.icon}
							<span>{action.loading ? 'Loading...' : action.label}</span>
						</button>
					))
				)}
			</div>
		</div>
	);
};

export default QuickActionsWidget;
