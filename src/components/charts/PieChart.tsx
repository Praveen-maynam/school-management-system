
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export interface PieChartProps {
	labels: string[];
	data: number[];
	colors?: string[];
	title?: string;
	legendDisplay?: boolean;
	className?: string;
}

const defaultColors = [
	'#2563eb', '#10b981', '#f59e42', '#ef4444', '#a78bfa', '#f472b6', '#34d399', '#fbbf24', '#60a5fa', '#c026d3'
];

const PieChart: React.FC<PieChartProps> = ({
	labels,
	data,
	colors = defaultColors,
	title,
	legendDisplay = true,
	className = '',
}) => {
	const chartData = {
		labels,
		datasets: [
			{
				data,
				backgroundColor: colors.slice(0, data.length),
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: legendDisplay,
				position: 'right' as const,
			},
			title: {
				display: !!title,
				text: title,
				font: { size: 18 },
			},
			tooltip: {
				callbacks: {
					label: (context: any) => `${context.label}: ${context.parsed} (${((context.parsed / data.reduce((a: number, b: number) => a + b, 0)) * 100).toFixed(1)}%)`,
				},
			},
		},
		maintainAspectRatio: false,
		cutout: '0%',
	};

	return (
		<div className={`w-full h-64 ${className}`} aria-label={title || 'Pie Chart'}>
			<Pie data={chartData} options={options} />
		</div>
	);
};

export default PieChart;
