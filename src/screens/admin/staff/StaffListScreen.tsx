// // import React from 'react';

// // interface StaffMember {
// // 	id: string;
// // 	name: string;
// // 	position: string;
// // 	department: string;
// // 	contact: string;
// // 	status: string;
// // }

// // const nonTeachingStaff: StaffMember[] = [
// // 	{
// // 		id: 'NTS-001',
// // 		name: 'John Doe',
// // 		position: 'Accountant',
// // 		department: 'Finance',
// // 		contact: '+1 234-567-8901',
// // 		status: 'Active',
// // 	},
// // 	{
// // 		id: 'NTS-002',
// // 		name: 'Jane Smith',
// // 		position: 'Librarian',
// // 		department: 'Library',
// // 		contact: '+1 234-567-8902',
// // 		status: 'Active',
// // 	},
// // 	{
// // 		id: 'NTS-003',
// // 		name: 'Robert Brown',
// // 		position: 'Receptionist',
// // 		department: 'Administration',
// // 		contact: '+1 234-567-8903',
// // 		status: 'On Leave',
// // 	},
// // ];

// // const StaffListScreen: React.FC = () => {
// // 	return (
// // 		<div className="p-6">
// // 			<h2 className="text-2xl font-bold mb-4">Non-Teaching Staff</h2>
// // 			<div className="overflow-x-auto">
// // 				<table className="min-w-full bg-white rounded shadow">
// // 					<thead>
// // 						<tr>
// // 							<th className="py-2 px-4 border-b">ID</th>
// // 							<th className="py-2 px-4 border-b">Name</th>
// // 							<th className="py-2 px-4 border-b">Position</th>
// // 							<th className="py-2 px-4 border-b">Department</th>
// // 							<th className="py-2 px-4 border-b">Contact</th>
// // 							<th className="py-2 px-4 border-b">Status</th>
// // 						</tr>
// // 					</thead>
// // 					<tbody>
// // 						{nonTeachingStaff.map((staff) => (
// // 							<tr key={staff.id} className="hover:bg-gray-100">
// // 								<td className="py-2 px-4 border-b">{staff.id}</td>
// // 								<td className="py-2 px-4 border-b">{staff.name}</td>
// // 								<td className="py-2 px-4 border-b">{staff.position}</td>
// // 								<td className="py-2 px-4 border-b">{staff.department}</td>
// // 								<td className="py-2 px-4 border-b">{staff.contact}</td>
// // 								<td className="py-2 px-4 border-b">{staff.status}</td>
// // 							</tr>
// // 						))}
// // 					</tbody>
// // 				</table>
// // 			</div>
// // 		</div>
// // 	);
// // };

// // export default StaffListScreen;



// import React, { useState, useMemo } from 'react';
// import { Search, Filter, Download, Plus, Eye, Edit2, Trash2, MoreVertical, X, Upload, ChevronDown, Users, UserCheck, Briefcase, Clock, Calendar, Phone, Mail, MapPin, Award, FileText, DollarSign } from 'lucide-react';

// interface StaffMember {
//   id: string;
//   name: string;
//   email: string;
//   avatar: string;
//   designation: string;
//   department: string;
//   phone: string;
//   joinDate: string;
//   salary: string;
//   status: string;
//   employmentType: string;
//   address: string;
//   emergencyContact: string;
//   qualification: string;
//   experience: string;
//   shift: string;
// }

// const NonTeachingStaffManagement = () => {
//   const [staff, setStaff] = useState<StaffMember[]>([
//     {
//       id: 'NTS-2024-001',
//       name: 'John Anderson',
//       email: 'john.anderson@school.com',
//       avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
//       designation: 'Administrative Assistant',
//       department: 'Administration',
//       phone: '+1 234-567-8901',
//       joinDate: '2020-01-15',
//       salary: '$45,000',
//       status: 'Active',
//       employmentType: 'Full-time',
//       address: '123 Oak Street, Springfield',
//       emergencyContact: '+1 234-567-8911',
//       qualification: 'Bachelor in Business Administration',
//       experience: '8 years',
//       shift: 'Morning'
//     },
//     {
//       id: 'NTS-2024-002',
//       name: 'Sarah Mitchell',
//       email: 'sarah.mitchell@school.com',
//       avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
//       designation: 'Librarian',
//       department: 'Library',
//       phone: '+1 234-567-8902',
//       joinDate: '2019-08-20',
//       salary: '$42,000',
//       status: 'Active',
//       employmentType: 'Full-time',
//       address: '456 Pine Avenue, Springfield',
//       emergencyContact: '+1 234-567-8912',
//       qualification: 'Master in Library Science',
//       experience: '10 years',
//       shift: 'Morning'
//     },
//     {
//       id: 'NTS-2024-003',
//       name: 'Robert Chen',
//       email: 'robert.chen@school.com',
//       avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
//       designation: 'Lab Technician',
//       department: 'Science Lab',
//       phone: '+1 234-567-8903',
//       joinDate: '2021-03-10',
//       salary: '$38,000',
//       status: 'Active',
//       employmentType: 'Full-time',
//       address: '789 Maple Drive, Springfield',
//       emergencyContact: '+1 234-567-8913',
//       qualification: 'Bachelor in Chemistry',
//       experience: '5 years',
//       shift: 'Morning'
//     },
//     {
//       id: 'NTS-2024-004',
//       name: 'Maria Garcia',
//       email: 'maria.garcia@school.com',
//       avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
//       designation: 'Accountant',
//       department: 'Finance',
//       phone: '+1 234-567-8904',
//       joinDate: '2018-06-15',
//       salary: '$52,000',
//       status: 'Active',
//       employmentType: 'Full-time',
//       address: '321 Elm Street, Springfield',
//       emergencyContact: '+1 234-567-8914',
//       qualification: 'MBA in Finance',
//       experience: '12 years',
//       shift: 'Morning'
//     },
//     {
//       id: 'NTS-2024-005',
//       name: 'David Wilson',
//       email: 'david.wilson@school.com',
//       avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
//       designation: 'IT Support Specialist',
//       department: 'IT Department',
//       phone: '+1 234-567-8905',
//       joinDate: '2022-01-20',
//       salary: '$48,000',
//       status: 'On Leave',
//       employmentType: 'Full-time',
//       address: '654 Birch Lane, Springfield',
//       emergencyContact: '+1 234-567-8915',
//       qualification: 'Bachelor in Computer Science',
//       experience: '6 years',
//       shift: 'Morning'
//     },
//     {
//       id: 'NTS-2024-006',
//       name: 'Lisa Thompson',
//       email: 'lisa.thompson@school.com',
//       avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
//       designation: 'Receptionist',
//       department: 'Front Desk',
//       phone: '+1 234-567-8906',
//       joinDate: '2023-04-01',
//       salary: '$35,000',
//       status: 'Active',
//       employmentType: 'Full-time',
//       address: '987 Cedar Court, Springfield',
//       emergencyContact: '+1 234-567-8916',
//       qualification: 'High School Diploma',
//       experience: '3 years',
//       shift: 'Morning'
//     },
//     {
//       id: 'NTS-2024-007',
//       name: 'James Brown',
//       email: 'james.brown@school.com',
//       avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
//       designation: 'Security Officer',
//       department: 'Security',
//       phone: '+1 234-567-8907',
//       joinDate: '2020-09-15',
//       salary: '$36,000',
//       status: 'Active',
//       employmentType: 'Full-time',
//       address: '147 Walnut Street, Springfield',
//       emergencyContact: '+1 234-567-8917',
//       qualification: 'Security Certification',
//       experience: '7 years',
//       shift: 'Evening'
//     },
//     {
//       id: 'NTS-2024-008',
//       name: 'Patricia Davis',
//       email: 'patricia.davis@school.com',
//       avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia',
//       designation: 'Nurse',
//       department: 'Health Services',
//       phone: '+1 234-567-8908',
//       joinDate: '2019-11-10',
//       salary: '$50,000',
//       status: 'Active',
//       employmentType: 'Full-time',
//       address: '258 Spruce Avenue, Springfield',
//       emergencyContact: '+1 234-567-8918',
//       qualification: 'Bachelor of Nursing',
//       experience: '9 years',
//       shift: 'Morning'
//     }
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
//   const [selectedStatus, setSelectedStatus] = useState('All Status');
//   const [selectedEmploymentType, setSelectedEmploymentType] = useState('All Types');
//   const [viewMode, setViewMode] = useState('grid');
//   const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
//   const [showFilters, setShowFilters] = useState(false);
//   const [showStaffModal, setShowStaffModal] = useState(false);
//   const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
//   const [currentStaff, setCurrentStaff] = useState<StaffMember | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   // Stats calculation
//   const stats = useMemo(() => ({
//     total: staff.length,
//     active: staff.filter(s => s.status === 'Active').length,
//     onLeave: staff.filter(s => s.status === 'On Leave').length,
//     departments: Array.from(new Set(staff.map(s => s.department))).length
//   }), [staff]);

//   // Filter and search logic
//   const filteredStaff = useMemo(() => {
//     return staff.filter(member => {
//       const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           member.designation.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesDepartment = selectedDepartment === 'All Departments' || member.department === selectedDepartment;
//       const matchesStatus = selectedStatus === 'All Status' || member.status === selectedStatus;
//       const matchesType = selectedEmploymentType === 'All Types' || member.employmentType === selectedEmploymentType;
//       return matchesSearch && matchesDepartment && matchesStatus && matchesType;
//     });
//   }, [staff, searchTerm, selectedDepartment, selectedStatus, selectedEmploymentType]);

//   // Pagination
//   const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
//   const paginatedStaff = filteredStaff.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.checked) {
//       setSelectedStaff(paginatedStaff.map(s => s.id));
//     } else {
//       setSelectedStaff([]);
//     }
//   };

//   const handleSelectStaff = (id: string) => {
//     setSelectedStaff(prev =>
//       prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
//     );
//   };

//   const handleAddStaff = () => {
//     setModalMode('add');
//     setCurrentStaff(null);
//     setShowStaffModal(true);
//   };

//   const handleEditStaff = (member: any) => {
//     setModalMode('edit');
//     setCurrentStaff(member);
//     setShowStaffModal(true);
//   };

//   const handleViewStaff = (member: any) => {
//     setModalMode('view');
//     setCurrentStaff(member);
//     setShowStaffModal(true);
//   };

//   const handleDeleteStaff = (id: string) => {
//     if (window.confirm('Are you sure you want to remove this staff member?')) {
//       setStaff(prev => prev.filter(s => s.id !== id));
//     }
//   };

//   const handleSaveStaff = (staffData: any) => {
//     if (modalMode === 'add') {
//       const newStaff = {
//         ...staffData,
//         id: `NTS-2024-${String(staff.length + 1).padStart(3, '0')}`,
//         avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${staffData.name}`
//       };
//       setStaff(prev => [...prev, newStaff]);
//     } else if (modalMode === 'edit' && currentStaff) {
//       setStaff(prev => prev.map(s => s.id === currentStaff.id ? { ...s, ...staffData } : s));
//     }
//     setShowStaffModal(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Non-Teaching Staff Management</h1>
//             <p className="text-sm text-gray-500 mt-1">Manage administrative and support staff</p>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <StatCard
//             title="Total Staff"
//             value={stats.total.toLocaleString()}
//             change="+5% from last month"
//             icon={<Users className="w-5 h-5" />}
//             iconBg="bg-blue-100"
//             iconColor="text-blue-600"
//           />
//           <StatCard
//             title="Active Staff"
//             value={stats.active.toLocaleString()}
//             change="+2% from last month"
//             icon={<UserCheck className="w-5 h-5" />}
//             iconBg="bg-green-100"
//             iconColor="text-green-600"
//           />
//           <StatCard
//             title="On Leave"
//             value={stats.onLeave}
//             change="Currently"
//             icon={<Clock className="w-5 h-5" />}
//             iconBg="bg-yellow-100"
//             iconColor="text-yellow-600"
//           />
//           <StatCard
//             title="Departments"
//             value={stats.departments}
//             change="Active departments"
//             icon={<Briefcase className="w-5 h-5" />}
//             iconBg="bg-purple-100"
//             iconColor="text-purple-600"
//           />
//         </div>
//       </div>

//       {/* Filters and Actions */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="flex flex-wrap gap-3 items-center justify-between">
//           <div className="flex flex-wrap gap-3 items-center flex-1">
//             <select
//               value={selectedDepartment}
//               onChange={(e) => setSelectedDepartment(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               <option>All Departments</option>
//               <option>Administration</option>
//               <option>Library</option>
//               <option>Science Lab</option>
//               <option>Finance</option>
//               <option>IT Department</option>
//               <option>Front Desk</option>
//               <option>Security</option>
//               <option>Health Services</option>
//             </select>

//             <select
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               <option>All Status</option>
//               <option>Active</option>
//               <option>On Leave</option>
//               <option>Inactive</option>
//             </select>

//             <select
//               value={selectedEmploymentType}
//               onChange={(e) => setSelectedEmploymentType(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               <option>All Types</option>
//               <option>Full-time</option>
//               <option>Part-time</option>
//               <option>Contract</option>
//             </select>

//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
//             >
//               <Filter className="w-4 h-4" />
//               More Filters
//             </button>
//           </div>

//           <div className="flex gap-3">
//             <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
//               <Download className="w-4 h-4" />
//               Export
//             </button>
//             <button
//               onClick={handleAddStaff}
//               className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
//             >
//               <Plus className="w-4 h-4" />
//               Add Staff
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="px-6 py-6">
//         {/* Search and View Toggle */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-4">
//             <h2 className="text-lg font-semibold text-gray-900">All Staff Members</h2>
//             <div className="relative">
//               <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search staff..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-80"
//               />
//             </div>
//           </div>

//           <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Staff Display */}
//         {viewMode === 'grid' ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {paginatedStaff.map(member => (
//               <StaffCard
//                 key={member.id}
//                 staff={member}
//                 isSelected={selectedStaff.includes(member.id)}
//                 onSelect={() => handleSelectStaff(member.id)}
//                 onView={() => handleViewStaff(member)}
//                 onEdit={() => handleEditStaff(member)}
//                 onDelete={() => handleDeleteStaff(member.id)}
//               />
//             ))}
//           </div>
//         ) : (
//           <StaffTable
//             staff={paginatedStaff}
//             selectedStaff={selectedStaff}
//             onSelectAll={handleSelectAll}
//             onSelect={handleSelectStaff}
//             onView={handleViewStaff}
//             onEdit={handleEditStaff}
//             onDelete={handleDeleteStaff}
//           />
//         )}

//         {/* Pagination */}
//         <div className="mt-6 flex items-center justify-between">
//           <p className="text-sm text-gray-600">
//             Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredStaff.length)} of {filteredStaff.length} staff members
//           </p>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//             >
//               Previous
//             </button>
//             {[...Array(Math.min(5, totalPages))].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-4 py-2 rounded-lg text-sm ${
//                   currentPage === i + 1
//                     ? 'bg-indigo-600 text-white'
//                     : 'border border-gray-300 hover:bg-gray-50'
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             {totalPages > 5 && <span className="px-2 py-2 text-gray-500">...</span>}
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Staff Modal */}
//       {showStaffModal && (
//         <StaffModal
//           mode={modalMode}
//           staff={currentStaff}
//           onClose={() => setShowStaffModal(false)}
//           onSave={handleSaveStaff}
//         />
//       )}
//     </div>
//   );
// };

// interface StatCardProps {
//   title: string;
//   value: string | number;
//   change: string;
//   icon: React.ReactNode;
//   iconBg: string;
//   iconColor: string;
// }

// const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, iconBg, iconColor }) => (
//   <div className="bg-white rounded-lg border border-gray-200 p-4">
//     <div className="flex items-center justify-between mb-2">
//       <span className="text-sm text-gray-600">{title}</span>
//       <div className={`${iconBg} ${iconColor} p-2 rounded-lg`}>
//         {icon}
//       </div>
//     </div>
//     <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
//     <div className="text-xs text-green-600">{change}</div>
//   </div>
// );

// interface StaffCardProps {
//   staff: StaffMember;
//   isSelected: boolean;
//   onSelect: () => void;
//   onView: () => void;
//   onEdit: () => void;
//   onDelete: () => void;
// }

// const StaffCard: React.FC<StaffCardProps> = ({ staff, isSelected, onSelect, onView, onEdit, onDelete }) => (
//   <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
//     <div className="flex items-start justify-between mb-3">
//       <div className="flex items-center gap-3">
//         <input
//           type="checkbox"
//           checked={isSelected}
//           onChange={onSelect}
//           className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
//         />
//         <img src={staff.avatar} alt={staff.name} className="w-12 h-12 rounded-full" />
//         <div>
//           <h3 className="font-semibold text-gray-900">{staff.name}</h3>
//           <p className="text-sm text-gray-500">{staff.designation}</p>
//         </div>
//       </div>
//     </div>

//     <div className="space-y-2 mb-3">
//       <div className="flex items-center gap-2 text-sm text-gray-600">
//         <Briefcase className="w-4 h-4" />
//         <span>{staff.department}</span>
//       </div>
//       <div className="flex items-center gap-2 text-sm text-gray-600">
//         <Phone className="w-4 h-4" />
//         <span>{staff.phone}</span>
//       </div>
//       <div className="flex items-center gap-2 text-sm text-gray-600">
//         <Mail className="w-4 h-4" />
//         <span>{staff.email}</span>
//       </div>
//       <div className="flex items-center gap-2 text-sm text-gray-600">
//         <Calendar className="w-4 h-4" />
//         <span>Joined: {new Date(staff.joinDate).toLocaleDateString()}</span>
//       </div>
//       <div className="flex justify-between items-center">
//         <span className="text-sm text-gray-600">Status:</span>
//         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//           staff.status === 'Active' ? 'bg-green-100 text-green-700' : 
//           staff.status === 'On Leave' ? 'bg-yellow-100 text-yellow-700' : 
//           'bg-gray-100 text-gray-700'
//         }`}>
//           {staff.status}
//         </span>
//       </div>
//     </div>

//     <div className="flex gap-2 pt-3 border-t border-gray-200">
//       <button
//         onClick={onView}
//         className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300"
//       >
//         <Eye className="w-4 h-4" />
//         View
//       </button>
//       <button
//         onClick={onEdit}
//         className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg border border-indigo-300"
//       >
//         <Edit2 className="w-4 h-4" />
//         Edit
//       </button>
//       <button
//         onClick={onDelete}
//         className="flex items-center justify-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg border border-red-300"
//       >
//         <Trash2 className="w-4 h-4" />
//       </button>
//     </div>
//   </div>
// );

// interface StaffTableProps {
//   staff: any[];
//   selectedStaff: string[];
//   onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onSelect: (id: string) => void;
//   onView: (member: any) => void;
//   onEdit: (member: any) => void;
//   onDelete: (id: string) => void;
// }

// const StaffTable: React.FC<StaffTableProps> = ({ staff, selectedStaff, onSelectAll, onSelect, onView, onEdit, onDelete }) => (
//   <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//     <div className="overflow-x-auto">
//       <table className="w-full">
//         <thead className="bg-gray-50 border-b border-gray-200">
//           <tr>
//             <th className="px-4 py-3 text-left">
//               <input
//                 type="checkbox"
//                 onChange={onSelectAll}
//                 checked={staff.length > 0 && selectedStaff.length === staff.length}
//                 className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
//               />
//             </th>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Staff ID</th>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Designation</th>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Department</th>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Contact</th>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {staff.map(member => (
//             <tr key={member.id} className="hover:bg-gray-50">
//               <td className="px-4 py-3">
//                 <input
//                   type="checkbox"
//                   checked={selectedStaff.includes(member.id)}
//                   onChange={() => onSelect(member.id)}
//                   className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
//                 />
//               </td>
//               <td className="px-4 py-3 text-sm text-gray-900">{member.id}</td>
//               <td className="px-4 py-3">
//                 <div className="flex items-center gap-3">
//                   <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
//                   <div>
//                     <div className="text-sm font-medium text-gray-900">{member.name}</div>
//                     <div className="text-xs text-gray-500">{member.email}</div>
//                   </div>
//                 </div>
//               </td>
//               <td className="px-4 py-3 text-sm text-gray-900">{member.designation}</td>
//               <td className="px-4 py-3 text-sm text-gray-900">{member.department}</td>
//               <td className="px-4 py-3 text-sm text-gray-900">{member.phone}</td>
//               <td className="px-4 py-3">
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                   member.status === 'Active' ? 'bg-green-100 text-green-700' : 
//                   member.status === 'On Leave' ? 'bg-yellow-100 text-yellow-700' : 
//                   'bg-gray-100 text-gray-700'
//                 }`}>
//                   {member.status}
//                 </span>
//               </td>
//               <td className="px-4 py-3">
//                 <div className="flex items-center gap-2">
//                   <button onClick={() => onView(member)} className="p-1 text-gray-600 hover:text-indigo-600">
//                     <Eye className="w-4 h-4" />
//                   </button>
//                   <button onClick={() => onEdit(member)} className="p-1 text-gray-600 hover:text-indigo-600">
//                     <Edit2 className="w-4 h-4" />
//                   </button>
//                   <button onClick={() => onDelete(member.id)} className="p-1 text-gray-600 hover:text-red-600">
//                                     <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>
// );

// /* ================= STAFF MODAL ================= */

// interface StaffModalProps {
//   mode: 'add' | 'edit' | 'view';
//   staff: StaffMember | null;
//   onClose: () => void;
//   onSave: (staffData: Partial<StaffMember>) => void;
// }

// const StaffModal: React.FC<StaffModalProps> = ({ mode, staff, onClose, onSave }) => {
//   type StaffFormData = Omit<StaffMember, 'id' | 'avatar'> & Partial<Pick<StaffMember, 'id' | 'avatar'>>;
//   const [formData, setFormData] = useState<StaffFormData>(
//     staff || {
//       name: '',
//       email: '',
//       designation: '',
//       department: '',
//       phone: '',
//       joinDate: '',
//       salary: '',
//       status: 'Active',
//       employmentType: 'Full-time',
//       address: '',
//       emergencyContact: '',
//       qualification: '',
//       experience: '',
//       shift: 'Morning'
//     }
//   );

//   const isView = mode === 'view';

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold">
//             {mode === 'add' && 'Add Staff'}
//             {mode === 'edit' && 'Edit Staff'}
//             {mode === 'view' && 'Staff Details'}
//           </h2>
//           <X className="cursor-pointer" onClick={onClose} />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {([
//             ['name', 'Full Name'],
//             ['email', 'Email'],
//             ['designation', 'Designation'],
//             ['department', 'Department'],
//             ['phone', 'Phone'],
//             ['joinDate', 'Join Date', 'date'],
//             ['salary', 'Salary'],
//             ['qualification', 'Qualification'],
//             ['experience', 'Experience'],
//             ['emergencyContact', 'Emergency Contact'],
//             ['address', 'Address'],
//           ] as [keyof StaffMember, string, string?][]).map(([key, label, type]) => (
//             <div key={key}>
//               <label className="text-sm text-gray-600">{label}</label>
//               <input
//                 type={type || 'text'}
//                 name={key}
//                 value={formData[key as keyof typeof formData] || ''}
//                 disabled={isView}
//                 onChange={handleChange}
//                 className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
//               />
//             </div>
//           ))}

//           <div>
//             <label className="text-sm text-gray-600">Status</label>
//             <select
//               name="status"
//               value={formData.status}
//               disabled={isView}
//               onChange={handleChange}
//               className="w-full mt-1 px-3 py-2 border rounded-lg"
//             >
//               <option>Active</option>
//               <option>On Leave</option>
//               <option>Inactive</option>
//             </select>
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Employment Type</label>
//             <select
//               name="employmentType"
//               value={formData.employmentType}
//               disabled={isView}
//               onChange={handleChange}
//               className="w-full mt-1 px-3 py-2 border rounded-lg"
//             >
//               <option>Full-time</option>
//               <option>Part-time</option>
//               <option>Contract</option>
//             </select>
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Shift</label>
//             <select
//               name="shift"
//               value={formData.shift}
//               disabled={isView}
//               onChange={handleChange}
//               className="w-full mt-1 px-3 py-2 border rounded-lg"
//             >
//               <option>Morning</option>
//               <option>Evening</option>
//               <option>Night</option>
//             </select>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border rounded-lg"
//           >
//             Close
//           </button>

//           {!isView && (
//             <button
//               onClick={() => onSave(formData)}
//               className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
//             >
//               Save
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NonTeachingStaffManagement;



import React, { useState } from 'react';
import { LayoutDashboard, FileText, Users, GraduationCap, Calendar, BarChart3, Settings, BookOpen, Search, Plus, Filter, Download, Edit, Trash2, Eye, ChevronRight, Package, UserCog, Briefcase, Phone, Mail, MapPin, Award, Calendar as CalendarIcon, DollarSign, Clock, Building, Shield, Wrench, Bus, Utensils, Stethoscope, Home } from 'lucide-react';

const SchoolAdminDashboard = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  type Department = typeof departmentsData[number];
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  type Staff = {
    id: number;
    name: string;
    position: string;
    empId: string;
    phone: string;
    email: string;
    joinDate: string;
    salary: number;
    shift: string;
    status: string;
    experience: string;
    address: string;
    qualification: string;
  };
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Departments Data
  const colorKeys = ['blue', 'orange', 'red', 'green', 'purple', 'pink', 'teal', 'indigo'] as const;
  type ColorKey = typeof colorKeys[number];

  interface DepartmentData {
    id: number;
    name: string;
    icon: React.ReactNode;
    color: ColorKey;
    totalStaff: number;
    positions: string[];
    headOfDepartment: string;
  }

  const [departmentsData, setDepartmentsData] = useState<DepartmentData[]>([
    { 
      id: 1, 
      name: 'Administration', 
      icon: <Briefcase className="w-6 h-6" />,
      color: 'blue',
      totalStaff: 12,
      positions: ['Office Manager', 'Admin Assistant', 'Receptionist', 'Data Entry Operator'],
      headOfDepartment: 'Mr. Rajesh Kumar'
    },
    { 
      id: 2, 
      name: 'Maintenance', 
      icon: <Wrench className="w-6 h-6" />,
      color: 'orange',
      totalStaff: 18,
      positions: ['Electrician', 'Plumber', 'Carpenter', 'General Maintenance'],
      headOfDepartment: 'Mr. Suresh Nair'
    },
    { 
      id: 3, 
      name: 'Security', 
      icon: <Shield className="w-6 h-6" />,
      color: 'red',
      totalStaff: 15,
      positions: ['Security Guard', 'Security Supervisor', 'CCTV Operator'],
      headOfDepartment: 'Mr. Vikram Singh'
    },
    { 
      id: 4, 
      name: 'Transport', 
      icon: <Bus className="w-6 h-6" />,
      color: 'green',
      totalStaff: 24,
      positions: ['Bus Driver', 'Bus Conductor', 'Transport Coordinator'],
      headOfDepartment: 'Mr. Anil Sharma'
    },
    { 
      id: 5, 
      name: 'Cafeteria', 
      icon: <Utensils className="w-6 h-6" />,
      color: 'purple',
      totalStaff: 10,
      positions: ['Chef', 'Kitchen Helper', 'Cafeteria Manager'],
      headOfDepartment: 'Mrs. Lakshmi Iyer'
    },
    { 
      id: 6, 
      name: 'Medical', 
      icon: <Stethoscope className="w-6 h-6" />,
      color: 'pink',
      totalStaff: 5,
      positions: ['School Nurse', 'Medical Assistant', 'Counselor'],
      headOfDepartment: 'Dr. Priya Menon'
    },
    { 
      id: 7, 
      name: 'Housekeeping', 
      icon: <Home className="w-6 h-6" />,
      color: 'teal',
      totalStaff: 20,
      positions: ['Janitor', 'Cleaner', 'Housekeeping Supervisor'],
      headOfDepartment: 'Mrs. Meera Reddy'
    },
    { 
      id: 8, 
      name: 'IT Support', 
      icon: <Building className="w-6 h-6" />,
      color: 'indigo',
      totalStaff: 8,
      positions: ['IT Technician', 'Network Administrator', 'IT Support'],
      headOfDepartment: 'Mr. Arjun Patel'
    },
  ]);

  // Staff Data by Department
  const staffData = {
    1: [ // Administration
      { id: 1, name: 'Rajesh Kumar', position: 'Office Manager', empId: 'ADM001', phone: '+91-9876543210', email: 'rajesh.k@school.edu', joinDate: '2015-06-15', salary: 45000, shift: 'Day', status: 'Active', experience: '8 years', address: 'MG Road, Hyderabad', qualification: 'MBA' },
      { id: 2, name: 'Priya Sharma', position: 'Admin Assistant', empId: 'ADM002', phone: '+91-9876543211', email: 'priya.s@school.edu', joinDate: '2018-03-20', salary: 28000, shift: 'Day', status: 'Active', experience: '5 years', address: 'Banjara Hills, Hyderabad', qualification: 'B.Com' },
      { id: 3, name: 'Sneha Patel', position: 'Receptionist', empId: 'ADM003', phone: '+91-9876543212', email: 'sneha.p@school.edu', joinDate: '2020-01-10', salary: 22000, shift: 'Day', status: 'Active', experience: '3 years', address: 'Jubilee Hills, Hyderabad', qualification: 'B.A' },
      { id: 4, name: 'Amit Verma', position: 'Data Entry Operator', empId: 'ADM004', phone: '+91-9876543213', email: 'amit.v@school.edu', joinDate: '2019-08-15', salary: 20000, shift: 'Day', status: 'Active', experience: '4 years', address: 'Gachibowli, Hyderabad', qualification: 'B.Sc' },
    ],
    2: [ // Maintenance
      { id: 1, name: 'Suresh Nair', position: 'Maintenance Supervisor', empId: 'MNT001', phone: '+91-9876543220', email: 'suresh.n@school.edu', joinDate: '2012-04-10', salary: 35000, shift: 'Day', status: 'Active', experience: '11 years', address: 'Kondapur, Hyderabad', qualification: 'ITI' },
      { id: 2, name: 'Ramesh Kumar', position: 'Electrician', empId: 'MNT002', phone: '+91-9876543221', email: 'ramesh.k@school.edu', joinDate: '2016-07-22', salary: 28000, shift: 'Day', status: 'Active', experience: '7 years', address: 'Madhapur, Hyderabad', qualification: 'ITI' },
      { id: 3, name: 'Mahesh Singh', position: 'Plumber', empId: 'MNT003', phone: '+91-9876543222', email: 'mahesh.s@school.edu', joinDate: '2017-09-15', salary: 26000, shift: 'Day', status: 'Active', experience: '6 years', address: 'Kukatpally, Hyderabad', qualification: 'ITI' },
      { id: 4, name: 'Vijay Reddy', position: 'Carpenter', empId: 'MNT004', phone: '+91-9876543223', email: 'vijay.r@school.edu', joinDate: '2018-02-01', salary: 27000, shift: 'Day', status: 'Active', experience: '5 years', address: 'Secunderabad, Hyderabad', qualification: 'ITI' },
    ],
    3: [ // Security
      { id: 1, name: 'Vikram Singh', position: 'Security Supervisor', empId: 'SEC001', phone: '+91-9876543230', email: 'vikram.s@school.edu', joinDate: '2014-05-20', salary: 32000, shift: 'Day', status: 'Active', experience: '9 years', address: 'Begumpet, Hyderabad', qualification: '12th Pass' },
      { id: 2, name: 'Ravi Kumar', position: 'Security Guard', empId: 'SEC002', phone: '+91-9876543231', email: 'ravi.k@school.edu', joinDate: '2019-01-15', salary: 18000, shift: 'Morning', status: 'Active', experience: '4 years', address: 'Ameerpet, Hyderabad', qualification: '10th Pass' },
      { id: 3, name: 'Prakash Rao', position: 'Security Guard', empId: 'SEC003', phone: '+91-9876543232', email: 'prakash.r@school.edu', joinDate: '2019-06-10', salary: 18000, shift: 'Evening', status: 'Active', experience: '4 years', address: 'SR Nagar, Hyderabad', qualification: '10th Pass' },
      { id: 4, name: 'Kiran Reddy', position: 'Security Guard', empId: 'SEC004', phone: '+91-9876543233', email: 'kiran.r@school.edu', joinDate: '2020-03-05', salary: 18000, shift: 'Night', status: 'Active', experience: '3 years', address: 'Miyapur, Hyderabad', qualification: '12th Pass' },
    ],
    4: [ // Transport
      { id: 1, name: 'Anil Sharma', position: 'Transport Coordinator', empId: 'TRP001', phone: '+91-9876543240', email: 'anil.s@school.edu', joinDate: '2013-08-12', salary: 38000, shift: 'Day', status: 'Active', experience: '10 years', address: 'Nizampet, Hyderabad', qualification: 'B.A' },
      { id: 2, name: 'Mohan Das', position: 'Bus Driver', empId: 'TRP002', phone: '+91-9876543241', email: 'mohan.d@school.edu', joinDate: '2016-04-20', salary: 25000, shift: 'Morning', status: 'Active', experience: '7 years', address: 'KPHB, Hyderabad', qualification: 'License Holder' },
      { id: 3, name: 'Sunil Kumar', position: 'Bus Driver', empId: 'TRP003', phone: '+91-9876543242', email: 'sunil.k@school.edu', joinDate: '2017-11-08', salary: 25000, shift: 'Morning', status: 'Active', experience: '6 years', address: 'Miyapur, Hyderabad', qualification: 'License Holder' },
      { id: 4, name: 'Ganesh Rao', position: 'Bus Conductor', empId: 'TRP004', phone: '+91-9876543243', email: 'ganesh.r@school.edu', joinDate: '2018-09-15', salary: 18000, shift: 'Morning', status: 'Active', experience: '5 years', address: 'Bachupally, Hyderabad', qualification: '12th Pass' },
    ],
    5: [ // Cafeteria
      { id: 1, name: 'Lakshmi Iyer', position: 'Cafeteria Manager', empId: 'CAF001', phone: '+91-9876543250', email: 'lakshmi.i@school.edu', joinDate: '2015-02-18', salary: 32000, shift: 'Day', status: 'Active', experience: '8 years', address: 'Hitech City, Hyderabad', qualification: 'B.Sc' },
      { id: 2, name: 'Saraswati Devi', position: 'Chef', empId: 'CAF002', phone: '+91-9876543251', email: 'saraswati.d@school.edu', joinDate: '2017-05-10', salary: 28000, shift: 'Day', status: 'Active', experience: '6 years', address: 'Gachibowli, Hyderabad', qualification: 'Diploma' },
      { id: 3, name: 'Radha Krishna', position: 'Kitchen Helper', empId: 'CAF003', phone: '+91-9876543252', email: 'radha.k@school.edu', joinDate: '2019-08-22', salary: 15000, shift: 'Day', status: 'Active', experience: '4 years', address: 'Kondapur, Hyderabad', qualification: '8th Pass' },
    ],
    6: [ // Medical
      { id: 1, name: 'Dr. Priya Menon', position: 'School Nurse', empId: 'MED001', phone: '+91-9876543260', email: 'priya.m@school.edu', joinDate: '2016-06-01', salary: 42000, shift: 'Day', status: 'Active', experience: '7 years', address: 'Jubilee Hills, Hyderabad', qualification: 'B.Sc Nursing' },
      { id: 2, name: 'Kavita Singh', position: 'Medical Assistant', empId: 'MED002', phone: '+91-9876543261', email: 'kavita.s@school.edu', joinDate: '2019-03-15', salary: 25000, shift: 'Day', status: 'Active', experience: '4 years', address: 'Banjara Hills, Hyderabad', qualification: 'Nursing Diploma' },
      { id: 3, name: 'Anjali Sharma', position: 'Counselor', empId: 'MED003', phone: '+91-9876543262', email: 'anjali.s@school.edu', joinDate: '2018-01-10', salary: 38000, shift: 'Day', status: 'Active', experience: '5 years', address: 'Madhapur, Hyderabad', qualification: 'M.A Psychology' },
    ],
    7: [ // Housekeeping
      { id: 1, name: 'Meera Reddy', position: 'Housekeeping Supervisor', empId: 'HSK001', phone: '+91-9876543270', email: 'meera.r@school.edu', joinDate: '2014-09-25', salary: 30000, shift: 'Day', status: 'Active', experience: '9 years', address: 'Begumpet, Hyderabad', qualification: '10th Pass' },
      { id: 2, name: 'Latha Kumari', position: 'Cleaner', empId: 'HSK002', phone: '+91-9876543271', email: 'latha.k@school.edu', joinDate: '2018-07-12', salary: 14000, shift: 'Morning', status: 'Active', experience: '5 years', address: 'Ameerpet, Hyderabad', qualification: '8th Pass' },
      { id: 3, name: 'Padma Devi', position: 'Cleaner', empId: 'HSK003', phone: '+91-9876543272', email: 'padma.d@school.edu', joinDate: '2019-02-08', salary: 14000, shift: 'Morning', status: 'Active', experience: '4 years', address: 'SR Nagar, Hyderabad', qualification: '8th Pass' },
      { id: 4, name: 'Suma Rani', position: 'Janitor', empId: 'HSK004', phone: '+91-9876543273', email: 'suma.r@school.edu', joinDate: '2017-11-20', salary: 16000, shift: 'Day', status: 'Active', experience: '6 years', address: 'Kukatpally, Hyderabad', qualification: '10th Pass' },
    ],
    8: [ // IT Support
      { id: 1, name: 'Arjun Patel', position: 'IT Manager', empId: 'IT001', phone: '+91-9876543280', email: 'arjun.p@school.edu', joinDate: '2015-03-10', salary: 55000, shift: 'Day', status: 'Active', experience: '8 years', address: 'Hitech City, Hyderabad', qualification: 'B.Tech' },
      { id: 2, name: 'Karthik Reddy', position: 'Network Administrator', empId: 'IT002', phone: '+91-9876543281', email: 'karthik.r@school.edu', joinDate: '2017-08-15', salary: 42000, shift: 'Day', status: 'Active', experience: '6 years', address: 'Madhapur, Hyderabad', qualification: 'B.Tech' },
      { id: 3, name: 'Deepak Kumar', position: 'IT Technician', empId: 'IT003', phone: '+91-9876543282', email: 'deepak.k@school.edu', joinDate: '2019-01-20', salary: 32000, shift: 'Day', status: 'Active', experience: '4 years', address: 'Gachibowli, Hyderabad', qualification: 'Diploma' },
    ],
  };

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
    red: 'bg-red-50 border-red-200 text-red-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    pink: 'bg-pink-50 border-pink-200 text-pink-600',
    teal: 'bg-teal-50 border-teal-200 text-teal-600',
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-600',
  };

  // Add Department Modal State
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const [addDepartmentForm, setAddDepartmentForm] = useState({
    name: '',
    headOfDepartment: '',
    color: 'blue',
    icon: 'Building',
  });
  const [addDepartmentError, setAddDepartmentError] = useState<string | null>(null);
  const [addDepartmentSuccess, setAddDepartmentSuccess] = useState<string | null>(null);
  const iconOptions = [
    { label: 'Building', value: 'Building' },
    { label: 'UserCog', value: 'UserCog' },
    { label: 'Home', value: 'Home' },
    { label: 'Award', value: 'Award' },
    { label: 'Clock', value: 'Clock' },
  ];
  const colorOptions = [
    { label: 'Blue', value: 'blue' },
    { label: 'Orange', value: 'orange' },
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Purple', value: 'purple' },
    { label: 'Pink', value: 'pink' },
    { label: 'Teal', value: 'teal' },
    { label: 'Indigo', value: 'indigo' },
  ];
  const iconMap: Record<string, React.ReactNode> = {
    Building: <Building className="w-6 h-6" />,
    UserCog: <UserCog className="w-6 h-6" />,
    Home: <Home className="w-6 h-6" />,
    Award: <Award className="w-6 h-6" />,
    Clock: <Clock className="w-6 h-6" />,
  };

  // Departments Overview
  const DepartmentsOverview = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Non-Teaching Staff</h2>
          <p className="text-gray-500 mt-1">Manage departments and staff members</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => {
            setShowAddDepartmentModal(true);
            setAddDepartmentError(null);
            setAddDepartmentSuccess(null);
            setAddDepartmentForm({ name: '', headOfDepartment: '', color: 'blue', icon: 'Building' });
          }}
        >
          <Plus className="w-4 h-4" />
          Add department
        </button>
      </div>

      {/* Add Department Modal */}
      {showAddDepartmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowAddDepartmentModal(false)}
            >✕</button>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Add Department</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                setAddDepartmentError(null);
                setAddDepartmentSuccess(null);
                if (!addDepartmentForm.name.trim()) {
                  setAddDepartmentError('Department name is required.');
                  return;
                }
                if (!addDepartmentForm.headOfDepartment.trim()) {
                  setAddDepartmentError('Head of Department is required.');
                  return;
                }
                // Add department to departmentsData
                setDepartmentsData(prev => [
                  ...prev,
                  {
                    id: prev.length + 1,
                    name: addDepartmentForm.name,
                    icon: iconMap[addDepartmentForm.icon],
                    color: addDepartmentForm.color as ColorKey,
                    totalStaff: 0,
                    positions: [] as string[],
                    headOfDepartment: addDepartmentForm.headOfDepartment,
                  },
                ]);
                setAddDepartmentSuccess('Department added successfully!');
                setTimeout(() => {
                  setShowAddDepartmentModal(false);
                  setAddDepartmentSuccess(null);
                }, 1200);
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Department Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={addDepartmentForm.name}
                  onChange={e => setAddDepartmentForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Head of Department</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={addDepartmentForm.headOfDepartment}
                  onChange={e => setAddDepartmentForm(f => ({ ...f, headOfDepartment: e.target.value }))}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Color</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={addDepartmentForm.color}
                  onChange={e => setAddDepartmentForm(f => ({ ...f, color: e.target.value }))}
                >
                  {colorOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Icon</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={addDepartmentForm.icon}
                  onChange={e => setAddDepartmentForm(f => ({ ...f, icon: e.target.value }))}
                >
                  {iconOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              {addDepartmentError && <div className="mb-2 text-red-600 text-sm">{addDepartmentError}</div>}
              {addDepartmentSuccess && <div className="mb-2 text-green-600 text-sm">{addDepartmentSuccess}</div>}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowAddDepartmentModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                >
                  Add Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <UserCog className="w-8 h-8 text-blue-600 mb-3" />
          <p className="text-sm text-gray-600">Total Staff</p>
          <p className="text-3xl font-bold text-gray-900">112</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <Building className="w-8 h-8 text-green-600 mb-3" />
          <p className="text-sm text-gray-600">Departments</p>
          <p className="text-3xl font-bold text-gray-900">8</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <Award className="w-8 h-8 text-purple-600 mb-3" />
          <p className="text-sm text-gray-600">Active Staff</p>
          <p className="text-3xl font-bold text-gray-900">108</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
          <Clock className="w-8 h-8 text-orange-600 mb-3" />
          <p className="text-sm text-gray-600">On Leave Today</p>
          <p className="text-3xl font-bold text-gray-900">4</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-4">Departments</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departmentsData.map((dept) => (
          <div
            key={dept.id}
            onClick={() => setSelectedDepartment(dept)}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg border ${colorClasses[dept.color]}`}>
                {dept.icon}
              </div>
              <ChevronRight className={`w-5 h-5 text-gray-400 group-hover:text-${dept.color}-600 transition-colors`} />
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">{dept.name}</h3>
            <p className="text-sm text-gray-500 mb-4">Head: {dept.headOfDepartment}</p>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Staff Members</span>
                <span className="text-lg font-bold text-gray-900">{dept.totalStaff}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`bg-${dept.color}-600 h-2 rounded-full`} style={{width: '75%'}}></div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Positions</p>
              <div className="flex flex-wrap gap-1">
                {dept.positions.slice(0, 2).map((pos, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {pos}
                  </span>
                ))}
                {dept.positions.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    +{dept.positions.length - 2} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Department Staff View
  const DepartmentStaffView = () => {
    const staff =
      selectedDepartment && typeof selectedDepartment.id === 'number'
        ? staffData[selectedDepartment.id as keyof typeof staffData] || []
        : [];
    
    return (
      <div>
        <div className="mb-6">
          <button
            onClick={() => setSelectedDepartment(null)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-3 flex items-center gap-1"
          >
            ← Back to Departments
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-lg border ${selectedDepartment ? colorClasses[selectedDepartment.color] : ''}`}>
                {selectedDepartment && selectedDepartment.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedDepartment?.name} Department</h2>
                <p className="text-gray-500 mt-1">Head: {selectedDepartment?.headOfDepartment} • {selectedDepartment?.totalStaff} Staff Members</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                Add Staff
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Emp ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staff.filter(s => 
                s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.empId.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.qualification}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{member.position}</td>
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">{member.empId}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center gap-1 mb-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="truncate max-w-[150px]">{member.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {member.shift}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{member.salary.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => setSelectedStaff(member)} className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Staff Details Modal
  const StaffDetailsModal = () => {
    if (!selectedStaff) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {selectedStaff.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{selectedStaff.name}</h3>
          <p className="text-gray-500">{selectedStaff.position}</p>
          <p className="text-sm text-blue-600 font-medium">{selectedStaff.empId}</p>
        </div>
      </div>
      <button
        onClick={() => setSelectedStaff(null)}
        className="text-gray-400 hover:text-gray-600 text-xl"
      >
        ✕
      </button>
    </div>
  </div>

  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Personal Information</h4>
      <div className="text-sm space-y-2">
        <p><span className="text-gray-500">Qualification:</span> {selectedStaff.qualification}</p>
        <p><span className="text-gray-500">Experience:</span> {selectedStaff.experience}</p>
        <p><span className="text-gray-500">Address:</span> {selectedStaff.address}</p>
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Work Details</h4>
      <div className="text-sm space-y-2">
        <p><span className="text-gray-500">Shift:</span> {selectedStaff.shift}</p>
        <p><span className="text-gray-500">Join Date:</span> {selectedStaff.joinDate}</p>
        <p><span className="text-gray-500">Salary:</span> ₹{selectedStaff.salary.toLocaleString()}</p>
        <p>
          <span className="text-gray-500">Status:</span>{' '}
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
            {selectedStaff.status}
          </span>
        </p>
      </div>
    </div>

    <div className="md:col-span-2 space-y-4">
      <h4 className="font-semibold text-gray-900">Contact Information</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" />
          <span>{selectedStaff.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          <span>{selectedStaff.email}</span>
        </div>
      </div>
    </div>
  </div>

  <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
    <button
      onClick={() => setSelectedStaff(null)}
      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
    >
      Close
    </button>
    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
      Edit Staff
    </button>
  </div>
</div>
</div>
);
};
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {selectedDepartment ? <DepartmentStaffView /> : <DepartmentsOverview />}    
      {selectedStaff && <StaffDetailsModal />}
    </div>
  );
}
export default SchoolAdminDashboard;