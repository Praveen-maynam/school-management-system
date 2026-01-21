
import React, { useState } from 'react';

interface Vehicle {
	id: number;
	number: string;
	type: string;
	capacity: number;
	driver: string;
}

const sampleVehicles: Vehicle[] = [
	{ id: 1, number: 'AB-1234', type: 'Bus', capacity: 50, driver: 'John Doe' },
	{ id: 2, number: 'CD-5678', type: 'Van', capacity: 20, driver: 'Jane Smith' },
];

const VehiclesScreen: React.FC = () => {
	const [vehicles, setVehicles] = useState<Vehicle[]>(sampleVehicles);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Simulate delete action
	const handleDelete = (id: number) => {
		setLoading(true);
		setTimeout(() => {
			setVehicles((prev) => prev.filter((v) => v.id !== id));
			setLoading(false);
		}, 800);
	};

	return (
		<div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
			<h2 className="text-2xl font-bold mb-4">Transport Vehicles</h2>
			{error && <div className="text-red-500 mb-2">{error}</div>}
			{loading && <div className="text-blue-600 mb-2">Processing...</div>}
			{vehicles.length === 0 ? (
				<div className="text-gray-500 py-8 text-center">No vehicles found.</div>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full border">
						<thead>
							<tr className="bg-gray-100">
								<th className="px-4 py-2 text-left">Number</th>
								<th className="px-4 py-2 text-left">Type</th>
								<th className="px-4 py-2 text-left">Capacity</th>
								<th className="px-4 py-2 text-left">Driver</th>
								<th className="px-4 py-2 text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							{vehicles.map((vehicle) => (
								<tr key={vehicle.id} className="border-b">
									<td className="px-4 py-2">{vehicle.number}</td>
									<td className="px-4 py-2">{vehicle.type}</td>
									<td className="px-4 py-2">{vehicle.capacity}</td>
									<td className="px-4 py-2">{vehicle.driver}</td>
									<td className="px-4 py-2 flex gap-2">
										<button className="text-blue-600 hover:underline text-sm">Edit</button>
										<button
											className="text-red-600 hover:underline text-sm"
											onClick={() => handleDelete(vehicle.id)}
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

export default VehiclesScreen;