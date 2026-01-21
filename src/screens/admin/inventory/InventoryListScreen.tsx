

import React, { useState } from 'react';

interface InventoryItem {
	id: number;
	name: string;
	category: string;
	quantity: number;
	location: string;
}

const sampleItems: InventoryItem[] = [
	{ id: 1, name: 'Projector', category: 'Electronics', quantity: 5, location: 'Room 101' },
	{ id: 2, name: 'Desk', category: 'Furniture', quantity: 20, location: 'Room 201' },
	{ id: 3, name: 'Whiteboard', category: 'Stationery', quantity: 10, location: 'Room 102' },
];

export const InventoryListScreen: React.FC = () => {
	const [items, setItems] = useState<InventoryItem[]>(sampleItems);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Simulate delete action
	const handleDelete = (id: number) => {
		setLoading(true);
		setTimeout(() => {
			setItems((prev) => prev.filter((i) => i.id !== id));
			setLoading(false);
		}, 800);
	};

	return (
		<div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
			<h2 className="text-2xl font-bold mb-4">Inventory List</h2>
			{error && <div className="text-red-500 mb-2">{error}</div>}
			{loading && <div className="text-blue-600 mb-2">Processing...</div>}
			{items.length === 0 ? (
				<div className="text-gray-500 py-8 text-center">No inventory items found.</div>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full border">
						<thead>
							<tr className="bg-gray-100">
								<th className="px-4 py-2 text-left">Name</th>
								<th className="px-4 py-2 text-left">Category</th>
								<th className="px-4 py-2 text-left">Quantity</th>
								<th className="px-4 py-2 text-left">Location</th>
								<th className="px-4 py-2 text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item) => (
								<tr key={item.id} className="border-b">
									<td className="px-4 py-2">{item.name}</td>
									<td className="px-4 py-2">{item.category}</td>
									<td className="px-4 py-2">{item.quantity}</td>
									<td className="px-4 py-2">{item.location}</td>
									<td className="px-4 py-2 flex gap-2">
										<button className="text-blue-600 hover:underline text-sm">Edit</button>
										<button
											className="text-red-600 hover:underline text-sm"
											onClick={() => handleDelete(item.id)}
											disabled={loading}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};