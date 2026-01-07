
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, User, Calendar, Wallet, BookOpen, FileText } from "lucide-react";

interface MenuItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine menu items based on current path
  const getMenuItems = (): MenuItem[] => {
    if (location.pathname.startsWith('/teacher')) {
      return [
        { path: "/teacher/dashboard", icon: Home, label: "Dashboard" },
        { path: "/teacher/students/studentlist", icon: Users, label: "Students" },
        { path: "/teacher/profile", icon: User, label: "Profile" },
      ];
    } else if (location.pathname.startsWith('/parent')) {
      return [
        { path: "/parent/dashboard", icon: Home, label: "Dashboard" },
        { path: "/parent/attendance", icon: Calendar, label: "Attendance" },
        { path: "/parent/fee-details", icon: Wallet, label: "Fee Details" },
        { path: "/parent/homework", icon: BookOpen, label: "Homework" },
        { path: "/parent/exam-reports", icon: FileText, label: "Exam Reports" },
        { path: "/parent/profile", icon: User, label: "Profile" },
      ];
    } else {
      return [
        { path: "/", icon: Home, label: "Home" },
      ];
    }
  };

  const menuItems = getMenuItems();

  const itemClass = (path: string) => {
    const isActive = location.pathname.startsWith(path);


    return `
      flex items-center gap-3 px-6 py-3 cursor-pointer transition-all
      ${isActive
        ? "bg-blue-600 text-white border-l-4 border-white"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
    `;
  };

  return (
    <aside className="w-64 bg-white shadow-lg h-screen flex flex-col">
      {/* Logo / Brand */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">
          SchoolApp
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.path}
              className={itemClass(item.path)}
              onClick={() => navigate(item.path)}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
