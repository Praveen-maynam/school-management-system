



import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, ChevronRight, UserCog, Briefcase, Phone, Mail, Award, Clock, Building, Shield, Wrench, Bus, Utensils, Stethoscope, Home } from 'lucide-react';

const SchoolAdminDashboard = () => {
  // Removed unused activeScreen state
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
    // Add Staff modal state and form
    const [showAddStaffModal, setShowAddStaffModal] = useState(false);
    const [addStaffForm, setAddStaffForm] = useState({
      name: '',
      position: '',
      empId: '',
      phone: '',
      email: '',
      joinDate: '',
      salary: '',
      shift: '',
      status: 'Active',
      experience: '',
      address: '',
      qualification: ''
    });
    const [addStaffError, setAddStaffError] = useState<string | null>(null);
    const [addStaffSuccess, setAddStaffSuccess] = useState<string | null>(null);

    const handleAddStaffChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setAddStaffForm({ ...addStaffForm, [e.target.name]: e.target.value });
    };

    const handleAddStaffSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setAddStaffError(null);
      setAddStaffSuccess(null);
      if (!addStaffForm.name.trim() || !addStaffForm.position.trim() || !addStaffForm.empId.trim()) {
        setAddStaffError('Name, Position, and Emp ID are required.');
        return;
      }
      setAddStaffSuccess('Staff added successfully!');
      setTimeout(() => {
        setShowAddStaffModal(false);
        setAddStaffSuccess(null);
      }, 1200);
      setAddStaffForm({
        name: '', position: '', empId: '', phone: '', email: '', joinDate: '', salary: '', shift: '', status: 'Active', experience: '', address: '', qualification: ''
      });
    };
    const [selectedDate, setSelectedDate] = useState(() => {
      const today = new Date();
      return today.toISOString().split('T')[0];
    });
    const staff =
      selectedDepartment && typeof selectedDepartment.id === 'number'
        ? staffData[selectedDepartment.id as keyof typeof staffData] || []
        : [];
    // Demo attendance logic: alternate present/absent by empId and date
    const getAttendanceStatus = (empId: string) => {
      const hash = empId.charCodeAt(0) + selectedDate.charCodeAt(selectedDate.length - 1);
      return hash % 2 === 0 ? 'Present' : 'Absent';
    };
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
            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Date</span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
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
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setShowAddStaffModal(true)}
              >
                <Plus className="w-4 h-4" />
                Add Staff
              </button>
                  {/* Add Staff Modal */}
                  {showAddStaffModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
                        <button
                          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowAddStaffModal(false)}
                        >✕</button>
                        <h3 className="text-xl font-bold mb-4 text-gray-900">Add Staff</h3>
                        <form onSubmit={handleAddStaffSubmit}>
                          <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Name *</label>
                            <input name="name" value={addStaffForm.name} onChange={handleAddStaffChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Position *</label>
                            <input name="position" value={addStaffForm.position} onChange={handleAddStaffChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Emp ID *</label>
                            <input name="empId" value={addStaffForm.empId} onChange={handleAddStaffChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Phone</label>
                            <input name="phone" value={addStaffForm.phone} onChange={handleAddStaffChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input name="email" value={addStaffForm.email} onChange={handleAddStaffChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Join Date</label>
                            <input name="joinDate" value={addStaffForm.joinDate} onChange={handleAddStaffChange} type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Salary</label>
                            <input name="salary" value={addStaffForm.salary} onChange={handleAddStaffChange} type="number" min="0" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Shift</label>
                            <input name="shift" value={addStaffForm.shift} onChange={handleAddStaffChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Status</label>
                            <select name="status" value={addStaffForm.status} onChange={handleAddStaffChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                              <option value="On Leave">On Leave</option>
                            </select>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Experience</label>
                            <input name="experience" value={addStaffForm.experience} onChange={handleAddStaffChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Address</label>
                            <input name="address" value={addStaffForm.address} onChange={handleAddStaffChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Qualification</label>
                            <input name="qualification" value={addStaffForm.qualification} onChange={handleAddStaffChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          {addStaffError && <div className="mb-2 text-red-600 text-sm">{addStaffError}</div>}
                          {addStaffSuccess && <div className="mb-2 text-green-600 text-sm">{addStaffSuccess}</div>}
                          <div className="flex justify-end gap-2 mt-4">
                            <button
                              type="button"
                              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                              onClick={() => setShowAddStaffModal(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                            >
                              Add Staff
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
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
                        {member.name.split(' ').map((n: string) => n[0]).join('')}
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
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getAttendanceStatus(member.empId) === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {getAttendanceStatus(member.empId)}
                    </span>
                  </td>
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