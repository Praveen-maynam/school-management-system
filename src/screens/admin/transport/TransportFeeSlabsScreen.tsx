
import React, { useState } from 'react';

interface FeeSlab {
	id: number;
	route: string;
	amount: number;
	category: string;
}

const sampleSlabs: FeeSlab[] = [
	{ id: 1, route: 'Route 1', amount: 500, category: 'General' },
	{ id: 2, route: 'Route 2', amount: 700, category: 'Special' },
];

const TransportFeeSlabsScreen: React.FC = () => {
	const [slabs, setSlabs] = useState<FeeSlab[]>(sampleSlabs);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Simulate delete action
	const handleDelete = (id: number) => {
		setLoading(true);
		setTimeout(() => {
			setSlabs((prev) => prev.filter((s) => s.id !== id));
			setLoading(false);
		}, 800);
	};

	return (
		<div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
			<h2 className="text-2xl font-bold mb-4">Transport Fee Slabs</h2>
			{error && <div className="text-red-500 mb-2">{error}</div>}
			{loading && <div className="text-blue-600 mb-2">Processing...</div>}
			{slabs.length === 0 ? (
				<div className="text-gray-500 py-8 text-center">No fee slabs found.</div>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full border">
						<thead>
							<tr className="bg-gray-100">
								<th className="px-4 py-2 text-left">Route</th>
								<th className="px-4 py-2 text-left">Amount</th>
								<th className="px-4 py-2 text-left">Category</th>
								<th className="px-4 py-2 text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							{slabs.map((slab) => (
								<tr key={slab.id} className="border-b">
									<td className="px-4 py-2">{slab.route}</td>
									<td className="px-4 py-2">₹{slab.amount}</td>
									<td className="px-4 py-2">{slab.category}</td>
									<td className="px-4 py-2 flex gap-2">
										<button className="text-blue-600 hover:underline text-sm">Edit</button>
										<button
											className="text-red-600 hover:underline text-sm"
											onClick={() => handleDelete(slab.id)}
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

export default TransportFeeSlabsScreen;