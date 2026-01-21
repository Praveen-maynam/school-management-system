
import React from 'react';

export interface Event {
	id: string;
	title: string;
	date: string; // ISO string
	location?: string;
	description?: string;
	link?: string;
}

export interface UpcomingEventsWidgetProps {
	events?: Event[];
	className?: string;
	onViewAll?: () => void;
}

const defaultEvents: Event[] = [
	{
		id: '1',
		title: 'Annual Sports Day',
		date: '2026-02-10',
		location: 'School Ground',
		description: 'A day full of sports and fun activities for all students.',
		link: '#',
	},
	{
		id: '2',
		title: 'Parent-Teacher Meeting',
		date: '2026-02-15',
		location: 'Auditorium',
		description: 'Discuss student progress and school updates.',
	},
	{
		id: '3',
		title: 'Science Exhibition',
		date: '2026-02-20',
		location: 'Main Hall',
		description: 'Showcase innovative science projects by students.',
		link: '#',
	},
];

const UpcomingEventsWidget: React.FC<UpcomingEventsWidgetProps> = ({
	events = defaultEvents,
	className = '',
	onViewAll,
}) => {
	return (
		<div className={`bg-white rounded-xl shadow p-4 h-full flex flex-col ${className}`} aria-label="Upcoming Events">
			<div className="flex items-center justify-between mb-2">
				<h3 className="font-semibold text-lg">Upcoming Events</h3>
				{onViewAll && (
					<button
						onClick={onViewAll}
						className="text-blue-600 hover:underline text-sm font-medium"
						aria-label="View all events"
					>
						View All
					</button>
				)}
			</div>
			<div className="overflow-y-auto max-h-56 divide-y divide-gray-200">
				{events.length === 0 ? (
					<div className="text-gray-500 py-8 text-center">No upcoming events.</div>
				) : (
					events.map((e) => (
						<div key={e.id} className="py-3 flex flex-col gap-1">
							<div className="flex items-center justify-between">
								<span className="font-medium text-gray-800">{e.title}</span>
								<span className="text-xs text-gray-400">{new Date(e.date).toLocaleDateString()}</span>
							</div>
							{e.location && (
								<span className="text-xs text-gray-500">Location: {e.location}</span>
							)}
							{e.description && (
								<span className="text-sm text-gray-600">{e.description}</span>
							)}
							{e.link && (
								<a
									href={e.link}
									className="text-xs text-blue-500 hover:underline mt-1"
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Read more about ${e.title}`}
								>
									Read more
								</a>
							)}
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default UpcomingEventsWidget;
