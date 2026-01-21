import React, { useState } from 'react';

interface InventoryItem {
	id: number;
	name: string;
	quantity: number;
}

interface IssueForm {
	itemId: number | '';
	quantity: number | '';
	issuedTo: string;
}

const mockInventory: InventoryItem[] = [
	{ id: 1, name: 'Projector', quantity: 5 },
	{ id: 2, name: 'Laptop', quantity: 10 },
	{ id: 3, name: 'Whiteboard Marker', quantity: 50 },
];

const IssueInventoryScreen: React.FC = () => {
	const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
	const [form, setForm] = useState<IssueForm>({ itemId: '', quantity: '', issuedTo: '' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: name === 'quantity' ? Number(value) : value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		setLoading(true);
		setTimeout(() => {
			const item = inventory.find((i) => i.id === Number(form.itemId));
			if (!item) {
				setError('Selected item not found.');
				setLoading(false);
				return;
			}
			if (form.quantity === '' || form.quantity <= 0) {
				setError('Please enter a valid quantity.');
				setLoading(false);
				return;
			}
			if (form.quantity > item.quantity) {
				setError('Not enough inventory available.');
				setLoading(false);
				return;
			}
			if (!form.issuedTo.trim()) {
				setError('Please enter the recipient name.');
				setLoading(false);
				return;
			}
			setInventory((prev) =>
				prev.map((i) =>
					i.id === item.id ? { ...i, quantity: i.quantity - Number(form.quantity) } : i
				)
			);
			setSuccess(`Issued ${form.quantity} ${item.name}(s) to ${form.issuedTo}.`);
			setForm({ itemId: '', quantity: '', issuedTo: '' });
			setLoading(false);
		}, 1200);
	};

	return (
		<div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">Issue Inventory Item</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="itemId" className="block text-sm font-medium text-gray-700">Item</label>
					<select
						id="itemId"
						name="itemId"
						value={form.itemId}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						required
					>
						<option value="">Select an item</option>
						{inventory.map((item) => (
							<option key={item.id} value={item.id}>
								{item.name} (Available: {item.quantity})
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
					<input
						type="number"
						id="quantity"
						name="quantity"
						min={1}
						value={form.quantity}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						required
					/>
				</div>
				<div>
					<label htmlFor="issuedTo" className="block text-sm font-medium text-gray-700">Issued To</label>
					<input
						type="text"
						id="issuedTo"
						name="issuedTo"
						value={form.issuedTo}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					disabled={loading}
				>
					{loading ? 'Issuing...' : 'Issue Item'}
				</button>
			</form>
			{error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
			{success && <div className="mt-4 text-green-600 font-medium">{success}</div>}
			<div className="mt-8">
				<h3 className="text-lg font-semibold mb-2 text-gray-700">Current Inventory</h3>
				<table className="min-w-full bg-gray-50 rounded-md overflow-hidden">
					<thead>
						<tr>
							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Item</th>
							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Available</th>
						</tr>
					</thead>
					<tbody>
						{inventory.length === 0 ? (
							<tr>
								<td colSpan={2} className="px-4 py-2 text-center text-gray-400">No inventory items available.</td>
							</tr>
						) : (
							inventory.map((item) => (
								<tr key={item.id}>
									<td className="px-4 py-2 text-gray-700">{item.name}</td>
									<td className="px-4 py-2 text-gray-700">{item.quantity}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default IssueInventoryScreen;