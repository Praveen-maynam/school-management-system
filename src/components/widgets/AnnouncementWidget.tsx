
import React from 'react';

export interface Announcement {
	id: string;
	title: string;
	description: string;
	date: string; // ISO string
	link?: string;
}

export interface AnnouncementWidgetProps {
	announcements?: Announcement[];
	className?: string;
	onViewAll?: () => void;
}

const defaultAnnouncements: Announcement[] = [
	{
		id: '1',
		title: 'School Reopens',
		description: 'School will reopen on Feb 1st after winter break.',
		date: '2026-01-20',
		link: '#',
	},
	{
		id: '2',
		title: 'Annual Sports Day',
		description: 'Join us for Sports Day on Feb 10th. All are welcome!',
		date: '2026-01-18',
	},
	{
		id: '3',
		title: 'Parent-Teacher Meeting',
		description: 'PTM scheduled for Feb 15th. Please book your slot.',
		date: '2026-01-15',
		link: '#',
	},
];

const AnnouncementWidget: React.FC<AnnouncementWidgetProps> = ({
	announcements = defaultAnnouncements,
	className = '',
	onViewAll,
}) => {
	return (
		<div className={`bg-white rounded-xl shadow p-4 h-full flex flex-col ${className}`} aria-label="Announcements">
			<div className="flex items-center justify-between mb-2">
				<h3 className="font-semibold text-lg">Announcements</h3>
				{onViewAll && (
					<button
						onClick={onViewAll}
						className="text-blue-600 hover:underline text-sm font-medium"
						aria-label="View all announcements"
					>
						View All
					</button>
				)}
			</div>
			<div className="overflow-y-auto max-h-56 divide-y divide-gray-200">
				{announcements.length === 0 ? (
					<div className="text-gray-500 py-8 text-center">No announcements available.</div>
				) : (
					announcements.map((a) => (
						<div key={a.id} className="py-3 flex flex-col gap-1">
							<div className="flex items-center justify-between">
								<span className="font-medium text-gray-800">{a.title}</span>
								<span className="text-xs text-gray-400">{new Date(a.date).toLocaleDateString()}</span>
							</div>
							<span className="text-sm text-gray-600">{a.description}</span>
							{a.link && (
								<a
									href={a.link}
									className="text-xs text-blue-500 hover:underline mt-1"
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Read more about ${a.title}`}
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

export default AnnouncementWidget;
