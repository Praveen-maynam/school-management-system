
// // // import React, { useState } from 'react';
// // // import { Trophy, Users, Calendar, Activity, ClipboardList, Award, MapPin, Settings, Bell, Search, Menu, X, LogOut, ChevronDown, Target, TrendingUp, Heart, Dumbbell, Shield, Star, UserPlus, FileText, BarChart3, DollarSign, Package, Clock, CheckCircle2, AlertCircle, Plus, Filter, Download, Upload, Edit3, Eye, Trash2, Save, RefreshCw, Video, Image as ImageIcon, Shirt, Zap } from 'lucide-react';

// // // interface NavItem {
// // //   id: string;
// // //   icon: any;
// // //   label: string;
// // //   badge?: number | null;
// // //   subItems?: SubItem[];
// // // }

// // // interface SubItem {
// // //   id: string;
// // //   label: string;
// // //   icon: any;
// // // }

// // // interface Stat {
// // //   title: string;
// // //   value: string;
// // //   change: string;
// // //   trend: 'up' | 'down';
// // //   icon: any;
// // //   bgColor: string;
// // //   iconColor: string;
// // // }

// // // export default function SportsDepartmentSystem() {
// // //   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
// // //   const [activeMenu, setActiveMenu] = useState<string>('overview');
// // //   const [expandedMenus, setExpandedMenus] = useState<string[]>(['sports']);

// // //   const toggleSubmenu = (menuId: string) => {
// // //     setExpandedMenus(prev =>
// // //       prev.includes(menuId)
// // //         ? prev.filter(id => id !== menuId)
// // //         : [...prev, menuId]
// // //     );
// // //   };

// // //   const navItems: NavItem[] = [
// // //     { id: 'overview', icon: BarChart3, label: 'Dashboard Overview', badge: null },
// // //     {
// // //       id: 'sports',
// // //       icon: Trophy,
// // //       label: 'Sports Management',
// // //       badge: 5,
// // //       subItems: [
// // //         { id: 'sports-list', label: 'All Sports', icon: Trophy },
// // //         { id: 'add-sport', label: 'Add New Sport', icon: Plus },
// // //         { id: 'teams', label: 'Teams Management', icon: Users },
// // //         { id: 'tournaments', label: 'Tournaments', icon: Award }
// // //       ]
// // //     },
// // //     {
// // //       id: 'athletes',
// // //       icon: Users,
// // //       label: 'Athletes Management',
// // //       subItems: [
// // //         { id: 'athletes-list', label: 'All Athletes', icon: Users },
// // //         { id: 'athlete-registration', label: 'Register Athlete', icon: UserPlus },
// // //         { id: 'athlete-performance', label: 'Performance Tracking', icon: TrendingUp },
// // //         { id: 'athlete-health', label: 'Health Records', icon: Heart }
// // //       ]
// // //     },
// // //     {
// // //       id: 'coaches',
// // //       icon: ClipboardList,
// // //       label: 'Coaches & Staff',
// // //       subItems: [
// // //         { id: 'coaches-list', label: 'All Coaches', icon: ClipboardList },
// // //         { id: 'add-coach', label: 'Add Coach', icon: UserPlus },
// // //         { id: 'training-programs', label: 'Training Programs', icon: Dumbbell }
// // //       ]
// // //     },
// // //     {
// // //       id: 'events',
// // //       icon: Calendar,
// // //       label: 'Events & Schedules',
// // //       badge: 3,
// // //       subItems: [
// // //         { id: 'event-calendar', label: 'Event Calendar', icon: Calendar },
// // //         { id: 'schedule-event', label: 'Schedule Event', icon: Plus },
// // //         { id: 'past-events', label: 'Past Events', icon: Clock }
// // //       ]
// // //     },
// // //     {
// // //       id: 'facilities',
// // //       icon: MapPin,
// // //       label: 'Facilities Management',
// // //       subItems: [
// // //         { id: 'facilities-list', label: 'All Facilities', icon: MapPin },
// // //         { id: 'facility-booking', label: 'Facility Booking', icon: Calendar },
// // //         { id: 'maintenance', label: 'Maintenance', icon: Settings }
// // //       ]
// // //     },
// // //     {
// // //       id: 'equipment',
// // //       icon: Package,
// // //       label: 'Equipment & Inventory',
// // //       subItems: [
// // //         { id: 'inventory-list', label: 'Inventory List', icon: Package },
// // //         { id: 'equipment-requests', label: 'Equipment Requests', icon: ClipboardList },
// // //         { id: 'suppliers', label: 'Suppliers', icon: Users }
// // //       ]
// // //     },
// // //     {
// // //       id: 'reports',
// // //       icon: FileText,
// // //       label: 'Reports & Analytics',
// // //       subItems: [
// // //         { id: 'performance-reports', label: 'Performance Reports', icon: TrendingUp },
// // //         { id: 'financial-reports', label: 'Financial Reports', icon: DollarSign },
// // //         { id: 'attendance-reports', label: 'Attendance Reports', icon: CheckCircle2 }
// // //       ]
// // //     },
// // //     {
// // //       id: 'settings',
// // //       icon: Settings,
// // //       label: 'Settings',
// // //       subItems: [
// // //         { id: 'department-settings', label: 'Department Settings', icon: Settings },
// // //         { id: 'user-management', label: 'User Management', icon: Users },
// // //         { id: 'security', label: 'Security & Privacy', icon: Shield }
// // //       ]
// // //     }
// // //   ];

// // //   const renderContent = () => {
// // //     switch(activeMenu) {
// // //       case 'overview': return <DashboardOverview />;
// // //       case 'sports-list': return <SportsList />;
// // //       case 'add-sport': return <AddSport />;
// // //       case 'teams': return <TeamsManagement />;
// // //       case 'tournaments': return <Tournaments />;
// // //       case 'athletes-list': return <AthletesList />;
// // //       case 'athlete-registration': return <AthleteRegistration />;
// // //       case 'athlete-performance': return <AthletePerformance />;
// // //       case 'athlete-health': return <AthleteHealth />;
// // //       case 'coaches-list': return <CoachesList />;
// // //       case 'add-coach': return <AddCoach />;
// // //       case 'training-programs': return <TrainingPrograms />;
// // //       case 'event-calendar': return <EventCalendar />;
// // //       case 'schedule-event': return <ScheduleEvent />;
// // //       case 'past-events': return <PastEvents />;
// // //       case 'facilities-list': return <FacilitiesList />;
// // //       case 'facility-booking': return <FacilityBooking />;
// // //       case 'maintenance': return <Maintenance />;
// // //       case 'inventory-list': return <InventoryList />;
// // //       case 'equipment-requests': return <EquipmentRequests />;
// // //       case 'suppliers': return <Suppliers />;
// // //       case 'performance-reports': return <PerformanceReports />;
// // //       case 'financial-reports': return <FinancialReports />;
// // //       case 'attendance-reports': return <AttendanceReports />;
// // //       case 'department-settings': return <DepartmentSettings />;
// // //       case 'user-management': return <UserManagement />;
// // //       case 'security': return <SecuritySettings />;
// // //       default: return <DashboardOverview />;
// // //     }
// // //   };

 

// // //   return (
// // //     <div className="min-h-screen bg-slate-50 flex">
// // //       {/* Sidebar */}
// // //       <aside className={`bg-gradient-to-b from-indigo-900 to-purple-900 text-white transition-all duration-300 ${
// // //         isSidebarOpen ? 'w-72' : 'w-20'
// // //       } flex flex-col`}>
// // //         <div className="p-4 border-b border-indigo-800">
// // //           {isSidebarOpen ? (
// // //             <div className="flex items-center justify-between mb-4">
              
// // //               <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-indigo-800 rounded-lg">
// // //                 <X className="w-5 h-5" />
// // //               </button>
// // //             </div>
// // //           ) : (
// // //             <button onClick={() => setIsSidebarOpen(true)} className="mx-auto p-2 hover:bg-indigo-800 rounded-lg">
// // //               <Menu className="w-5 h-5" />
// // //             </button>
// // //           )}
// // //         </div>

        

// // //         <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
// // //           {navItems.map((item) => (
// // //             <div key={item.id}>
// // //               <button
// // //                 onClick={() => {
// // //                   setActiveMenu(item.id);
// // //                   if (item.subItems) toggleSubmenu(item.id);
// // //                 }}
// // //                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
// // //                   activeMenu === item.id
// // //                     ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
// // //                     : 'hover:bg-indigo-800'
// // //                 } ${!isSidebarOpen && 'justify-center'}`}
// // //               >
// // //                 <item.icon className="w-5 h-5 flex-shrink-0" />
// // //                 {isSidebarOpen && (
// // //                   <>
// // //                     <span className="flex-1 text-left">{item.label}</span>
// // //                     {item.badge && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>}
// // //                     {item.subItems && <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenus.includes(item.id) ? 'rotate-180' : ''}`} />}
// // //                   </>
// // //                 )}
// // //               </button>

// // //               {isSidebarOpen && item.subItems && expandedMenus.includes(item.id) && (
// // //                 <div className="mt-2 ml-4 space-y-1">
// // //                   {item.subItems.map((subItem) => (
// // //                     <button
// // //                       key={subItem.id}
// // //                       onClick={() => setActiveMenu(subItem.id)}
// // //                       className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
// // //                         activeMenu === subItem.id
// // //                           ? 'bg-indigo-800 text-blue-300'
// // //                           : 'text-blue-200 hover:bg-indigo-800 hover:text-white'
// // //                       }`}
// // //                     >
// // //                       <subItem.icon className="w-4 h-4" />
// // //                       {subItem.label}
// // //                     </button>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           ))}
// // //         </nav>

// // //         <div className="p-4 border-t border-indigo-800">
// // //           <button
// // //             onClick={() => setIsLoggedIn(false)}
// // //             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-900/30 text-red-300 transition-all ${
// // //               !isSidebarOpen && 'justify-center'
// // //             }`}
// // //           >
// // //             <LogOut className="w-5 h-5" />
// // //             {isSidebarOpen && <span>Logout</span>}
// // //           </button>
// // //         </div>
// // //       </aside>

// // //       {/* Main Content */}
// // //       <main className="flex-1 flex flex-col overflow-hidden">
       

// // //         <div className="flex-1 overflow-y-auto p-8">
// // //           {renderContent()}
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // // Page Components
// // // function DashboardOverview() {
// // //   const stats: Stat[] = [
// // //     { title: 'Active Athletes', value: '1,245', change: '+48 this month', trend: 'up', icon: Users, bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
// // //     { title: 'Ongoing Events', value: '12', change: '+3 this week', trend: 'up', icon: Calendar, bgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
// // //     { title: 'Active Sports', value: '24', change: '+2 new', trend: 'up', icon: Trophy, bgColor: 'bg-green-50', iconColor: 'text-green-600' },
// // //     { title: 'Facilities', value: '18', change: '2 under maintenance', trend: 'down', icon: MapPin, bgColor: 'bg-amber-50', iconColor: 'text-amber-600' }
// // //   ];

// // //   return (
// // //     <>
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // //         {stats.map((stat, idx) => (
// // //           <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
// // //             <div className="flex items-start justify-between mb-4">
// // //               <div className={`${stat.bgColor} p-3 rounded-lg`}>
// // //                 <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
// // //               </div>
// // //               <div className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-amber-600'}`}>
// // //                 {stat.change}
// // //               </div>
// // //             </div>
// // //             <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
// // //             <div className="text-sm text-slate-600">{stat.title}</div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //           <h2 className="text-xl font-bold text-slate-900 mb-6">Upcoming Events</h2>
// // //           <div className="space-y-4">
// // //             {[
// // //               { name: 'Basketball Championship', date: 'Feb 15, 2026', time: '10:00 AM', venue: 'Main Arena' },
// // //               { name: 'Swimming Competition', date: 'Feb 18, 2026', time: '02:00 PM', venue: 'Aquatic Center' },
// // //               { name: 'Track & Field Meet', date: 'Feb 22, 2026', time: '09:00 AM', venue: 'Athletic Stadium' }
// // //             ].map((event, idx) => (
// // //               <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
// // //                 <h3 className="font-semibold text-slate-900 mb-2">{event.name}</h3>
// // //                 <div className="grid grid-cols-3 gap-2 text-sm text-slate-600">
// // //                   <div className="flex items-center gap-1"><Calendar className="w-4 h-4" />{event.date}</div>
// // //                   <div className="flex items-center gap-1"><Clock className="w-4 h-4" />{event.time}</div>
// // //                   <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{event.venue}</div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //           <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
// // //           <div className="space-y-3">
// // //             {[
// // //               { icon: UserPlus, label: 'Register New Athlete', color: 'blue' },
// // //               { icon: Calendar, label: 'Schedule Event', color: 'purple' },
// // //               { icon: Trophy, label: 'Add Tournament', color: 'green' },
// // //               { icon: Package, label: 'Request Equipment', color: 'amber' }
// // //             ].map((action, idx) => (
// // //               <button key={idx} className={`w-full flex items-center gap-3 p-4 rounded-lg bg-${action.color}-50 hover:bg-${action.color}-100 text-${action.color}-700 transition-colors`}>
// // //                 <action.icon className="w-5 h-5" />
// // //                 <span className="font-medium">{action.label}</span>
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // }

// // // function SportsList() {
// // //   const sports = [
// // //     { name: 'Basketball', category: 'Team Sport', athletes: 145, teams: 8, status: 'Active' },
// // //     { name: 'Swimming', category: 'Individual', athletes: 98, teams: 0, status: 'Active' },
// // //     { name: 'Football', category: 'Team Sport', athletes: 212, teams: 12, status: 'Active' },
// // //     { name: 'Tennis', category: 'Individual', athletes: 67, teams: 0, status: 'Active' }
// // //   ];

// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <div className="flex items-center justify-between mb-6">
// // //         <h2 className="text-2xl font-bold text-slate-900">Sports Directory</h2>
// // //         <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center gap-2">
// // //           <Plus className="w-4 h-4" />Add Sport
// // //         </button>
// // //       </div>
// // //       <div className="overflow-x-auto">
// // //         <table className="w-full">
// // //           <thead className="bg-slate-50 border-y border-slate-200">
// // //             <tr>
// // //               <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Sport Name</th>
// // //               <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Category</th>
// // //               <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Athletes</th>
// // //               <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Teams</th>
// // //               <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
// // //               <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody className="divide-y divide-slate-200">
// // //             {sports.map((sport, idx) => (
// // //               <tr key={idx} className="hover:bg-slate-50">
// // //                 <td className="px-4 py-4 text-sm font-medium text-slate-900">{sport.name}</td>
// // //                 <td className="px-4 py-4 text-sm text-slate-600">{sport.category}</td>
// // //                 <td className="px-4 py-4 text-sm text-slate-600">{sport.athletes}</td>
// // //                 <td className="px-4 py-4 text-sm text-slate-600">{sport.teams || 'N/A'}</td>
// // //                 <td className="px-4 py-4">
// // //                   <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
// // //                     {sport.status}
// // //                   </span>
// // //                 </td>
// // //                 <td className="px-4 py-4">
// // //                   <div className="flex gap-2">
// // //                     <button className="p-2 hover:bg-blue-50 rounded text-blue-600"><Eye className="w-4 h-4" /></button>
// // //                     <button className="p-2 hover:bg-purple-50 rounded text-purple-600"><Edit3 className="w-4 h-4" /></button>
// // //                   </div>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function AddSport() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Add New Sport</h2>
// // //       <div className="grid grid-cols-2 gap-6">
// // //         <div>
// // //           <label className="block text-sm font-medium text-slate-700 mb-2">Sport Name</label>
// // //           <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter sport name" />
// // //         </div>
// // //         <div>
// // //           <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
// // //           <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
// // //             <option>Team Sport</option>
// // //             <option>Individual Sport</option>
// // //           </select>
// // //         </div>
// // //         <div className="col-span-2">
// // //           <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
// // //           <textarea className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" rows={4} placeholder="Enter sport description..."></textarea>
// // //         </div>
// // //       </div>
// // //       <div className="mt-6 flex gap-4">
// // //         <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700">
// // //           <Save className="w-4 h-4 inline mr-2" />Add Sport
// // //         </button>
// // //         <button className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50">Cancel</button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function TeamsManagement() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <div className="flex items-center justify-between mb-6">
// // //         <h2 className="text-2xl font-bold text-slate-900">Teams Management</h2>
// // //         <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center gap-2">
// // //           <Plus className="w-4 h-4" />Create Team
// // //         </button>
// // //       </div>
// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //         {['Varsity Basketball', 'Junior Football', 'Swimming Team'].map((team, idx) => (
// // //           <div key={idx} className="border border-slate-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all">
// // //             <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
// // //               <Shirt className="w-8 h-8 text-white" />
// // //             </div>
// // //             <h3 className="font-semibold text-slate-900 text-center mb-2">{team}</h3>
// // //             <p className="text-sm text-slate-600 text-center mb-4">24 Members</p>
// // //             <button className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium">View Details</button>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function Tournaments() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Tournaments</h2>
// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //         {[
// // //           { name: 'Inter-College Basketball Cup', date: 'March 15-20, 2026', teams: 16, status: 'Upcoming' },
// // //           { name: 'Swimming Championship', date: 'April 5-7, 2026', teams: 8, status: 'Registration Open' }
// // //         ].map((tournament, idx) => (
// // //           <div key={idx} className="border border-slate-200 rounded-lg p-6">
// // //             <div className="flex items-start justify-between mb-4">
// // //               <Award className="w-10 h-10 text-yellow-500" />
// // //               <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{tournament.status}</span>
// // //             </div>
// // //             <h3 className="font-semibold text-slate-900 mb-2">{tournament.name}</h3>
// // //             <p className="text-sm text-slate-600 mb-1">Date: {tournament.date}</p>
// // //             <p className="text-sm text-slate-600 mb-4">Teams: {tournament.teams}</p>
// // //             <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">Manage Tournament</button>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function AthletesList() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <div className="flex items-center justify-between mb-6">
// // //         <h2 className="text-2xl font-bold text-slate-900">Athletes Directory</h2>
// // //         <div className="flex gap-3">
// // //           <input type="search" placeholder="Search athletes..." className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
// // //           <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2">
// // //             <Filter className="w-4 h-4" />Filter
// // //           </button>
// // //         </div>
// // //       </div>
// // //       <div className="text-center py-12 text-slate-500">Athlete records will be displayed here</div>
// // //     </div>
// // //   );
// // // }

// // // function AthleteRegistration() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Register New Athlete</h2>
// // //       <div className="grid grid-cols-2 gap-6">
// // //         <div><label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label><input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg" /></div>
// // //         <div><label className="block text-sm font-medium text-slate-700 mb-2">Student ID</label><input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg" /></div>
// // //         <div><label className="block text-sm font-medium text-slate-700 mb-2">Sport</label><select className="w-full px-4 py-2 border border-slate-300 rounded-lg"><option>Basketball</option></select></div>
// // //         <div><label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label><input type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg" /></div>
// // //       </div>
// // //       <div className="mt-6 flex gap-4">
// // //         <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold">Register Athlete</button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function AthletePerformance() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Performance Tracking</h2>
// // //       <div className="text-center py-12 text-slate-500">Performance analytics dashboard</div>
// // //     </div>
// // //   );
// // // }

// // // function AthleteHealth() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Health Records</h2>
// // //       <div className="text-center py-12 text-slate-500">Health records management system</div>
// // //     </div>
// // //   );
// // // }

// // // function CoachesList() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Coaches Directory</h2>
// // //       <div className="text-center py-12 text-slate-500">Coaches list will be displayed here</div>
// // //     </div>
// // //   );
// // // }

// // // function AddCoach() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Add New Coach</h2>
// // //       <div className="text-center py-12 text-slate-500">Coach registration form</div>
// // //     </div>
// // //   );
// // // }

// // // function TrainingPrograms() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Training Programs</h2>
// // //       <div className="text-center py-12 text-slate-500">Training programs management</div>
// // //     </div>
// // //   );
// // // }

// // // function EventCalendar() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Event Calendar</h2>
// // //       <div className="text-center py-12 text-slate-500">Calendar view will be displayed here</div>
// // //     </div>
// // //   );
// // // }

// // // function ScheduleEvent() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Schedule New Event</h2>
// // //       <div className="text-center py-12 text-slate-500">Event scheduling form</div>
// // //     </div>
// // //   );
// // // }

// // // function PastEvents() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Past Events</h2>
// // //       <div className="text-center py-12 text-slate-500">Historical events archive</div>
// // //     </div>
// // //   );
// // // }

// // // function FacilitiesList() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Facilities Management</h2>
// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //         {['Main Arena', 'Swimming Pool', 'Athletic Stadium', 'Gym Complex'].map((facility, idx) => (
// // //           <div key={idx} className="border border-slate-200 rounded-lg p-6 hover:border-blue-300">
// // //             <MapPin className="w-10 h-10 text-blue-600 mb-3" />
// // //             <h3 className="font-semibold text-slate-900 mb-2">{facility}</h3>
// // //             <p className="text-sm text-slate-600 mb-4">Capacity: 500</p>
// // //             <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Available</span>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function FacilityBooking() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Facility Booking</h2>
// // //       <div className="text-center py-12 text-slate-500">Booking management interface</div>
// // //     </div>
// // //   );
// // // }

// // // function Maintenance() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Maintenance Tracking</h2>
// // //       <div className="text-center py-12 text-slate-500">Maintenance schedules and records</div>
// // //     </div>
// // //   );
// // // }

// // // function InventoryList() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Equipment Inventory</h2>
// // //       <div className="text-center py-12 text-slate-500">Inventory management system</div>
// // //     </div>
// // //   );
// // // }

// // // function EquipmentRequests() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Equipment Requests</h2>
// // //       <div className="text-center py-12 text-slate-500">Request management interface</div>
// // //     </div>
// // //   );
// // // }

// // // function Suppliers() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Suppliers Directory</h2>
// // //       <div className="text-center py-12 text-slate-500">Supplier information and contacts</div>
// // //     </div>
// // //   );
// // // }

// // // function PerformanceReports() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Performance Reports</h2>
// // //       <div className="text-center py-12 text-slate-500">Performance analytics and reports</div>
// // //     </div>
// // //   );
// // // }

// // // function FinancialReports() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Financial Reports</h2>
// // //       <div className="text-center py-12 text-slate-500">Budget and financial tracking</div>
// // //     </div>
// // //   );
// // // }

// // // function AttendanceReports() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Attendance Reports</h2>
// // //       <div className="text-center py-12 text-slate-500">Attendance tracking and reports</div>
// // //     </div>
// // //   );
// // // }

// // // function DepartmentSettings() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Department Settings</h2>
// // //       <div className="text-center py-12 text-slate-500">Configuration and preferences</div>
// // //     </div>
// // //   );
// // // }

// // // function UserManagement() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">User Management</h2>
// // //       <div className="text-center py-12 text-slate-500">User roles and permissions</div>
// // //     </div>
// // //   );
// // // }

// // // function SecuritySettings() {
// // //   return (
// // //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
// // //       <h2 className="text-2xl font-bold text-slate-900 mb-6">Security & Privacy</h2>
// // //       <div className="text-center py-12 text-slate-500">Security configuration panel</div>
// // //     </div>
// // //   );
// // // }




// // import {
// //   Users,
// //   Calendar,
// //   Trophy,
// //   MapPin,
// //   Clock
// // } from "lucide-react";

// // type StatCard = {
// //   title: string;
// //   value: string;
// //   meta: string;
// //   icon: React.ElementType;
// //   iconBg: string;
// //   metaColor: string;
// // };

// // export default function DashboardOverview() {
// //   const stats: StatCard[] = [
// //     {
// //       title: "Active Athletes",
// //       value: "1,245",
// //       meta: "+48 this month",
// //       icon: Users,
// //       iconBg: "bg-blue-50 text-blue-600",
// //       metaColor: "text-green-600"
// //     },
// //     {
// //       title: "Ongoing Events",
// //       value: "12",
// //       meta: "+3 this week",
// //       icon: Calendar,
// //       iconBg: "bg-purple-50 text-purple-600",
// //       metaColor: "text-green-600"
// //     },
// //     {
// //       title: "Active Sports",
// //       value: "24",
// //       meta: "+2 new",
// //       icon: Trophy,
// //       iconBg: "bg-green-50 text-green-600",
// //       metaColor: "text-green-600"
// //     },
// //     {
// //       title: "Facilities",
// //       value: "18",
// //       meta: "2 under maintenance",
// //       icon: MapPin,
// //       iconBg: "bg-amber-50 text-amber-600",
// //       metaColor: "text-amber-600"
// //     }
// //   ];

// //   return (
// //     <div className="space-y-8">
// //       {/* ===== Stats Cards ===== */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
// //         {stats.map((stat, i) => (
// //           <div
// //             key={i}
// //             className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition"
// //           >
// //             <div className="flex justify-between items-start mb-6">
// //               <div className={`p-3 rounded-lg ${stat.iconBg}`}>
// //                 <stat.icon className="w-6 h-6" />
// //               </div>
// //               <span className={`text-sm font-medium ${stat.metaColor}`}>
// //                 {stat.meta}
// //               </span>
// //             </div>

// //             <h2 className="text-3xl font-bold text-slate-900">
// //               {stat.value}
// //             </h2>
// //             <p className="text-slate-600 text-sm mt-1">
// //               {stat.title}
// //             </p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* ===== Bottom Section ===== */}
// //       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
// //         {/* Upcoming Events */}
// //         <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
// //           <h3 className="text-lg font-semibold text-slate-900 mb-6">
// //             Upcoming Events
// //           </h3>

// //           <div className="space-y-4">
// //             {[
// //               {
// //                 title: "Basketball Championship",
// //                 date: "Feb 15, 2026",
// //                 time: "10:00 AM",
// //                 venue: "Main Arena"
// //               },
// //               {
// //                 title: "Swimming Competition",
// //                 date: "Feb 18, 2026",
// //                 time: "02:00 PM",
// //                 venue: "Aquatic Center"
// //               },
// //               {
// //                 title: "Track & Field Meet",
// //                 date: "Feb 22, 2026",
// //                 time: "09:00 AM",
// //                 venue: "Athletic Stadium"
// //               }
// //             ].map((event, i) => (
// //               <div
// //                 key={i}
// //                 className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition"
// //               >
// //                 <h4 className="font-medium text-slate-900 mb-2">
// //                   {event.title}
// //                 </h4>

// //                 <div className="grid grid-cols-3 gap-3 text-sm text-slate-600">
// //                   <div className="flex items-center gap-1">
// //                     <Calendar className="w-4 h-4" />
// //                     {event.date}
// //                   </div>
// //                   <div className="flex items-center gap-1">
// //                     <Clock className="w-4 h-4" />
// //                     {event.time}
// //                   </div>
// //                   <div className="flex items-center gap-1">
// //                     <MapPin className="w-4 h-4" />
// //                     {event.venue}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Quick Actions */}
// //         <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
// //           <h3 className="text-lg font-semibold text-slate-900 mb-6">
// //             Quick Actions
// //           </h3>

// //           <div className="space-y-4">
// //             <ActionButton
// //               label="Register New Athlete"
// //               color="blue"
// //               icon={Users}
// //             />
// //             <ActionButton
// //               label="Schedule Event"
// //               color="purple"
// //               icon={Calendar}
// //             />
// //             <ActionButton
// //               label="Add Tournament"
// //               color="green"
// //               icon={Trophy}
// //             />
// //             <ActionButton
// //               label="Request Equipment"
// //               color="amber"
// //               icon={MapPin}
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ===== Reusable Action Button ===== */
// // type ActionProps = {
// //   label: string;
// //   icon: React.ElementType;
// //   color: "blue" | "purple" | "green" | "amber";
// // };

// // function ActionButton({ label, icon: Icon, color }: ActionProps) {
// //   const styles: Record<string, string> = {
// //     blue: "bg-blue-50 text-blue-700 hover:bg-blue-100",
// //     purple: "bg-purple-50 text-purple-700 hover:bg-purple-100",
// //     green: "bg-green-50 text-green-700 hover:bg-green-100",
// //     amber: "bg-amber-50 text-amber-700 hover:bg-amber-100"
// //   };

// //   return (
// //     <button
// //       className={`w-full flex items-center gap-3 p-4 rounded-lg font-medium transition ${styles[color]}`}
// //     >
// //       <Icon className="w-5 h-5" />
// //       {label}
// //     </button>
// //   );
// // }


// import React, { useState } from 'react';
// import {
//   Trophy,
//   Users,
//   Calendar,
//   Award,
//   TrendingUp,
//   Activity,
//   Target,
//   Medal,
//   Clock,
//   MapPin,
//   Search,
//   Plus,
//   Edit2,
//   Eye,
//   Download,
//   Upload,
//   Filter,
//   BarChart3,
//   UserPlus,
//   Clipboard,
//   Bell,
//   Settings,
//   ChevronRight,
//   Star,
//   CheckCircle,
//   XCircle,
//   Timer,
//   Flag,
//   Shield,
//   Zap,
//   Heart,
//   Flame,
//   Dumbbell,
//   PlayCircle
// } from 'lucide-react';

// // Types
// interface Sport {
//   id: string;
//   name: string;
//   category: 'indoor' | 'outdoor' | 'water' | 'combat';
//   icon: string;
//   players: number;
//   teams: number;
//   season: string;
//   status: 'active' | 'inactive';
// }

// interface Athlete {
//   id: string;
//   name: string;
//   photo: string;
//   rollNumber: string;
//   department: string;
//   sport: string;
//   position: string;
//   level: 'beginner' | 'intermediate' | 'advanced' | 'professional';
//   achievements: number;
//   rating: number;
//   status: 'active' | 'injured' | 'inactive';
//   email: string;
//   phone: string;
//   joinDate: string;
// }

// interface Event {
//   id: string;
//   name: string;
//   sport: string;
//   type: 'tournament' | 'practice' | 'match' | 'training';
//   date: string;
//   time: string;
//   venue: string;
//   participants: number;
//   status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
//   prizes?: string;
//   organizer: string;
// }

// interface Achievement {
//   id: string;
//   athleteId: string;
//   title: string;
//   event: string;
//   position: 'gold' | 'silver' | 'bronze' | 'participation';
//   date: string;
//   points: number;
//   description: string;
// }

// interface Equipment {
//   id: string;
//   name: string;
//   sport: string;
//   quantity: number;
//   available: number;
//   condition: 'excellent' | 'good' | 'fair' | 'poor';
//   location: string;
//   lastMaintenance: string;
// }

// interface Stats {
//   totalAthletes: number;
//   activeSports: number;
//   upcomingEvents: number;
//   totalAchievements: number;
//   equipmentItems: number;
//   averageRating: number;
// }

// // Data generators
// const generateSampleSports = (): Sport[] => [
//   { id: '1', name: 'Cricket', category: 'outdoor', icon: '🏏', players: 45, teams: 4, season: 'Winter', status: 'active' },
//   { id: '2', name: 'Football', category: 'outdoor', icon: '⚽', players: 38, teams: 3, season: 'Monsoon', status: 'active' },
//   { id: '3', name: 'Basketball', category: 'indoor', icon: '🏀', players: 28, teams: 3, season: 'All Year', status: 'active' },
//   { id: '4', name: 'Badminton', category: 'indoor', icon: '🏸', players: 24, teams: 0, season: 'All Year', status: 'active' },
//   { id: '5', name: 'Swimming', category: 'water', icon: '🏊', players: 22, teams: 0, season: 'Summer', status: 'active' },
//   { id: '6', name: 'Table Tennis', category: 'indoor', icon: '🏓', players: 18, teams: 0, season: 'All Year', status: 'active' },
//   { id: '7', name: 'Volleyball', category: 'outdoor', icon: '🏐', players: 32, teams: 3, season: 'Winter', status: 'active' },
//   { id: '8', name: 'Chess', category: 'indoor', icon: '♟️', players: 16, teams: 0, season: 'All Year', status: 'active' }
// ];

// const generateSampleAthletes = (): Athlete[] => [
//   {
//     id: '1',
//     name: 'Rahul Sharma',
//     photo: '👨‍🦱',
//     rollNumber: 'CS2021001',
//     department: 'Computer Science',
//     sport: 'Cricket',
//     position: 'Batsman',
//     level: 'advanced',
//     achievements: 12,
//     rating: 4.8,
//     status: 'active',
//     email: 'rahul@university.edu',
//     phone: '+91 98765 43210',
//     joinDate: '2021-08-15'
//   },
//   {
//     id: '2',
//     name: 'Priya Singh',
//     photo: '👩',
//     rollNumber: 'EC2020045',
//     department: 'Electronics',
//     sport: 'Badminton',
//     position: 'Singles Player',
//     level: 'professional',
//     achievements: 18,
//     rating: 4.9,
//     status: 'active',
//     email: 'priya@university.edu',
//     phone: '+91 98765 43211',
//     joinDate: '2020-09-01'
//   },
//   {
//     id: '3',
//     name: 'Amit Patel',
//     photo: '👨',
//     rollNumber: 'ME2021023',
//     department: 'Mechanical',
//     sport: 'Football',
//     position: 'Forward',
//     level: 'advanced',
//     achievements: 10,
//     rating: 4.6,
//     status: 'active',
//     email: 'amit@university.edu',
//     phone: '+91 98765 43212',
//     joinDate: '2021-07-20'
//   },
//   {
//     id: '4',
//     name: 'Sneha Reddy',
//     photo: '👩‍🦰',
//     rollNumber: 'IT2020067',
//     department: 'Information Tech',
//     sport: 'Swimming',
//     position: 'Freestyle',
//     level: 'professional',
//     achievements: 15,
//     rating: 4.7,
//     status: 'active',
//     email: 'sneha@university.edu',
//     phone: '+91 98765 43213',
//     joinDate: '2020-08-10'
//   },
//   {
//     id: '5',
//     name: 'Vikram Kumar',
//     photo: '👨‍🦳',
//     rollNumber: 'EE2021089',
//     department: 'Electrical',
//     sport: 'Basketball',
//     position: 'Point Guard',
//     level: 'intermediate',
//     achievements: 8,
//     rating: 4.5,
//     status: 'active',
//     email: 'vikram@university.edu',
//     phone: '+91 98765 43214',
//     joinDate: '2021-09-05'
//   }
// ];

// const generateSampleEvents = (): Event[] => [
//   {
//     id: '1',
//     name: 'Inter-College Cricket Championship',
//     sport: 'Cricket',
//     type: 'tournament',
//     date: '2024-02-20',
//     time: '09:00',
//     venue: 'University Stadium',
//     participants: 8,
//     status: 'upcoming',
//     prizes: '₹50,000',
//     organizer: 'Sports Committee'
//   },
//   {
//     id: '2',
//     name: 'Annual Football League',
//     sport: 'Football',
//     type: 'tournament',
//     date: '2024-02-15',
//     time: '14:00',
//     venue: 'Main Ground',
//     participants: 6,
//     status: 'ongoing',
//     prizes: '₹40,000',
//     organizer: 'Sports Department'
//   },
//   {
//     id: '3',
//     name: 'Badminton Singles Championship',
//     sport: 'Badminton',
//     type: 'tournament',
//     date: '2024-02-25',
//     time: '10:00',
//     venue: 'Indoor Stadium',
//     participants: 32,
//     status: 'upcoming',
//     prizes: '₹30,000',
//     organizer: 'Sports Committee'
//   },
//   {
//     id: '4',
//     name: 'Swimming Relay Competition',
//     sport: 'Swimming',
//     type: 'match',
//     date: '2024-02-10',
//     time: '08:00',
//     venue: 'Aquatic Center',
//     participants: 24,
//     status: 'completed',
//     prizes: '₹25,000',
//     organizer: 'Aquatic Club'
//   },
//   {
//     id: '5',
//     name: 'Basketball Practice Session',
//     sport: 'Basketball',
//     type: 'practice',
//     date: '2024-02-12',
//     time: '16:00',
//     venue: 'Indoor Court',
//     participants: 15,
//     status: 'ongoing',
//     organizer: 'Coach Mehta'
//   }
// ];

// const generateSampleAchievements = (): Achievement[] => [
//   {
//     id: '1',
//     athleteId: '2',
//     title: 'State Badminton Champion',
//     event: 'State Championship 2023',
//     position: 'gold',
//     date: '2023-12-15',
//     points: 100,
//     description: 'Won the state-level singles championship'
//   },
//   {
//     id: '2',
//     athleteId: '1',
//     title: 'Best Batsman Award',
//     event: 'Inter-University Cricket',
//     position: 'gold',
//     date: '2023-11-20',
//     points: 95,
//     description: 'Highest run scorer in the tournament'
//   },
//   {
//     id: '3',
//     athleteId: '4',
//     title: 'National Swimming Meet',
//     event: 'National Aquatics 2023',
//     position: 'silver',
//     date: '2023-10-10',
//     points: 85,
//     description: 'Second place in 100m freestyle'
//   }
// ];

// const generateSampleEquipment = (): Equipment[] => [
//   {
//     id: '1',
//     name: 'Cricket Bats',
//     sport: 'Cricket',
//     quantity: 25,
//     available: 18,
//     condition: 'good',
//     location: 'Sports Room A',
//     lastMaintenance: '2024-01-15'
//   },
//   {
//     id: '2',
//     name: 'Footballs',
//     sport: 'Football',
//     quantity: 30,
//     available: 22,
//     condition: 'excellent',
//     location: 'Sports Room B',
//     lastMaintenance: '2024-01-20'
//   },
//   {
//     id: '3',
//     name: 'Badminton Rackets',
//     sport: 'Badminton',
//     quantity: 40,
//     available: 28,
//     condition: 'good',
//     location: 'Indoor Storage',
//     lastMaintenance: '2024-01-10'
//   },
//   {
//     id: '4',
//     name: 'Basketball Balls',
//     sport: 'Basketball',
//     quantity: 20,
//     available: 15,
//     condition: 'excellent',
//     location: 'Indoor Court Storage',
//     lastMaintenance: '2024-01-25'
//   }
// ];

// // Main App Component
// export default function SportsDepartmentSystem() {
//   const [activeTab, setActiveTab] = useState<'dashboard' | 'sports' | 'athletes' | 'events' | 'achievements' | 'equipment'>('dashboard');
//   const [sports] = useState<Sport[]>(generateSampleSports());
//   const [athletes] = useState<Athlete[]>(generateSampleAthletes());
//   const [events] = useState<Event[]>(generateSampleEvents());
//   const [achievements] = useState<Achievement[]>(generateSampleAchievements());
//   const [equipment] = useState<Equipment[]>(generateSampleEquipment());
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
//   const [showModal, setShowModal] = useState(false);

//   const stats: Stats = {
//     totalAthletes: athletes.length,
//     activeSports: sports.filter(s => s.status === 'active').length,
//     upcomingEvents: events.filter(e => e.status === 'upcoming').length,
//     totalAchievements: achievements.length,
//     equipmentItems: equipment.reduce((sum, eq) => sum + eq.quantity, 0),
//     averageRating: athletes.reduce((sum, a) => sum + a.rating, 0) / athletes.length
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30">
//                 <Trophy className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">
//                   Sports Department
//                 </h1>
//                 <p className="text-sm text-gray-500">University Athletic Management</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
//                 <Bell className="w-5 h-5 text-gray-600" />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>
//               <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
//                 <div className="text-right">
//                   <p className="text-sm font-medium text-gray-900">Academic Year</p>
//                   <p className="text-xs text-gray-500">2023-24</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Navigation */}
//       <nav className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex gap-1 overflow-x-auto">
//             {[
//               { id: 'dashboard' as const, label: 'Dashboard', icon: BarChart3 },
//               { id: 'sports' as const, label: 'Sports', icon: Trophy },
//               { id: 'athletes' as const, label: 'Athletes', icon: Users },
//               { id: 'events' as const, label: 'Events', icon: Calendar },
//               { id: 'achievements' as const, label: 'Achievements', icon: Award },
//               { id: 'equipment' as const, label: 'Equipment', icon: Clipboard }
//             ].map(tab => {
//               const IconComp = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`px-6 py-4 font-medium transition-all flex items-center gap-2 relative whitespace-nowrap ${
//                     activeTab === tab.id
//                       ? 'text-orange-600'
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   <IconComp className="w-4 h-4" />
//                   {tab.label}
//                   {activeTab === tab.id && (
//                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600" />
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {activeTab === 'dashboard' && (
//           <Dashboard stats={stats} sports={sports} athletes={athletes} events={events} achievements={achievements} />
//         )}

//         {activeTab === 'sports' && (
//           <SportsTab sports={sports} />
//         )}

//         {activeTab === 'athletes' && (
//           <AthletesTab 
//             athletes={athletes} 
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             setSelectedAthlete={setSelectedAthlete}
//             setShowModal={setShowModal}
//           />
//         )}

//         {activeTab === 'events' && (
//           <EventsTab events={events} />
//         )}

//         {activeTab === 'achievements' && (
//           <AchievementsTab achievements={achievements} athletes={athletes} />
//         )}

//         {activeTab === 'equipment' && (
//           <EquipmentTab equipment={equipment} />
//         )}
//       </main>

//       {/* Modal */}
//       {showModal && selectedAthlete && (
//         <Modal athlete={selectedAthlete} onClose={() => setShowModal(false)} achievements={achievements} />
//       )}
//     </div>
//   );
// }

// // Dashboard Component
// interface DashboardProps {
//   stats: Stats;
//   sports: Sport[];
//   athletes: Athlete[];
//   events: Event[];
//   achievements: Achievement[];
// }

// function Dashboard({ stats, sports, athletes, events, achievements }: DashboardProps) {
//   const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 5);
//   const topAthletes = [...athletes].sort((a, b) => b.rating - a.rating).slice(0, 5);

//   return (
//     <div className="space-y-6">
//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
//               <Users className="w-6 h-6 text-orange-600" />
//             </div>
//             <TrendingUp className="w-5 h-5 text-green-500" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalAthletes}</h3>
//           <p className="text-sm text-gray-600 mb-2">Total Athletes</p>
//           <p className="text-xs text-gray-500">Active enrollment</p>
//         </div>

//         <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//               <Trophy className="w-6 h-6 text-blue-600" />
//             </div>
//             <TrendingUp className="w-5 h-5 text-green-500" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.activeSports}</h3>
//           <p className="text-sm text-gray-600 mb-2">Active Sports</p>
//           <p className="text-xs text-gray-500">Across categories</p>
//         </div>

//         <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
//               <Calendar className="w-6 h-6 text-purple-600" />
//             </div>
//             <TrendingUp className="w-5 h-5 text-green-500" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.upcomingEvents}</h3>
//           <p className="text-sm text-gray-600 mb-2">Upcoming Events</p>
//           <p className="text-xs text-gray-500">This month</p>
//         </div>

//         <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
//               <Award className="w-6 h-6 text-amber-600" />
//             </div>
//             <TrendingUp className="w-5 h-5 text-green-500" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalAchievements}</h3>
//           <p className="text-sm text-gray-600 mb-2">Achievements</p>
//           <p className="text-xs text-gray-500">Total wins</p>
//         </div>
//       </div>

//       {/* Two Column Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Upcoming Events */}
//         <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                 <Calendar className="w-5 h-5 text-orange-600" />
//                 Upcoming Events
//               </h3>
//               <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
//                 View All
//               </button>
//             </div>
//           </div>
//           <div className="p-6 space-y-4">
//             {upcomingEvents.map(event => (
//               <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <h4 className="font-semibold text-gray-900">{event.name}</h4>
//                     <span className={`px-2 py-0.5 rounded text-xs font-medium ${
//                       event.type === 'tournament' ? 'bg-orange-100 text-orange-700' :
//                       event.type === 'match' ? 'bg-blue-100 text-blue-700' :
//                       event.type === 'practice' ? 'bg-green-100 text-green-700' :
//                       'bg-purple-100 text-purple-700'
//                     }`}>
//                       {event.type}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500">
//                     {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} • {event.time} • {event.venue}
//                   </p>
//                 </div>
//                 <div className="text-right ml-4">
//                   <p className="text-sm font-bold text-orange-600">{event.participants}</p>
//                   <p className="text-xs text-gray-500">Players</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Top Athletes */}
//         <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                 <Star className="w-5 h-5 text-amber-600" />
//                 Top Athletes
//               </h3>
//               <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
//                 View All
//               </button>
//             </div>
//           </div>
//           <div className="p-6 space-y-4">
//             {topAthletes.map((athlete, index) => (
//               <div key={athlete.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                     {index + 1}
//                   </div>
//                   <div className="text-3xl">{athlete.photo}</div>
//                   <div>
//                     <p className="font-semibold text-gray-900">{athlete.name}</p>
//                     <p className="text-xs text-gray-500">{athlete.sport} • {athlete.position}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="flex items-center gap-1 text-amber-500">
//                     <Star className="w-4 h-4 fill-current" />
//                     <span className="font-bold">{athlete.rating}</span>
//                   </div>
//                   <p className="text-xs text-gray-500">{athlete.achievements} wins</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <button className="bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-xl p-6 hover:shadow-lg transition-all text-left">
//           <Calendar className="w-8 h-8 mb-3 opacity-80" />
//           <h3 className="text-lg font-bold mb-1">Schedule Event</h3>
//           <p className="text-sm opacity-90">Create new tournament</p>
//         </button>

//         <button className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-6 hover:shadow-lg transition-all text-left">
//           <UserPlus className="w-8 h-8 mb-3 opacity-80" />
//           <h3 className="text-lg font-bold mb-1">Add Athlete</h3>
//           <p className="text-sm opacity-90">Register new player</p>
//         </button>

//         <button className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl p-6 hover:shadow-lg transition-all text-left">
//           <Download className="w-8 h-8 mb-3 opacity-80" />
//           <h3 className="text-lg font-bold mb-1">Export Reports</h3>
//           <p className="text-sm opacity-90">Download analytics</p>
//         </button>
//       </div>

//       {/* Sports Overview */}
//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//           <Trophy className="w-5 h-5 text-orange-600" />
//           Sports Overview
//         </h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {sports.slice(0, 8).map(sport => (
//             <div key={sport.id} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors cursor-pointer">
//               <div className="text-3xl mb-2">{sport.icon}</div>
//               <p className="font-semibold text-gray-900 text-sm">{sport.name}</p>
//               <p className="text-xs text-gray-500">{sport.players} players</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Sports Tab
// interface SportsTabProps {
//   sports: Sport[];
// }

// function SportsTab({ sports }: SportsTabProps) {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-900">Sports Management</h2>
//         <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 font-medium">
//           <Plus className="w-4 h-4" />
//           Add Sport
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {sports.map(sport => (
//           <div key={sport.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <div className="text-4xl">{sport.icon}</div>
//                 <div>
//                   <h3 className="font-bold text-gray-900">{sport.name}</h3>
//                   <p className="text-sm text-gray-500 capitalize">{sport.category}</p>
//                 </div>
//               </div>
//               <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
//                 sport.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
//               }`}>
//                 {sport.status}
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-xs text-gray-500 mb-1">Players</p>
//                 <p className="text-lg font-bold text-gray-900">{sport.players}</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-xs text-gray-500 mb-1">Teams</p>
//                 <p className="text-lg font-bold text-gray-900">{sport.teams}</p>
//               </div>
//             </div>

//             <div className="flex items-center justify-between text-sm">
//               <span className="text-gray-500">Season:</span>
//               <span className="font-semibold text-gray-900">{sport.season}</span>
//             </div>

//             <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
//               <button className="flex-1 px-3 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
//                 <Eye className="w-4 h-4" />
//                 View
//               </button>
//               <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
//                 <Edit2 className="w-4 h-4" />
//                 Edit
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Athletes Tab
// interface AthletesTabProps {
//   athletes: Athlete[];
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
//   setSelectedAthlete: (athlete: Athlete) => void;
//   setShowModal: (show: boolean) => void;
// }

// function AthletesTab({ athletes, searchTerm, setSearchTerm, setSelectedAthlete, setShowModal }: AthletesTabProps) {
//   const filteredAthletes = athletes.filter(athlete =>
//     athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     athlete.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     athlete.sport.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-900">Athletes Directory</h2>
//         <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 font-medium">
//           <Plus className="w-4 h-4" />
//           Add Athlete
//         </button>
//       </div>

//       <div className="relative">
//         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search athletes by name, roll number, or sport..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredAthletes.map(athlete => (
//           <div key={athlete.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <div className="text-4xl">{athlete.photo}</div>
//                 <div>
//                   <h3 className="font-bold text-gray-900">{athlete.name}</h3>
//                   <p className="text-sm text-gray-500">{athlete.rollNumber}</p>
//                 </div>
//               </div>
//               <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
//                 athlete.status === 'active' ? 'bg-green-100 text-green-700' :
//                 athlete.status === 'injured' ? 'bg-red-100 text-red-700' :
//                 'bg-gray-100 text-gray-700'
//               }`}>
//                 {athlete.status}
//               </div>
//             </div>

//             <div className="space-y-2 mb-4 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Sport</span>
//                 <span className="font-semibold text-gray-900">{athlete.sport}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Position</span>
//                 <span className="font-semibold text-gray-900">{athlete.position}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Level</span>
//                 <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${
//                   athlete.level === 'professional' ? 'bg-purple-100 text-purple-700' :
//                   athlete.level === 'advanced' ? 'bg-blue-100 text-blue-700' :
//                   athlete.level === 'intermediate' ? 'bg-green-100 text-green-700' :
//                   'bg-gray-100 text-gray-700'
//                 }`}>
//                   {athlete.level}
//                 </span>
//               </div>
//             </div>

//             <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
//               <div className="flex items-center gap-1 text-amber-500">
//                 <Star className="w-4 h-4 fill-current" />
//                 <span className="font-bold">{athlete.rating}</span>
//               </div>
//               <div className="text-sm text-gray-600">
//                 <Award className="w-4 h-4 inline mr-1 text-amber-600" />
//                 {athlete.achievements} wins
//               </div>
//             </div>

//             <button
//               onClick={() => {
//                 setSelectedAthlete(athlete);
//                 setShowModal(true);
//               }}
//               className="w-full px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium flex items-center justify-center gap-2"
//             >
//               <Eye className="w-4 h-4" />
//               View Profile
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Events Tab
// interface EventsTabProps {
//   events: Event[];
// }

// function EventsTab({ events }: EventsTabProps) {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-900">Events & Tournaments</h2>
//         <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 font-medium">
//           <Plus className="w-4 h-4" />
//           Create Event
//         </button>
//       </div>

//       <div className="grid grid-cols-1 gap-4">
//         {events.map(event => (
//           <div key={event.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex-1">
//                 <div className="flex items-center gap-3 mb-2">
//                   <h3 className="text-xl font-bold text-gray-900">{event.name}</h3>
//                   <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
//                     event.type === 'tournament' ? 'bg-orange-100 text-orange-700' :
//                     event.type === 'match' ? 'bg-blue-100 text-blue-700' :
//                     event.type === 'practice' ? 'bg-green-100 text-green-700' :
//                     'bg-purple-100 text-purple-700'
//                   }`}>
//                     {event.type}
//                   </span>
//                   <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
//                     event.status === 'upcoming' ? 'bg-cyan-100 text-cyan-700' :
//                     event.status === 'ongoing' ? 'bg-amber-100 text-amber-700' :
//                     event.status === 'completed' ? 'bg-green-100 text-green-700' :
//                     'bg-red-100 text-red-700'
//                   }`}>
//                     {event.status}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-500">{event.sport}</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-xs text-gray-500 mb-1">Date</p>
//                 <p className="text-sm font-semibold text-gray-900">{new Date(event.date).toLocaleDateString('en-IN')}</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-xs text-gray-500 mb-1">Time</p>
//                 <p className="text-sm font-semibold text-gray-900">{event.time}</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-xs text-gray-500 mb-1">Venue</p>
//                 <p className="text-sm font-semibold text-gray-900">{event.venue}</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-xs text-gray-500 mb-1">Participants</p>
//                 <p className="text-sm font-semibold text-orange-600">{event.participants}</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-xs text-gray-500 mb-1">Prizes</p>
//                 <p className="text-sm font-semibold text-gray-900">{event.prizes || 'N/A'}</p>
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <button className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium flex items-center gap-2">
//                 <Eye className="w-4 h-4" />
//                 View Details
//               </button>
//               <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium flex items-center gap-2">
//                 <Edit2 className="w-4 h-4" />
//                 Edit
//               </button>
//               <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center gap-2">
//                 <Users className="w-4 h-4" />
//                 Participants
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Achievements Tab
// interface AchievementsTabProps {
//   achievements: Achievement[];
//   athletes: Athlete[];
// }

// function AchievementsTab({ achievements, athletes }: AchievementsTabProps) {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-900">Achievements & Awards</h2>
//         <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 font-medium">
//           <Plus className="w-4 h-4" />
//           Add Achievement
//         </button>
//       </div>

//       <div className="grid grid-cols-1 gap-4">
//         {achievements.map(achievement => {
//           const athlete = athletes.find(a => a.id === achievement.athleteId);
//           return (
//             <div key={achievement.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
//               <div className="flex items-start gap-4">
//                 <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
//                   achievement.position === 'gold' ? 'bg-amber-100' :
//                   achievement.position === 'silver' ? 'bg-gray-200' :
//                   achievement.position === 'bronze' ? 'bg-orange-100' :
//                   'bg-blue-100'
//                 }`}>
//                   <Medal className={`w-8 h-8 ${
//                     achievement.position === 'gold' ? 'text-amber-600' :
//                     achievement.position === 'silver' ? 'text-gray-600' :
//                     achievement.position === 'bronze' ? 'text-orange-600' :
//                     'text-blue-600'
//                   }`} />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-start justify-between mb-2">
//                     <div>
//                       <h3 className="text-lg font-bold text-gray-900">{achievement.title}</h3>
//                       <p className="text-sm text-gray-500">{achievement.event}</p>
//                     </div>
//                     <span className={`px-3 py-1 rounded-lg text-xs font-medium uppercase ${
//                       achievement.position === 'gold' ? 'bg-amber-100 text-amber-700' :
//                       achievement.position === 'silver' ? 'bg-gray-200 text-gray-700' :
//                       achievement.position === 'bronze' ? 'bg-orange-100 text-orange-700' :
//                       'bg-blue-100 text-blue-700'
//                     }`}>
//                       {achievement.position}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
//                   <div className="flex items-center gap-6 text-sm">
//                     <div className="flex items-center gap-2">
//                       <div className="text-2xl">{athlete?.photo}</div>
//                       <span className="font-semibold text-gray-900">{athlete?.name}</span>
//                     </div>
//                     <div className="text-gray-500">
//                       <Calendar className="w-4 h-4 inline mr-1" />
//                       {new Date(achievement.date).toLocaleDateString('en-IN')}
//                     </div>
//                     <div className="text-orange-600 font-semibold">
//                       {achievement.points} points
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // Equipment Tab
// interface EquipmentTabProps {
//   equipment: Equipment[];
// }

// function EquipmentTab({ equipment }: EquipmentTabProps) {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-900">Equipment Management</h2>
//         <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 font-medium">
//           <Plus className="w-4 h-4" />
//           Add Equipment
//         </button>
//       </div>

//       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Equipment</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sport</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Qty</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Available</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Condition</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Maintenance</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {equipment.map(item => (
//               <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
//                 <td className="px-6 py-4">
//                   <p className="font-semibold text-gray-900">{item.name}</p>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-700">{item.sport}</td>
//                 <td className="px-6 py-4">
//                   <p className="text-sm font-semibold text-gray-900">{item.quantity}</p>
//                 </td>
//                 <td className="px-6 py-4">
//                   <p className="text-sm font-semibold text-green-600">{item.available}</p>
//                 </td>
//                 <td className="px-6 py-4">
//                   <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
//                     item.condition === 'excellent' ? 'bg-green-100 text-green-700' :
//                     item.condition === 'good' ? 'bg-blue-100 text-blue-700' :
//                     item.condition === 'fair' ? 'bg-amber-100 text-amber-700' :
//                     'bg-red-100 text-red-700'
//                   }`}>
//                     {item.condition}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-700">{item.location}</td>
//                 <td className="px-6 py-4 text-sm text-gray-700">
//                   {new Date(item.lastMaintenance).toLocaleDateString('en-IN')}
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex gap-1">
//                     <button className="p-2 hover:bg-orange-50 rounded text-orange-600 transition-colors" title="View">
//                       <Eye className="w-4 h-4" />
//                     </button>
//                     <button className="p-2 hover:bg-blue-50 rounded text-blue-600 transition-colors" title="Edit">
//                       <Edit2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // Modal Component
// interface ModalProps {
//   athlete: Athlete;
//   onClose: () => void;
//   achievements: Achievement[];
// }

// function Modal({ athlete, onClose, achievements }: ModalProps) {
//   const athleteAchievements = achievements.filter(a => a.athleteId === athlete.id);

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
//       <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
//         <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
//           <h2 className="text-xl font-bold text-gray-900">Athlete Profile</h2>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//             <XCircle className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="space-y-6">
//             {/* Header */}
//             <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
//               <div className="text-6xl">{athlete.photo}</div>
//               <div className="flex-1">
//                 <h3 className="text-2xl font-bold text-gray-900">{athlete.name}</h3>
//                 <p className="text-gray-500">{athlete.rollNumber} • {athlete.department}</p>
//                 <div className="flex items-center gap-4 mt-2">
//                   <div className="flex items-center gap-1 text-amber-500">
//                     <Star className="w-5 h-5 fill-current" />
//                     <span className="font-bold text-lg">{athlete.rating}</span>
//                   </div>
//                   <span className={`px-3 py-1 rounded-lg text-xs font-medium capitalize ${
//                     athlete.level === 'professional' ? 'bg-purple-100 text-purple-700' :
//                     athlete.level === 'advanced' ? 'bg-blue-100 text-blue-700' :
//                     athlete.level === 'intermediate' ? 'bg-green-100 text-green-700' :
//                     'bg-gray-100 text-gray-700'
//                   }`}>
//                     {athlete.level}
//                   </span>
//                   <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
//                     athlete.status === 'active' ? 'bg-green-100 text-green-700' :
//                     athlete.status === 'injured' ? 'bg-red-100 text-red-700' :
//                     'bg-gray-100 text-gray-700'
//                   }`}>
//                     {athlete.status}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Details Grid */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-gray-50 p-4 rounded-xl">
//                 <p className="text-sm text-gray-500 mb-1">Sport</p>
//                 <p className="font-semibold text-gray-900">{athlete.sport}</p>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-xl">
//                 <p className="text-sm text-gray-500 mb-1">Position</p>
//                 <p className="font-semibold text-gray-900">{athlete.position}</p>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-xl">
//                 <p className="text-sm text-gray-500 mb-1">Email</p>
//                 <p className="font-semibold text-gray-900 text-sm">{athlete.email}</p>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-xl">
//                 <p className="text-sm text-gray-500 mb-1">Phone</p>
//                 <p className="font-semibold text-gray-900">{athlete.phone}</p>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-xl">
//                 <p className="text-sm text-gray-500 mb-1">Join Date</p>
//                 <p className="font-semibold text-gray-900">
//                   {new Date(athlete.joinDate).toLocaleDateString('en-IN')}
//                 </p>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-xl">
//                 <p className="text-sm text-gray-500 mb-1">Total Achievements</p>
//                 <p className="font-semibold text-orange-600 text-lg">{athlete.achievements}</p>
//               </div>
//             </div>

//             {/* Achievements */}
//             {athleteAchievements.length > 0 && (
//               <div>
//                 <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <Award className="w-5 h-5 text-amber-600" />
//                   Recent Achievements
//                 </h4>
//                 <div className="space-y-3">
//                   {athleteAchievements.map(achievement => (
//                     <div key={achievement.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
//                       <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                         achievement.position === 'gold' ? 'bg-amber-100' :
//                         achievement.position === 'silver' ? 'bg-gray-200' :
//                         achievement.position === 'bronze' ? 'bg-orange-100' :
//                         'bg-blue-100'
//                       }`}>
//                         <Medal className={`w-5 h-5 ${
//                           achievement.position === 'gold' ? 'text-amber-600' :
//                           achievement.position === 'silver' ? 'text-gray-600' :
//                           achievement.position === 'bronze' ? 'text-orange-600' :
//                           'text-blue-600'
//                         }`} />
//                       </div>
//                       <div className="flex-1">
//                         <p className="font-semibold text-gray-900">{achievement.title}</p>
//                         <p className="text-xs text-gray-500">{achievement.event}</p>
//                       </div>
//                       <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${
//                         achievement.position === 'gold' ? 'bg-amber-100 text-amber-700' :
//                         achievement.position === 'silver' ? 'bg-gray-200 text-gray-700' :
//                         achievement.position === 'bronze' ? 'bg-orange-100 text-orange-700' :
//                         'bg-blue-100 text-blue-700'
//                       }`}>
//                         {achievement.position}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { 
  Calendar, 
  Trophy, 
  TrendingUp, 
  Users, 
  UserPlus, 
  Download,
  Star,
  ChevronRight
} from 'lucide-react';

// Types
interface Athlete {
  id: number;
  name: string;
  sport: string;
  role: string;
  rating: number;
  wins: number;
  avatar: string;
}

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  venue: string;
  type: 'tournament' | 'championship' | 'match';
  players: number;
}

interface Sport {
  id: string;
  name: string;
  icon: string;
  players: number;
}

interface StatCard {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  trend?: boolean;
}

// Mock Data
const stats: StatCard[] = [
  {
    title: 'Total Athletes',
    value: 5,
    subtitle: 'Active enrollment',
    icon: <Users className="w-5 h-5" />,
    trend: true,
  },
  {
    title: 'Active Sports',
    value: 8,
    subtitle: 'Across categories',
    icon: <Trophy className="w-5 h-5" />,
    trend: true,
  },
  {
    title: 'Upcoming Events',
    value: 2,
    subtitle: 'This month',
    icon: <Calendar className="w-5 h-5" />,
    trend: true,
  },
  {
    title: 'Achievements',
    value: 3,
    subtitle: 'Total wins',
    icon: <Star className="w-5 h-5" />,
    trend: true,
  },
];

const topAthletes: Athlete[] = [
  {
    id: 1,
    name: 'Priya Singh',
    sport: 'Badminton',
    role: 'Singles Player',
    rating: 4.9,
    wins: 18,
    avatar: '👩',
  },
  {
    id: 2,
    name: 'Rahul Sharma',
    sport: 'Cricket',
    role: 'Batsman',
    rating: 4.8,
    wins: 12,
    avatar: '🧑',
  },
  {
    id: 3,
    name: 'Sneha Reddy',
    sport: 'Swimming',
    role: 'Freestyle',
    rating: 4.7,
    wins: 15,
    avatar: '👩',
  },
  {
    id: 4,
    name: 'Amit Patel',
    sport: 'Football',
    role: 'Forward',
    rating: 4.6,
    wins: 10,
    avatar: '🧑',
  },
  {
    id: 5,
    name: 'Vikram Kumar',
    sport: 'Basketball',
    role: 'Point Guard',
    rating: 4.5,
    wins: 8,
    avatar: '🧑',
  },
];

const upcomingEvents: Event[] = [
  {
    id: 1,
    name: 'Inter-College Cricket Championship',
    date: '20 Feb',
    time: '09:00',
    venue: 'University Stadium',
    type: 'tournament',
    players: 8,
  },
  {
    id: 2,
    name: 'Badminton Singles Championship',
    date: '25 Feb',
    time: '10:00',
    venue: 'Indoor Stadium',
    type: 'tournament',
    players: 32,
  },
];

const sports: Sport[] = [
  { id: 'cricket', name: 'Cricket', icon: '🏏', players: 45 },
  { id: 'football', name: 'Football', icon: '⚽', players: 38 },
  { id: 'basketball', name: 'Basketball', icon: '🏀', players: 28 },
  { id: 'badminton', name: 'Badminton', icon: '🏸', players: 24 },
  { id: 'swimming', name: 'Swimming', icon: '🏊', players: 22 },
  { id: 'tabletennis', name: 'Table Tennis', icon: '🏓', players: 18 },
  { id: 'volleyball', name: 'Volleyball', icon: '🏐', players: 32 },
  { id: 'chess', name: 'Chess', icon: '♟️', players: 16 },
];

const SportsDashboard: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredAthlete, setHoveredAthlete] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-blue-50/40 p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-orange-800 to-blue-900 bg-clip-text text-transparent tracking-tight">
              Sports Dashboard
            </h1>
            <p className="text-slate-600 mt-2 text-lg">
              Manage athletes, events, and achievements
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-xl hover:border-orange-200 transition-all duration-300 group overflow-hidden"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background gradient on hover */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-300 ${
                  index === 0 ? 'from-orange-500/5 to-transparent' :
                  index === 1 ? 'from-blue-500/5 to-transparent' :
                  index === 2 ? 'from-purple-500/5 to-transparent' :
                  'from-amber-500/5 to-transparent'
                } ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}
              />
              
              <div className="relative">
                <div className={`inline-flex p-3 rounded-xl mb-4 ${
                  index === 0 ? 'bg-orange-100 text-orange-600' :
                  index === 1 ? 'bg-blue-100 text-blue-600' :
                  index === 2 ? 'bg-purple-100 text-purple-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  {stat.icon}
                </div>
                
                {stat.trend && (
                  <TrendingUp className="absolute right-0 top-0 w-4 h-4 text-green-500" />
                )}
                
                <h3 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">
                  {stat.value}
                </h3>
                
                <p className="text-sm font-semibold text-slate-700 mb-1">
                  {stat.title}
                </p>
                
                <p className="text-xs text-slate-500">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Upcoming Events</h2>
              </div>
              <button className="text-orange-600 hover:text-orange-700 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="divide-y divide-slate-100">
              {upcomingEvents.map((event) => (
                <div 
                  key={event.id}
                  className="p-6 hover:bg-slate-50/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                          {event.name}
                        </h3>
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                          {event.type}
                        </span>
                      </div>
                      
                      <div className="text-sm text-slate-600 space-y-1">
                        <p>{event.date} • {event.time} • {event.venue}</p>
                      </div>
                    </div>
                    
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-orange-600">
                        {event.players}
                      </div>
                      <div className="text-xs text-slate-500">
                        Players
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Athletes */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Top Athletes</h2>
              </div>
              <button className="text-orange-600 hover:text-orange-700 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="divide-y divide-slate-100">
              {topAthletes.map((athlete, index) => (
                <div 
                  key={athlete.id}
                  className="p-6 hover:bg-slate-50/50 transition-all cursor-pointer group"
                  onMouseEnter={() => setHoveredAthlete(athlete.id)}
                  onMouseLeave={() => setHoveredAthlete(null)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                      index === 1 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                      index === 2 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                      index === 3 ? 'bg-gradient-to-br from-amber-500 to-amber-600' :
                      'bg-gradient-to-br from-slate-500 to-slate-600'
                    }`}>
                      {index + 1}
                    </div>
                    
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center text-2xl transform group-hover:scale-110 transition-transform">
                        {athlete.avatar}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                          {athlete.name}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {athlete.sport} • {athlete.role}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-amber-500 font-semibold mb-1">
                        <Star className="w-4 h-4 fill-current" />
                        {athlete.rating}
                      </div>
                      <div className="text-xs text-slate-500">
                        {athlete.wins} wins
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-5">
          <button className="group relative bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <Calendar className="w-8 h-8 mb-3" />
              <h3 className="text-xl font-bold mb-1">Schedule Event</h3>
              <p className="text-orange-100 text-sm">Create new tournament</p>
            </div>
          </button>

          <button className="group relative bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <UserPlus className="w-8 h-8 mb-3" />
              <h3 className="text-xl font-bold mb-1">Add Athlete</h3>
              <p className="text-blue-100 text-sm">Register new player</p>
            </div>
          </button>

          <button className="group relative bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <Download className="w-8 h-8 mb-3" />
              <h3 className="text-xl font-bold mb-1">Export Reports</h3>
              <p className="text-purple-100 text-sm">Download analytics</p>
            </div>
          </button>
        </div>

        {/* Sports Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Trophy className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Sports Overview</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sports.map((sport) => (
                <div
                  key={sport.id}
                  className="group bg-slate-50 hover:bg-gradient-to-br hover:from-orange-50 hover:to-blue-50 rounded-xl p-6 text-center transition-all duration-300 cursor-pointer border border-transparent hover:border-orange-200 hover:shadow-md"
                >
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                    {sport.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                    {sport.name}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {sport.players} players
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsDashboard;