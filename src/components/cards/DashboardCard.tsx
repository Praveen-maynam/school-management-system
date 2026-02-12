
// import { Users, User, BookOpen, CalendarCheck, BarChart2 } from 'lucide-react';

// interface DashboardCardProps {
// 	title: string;
// 	value: string | number;
// 	icon: 'students' | 'teachers' | 'classes' | 'attendance' | string;
// 	className?: string;
// }

// const iconMap: Record<string, React.ReactNode> = {
// 	students: <Users className="text-blue-600" size={32} />,
// 	teachers: <User className="text-green-600" size={32} />,
// 	classes: <BookOpen className="text-purple-600" size={32} />,
// 	attendance: <CalendarCheck className="text-yellow-500" size={32} />,
// };

// const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, className }) => {
// 	return ( 
// 		<div className={`bg-white rounded-xl shadow p-5 flex items-center gap-4 ${className || ''}`}>
// 			<div className="flex-shrink-0">
// 				{iconMap[icon] || <BarChart2 className="text-gray-400" size={32} />}
// 			</div>
// 			<div>
// 				<div className="text-2xl font-bold text-gray-800">{value}</div>
// 				<div className="text-gray-500 text-sm font-medium mt-1">{title}</div>
// 			</div>
// 		</div>
// 	);
// };

// export default DashboardCard;

import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendText?: string;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendText = "from last month",
}: StatCardProps) {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <div
      className="
        bg-white rounded-2xl shadow-sm
        p-4 sm:p-5 lg:p-6
        h-auto sm:h-[140px] lg:h-[150px]
        flex items-center gap-4 sm:gap-5
      "
    >
      {/* Icon (LEFT) */}
      <div
        className="
          bg-blue-50 rounded-xl
          w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16
          flex items-center justify-center
          shrink-0
        "
      >
        <Icon
          className="
            text-blue-600
            w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8
          "
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center">
        <p
          className="
            text-gray-500 font-medium
            text-sm sm:text-base lg:text-lg
          "
        >
          {title}
        </p>

        <h2
          className="
            font-bold text-gray-900
            text-2xl sm:text-3xl lg:text-5xl
            mt-1
          "
        >
          {value}
        </h2>

        {trend !== undefined && (
          <div className="flex items-center mt-1 sm:mt-2 text-xs sm:text-sm">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}

            <span
              className={`font-semibold mr-1 ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {Math.abs(trend)}%
            </span>

            <span className="text-gray-400">{trendText}</span>
          </div>
        )}
      </div>
    </div>
  );
}

