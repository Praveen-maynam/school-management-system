
import { Users, User, BookOpen, CalendarCheck, BarChart2 } from 'lucide-react';

interface DashboardCardProps {
	title: string;
	value: string | number;
	icon: 'students' | 'teachers' | 'classes' | 'attendance' | string;
	className?: string;
}

const iconMap: Record<string, React.ReactNode> = {
	students: <Users className="text-blue-600" size={32} />,
	teachers: <User className="text-green-600" size={32} />,
	classes: <BookOpen className="text-purple-600" size={32} />,
	attendance: <CalendarCheck className="text-yellow-500" size={32} />,
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, className }) => {
	return (
		<div className={`bg-white rounded-xl shadow p-5 flex items-center gap-4 ${className || ''}`}>
			<div className="flex-shrink-0">
				{iconMap[icon] || <BarChart2 className="text-gray-400" size={32} />}
			</div>
			<div>
				<div className="text-2xl font-bold text-gray-800">{value}</div>
				<div className="text-gray-500 text-sm font-medium mt-1">{title}</div>
			</div>
		</div>
	);
};

export default DashboardCard;
