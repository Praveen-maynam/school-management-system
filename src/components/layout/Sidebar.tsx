
// import { useNavigate, useLocation } from "react-router-dom";
// import { Home, Users, User, Calendar, Wallet, BookOpen, FileText, School, Briefcase, Bus, Building2, Book, Settings, BarChart2, ClipboardList, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
// import { useSidebar } from "../../context/SidebarContext";
// import Avatar from "../ui/Avatar";

// interface MenuItem {
//   path: string;
//   label: string;
//   icon: React.ElementType;
// }

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isOpen, toggleSidebar } = useSidebar();

//   // Determine menu items based on current path
//   const getMenuItems = (): MenuItem[] => {
//     if (location.pathname.startsWith('/admin')) {
//       return [
//         { label: 'Dashboard', path: '/admin/dashboard', icon: Home },
//         { label: 'Students', path: '/admin/students', icon: Users },
//         { label: 'Teachers', path: '/admin/teachers', icon: GraduationCap },
//         { label: 'Classes', path: '/admin/classes', icon: School },
//         { label: 'Attendance', path: '/admin/attendance', icon: Calendar },
//         { label: 'Exams & Grades', path: '/admin/exams', icon: ClipboardList },
//         { label: 'Finance', path: '/admin/finance', icon: Wallet },
//         { label: 'Library', path: '/admin/library', icon: Book },
//         { label: 'Transport', path: '/admin/transport', icon: Bus },
//         // { label: 'Hostel', path: '/admin/hostel', icon: Building2 },
//         { label: 'Inventory', path: '/admin/inventory', icon: FileText },
//         { label: 'User Management', path: '/admin/users', icon: Users },
//         { label: 'Settings', path: '/admin/settings', icon: Settings },
//         { label: 'Reports', path: '/admin/reports', icon: BarChart2 },
//       ];
//     } else if (location.pathname.startsWith('/teacher')) {
//       return [
//         { path: "/teacher/dashboard", icon: Home, label: "Dashboard" },
//         { path: "/teacher/students/studentlist", icon: Users, label: "Students" },
//         { path: "/teacher/profile", icon: User, label: "Profile" },
//       ];
//     } else if (location.pathname.startsWith('/parent')) {
//       return [
//         { path: "/parent/dashboard", icon: Home, label: "Dashboard" },
//         { path: "/parent/attendance", icon: Calendar, label: "Attendance" },
//         { path: "/parent/fee-details", icon: Wallet, label: "Fee Details" },
//         { path: "/parent/homework", icon: BookOpen, label: "Homework" },
//         { path: "/teacher/exam-reports", icon: FileText, label: "Exam Reports" },
//         { path: "/parent/profile", icon: User, label: "Profile" },
//       ];
//     } else {
//       return [
//         { path: "/", icon: Home, label: "Home" },
//       ];
//     }
//   };

//   const menuItems = getMenuItems();

//   const itemClass = (path: string) => {
//     const isActive = location.pathname.startsWith(path);
//     return `
//       flex items-center ${isOpen ? 'gap-3 px-6' : 'justify-center'} py-3 cursor-pointer transition-all rounded-l-full
//       ${isActive
//         ? "bg-blue-600 text-white border-l-4 border-white"
//         : "text-gray-300 hover:bg-[#23265a] hover:text-blue-400"}
//     `;
//   };

//   return (
//     <aside className={`fixed top-0 left-0 h-screen ${isOpen ? 'w-64' : 'w-20'} bg-[#1a1d3b] text-white flex flex-col z-50 shadow-lg transition-all duration-300`}>
//       {/* Toggle Button */}
//       <div className={`flex justify-end items-center pl-500 ${isOpen ? 'p-2' : 'pt-2 pr-2'}`}>
//         <button onClick={toggleSidebar} aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'} className="p-2 rounded-full hover:bg-[#23265a]">
//           {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
//         </button>
//       </div>
//       {/* Logo / Brand */}
//       <div className={`border-b border-[#23265a] ${isOpen ? 'p-6' : 'p-2 flex justify-center'}`}>
//         {isOpen ? (
//           <h1 className="text-2xl font-bold text-blue-400 tracking-wide">SchoolApp</h1>
//         ) : (
//           <h1 className="text-xl font-bold text-blue-400 tracking-wide">S</h1>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 py-4">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           return (
//             <div
//               key={item.path}
//               className={itemClass(item.path)}
//               onClick={() => navigate(item.path)}
//               title={!isOpen ? item.label : undefined}
//             >
//               <Icon size={22} />
//               {isOpen && <span className="font-medium">{item.label}</span>}
//             </div>
//           );
//         })}
//       </nav>
//       {/* User info at bottom */}
//       <div className={`border-t border-[#23265a] flex items-center ${isOpen ? 'p-4' : 'p-2 justify-center'} min-h-[64px]`}> 
//         <Avatar size={isOpen ? 40 : 32} className="bg-blue-200" />
//         {isOpen && (
//           <div className="ml-3">
//             <div className="font-semibold text-white text-sm">User Name</div>
//             <div className="text-xs text-blue-200">Admin</div>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, User, Calendar, Wallet, BookOpen, FileText, School, Bus, Book, Settings, BarChart2, ClipboardList, ChevronLeft, ChevronRight, GraduationCap, ChevronDown, ChevronUp } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";
import Avatar from "../ui/Avatar";

interface MenuItem {
  path?: string;
  label: string;
  icon: React.ElementType;
  children?: MenuItem[];
}

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, toggleSidebar } = useSidebar();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Menu structure with submenu for Students
  const getMenuItems = (): MenuItem[] => {
    if (location.pathname.startsWith('/admin')) {
      return [
        { label: 'Dashboard', path: '/admin/dashboard', icon: Home },
        {
          label: 'Students',
          icon: Users,
          children: [
            { label: 'Class', path: '/admin/classes', icon: School },
            { label: 'Student', path: '/admin/students', icon: Users },
            { label: 'Attendance', path: '/admin/attendance', icon: Calendar },
          ],
        },
  
        { label: 'Exams & Grades', path: '/admin/exams', icon: ClipboardList },
        { label: 'Finance', path: '/admin/finance', icon: Wallet },
        { label: 'Library', path: '/admin/library', icon: Book },
        { label: 'Transport', path: '/admin/transport', icon: Bus },
        { label: 'Inventory', path: '/admin/inventory', icon: FileText },
        {
        label: 'Staff',
        icon: GraduationCap,
        children: [
          { label: 'Teacher', path: '/admin/teachers', icon: GraduationCap },
          { label: 'Non-Teaching Staff', path: '/admin/non-teaching-staff', icon: User },
        ],
      },
        { label: 'User Management', path: '/admin/users', icon: Users },
        { label: 'Settings', path: '/admin/settings', icon: Settings },
        { label: 'Reports', path: '/admin/reports', icon: BarChart2 },
      ];
    } else if (location.pathname.startsWith('/teacher')) {
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
        { path: "/teacher/exam-reports", icon: FileText, label: "Exam Reports" },
        { path: "/parent/profile", icon: User, label: "Profile" },
      ];
    } else {
      return [
        { path: "/", icon: Home, label: "Home" },
      ];
    }
  };

  const menuItems = getMenuItems();

  const itemClass = (path?: string) => {
    const isActive = path && location.pathname.startsWith(path);
    return `
      flex items-center ${isOpen ? 'gap-3 px-6' : 'justify-center'} py-3 cursor-pointer transition-all rounded-l-full
      ${isActive
        ? "bg-blue-600 text-white border-l-4 border-white"
        : "text-gray-300 hover:bg-[#23265a] hover:text-blue-400"}
    `;
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.children) {
      setOpenSubmenu(openSubmenu === item.label ? null : item.label);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <aside className={`fixed top-0 left-0 h-screen ${isOpen ? 'w-64' : 'w-20'} bg-[#1a1d3b] text-white flex flex-col z-50 shadow-lg transition-all duration-300`}>
      {/* Toggle Button */}
      <div className={`flex justify-end items-center pl-500 ${isOpen ? 'p-2' : 'pt-2 pr-2'}`}>
        <button onClick={toggleSidebar} aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'} className="p-2 rounded-full hover:bg-[#23265a]">
          {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>
      {/* Logo / Brand */}
      <div className={`border-b border-[#23265a] ${isOpen ? 'p-6' : 'p-2 flex justify-center'}`}>
        {isOpen ? (
          <h1 className="text-2xl font-bold text-blue-400 tracking-wide">SchoolApp</h1>
        ) : (
          <h1 className="text-xl font-bold text-blue-400 tracking-wide">S</h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const hasChildren = !!item.children;
          return (
            <div key={item.label}>
              <div
                className={itemClass(item.path)}
                onClick={() => handleMenuClick(item)}
                title={!isOpen ? item.label : undefined}
              >
                <Icon size={22} />
                {isOpen && <span className="font-medium">{item.label}</span>}
                {hasChildren && isOpen && (
                  openSubmenu === item.label
                    ? <ChevronUp className="ml-auto" size={18} />
                    : <ChevronDown className="ml-auto" size={18} />
                )}
              </div>
              {/* Submenu */}
              {hasChildren && openSubmenu === item.label && isOpen && (
                <div className="ml-10">
                  {item.children!.map((sub) => {
                    const SubIcon = sub.icon;
                    return (
                      <div
                        key={sub.label}
                        className={itemClass(sub.path) + " py-2 text-sm"}
                        onClick={() => sub.path && navigate(sub.path)}
                        title={sub.label}
                      >
                        <SubIcon size={18} />
                        <span className="ml-2">{sub.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      {/* User info at bottom */}
      <div className={`border-t border-[#23265a] flex items-center ${isOpen ? 'p-4' : 'p-2 justify-center'} min-h-[64px]`}>
        <Avatar size={isOpen ? 40 : 32} className="bg-blue-200" />
        {isOpen && (
          <div className="ml-3">
            <div className="font-semibold text-white text-sm">User Name</div>
            <div className="text-xs text-blue-200">Admin</div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;