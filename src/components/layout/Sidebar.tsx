import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, User, Calendar, Wallet, BookOpen, FileText, School, Bus, Book, Settings, BarChart2, ClipboardList, ChevronLeft, ChevronRight, GraduationCap, ChevronDown, ChevronUp,Megaphone, Package, Trophy, CalendarDays, Clock3, ClipboardCheck } from "lucide-react";
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
    // Role-based sidebar for non-teaching staff
    if (location.pathname.startsWith('/admin/non-teaching-staff')) {
      const role = localStorage.getItem('nonTeachingStaffRole');
      if (role === 'examination') {
        return [
          { label: 'Examination Dashboard', path: '/admin/non-teaching-staff/examination', icon: ClipboardList },
        ];
      } else if (role === 'inventory') {
        return [
          { label: 'Inventory Dashboard', path: '/admin/non-teaching-staff/inventory', icon: FileText },
        ];
      } else if (role === 'sports') {
        return [
          { label: 'Sports Dashboard', path: '/admin/non-teaching-staff/sports', icon: BarChart2 },
          { label: 'Sports Management', path: '/admin/non-teaching-staff/sports/sportsmanagement', icon: Trophy },
          { label: 'Athlete Management', path: '/admin/non-teaching-staff/sports/athlete', icon: Users },
          // { label: 'Coaches & Staff', path: '/admin/non-teaching-staff/sports/results', icon: ClipboardList },
          { label: 'Events & Schedules', path: '/admin/non-teaching-staff/sports/events', icon: Calendar },
          // { label: 'Facilities Management', path: '/admin/non-teaching-staff/sports/coaches', icon: MapPin},
          { label: 'Equipment & Inventory', path: '/admin/non-teaching-staff/sports/equipment', icon: Package },
          // { label: 'Reports & Analytics', path: '/admin/non-teaching-staff/sports/reports', icon: FileText },
          { label: 'Settings', path: '/admin/non-teaching-staff/sports/settings', icon: Settings },
        ];
      } else if (role === 'security') {
        return [
          { label: 'Security Dashboard', path: '/admin/non-teaching-staff/security', icon: Users },
        ];
      } else {
        return [
          { label: 'Dashboard', path: '/admin/non-teaching-staff', icon: Home },
        ];
      }
    } else if (location.pathname.startsWith('/admin')) {
      return [
        { label: 'Dashboard', path: '/admin/dashboard', icon: Home },
        {
          label: 'Students management',
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
            { label: 'Non-Teaching Staff', path: '/admin/non-teaching-staf', icon: User },
          ],
        },
        {label: 'Announcements', path: '/admin/announcements', icon: Megaphone },
        { label: 'User Management', path: '/admin/users', icon: Users },
        { label: 'Certificate & ID Card', path: '/admin/certificate-idcard', icon: FileText },
                { label: 'Reports', path: '/admin/reports', icon: BarChart2 },
        { label: 'Subscription', path: '/admin/subscription', icon: Package },
                { label: 'Settings', path: '/admin/settings', icon: Settings }
      ];
    } else if (location.pathname.startsWith('/super-admin')) {
      // Production-level super admin sidebar
      return [
        { label: 'Dashboard & Analytics', path: '/super-admin/dashboard', icon: BarChart2 },
        { label: 'School Management', path: '/super-admin/schools', icon: School },
        { label: 'Billing & Plans', path: '/super-admin/billing/plans', icon: Wallet },
        { label: 'Admin Management', path: '/super-admin/admins', icon: Users },
        { label: 'Personal Management', path: '/super-admin/personal-management', icon: User },
        { label: 'Support Center', path: '/super-admin/support-center', icon: ClipboardList },
        { label: 'Data Management', path: '/super-admin/data-management', icon: FileText },
        { label: 'Email School', path: '/super-admin/emailschool', icon: FileText },
        { label: 'Platform Settings', path: '/super-admin/settings', icon: Settings },
      ];
    } else if (location.pathname.startsWith('/finance-manager')) {
      return [
        { label: 'Dashboard', path: '/finance-manager/dashboard', icon: Home },
        { label: 'Fee Structure', path: '/finance-manager/fee-configuration/structure', icon: FileText },
  
        { label: 'Online Payments', path: '/finance-manager/payment-management/online', icon: Wallet },
       
        { label: 'Defaulter List', path: '/finance-manager/dues-defaulters/defaulters', icon: Users },
       

        { label: 'Collection Reports', path: '/finance-manager/dues-defaulters/collection-reports', icon: BarChart2 },
        
        { label: 'Salary Calculation', path: '/finance-manager/payroll/salary-calculation', icon: Users },
        { label: 'Deduction Management', path: '/finance-manager/payroll/deduction-management', icon: Users },

      ];
    } else if (location.pathname.startsWith('/teacher')) {
      return [
        { path: "/teacher/dashboard", icon: Home, label: "Dashboard" },
        {path: "/teacher/attendance", icon: School, label: "Attendance",
          children: [
            { path: "/teacher/attendance/mark", label: "Mark Attendance", icon: Calendar },
            { path: "/teacher/attendance/view", label: "Attendance Report", icon: BarChart2 },
            { path: "/teacher/attendance/holiday", label: "Holiday List", icon: Users },
          ]
        },

        {path: "/teacher/homework", icon: BookOpen, label: "Homework" },
        {path: "/teacher/exams", icon: FileText, label: "Exams",
          children: [
             {path: "/teacher/exams", icon: FileText, label: "Exams"},
            { path: "/teacher/exams/offline", label: "Offline Exams", icon: FileText },
            { path: "/teacher/exams/online", label: "Online Exams", icon: BarChart2 },
          ]
        },

        {path: "/teacher/class", icon: GraduationCap, label: "Class" },
        {path: "/teacher/notifications", icon: Settings, label: "Notifications" },
        {path: "/teacher/reports", icon: BarChart2, label: "Reports" },
        {path: "/teacher/timetable", icon: BookOpen, label: "Time Table" },
        {path: "/teacher/leave", icon: Book, label: "Leave" },  

        { path: "/teacher/students/studentlist", icon: Users, label: "Students" },
        { path: "/teacher/profile", icon: User, label: "Profile" },
      ];
    } else if (location.pathname.startsWith('/parent')) {
      return [
        { path: "/parent/dashboard", icon: Home, label: "Dashboard" },
        { path: "/parent/attendance", icon: Calendar, label: "Attendance" },
        { path: "/parent/fee-details", icon: Wallet, label: "Fee Details" },
        { path: "/parent/homework", icon: ClipboardList, label: "Homework" },
        { path: "/parent/subjects", icon: Book, label: "Subjects" },
        { path: "/parent/teacher", icon: GraduationCap, label: "Teacher" },
        {path: "/parent/academic-calendar", icon: CalendarDays, label: "Academic Calendar" },
        {path: "/parent/reports", icon: BarChart2, label: "Reports" },
        {path: "/parent/timetable", icon: Clock3, label: "Time Table" },
        {path: "/parent/leave", icon: ClipboardCheck, label: "Leave" },
        {path: "/parent/result", icon: Trophy, label: "Result" },
        { path: "/parent/exams", icon: FileText, label: "Exams" },
        { path: "/parent/profile", icon: User, label: "Profile" },
      ];
    } else if (location.pathname.startsWith('/transport-manager')) {
      return [
        { label: 'Dashboard', path: '/transport-manager/dashboard', icon: Home },
        { label: 'Vehicle Tracking', path: '/transport-manager/vehicle-tracking', icon: Bus },
        { label: 'Route Management', path: '/transport-manager/route-management', icon: FileText },
        { label: 'Driver Attendance', path: '/transport-manager/driver-attendance', icon: Users },
        { label: 'Maintenance Logs', path: '/transport-manager/maintenance-logs', icon: ClipboardList },
      ];
    } else if (location.pathname.startsWith('/library-manager')) {
      return [
        { label: 'Dashboard', path: '/library-manager/dashboard', icon: Home },
        { label: 'Book Issue/Return', path: '/library-manager/book-issue-return', icon: BookOpen },
        { label: 'Fine Collection', path: '/library-manager/fine-collection', icon: Wallet },
        { label: 'Book Search', path: '/library-manager/book-search', icon: FileText },
        { label: 'Inventory Management', path: '/library-manager/inventory-management', icon: ClipboardList },
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
      flex items-center ${isOpen ? 'gap-2 px-6' : 'justify-center'} py-2 cursor-pointer transition-all duration-200 rounded-md
      ${isActive
        ? "bg-blue-600 text-white ml-2 mr-4"
        : "text-gray-300 hover:bg-[#23265a] hover:text-blue-400 mr-4"}
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

      
      {/* Logo / Brand and Toggle Button on same line */}
      <div className={`flex items-center justify-between border-b border-[#23265a] ${isOpen ? 'p-2' : 'p-2'}`}>
        <button
          onClick={toggleSidebar}
          className="flex absolute -right-3 top-2 bg-blue-600 text-white rounded-full p-1 shadow-lg hover:bg-blue-700 transition-colors z-50 lg:flex"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
        </button>

        {isOpen ? (
          <div className="flex items-center gap-2 w-full">
            <img
              src={require('../../assets/images/logo.png')}
              alt="VidyaTrack School Management System Logo"
              className="h-10 w-auto max-w-[40px] object-contain drop-shadow-md"
              style={{ minWidth: 32 }}
              loading="lazy"
              srcSet={require('../../assets/images/logo.png') + ' 1x'}
            />
            <span className="text-lg font-bold text-blue-400 tracking-wide whitespace-nowrap">VidyaTrack</span>
          </div>
        ) : (
          <img
            src={require('../../assets/images/logo.png')}
            alt="VidyaTrack Logo"
            className="h-8 w-8 object-contain drop-shadow-md mx-auto"
            style={{ minWidth: 32 }}
            loading="lazy"
            srcSet={require('../../assets/images/logo.png') + ' 1x'}
          />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-1">
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
                <Icon size={isOpen ? 16 : 12} className="min-w-[16px] min-h-[16px]" />
                {isOpen && <span className="font-medium text-xs">{item.label}</span>}
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
                        <SubIcon size={14} className="min-w-[14px] min-h-[14px]" />
                        <span className="ml-2 text-xs">{sub.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      {/* User info at bottom with dropdown */}
      <UserDropdown isOpen={isOpen} />
    </aside>
  );
};

export default Sidebar;

// Avatar dropdown component
const UserDropdown = ({ isOpen }: { isOpen: boolean }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Dummy user data (replace with real user context if available)
  const user = {
    name: "User Name",
    role: "Admin",
    avatar: undefined,
  };

  return (
    <div ref={dropdownRef} className={`relative border-t border-[#23265a] flex items-center ${isOpen ? 'p-4' : 'p-2 justify-center'} min-h-[64px]`}>
      <button
        className="focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        tabIndex={0}
      >
        <Avatar size={isOpen ? 40 : 32} className="bg-blue-200" src={user.avatar} />
      </button>
      {isOpen && (
        <div className="ml-3">
          <div className="font-semibold text-white text-sm">{user.name}</div>
          <div className="text-xs text-blue-200">{user.role}</div>
        </div>
      )}
      {/* Dropdown menu */}
      {open && (
        <div className="absolute bottom-16 left-0 w-48 bg-white text-gray-900 rounded-lg shadow-lg z-50 animate-fade-in border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="font-semibold">{user.name}</div>
            <div className="text-xs text-gray-500">{user.role}</div>
          </div>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            onClick={() => {/* Navigate to settings/profile */}}
          >
            <span role="img" aria-label="settings">⚙️</span> Settings
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            onClick={() => {
              setOpen(false);
              navigate('/');
            }}
          >
            <span role="img" aria-label="logout">🚪</span> Logout
          </button>
        </div>
      )}
    </div>
  );
};