
// import React, { useState } from 'react';


// type Role = 'Student' | 'Teacher' | 'Non-Teaching Staff';

// interface AttendanceReportBase {
// 	id: number;
// 	date: string;
// 	present: number;
// 	absent: number;
// 	late: number;
// 	downloadUrl: string;
// }

// interface StudentAttendanceReport extends AttendanceReportBase {
// 	role: 'Student';
// 	class: string;
// 	section: string;
// }

// interface TeacherAttendanceReport extends AttendanceReportBase {
// 	role: 'Teacher';
// 	department: string;
// }

// interface StaffAttendanceReport extends AttendanceReportBase {
// 	role: 'Non-Teaching Staff';
// 	department: string;
// }

// type AttendanceReport = StudentAttendanceReport | TeacherAttendanceReport | StaffAttendanceReport;

// const mockReports: AttendanceReport[] = [
// 	// Students
// 	{ id: 1, role: 'Student', date: '2026-01-20', class: '6', section: 'A', present: 28, absent: 2, late: 1, downloadUrl: '#' },
// 	{ id: 2, role: 'Student', date: '2026-01-19', class: '6', section: 'A', present: 27, absent: 3, late: 1, downloadUrl: '#' },
// 	{ id: 3, role: 'Student', date: '2026-01-18', class: '6', section: 'A', present: 29, absent: 1, late: 0, downloadUrl: '#' },
// 	{ id: 4, role: 'Student', date: '2026-01-20', class: '7', section: 'B', present: 30, absent: 0, late: 0, downloadUrl: '#' },
// 	// Teachers
// 	{ id: 5, role: 'Teacher', date: '2026-01-20', department: 'Math', present: 8, absent: 0, late: 1, downloadUrl: '#' },
// 	{ id: 6, role: 'Teacher', date: '2026-01-19', department: 'Science', present: 7, absent: 1, late: 0, downloadUrl: '#' },
// 	// Non-Teaching Staff
// 	{ id: 7, role: 'Non-Teaching Staff', date: '2026-01-20', department: 'Admin', present: 5, absent: 0, late: 0, downloadUrl: '#' },
// 	{ id: 8, role: 'Non-Teaching Staff', date: '2026-01-19', department: 'Transport', present: 3, absent: 1, late: 0, downloadUrl: '#' },
// ];

// const classOptions = ['All', '6', '7'];
// const sectionOptions = ['All', 'A', 'B'];
// const departmentOptions = ['All', 'Math', 'Science', 'Admin', 'Transport'];
// const roleOptions: Role[] = ['Student', 'Teacher', 'Non-Teaching Staff'];

// const AttendanceReportsScreen: React.FC = () => {
// 	const [reports] = useState<AttendanceReport[]>(mockReports);
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState<string | null>(null);
// 	const [role, setRole] = useState<Role>('Student');
// 	const [selectedClass, setSelectedClass] = useState('All');
// 	const [selectedSection, setSelectedSection] = useState('All');
// 	const [selectedDepartment, setSelectedDepartment] = useState('All');

// 	const handleDownload = (id: number) => {
// 		setLoading(true);
// 		setTimeout(() => {
// 			setLoading(false);
// 			window.alert('Report downloaded!');
// 		}, 800);
// 	};

// 	const handleExport = () => {
// 		window.alert('Exported (dummy)');
// 	};

// 	const filtered = reports.filter(r => {
// 		if (r.role !== role) return false;
// 		if (role === 'Student' && r.role === 'Student') {
// 			return (selectedClass === 'All' || r.class === selectedClass) &&
// 						 (selectedSection === 'All' || r.section === selectedSection);
// 		}
// 		if ((role === 'Teacher' && r.role === 'Teacher') || (role === 'Non-Teaching Staff' && r.role === 'Non-Teaching Staff')) {
// 			return selectedDepartment === 'All' || r.department === selectedDepartment;
// 		}
// 		return true;
// 	});

// 	return (
// 		<div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
// 			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
// 				<h2 className="text-2xl font-bold text-gray-800">Attendance Reports</h2>
// 				<button
// 					className="btn-primary"
// 					onClick={handleExport}
// 				>
// 					Export (Dummy)
// 				</button>
// 			</div>
// 			<div className="flex flex-wrap gap-2 mb-4">
// 				<select className="input w-48" value={role} onChange={e => setRole(e.target.value as Role)}>
// 					{roleOptions.map(opt => (
// 						<option key={opt} value={opt}>{opt}</option>
// 					))}
// 				</select>
// 				{role === 'Student' && (
// 					<>
// 						<select
// 							className="input w-40"
// 							value={selectedClass}
// 							onChange={e => setSelectedClass(e.target.value)}
// 						>
// 							{classOptions.map(opt => (
// 								<option key={opt} value={opt}>{opt === 'All' ? 'All Classes' : `Class ${opt}`}</option>
// 							))}
// 						</select>
// 						<select
// 							className="input w-40"
// 							value={selectedSection}
// 							onChange={e => setSelectedSection(e.target.value)}
// 						>
// 							{sectionOptions.map(opt => (
// 								<option key={opt} value={opt}>{opt === 'All' ? 'All Sections' : `Section ${opt}`}</option>
// 							))}
// 						</select>
// 					</>
// 				)}
// 				{(role === 'Teacher' || role === 'Non-Teaching Staff') && (
// 					<select
// 						className="input w-48"
// 						value={selectedDepartment}
// 						onChange={e => setSelectedDepartment(e.target.value)}
// 					>
// 						{departmentOptions.map(opt => (
// 							<option key={opt} value={opt}>{opt === 'All' ? 'All Departments' : opt}</option>
// 						))}
// 					</select>
// 				)}
// 			</div>
// 			{loading && <div className="mb-4 text-blue-600">Processing...</div>}
// 			{error && <div className="mb-4 text-red-600">{error}</div>}
// 			<div className="overflow-x-auto rounded shadow">
// 				<table className="min-w-[700px] w-full bg-gray-50 rounded-md overflow-hidden text-sm">
// 					<thead>
// 						<tr>
// 							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
// 							{role === 'Student' && <><th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Class</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Section</th></>}
// 							{(role === 'Teacher' || role === 'Non-Teaching Staff') && <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Department</th>}
// 							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Present</th>
// 							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Absent</th>
// 							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Late</th>
// 							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{filtered.length === 0 ? (
// 							<tr>
// 								<td colSpan={role === 'Student' ? 7 : 6} className="px-4 py-2 text-center text-gray-400">No reports found.</td>
// 							</tr>
// 						) : (
// 							filtered.map((report) => (
// 								<tr key={report.id}>
// 									<td className="px-4 py-2 text-gray-700">{report.date}</td>
// 									{role === 'Student' && <><td className="px-4 py-2 text-gray-700">{(report as StudentAttendanceReport).class}</td><td className="px-4 py-2 text-gray-700">{(report as StudentAttendanceReport).section}</td></>}
// 									{(role === 'Teacher' || role === 'Non-Teaching Staff') && <td className="px-4 py-2 text-gray-700">{(report as TeacherAttendanceReport | StaffAttendanceReport).department}</td>}
// 									<td className="px-4 py-2 text-green-700 font-semibold">{report.present}</td>
// 									<td className="px-4 py-2 text-red-600 font-semibold">{report.absent}</td>
// 									<td className="px-4 py-2 text-yellow-600 font-semibold">{report.late}</td>
// 									<td className="px-4 py-2">
// 										<button
// 											className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
// 											onClick={() => handleDownload(report.id)}
// 											disabled={loading}
// 										>
// 											Download
// 										</button>
// 									</td>
// 								</tr>
// 							))
// 						)}
// 					</tbody>
// 				</table>
// 			</div>
// 		</div>
// 	);
// };

// export default AttendanceReportsScreen;




import React, { useState } from 'react';
import { UserCheck, UserX, Clock, TrendingUp, ChevronDown, Download, Search, MoreVertical, Calendar } from 'lucide-react';

const AttendanceSystem = () => {
  const [date, setDate] = useState('01/23/2024');
  const [gradeFilter, setGradeFilter] = useState('All Grades');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

  const stats = [
    { label: 'Present Today', value: '847', detail: 'Out of 920 students', icon: UserCheck, bgColor: 'bg-green-50', iconColor: 'text-green-600', change: '+6.2%', changeColor: 'text-green-600' },
    { label: 'Absent Today', value: '43', detail: '4.7% of total students', icon: UserX, bgColor: 'bg-red-50', iconColor: 'text-red-600', change: '-2.1%', changeColor: 'text-red-600' },
    { label: 'Late Arrivals', value: '30', detail: '3.3% of present students', icon: Clock, bgColor: 'bg-yellow-50', iconColor: 'text-yellow-600', change: '+1.2%', changeColor: 'text-yellow-600' },
    { label: 'Attendance Rate', value: '92.1%', detail: 'Monthly average', icon: TrendingUp, bgColor: 'bg-blue-50', iconColor: 'text-blue-600', change: '+0.8%', changeColor: 'text-blue-600' }
  ];

  const students = [
    { id: 1, name: 'James Anderson', email: 'james.anderson@school.edu', studentId: 'STU-2024-001', grade: 'Grade 10', class: 'Class A', status: 'Present', checkIn: '08:15 AM', notes: '-', avatar: '👨‍🎓' },
    { id: 2, name: 'Emma Wilson', email: 'emma.wilson@school.edu', studentId: 'STU-2024-002', grade: 'Grade 10', class: 'Class A', status: 'Late', checkIn: '08:45 AM', notes: 'Traffic delay', avatar: '👩‍🎓' },
    { id: 3, name: 'Michael Chen', email: 'michael.chen@school.edu', studentId: 'STU-2024-003', grade: 'Grade 10', class: 'Class A', status: 'Absent', checkIn: '-', notes: 'Sick leave', avatar: '👨‍💼' },
    { id: 4, name: 'Sophia Martinez', email: 'sophia.martinez@school.edu', studentId: 'STU-2024-004', grade: 'Grade 10', class: 'Class B', status: 'Present', checkIn: '08:10 AM', notes: '-', avatar: '👩‍🦱' },
    { id: 5, name: 'Daniel Brown', email: 'daniel.brown@school.edu', studentId: 'STU-2024-005', grade: 'Grade 10', class: 'Class B', status: 'Present', checkIn: '08:20 AM', notes: '-', avatar: '👨‍🦰' },
    { id: 6, name: 'Olivia Taylor', email: 'olivia.taylor@school.edu', studentId: 'STU-2024-006', grade: 'Grade 10', class: 'Class B', status: 'Excused', checkIn: '-', notes: 'Doctor appointment', avatar: '👩‍⚕️' },
    { id: 7, name: 'Liam Johnson', email: 'liam.johnson@school.edu', studentId: 'STU-2024-007', grade: 'Grade 11', class: 'Class C', status: 'Present', checkIn: '08:12 AM', notes: '-', avatar: '👨‍🔬' },
    { id: 8, name: 'Ava Davis', email: 'ava.davis@school.edu', studentId: 'STU-2024-008', grade: 'Grade 11', class: 'Class C', status: 'Late', checkIn: '08:50 AM', notes: 'Bus delay', avatar: '👩‍💻' }
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(students.length / itemsPerPage);
  const displayedStudents = students.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedStudents(displayedStudents.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const toggleStudent = (id: number) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      'Present': 'bg-green-100 text-green-700',
      'Late': 'bg-yellow-100 text-yellow-700',
      'Absent': 'bg-red-100 text-red-700',
      'Excused': 'bg-purple-100 text-purple-700'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <span className={`text-sm font-medium ${stat.changeColor}`}>{stat.change}</span>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.detail}</p>
            </div>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Date</span>
              <div className="relative">
                <input 
                  type="text" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Grade</span>
              <div className="relative">
                <select 
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="appearance-none border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>All Grades</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                  <option>Grade 11</option>
                  <option>Grade 12</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Class</span>
              <div className="relative">
                <select 
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="appearance-none border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>All Classes</option>
                  <option>Class A</option>
                  <option>Class B</option>
                  <option>Class C</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Status</span>
              <div className="relative">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>All Status</option>
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Late</option>
                  <option>Excused</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
              <span>Apply Filters</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300"
                  checked={selectedStudents.length === displayedStudents.length}
                  onChange={toggleSelectAll}
                />
                <span>Select All</span>
              </label>
              <button className="text-sm text-green-600 hover:text-green-700 font-medium">✓ Mark Present</button>
              <button className="text-sm text-red-600 hover:text-red-700 font-medium">✗ Mark Absent</button>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">● Mark Late</button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300"
                      checked={selectedStudents.length === displayedStudents.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => toggleStudent(student.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                          {student.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{student.studentId}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{student.grade}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{student.class}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(student.status)}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{student.checkIn}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{student.notes}</td>
                    <td className="px-6 py-4">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing 1 to 8 of 920 students
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
                disabled={currentPage === 1}
              >
                <ChevronDown className="w-4 h-4 rotate-90" />
              </button>
              
              <button className="w-8 h-8 bg-blue-500 text-white rounded font-medium text-sm">1</button>
              <button className="w-8 h-8 hover:bg-gray-100 rounded font-medium text-sm">2</button>
              <button className="w-8 h-8 hover:bg-gray-100 rounded font-medium text-sm">3</button>
              <span className="text-gray-400">...</span>
              <button className="w-8 h-8 hover:bg-gray-100 rounded font-medium text-sm">115</button>
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSystem;