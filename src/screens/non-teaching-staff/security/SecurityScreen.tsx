
// import React, { useState } from 'react';

// // Mock security staff/log data
// const securityLogs = [
//   { id: 1, name: 'Ravi Kumar', type: 'Staff', shift: 'Morning', status: 'On Duty', lastAction: 'Gate Check', lastUpdated: '2026-02-01' },
//   { id: 2, name: 'Visitor: S. Sharma', type: 'Visitor', purpose: 'Parent Meeting', status: 'Checked In', lastAction: 'Reception', lastUpdated: '2026-02-02' },
//   { id: 3, name: 'Priya Singh', type: 'Staff', shift: 'Evening', status: 'Off Duty', lastAction: 'Patrol', lastUpdated: '2026-01-31' },
//   { id: 4, name: 'Incident: Lost ID', type: 'Incident', status: 'Reported', lastAction: 'Report Filed', lastUpdated: '2026-01-30' },
//   { id: 5, name: 'Visitor: A. Verma', type: 'Visitor', purpose: 'Delivery', status: 'Checked Out', lastAction: 'Exit', lastUpdated: '2026-01-29' },
// ];

// const SecurityScreen: React.FC = () => {
//   const [query, setQuery] = useState('');
//   const filtered = securityLogs.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Security Management</h1>
//       <input
//         type="text"
//         className="w-full border rounded px-3 py-2 mb-4"
//         placeholder="Search by name or type..."
//         value={query}
//         onChange={e => setQuery(e.target.value)}
//       />
//       <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
//         <table className="min-w-full text-left">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="py-2 px-4 font-medium text-gray-700">Name/Incident</th>
//               <th className="py-2 px-4 font-medium text-gray-700">Type</th>
//               <th className="py-2 px-4 font-medium text-gray-700">Details</th>
//               <th className="py-2 px-4 font-medium text-gray-700">Status</th>
//               <th className="py-2 px-4 font-medium text-gray-700">Last Action</th>
//               <th className="py-2 px-4 font-medium text-gray-700">Last Updated</th>
//               <th className="py-2 px-4 font-medium text-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.length === 0 ? (
//               <tr><td colSpan={7} className="py-4 text-center text-gray-400">No records found.</td></tr>
//             ) : (
//               filtered.map((s) => (
//                 <tr key={s.id} className="border-b last:border-b-0">
//                   <td className="py-2 px-4 whitespace-nowrap">{s.name}</td>
//                   <td className="py-2 px-4 whitespace-nowrap">{s.type}</td>
//                   <td className="py-2 px-4 whitespace-nowrap">
//                     {s.type === 'Staff' ? (
//                       <>Shift: <span className="font-semibold">{s.shift}</span></>
//                     ) : s.type === 'Visitor' ? (
//                       <>Purpose: <span className="font-semibold">{s.purpose}</span></>
//                     ) : (
//                       <span>-</span>
//                     )}
//                   </td>
//                   <td className={`py-2 px-4 whitespace-nowrap font-semibold ${s.status === 'On Duty' || s.status === 'Checked In' || s.status === 'Reported' ? 'text-green-600' : s.status === 'Checked Out' ? 'text-blue-600' : 'text-yellow-600'}`}>{s.status}</td>
//                   <td className="py-2 px-4 whitespace-nowrap">{s.lastAction}</td>
//                   <td className="py-2 px-4 whitespace-nowrap">{s.lastUpdated}</td>
//                   <td className="py-2 px-4 whitespace-nowrap">
//                     <button className="text-blue-600 hover:underline mr-2">View</button>
//                     <button className="text-green-600 hover:underline">Update</button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SecurityScreen;




import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  FileText,
  DollarSign,
  Search,
  Filter,
  Download,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  TrendingUp,
  AlertCircle,
  LucideIcon
} from 'lucide-react';

// Types
interface Employee {
  id: string;
  name: string;
  role: 'security' | 'housekeeping';
  employeeId: string;
  department: string;
  joiningDate: string;
  phone: string;
  email: string;
  address: string;
  photo: string;
  salary: number;
  shift: 'morning' | 'evening' | 'night';
  status: 'active' | 'inactive';
}

interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'half-day' | 'leave';
  hours: number;
  overtime: number;
}

interface Payslip {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  overtime: number;
  deductions: number;
  netSalary: number;
  generatedDate: string;
  paidDate?: string;
  status: 'paid' | 'pending';
}

interface Stats {
  totalEmployees: number;
  security: number;
  housekeeping: number;
  presentToday: number;
  absentToday: number;
  pendingPayslips: number;
}

// Data generators
const generateSampleEmployees = (): Employee[] => [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'security',
    employeeId: 'SEC001',
    department: 'Security',
    joiningDate: '2023-01-15',
    phone: '+91 98765 43210',
    email: 'rajesh.k@company.com',
    address: 'Hyderabad, Telangana',
    photo: '👨‍✈️',
    salary: 25000,
    shift: 'morning',
    status: 'active'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'housekeeping',
    employeeId: 'HSK001',
    department: 'Housekeeping',
    joiningDate: '2023-03-20',
    phone: '+91 98765 43211',
    email: 'priya.s@company.com',
    address: 'Hyderabad, Telangana',
    photo: '👩‍💼',
    salary: 18000,
    shift: 'morning',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mohammed Ali',
    role: 'security',
    employeeId: 'SEC002',
    department: 'Security',
    joiningDate: '2022-11-10',
    phone: '+91 98765 43212',
    email: 'mohammed.a@company.com',
    address: 'Hyderabad, Telangana',
    photo: '👨‍✈️',
    salary: 28000,
    shift: 'night',
    status: 'active'
  },
  {
    id: '4',
    name: 'Lakshmi Devi',
    role: 'housekeeping',
    employeeId: 'HSK002',
    department: 'Housekeeping',
    joiningDate: '2023-05-01',
    phone: '+91 98765 43213',
    email: 'lakshmi.d@company.com',
    address: 'Hyderabad, Telangana',
    photo: '👩‍💼',
    salary: 20000,
    shift: 'evening',
    status: 'active'
  },
  {
    id: '5',
    name: 'Suresh Reddy',
    role: 'security',
    employeeId: 'SEC003',
    department: 'Security',
    joiningDate: '2023-02-10',
    phone: '+91 98765 43214',
    email: 'suresh.r@company.com',
    address: 'Hyderabad, Telangana',
    photo: '👨‍✈️',
    salary: 26000,
    shift: 'evening',
    status: 'active'
  },
  {
    id: '6',
    name: 'Anjali Patel',
    role: 'housekeeping',
    employeeId: 'HSK003',
    department: 'Housekeeping',
    joiningDate: '2023-04-15',
    phone: '+91 98765 43215',
    email: 'anjali.p@company.com',
    address: 'Hyderabad, Telangana',
    photo: '👩‍💼',
    salary: 19000,
    shift: 'morning',
    status: 'active'
  }
];

const generateSampleAttendance = (): Attendance[] => {
  const attendance: Attendance[] = [];
  const employees = generateSampleEmployees();
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    employees.forEach(emp => {
      const statuses: Attendance['status'][] = ['present', 'present', 'present', 'present', 'absent', 'half-day'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      attendance.push({
        id: `${emp.id}-${i}`,
        employeeId: emp.id,
        date: date.toISOString().split('T')[0],
        checkIn: status === 'present' ? '09:00' : status === 'half-day' ? '09:00' : '-',
        checkOut: status === 'present' ? '18:00' : status === 'half-day' ? '13:00' : '-',
        status,
        hours: status === 'present' ? 9 : status === 'half-day' ? 4 : 0,
        overtime: status === 'present' && Math.random() > 0.7 ? 2 : 0
      });
    });
  }

  return attendance;
};

const generateSamplePayslips = (): Payslip[] => {
  const employees = generateSampleEmployees();
  const payslips: Payslip[] = [];

  employees.forEach(emp => {
    for (let i = 0; i < 3; i++) {
      const month = new Date().getMonth() - i;
      const monthName = new Date(2024, month).toLocaleString('default', { month: 'long' });
      const overtime = Math.floor(Math.random() * 3000);


      payslips.push({
        id: `${emp.id}-${i}`,
        employeeId: emp.id,
        month: monthName,
        year: 2024,
        basicSalary: emp.salary,
        allowances: 2000,
        overtime: overtime,
        deductions: 1000,
        netSalary: emp.salary + 2000 + overtime - 1000,
        generatedDate: new Date(2024, month, 1).toISOString().split('T')[0],
        paidDate: i > 0 ? new Date(2024, month, 5).toISOString().split('T')[0] : undefined,
        status: i > 0 ? 'paid' : 'pending'
      });
    }
  });

  return payslips;
};

// Main App Component
export default function StaffManagementApp() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'employees' | 'attendance' | 'payslips'>('dashboard');
  const [employees, setEmployees] = useState<Employee[]>(generateSampleEmployees());
  const [attendance, setAttendance] = useState<Attendance[]>(generateSampleAttendance());
  const [payslips, setPayslips] = useState<Payslip[]>(generateSamplePayslips());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'profile' | 'attendance' | 'payslip'>('profile');

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats: Stats = {
    totalEmployees: employees.length,
    security: employees.filter(e => e.role === 'security').length,
    housekeeping: employees.filter(e => e.role === 'housekeeping').length,
    presentToday: attendance.filter(a => a.date === new Date().toISOString().split('T')[0] && a.status === 'present').length,
    absentToday: attendance.filter(a => a.date === new Date().toISOString().split('T')[0] && a.status === 'absent').length,
    pendingPayslips: payslips.filter(p => p.status === 'pending').length
  };

  const openModal = (type: 'profile' | 'attendance' | 'payslip', employee: Employee) => {
    setSelectedEmployee(employee);
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Staff Management System
                </h1>
                <p className="text-sm text-slate-400">Security & Housekeeping Operations</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">Today</p>
                <p className="text-sm font-medium">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: 'dashboard' as const, label: 'Dashboard', icon: TrendingUp },
              { id: 'employees' as const, label: 'Employees', icon: Users },
              { id: 'attendance' as const, label: 'Attendance', icon: Calendar },
              { id: 'payslips' as const, label: 'Payslips', icon: FileText }
            ].map(tab => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium transition-all flex items-center gap-2 relative ${
                    activeTab === tab.id
                      ? 'text-cyan-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard stats={stats} employees={employees} attendance={attendance} payslips={payslips} />
        )}

        {activeTab === 'employees' && (
          <EmployeesTab
            employees={filteredEmployees}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            openModal={openModal}
          />
        )}

        {activeTab === 'attendance' && (
          <AttendanceTab
            employees={employees}
            attendance={attendance}
            setAttendance={setAttendance}
          />
        )}

        {activeTab === 'payslips' && (
          <PayslipsTab
            employees={employees}
            payslips={payslips}
            openModal={openModal}
          />
        )}
      </main>

      {/* Modal */}
      {showModal && selectedEmployee && (
        <Modal
          employee={selectedEmployee}
          type={modalType}
          onClose={() => setShowModal(false)}
          attendance={attendance.filter(a => a.employeeId === selectedEmployee.id)}
          payslips={payslips.filter(p => p.employeeId === selectedEmployee.id)}
        />
      )}
    </div>
  );
}

// Dashboard Component
interface DashboardProps {
  stats: Stats;
  employees: Employee[];
  attendance: Attendance[];
  payslips: Payslip[];
}

function Dashboard({ stats, employees, attendance, payslips }: DashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={Users}
          gradient="from-cyan-500 to-blue-600"
          subtitle={`${stats.security} Security, ${stats.housekeeping} Housekeeping`}
        />
        <StatCard
          title="Present Today"
          value={stats.presentToday}
          icon={CheckCircle}
          gradient="from-emerald-500 to-teal-600"
          subtitle={`${stats.absentToday} absent`}
        />
        <StatCard
          title="Pending Payslips"
          value={stats.pendingPayslips}
          icon={FileText}
          gradient="from-amber-500 to-orange-600"
          subtitle="This month"
        />
        <StatCard
          title="Active Staff"
          value={employees.filter(e => e.status === 'active').length}
          icon={TrendingUp}
          gradient="from-purple-500 to-pink-600"
          subtitle="All departments"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            Today's Attendance
          </h3>
          <div className="space-y-3">
            {employees.slice(0, 5).map(emp => {
              const todayAttendance = attendance.find(
                a => a.employeeId === emp.id && a.date === new Date().toISOString().split('T')[0]
              );
              return (
                <div key={emp.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{emp.photo}</div>
                    <div>
                      <p className="font-medium">{emp.name}</p>
                      <p className="text-xs text-slate-400">{emp.employeeId} • {emp.role}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    todayAttendance?.status === 'present' ? 'bg-emerald-500/20 text-emerald-400' :
                    todayAttendance?.status === 'absent' ? 'bg-red-500/20 text-red-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {todayAttendance?.status || 'Not marked'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-cyan-400" />
            Recent Payslips
          </h3>
          <div className="space-y-3">
            {payslips.slice(0, 5).map(payslip => {
              const emp = employees.find(e => e.id === payslip.employeeId);
              return (
                <div key={payslip.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="font-medium">{emp?.name}</p>
                    <p className="text-xs text-slate-400">{payslip.month} {payslip.year}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-cyan-400">₹{payslip.netSalary.toLocaleString()}</p>
                    <div className={`text-xs ${payslip.status === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {payslip.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  gradient: string;
  subtitle: string;
}

function StatCard({ title, value, icon: IconComponent, gradient, subtitle }: StatCardProps) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold mb-1">{value}</p>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

// Employees Tab
interface EmployeesTabProps {
  employees: Employee[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  openModal: (type: 'profile' | 'attendance' | 'payslip', employee: Employee) => void;
}

function EmployeesTab({ employees, searchTerm, setSearchTerm, openModal }: EmployeesTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Employee Directory</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name or employee ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-100 placeholder-slate-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(emp => (
          <div key={emp.id} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{emp.photo}</div>
                <div>
                  <h3 className="font-semibold">{emp.name}</h3>
                  <p className="text-sm text-slate-400">{emp.employeeId}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                emp.role === 'security' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
              }`}>
                {emp.role}
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Department</span>
                <span className="font-medium">{emp.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Shift</span>
                <span className="font-medium capitalize">{emp.shift}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Salary</span>
                <span className="font-medium text-cyan-400">₹{emp.salary.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openModal('profile', emp)}
                className="flex-1 px-3 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all text-sm font-medium flex items-center justify-center gap-1"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              <button
                onClick={() => openModal('attendance', emp)}
                className="flex-1 px-3 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all text-sm font-medium flex items-center justify-center gap-1"
              >
                <Calendar className="w-4 h-4" />
                Attendance
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Attendance Tab
interface AttendanceTabProps {
  employees: Employee[];
  attendance: Attendance[];
  setAttendance: React.Dispatch<React.SetStateAction<Attendance[]>>;
}

function AttendanceTab({ employees, attendance, setAttendance }: AttendanceTabProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterRole, setFilterRole] = useState<'all' | 'security' | 'housekeeping'>('all');

  const markAttendance = (employeeId: string, status: Attendance['status']) => {
    setAttendance(prev => {
      const existing = prev.find(a => a.employeeId === employeeId && a.date === selectedDate);
      if (existing) {
        return prev.map(a =>
          a.employeeId === employeeId && a.date === selectedDate
            ? { ...a, status, checkIn: status === 'present' ? '09:00' : '-', checkOut: status === 'present' ? '18:00' : '-', hours: status === 'present' ? 9 : status === 'half-day' ? 4 : 0 }
            : a
        );
      } else {
        return [...prev, {
          id: `${employeeId}-${Date.now()}`,
          employeeId,
          date: selectedDate,
          checkIn: status === 'present' ? '09:00' : '-',
          checkOut: status === 'present' ? '18:00' : '-',
          status,
          hours: status === 'present' ? 9 : status === 'half-day' ? 4 : 0,
          overtime: 0
        }];
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Attendance Management</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-100"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value as 'all' | 'security' | 'housekeeping')}
          className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-100"
        >
          <option value="all">All Roles</option>
          <option value="security">Security</option>
          <option value="housekeeping">Housekeeping</option>
        </select>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Employee</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Check In</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Check Out</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Hours</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter(e => filterRole === 'all' || e.role === filterRole)
              .map(emp => {
                const att = attendance.find(a => a.employeeId === emp.id && a.date === selectedDate);
                return (
                  <tr key={emp.id} className="border-t border-slate-800 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{emp.photo}</div>
                        <div>
                          <p className="font-medium">{emp.name}</p>
                          <p className="text-xs text-slate-400">{emp.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        emp.role === 'security' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {emp.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{att?.checkIn || '-'}</td>
                    <td className="px-6 py-4 text-sm">{att?.checkOut || '-'}</td>
                    <td className="px-6 py-4 text-sm">{att?.hours || 0}h</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        att?.status === 'present' ? 'bg-emerald-500/20 text-emerald-400' :
                        att?.status === 'absent' ? 'bg-red-500/20 text-red-400' :
                        att?.status === 'half-day' ? 'bg-amber-500/20 text-amber-400' :
                        att?.status === 'leave' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {att?.status || 'Not marked'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <button
                          onClick={() => markAttendance(emp.id, 'present')}
                          className="p-1 hover:bg-emerald-500/20 rounded text-emerald-400 transition-all"
                          title="Mark Present"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => markAttendance(emp.id, 'absent')}
                          className="p-1 hover:bg-red-500/20 rounded text-red-400 transition-all"
                          title="Mark Absent"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Payslips Tab
interface PayslipsTabProps {
  employees: Employee[];
  payslips: Payslip[];
  openModal: (type: 'profile' | 'attendance' | 'payslip', employee: Employee) => void;
}

function PayslipsTab({ employees, payslips, openModal }: PayslipsTabProps) {
  const [filterMonth, setFilterMonth] = useState('all');

  const filteredPayslips = filterMonth === 'all'
    ? payslips
    : payslips.filter(p => p.month === filterMonth);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Payslip Management</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Generate Payslips
        </button>
      </div>

      <select
        value={filterMonth}
        onChange={(e) => setFilterMonth(e.target.value)}
        className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-100"
      >
        <option value="all">All Months</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="December">December</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPayslips.map(payslip => {
          const emp = employees.find(e => e.id === payslip.employeeId);
          return (
            <div key={payslip.id} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{emp?.photo}</div>
                  <div>
                    <h3 className="font-semibold">{emp?.name}</h3>
                    <p className="text-sm text-slate-400">{emp?.employeeId}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  payslip.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {payslip.status}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4 mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Period</span>
                  <span className="font-medium">{payslip.month} {payslip.year}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Basic Salary</span>
                  <span>₹{payslip.basicSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Allowances</span>
                  <span className="text-emerald-400">+₹{payslip.allowances.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Overtime</span>
                  <span className="text-emerald-400">+₹{payslip.overtime.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Deductions</span>
                  <span className="text-red-400">-₹{payslip.deductions.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-700 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Net Salary</span>
                    <span className="font-bold text-lg text-cyan-400">₹{payslip.netSalary.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => emp && openModal('payslip', emp)}
                className="w-full px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all font-medium flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Payslip
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Modal Component
interface ModalProps {
  employee: Employee;
  type: 'profile' | 'attendance' | 'payslip';
  onClose: () => void;
  attendance: Attendance[];
  payslips: Payslip[];
}

function Modal({ employee, type, onClose, attendance, payslips }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {type === 'profile' && 'Employee Profile'}
            {type === 'attendance' && 'Attendance History'}
            {type === 'payslip' && 'Payslip Details'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-all">
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {type === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{employee.photo}</div>
                <div>
                  <h3 className="text-2xl font-bold">{employee.name}</h3>
                  <p className="text-slate-400">{employee.employeeId} • {employee.department}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Role</p>
                  <p className="font-semibold capitalize">{employee.role}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Shift</p>
                  <p className="font-semibold capitalize">{employee.shift}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Joining Date</p>
                  <p className="font-semibold">{new Date(employee.joiningDate).toLocaleDateString('en-IN')}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Salary</p>
                  <p className="font-semibold text-cyan-400">₹{employee.salary.toLocaleString()}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl col-span-2">
                  <p className="text-sm text-slate-400 mb-1">Phone</p>
                  <p className="font-semibold">{employee.phone}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl col-span-2">
                  <p className="text-sm text-slate-400 mb-1">Email</p>
                  <p className="font-semibold">{employee.email}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl col-span-2">
                  <p className="text-sm text-slate-400 mb-1">Address</p>
                  <p className="font-semibold">{employee.address}</p>
                </div>
              </div>
            </div>
          )}

          {type === 'attendance' && (
            <div className="space-y-4">
              {attendance.slice(0, 10).map(att => (
                <div key={att.id} className="bg-slate-800/50 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-medium">{new Date(att.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    <p className="text-sm text-slate-400">{att.checkIn} - {att.checkOut}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      att.status === 'present' ? 'bg-emerald-500/20 text-emerald-400' :
                      att.status === 'absent' ? 'bg-red-500/20 text-red-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {att.status}
                    </span>
                    <p className="text-sm text-slate-400 mt-1">{att.hours}h worked</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {type === 'payslip' && payslips.length > 0 && (
            <div className="space-y-4">
              {payslips.slice(0, 1).map(payslip => (
                <div key={payslip.id} className="space-y-4">
                  <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-2">{payslip.month} {payslip.year}</h3>
                    <div className="text-3xl font-bold text-cyan-400">₹{payslip.netSalary.toLocaleString()}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400">Basic Salary</span>
                      <span className="font-medium">₹{payslip.basicSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400">Allowances</span>
                      <span className="font-medium text-emerald-400">+₹{payslip.allowances.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400">Overtime Pay</span>
                      <span className="font-medium text-emerald-400">+₹{payslip.overtime.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400">Deductions</span>
                      <span className="font-medium text-red-400">-₹{payslip.deductions.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">Net Salary</span>
                      <span className="font-bold text-2xl text-cyan-400">₹{payslip.netSalary.toLocaleString()}</span>
                    </div>
                  </div>

                  <button className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
