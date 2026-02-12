
import React, { useState } from 'react';

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

const QuickActionsWidget: React.FC<QuickActionsWidgetProps> = ({
	actions,
	className = '',
}) => {
	const [modalType, setModalType] = useState<null | 'add-student' | 'add-teacher' | 'send-notification' | 'generate-report'>(null);
	const [form, setForm] = useState<any>({});
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const openModal = (type: typeof modalType) => {
		setModalType(type);
		setForm({});
		setError(null);
		setSuccess(null);
	};
	const closeModal = () => {
		setModalType(null);
		setForm({});
		setError(null);
		setSuccess(null);
	};

	// Default actions with modal triggers
	const defaultActions: QuickAction[] = [
		{
			id: '1',
			label: 'Add Student',
			icon: <span role="img" aria-label="Add Student">👨‍🎓</span>,
			onClick: () => openModal('add-student'),
			color: 'bg-blue-500',
		},
		{
			id: '2',
			label: 'Add Teacher',
			icon: <span role="img" aria-label="Add Teacher">👨‍🏫</span>,
			onClick: () => openModal('add-teacher'),
			color: 'bg-blue-500',
		},
		{
			id: '3',
			label: 'Send Notification',
			icon: <span role="img" aria-label="Send Notification">📢</span>,
			onClick: () => openModal('send-notification'),
			color: 'bg-green-500',
		},
		{
			id: '4',
			label: 'Generate Report',
			icon: <span role="img" aria-label="Generate Report">📄</span>,
			onClick: () => openModal('generate-report'),
			color: 'bg-yellow-500',
			disabled: false,
		},
	];
	const usedActions = actions || defaultActions;

	return (
		<div className={`bg-white rounded-xl shadow p-4 h-full flex flex-col ${className}`} aria-label="Quick Actions">
			<h3 className="font-semibold text-lg mb-2">Quick Actions</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{usedActions.length === 0 ? (
					<div className="text-gray-500 py-8 text-center col-span-2">No quick actions available.</div>
				) : (
					usedActions.map((action) => (
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

			{/* Modals for each action */}
			{modalType === 'add-student' && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
						<button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={closeModal}>✕</button>
						<h3 className="text-xl font-bold mb-4 text-gray-900">Add Student</h3>
						<form onSubmit={e => {
							e.preventDefault();
							setError(null);
							setSuccess(null);
							if (!form.name || !form.class) {
								setError('Name and Class are required.');
								return;
							}
							setSuccess('Student added successfully!');
							setTimeout(closeModal, 1200);
						}}>
							<div className="mb-4">
								<label className="block text-gray-700 font-medium mb-1">Name *</label>
								<input name="name" value={form.name || ''} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 font-medium mb-1">Class *</label>
								<input name="class" value={form.class || ''} onChange={e => setForm((f: any) => ({ ...f, class: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
							</div>
							{error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
							{success && <div className="mb-2 text-green-600 text-sm">{success}</div>}
							<div className="flex justify-end gap-2 mt-4">
								<button type="button" className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100" onClick={closeModal}>Cancel</button>
								<button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold">Add Student</button>
							</div>
						</form>
					</div>
				</div>
			)}
			{modalType === 'add-teacher' && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
						<button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={closeModal}>✕</button>
						<h3 className="text-xl font-bold mb-4 text-gray-900">Add Teacher</h3>
						<form onSubmit={e => {
							e.preventDefault();
							setError(null);
							setSuccess(null);
							if (!form.name || !form.subject) {
								setError('Name and Subject are required.');
								return;
							}
							setSuccess('Teacher added successfully!');
							setTimeout(closeModal, 1200);
						}}>
							<div className="mb-4">
								<label className="block text-gray-700 font-medium mb-1">Name *</label>
								<input name="name" value={form.name || ''} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 font-medium mb-1">Subject *</label>
								<input name="subject" value={form.subject || ''} onChange={e => setForm((f: any) => ({ ...f, subject: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
							</div>
							{error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
							{success && <div className="mb-2 text-green-600 text-sm">{success}</div>}
							<div className="flex justify-end gap-2 mt-4">
								<button type="button" className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100" onClick={closeModal}>Cancel</button>
								<button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold">Add Teacher</button>
							</div>
						</form>
					</div>
				</div>
			)}
			{modalType === 'send-notification' && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
						<button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={closeModal}>✕</button>
						<h3 className="text-xl font-bold mb-4 text-gray-900">Send Notification</h3>
						<form onSubmit={e => {
							e.preventDefault();
							setError(null);
							setSuccess(null);
							if (!form.message) {
								setError('Message is required.');
								return;
							}
							setSuccess('Notification sent!');
							setTimeout(closeModal, 1200);
						}}>
							<div className="mb-4">
								<label className="block text-gray-700 font-medium mb-1">Message *</label>
								<textarea name="message" value={form.message || ''} onChange={e => setForm((f: any) => ({ ...f, message: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
							</div>
							{error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
							{success && <div className="mb-2 text-green-600 text-sm">{success}</div>}
							<div className="flex justify-end gap-2 mt-4">
								<button type="button" className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100" onClick={closeModal}>Cancel</button>
								<button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold">Send</button>
							</div>
						</form>
					</div>
				</div>
			)}
			{modalType === 'generate-report' && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
						<button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={closeModal}>✕</button>
						<h3 className="text-xl font-bold mb-4 text-gray-900">Generate Report</h3>
						<form onSubmit={e => {
							e.preventDefault();
							setError(null);
							setSuccess(null);
							if (!form.type) {
								setError('Report type is required.');
								return;
							}
							setSuccess('Report generated!');
							setTimeout(closeModal, 1200);
						}}>
							<div className="mb-4">
								<label className="block text-gray-700 font-medium mb-1">Report Type *</label>
								<input name="type" value={form.type || ''} onChange={e => setForm((f: any) => ({ ...f, type: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
							</div>
							{error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
							{success && <div className="mb-2 text-green-600 text-sm">{success}</div>}
							<div className="flex justify-end gap-2 mt-4">
								<button type="button" className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100" onClick={closeModal}>Cancel</button>
								<button type="submit" className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 font-semibold">Generate</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default QuickActionsWidget;
