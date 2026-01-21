
import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
	labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	datasets: [
		{
			label: 'Attendance %',
			data: [96, 98, 97, 95, 99, 94],
			backgroundColor: 'rgba(37, 99, 235, 0.7)',
			borderRadius: 6,
			maxBarThickness: 32,
		},
	],
};

const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: false,
		},
		tooltip: {
			callbacks: {
				label: (context: any) => `Attendance: ${context.parsed.y}%`,
			},
		},
	},
	scales: {
		y: {
			beginAtZero: true,
			max: 100,
			ticks: {
				stepSize: 10,
				callback: (value: number) => `${value}%`,
			},
			grid: {
				color: '#e5e7eb',
			},
		},
		x: {
			grid: {
				display: false,
			},
		},
	},
};
// Fix ticks.callback signature for Chart.js v3+
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fixedOptions = {
	...options,
	scales: {
		...options.scales,
		y: {
			...options.scales.y,
			ticks: {
				...options.scales.y.ticks,
				callback: (tickValue: string | number, index: number, ticks: any) => `${tickValue}%`,
			},
		},
	},
};
const BarChart: React.FC = () => {
	return (
		<div className="w-full h-64">
			<Bar data={data} options={fixedOptions} />
		</div>
	);
};

export default BarChart;
