
import React, { useState } from 'react';
import Pagination from '../../../components/ui/Pagination';
import { Users, UserPlus, Shield, Settings, BarChart3, BookOpen, Calendar, FileText, ChevronRight, Search, Filter, Edit, Trash2, Lock, X, Check } from 'lucide-react';


const SchoolAdminSystem = () => {
    // Delete user handler
    const handleDeleteUser = (userId: number) => {
      setUsers(prev => prev.filter((u) => u.id !== userId));
    };
  const [activePage, setActivePage] = useState('users');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  type UserType = {
    id: number;
    name: string;
    email: string;
    role: string;
    department: string;
    status: string;
    lastLogin: string;
    permissions: string[];
  };
  
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Simulated current admin user
  const currentAdmin = {
    id: 1,
    name: 'Admin User',
    role: 'super_admin',
    permissions: ['all']
  };

  // Sample users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@school.edu',
      role: 'teacher',
      department: 'Mathematics',
      status: 'active',
      lastLogin: '2026-01-24',
      permissions: ['view_students', 'edit_grades', 'view_reports']
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@school.edu',
      role: 'admin',
      department: 'Administration',
      status: 'active',
      lastLogin: '2026-01-24',
      permissions: ['view_students', 'edit_students', 'view_reports', 'manage_users']
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.d@school.edu',
      role: 'teacher',
      department: 'Science',
      status: 'inactive',
      lastLogin: '2026-01-20',
      permissions: ['view_students', 'edit_grades']
    },
    {
      id: 4,
      name: 'Emily Brown',
      email: 'emily.b@school.edu',
      role: 'staff',
      department: 'Library',
      status: 'active',
      lastLogin: '2026-01-23',
      permissions: ['view_students', 'view_reports']
    },
    {
      id: 5,
      name: 'Emily Brown',
      email: 'emily.b@school.edu',
      role: 'staff',
      department: 'Library',
      status: 'active',
      lastLogin: '2026-01-23',
      permissions: ['view_students', 'view_reports']
    },
    {
      id: 6,
      name: 'Emily Brown',
      email: 'emily.b@school.edu',
      role: 'staff',
      department: 'Library',
      status: 'active',
      lastLogin: '2026-01-23',
      permissions: ['view_students', 'view_reports']
    }
  ]);

  // Permission definitions
  const availablePermissions = {
    students: [
      { id: 'view_students', label: 'View Students', description: 'Access student list and profiles' },
      { id: 'edit_students', label: 'Edit Students', description: 'Modify student information' },
      { id: 'delete_students', label: 'Delete Students', description: 'Remove student records' }
    ],
    grades: [
      { id: 'view_grades', label: 'View Grades', description: 'See student grades' },
      { id: 'edit_grades', label: 'Edit Grades', description: 'Modify student grades' },
      { id: 'export_grades', label: 'Export Grades', description: 'Download grade reports' }
    ],
    reports: [
      { id: 'view_reports', label: 'View Reports', description: 'Access system reports' },
      { id: 'create_reports', label: 'Create Reports', description: 'Generate new reports' },
      { id: 'export_reports', label: 'Export Reports', description: 'Download reports' }
    ],
    system: [
      { id: 'manage_users', label: 'Manage Users', description: 'Create, edit, delete users' },
      { id: 'system_settings', label: 'System Settings', description: 'Modify system configuration' },
      { id: 'view_logs', label: 'View Logs', description: 'Access system activity logs' }
    ]
  };

  const menuItems = [
  
    { id: 'users', icon: Users, label: 'User Management', permission: 'manage_users' },

  ];

  const hasPermission = (permission: string) => {
    return currentAdmin.permissions.includes('all') || currentAdmin.permissions.includes(permission);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Pagination state for users table
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Production-level: adjust as needed
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Reset to first page when filters/search change
  React.useEffect(() => { setCurrentPage(1); }, [searchTerm, filterRole, users.length]);

  const getRoleBadgeColor = (role: keyof typeof colors | string) => {
    const colors = {
      super_admin: 'bg-purple-100 text-purple-800',
      admin: 'bg-blue-100 text-blue-800',
      teacher: 'bg-green-100 text-green-800',
      staff: 'bg-gray-100 text-gray-800'
    };
    return (colors as Record<string, string>)[role] || 'bg-gray-100 text-gray-800';
  };

  const UserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <h3 className="text-xl font-semibold">
            {selectedUser ? 'Edit User' : 'Add New User'}
          </h3>
          <button onClick={() => setShowUserModal(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                defaultValue={selectedUser?.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue={selectedUser?.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@school.edu"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                defaultValue={selectedUser?.role}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                defaultValue={selectedUser?.department}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Department"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              defaultValue={selectedUser?.status}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="p-6 border-t flex justify-end gap-3 sticky bottom-0 bg-white">
          <button
            onClick={() => setShowUserModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {selectedUser ? 'Update User' : 'Create User'}
          </button>
        </div>
      </div>
    </div>
  );

  const PermissionsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <div>
            <h3 className="text-xl font-semibold">Manage Permissions</h3>
            <p className="text-sm text-gray-600 mt-1">
              {selectedUser?.name} - {selectedUser?.role}
            </p>
          </div>
          <button onClick={() => setShowPermissionsModal(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {Object.entries(availablePermissions).map(([category, perms]) => (
            <div key={category} className="border rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-3 capitalize">{category}</h4>
              <div className="space-y-3">
                {perms.map(perm => (
                  <label key={perm.id} className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      defaultChecked={selectedUser?.permissions.includes(perm.id)}
                      className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{perm.label}</div>
                      <div className="text-sm text-gray-600">{perm.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 border-t flex justify-end gap-3 sticky bottom-0 bg-white">
          <button
            onClick={() => setShowPermissionsModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Permissions
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">Manage users, roles, and permissions</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Total Users</span>
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold">{users.length}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Active Users</span>
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Teachers</span>
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold">{users.filter(u => u.role === 'teacher').length}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Admins</span>
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-2xl font-bold">{users.filter(u => u.role === 'admin' || u.role === 'super_admin').length}</div>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="all">All Roles</option>
                    <option value="teacher">Teachers</option>
                    <option value="admin">Admins</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setShowUserModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <UserPlus className="w-5 h-5" />
                Add User
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                          {user.role.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.department}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.lastLogin}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowPermissionsModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Manage Permissions"
                          >
                            <Lock className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserModal(true);
                            }}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit User"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
                {/* Pagination Controls */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              {/* Pagination Controls */}
              
            {/* End table and pagination block */}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showUserModal && <UserModal />}
      {showPermissionsModal && <PermissionsModal />}
    </div>
  );
};

export default SchoolAdminSystem;