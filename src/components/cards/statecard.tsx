// import React from 'react'

// type StatCardProps = {
//   label: string
//   value: string | number
//   icon?: React.ReactNode
// }

// const StatCard = ({ label, value, icon }: StatCardProps) => (
//   <div className="bg-white border rounded-xl p-5 flex items-center justify-between">
//     <div>
//       <p className="text-sm text-gray-500">{label}</p>
//       <p className="text-2xl font-bold">{value}</p>
//     </div>
//     {icon && <div className="text-gray-400">{icon}</div>}
//   </div>
// )

// export default StatCard





import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

type IconPosition = "left" | "right";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconPosition?: IconPosition;
  trend?: number;
  subtitle?: string;
  onClick?: () => void;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconPosition = "right",
  trend,
  subtitle,
  onClick,
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        h-[130px] bg-white rounded-xl p-4
        shadow-sm hover:shadow-md transition
        flex flex-col justify-between
        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between">
        {iconPosition === "left" && <IconBox Icon={Icon} />}

        <p className="text-sm font-medium text-gray-500">{title}</p>

        {iconPosition === "right" && <IconBox Icon={Icon} />}
      </div>

      {/* Bottom Section */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>

        {trend !== undefined && (
          <TrendBadge trend={trend} />
        )}
      </div>
    </div>
  );
}

/* ---------------- Small Components ---------------- */

function IconBox({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100">
      <Icon className="w-5 h-5 text-gray-700" />
    </div>
  );
}

function TrendBadge({ trend }: { trend: number }) {
  const isPositive = trend >= 0;

  return (
    <div
      className={`flex items-center text-sm font-medium ${
        isPositive ? "text-green-600" : "text-red-600"
      }`}
    >
      {isPositive ? (
        <TrendingUp className="w-4 h-4 mr-1" />
      ) : (
        <TrendingDown className="w-4 h-4 mr-1" />
      )}
      {Math.abs(trend)}%
    </div>
  );
}
