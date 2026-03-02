import React, { useState, useMemo } from 'react';
import { Search, Shield, Users, Lock, Plus, Edit2, Trash2, Check, X, Copy, AlertCircle } from 'lucide-react';

// Types
interface Permission {
  id: string;
  name: string;
  category: string;
  description: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  color: string;
  isSystem: boolean;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  avatar?: string;
}

// Permission categories and permissions data
const PERMISSION_CATEGORIES = {
  students: 'Student Management',
  teachers: 'Teacher Management',
  courses: 'Course Management',
  attendance: 'Attendance',
  grades: 'Grades & Assessment',
  fees: 'Fees & Payments',
  reports: 'Reports & Analytics',
  settings: 'System Settings',
};

const ALL_PERMISSIONS: Permission[] = [
  // Student Management
  { id: 'students.view', name: 'View Students', category: 'students', description: 'View student profiles and information' },
  { id: 'students.create', name: 'Add Students', category: 'students', description: 'Create new student records' },
  { id: 'students.edit', name: 'Edit Students', category: 'students', description: 'Modify student information' },
  { id: 'students.delete', name: 'Delete Students', category: 'students', description: 'Remove student records' },
  { id: 'students.export', name: 'Export Students', category: 'students', description: 'Export student data' },
  
  // Teacher Management
  { id: 'teachers.view', name: 'View Teachers', category: 'teachers', description: 'View teacher profiles' },
  { id: 'teachers.create', name: 'Add Teachers', category: 'teachers', description: 'Create teacher accounts' },
  { id: 'teachers.edit', name: 'Edit Teachers', category: 'teachers', description: 'Modify teacher information' },
  { id: 'teachers.delete', name: 'Delete Teachers', category: 'teachers', description: 'Remove teacher accounts' },
  
  // Course Management
  { id: 'courses.view', name: 'View Courses', category: 'courses', description: 'View course listings' },
  { id: 'courses.create', name: 'Create Courses', category: 'courses', description: 'Add new courses' },
  { id: 'courses.edit', name: 'Edit Courses', category: 'courses', description: 'Modify course details' },
  { id: 'courses.delete', name: 'Delete Courses', category: 'courses', description: 'Remove courses' },
  { id: 'courses.assign', name: 'Assign Teachers', category: 'courses', description: 'Assign teachers to courses' },
  
  // Attendance
  { id: 'attendance.view', name: 'View Attendance', category: 'attendance', description: 'View attendance records' },
  { id: 'attendance.mark', name: 'Mark Attendance', category: 'attendance', description: 'Record attendance' },
  { id: 'attendance.edit', name: 'Edit Attendance', category: 'attendance', description: 'Modify attendance records' },
  { id: 'attendance.reports', name: 'Attendance Reports', category: 'attendance', description: 'Generate attendance reports' },
  
  // Grades & Assessment
  { id: 'grades.view', name: 'View Grades', category: 'grades', description: 'View student grades' },
  { id: 'grades.enter', name: 'Enter Grades', category: 'grades', description: 'Input student grades' },
  { id: 'grades.edit', name: 'Edit Grades', category: 'grades', description: 'Modify grades' },
  { id: 'grades.publish', name: 'Publish Grades', category: 'grades', description: 'Make grades visible to students' },
  
  // Fees & Payments
  { id: 'fees.view', name: 'View Fees', category: 'fees', description: 'View fee structures' },
  { id: 'fees.manage', name: 'Manage Fees', category: 'fees', description: 'Configure fee structures' },
  { id: 'fees.collect', name: 'Collect Payments', category: 'fees', description: 'Process fee payments' },
  { id: 'fees.refund', name: 'Process Refunds', category: 'fees', description: 'Handle refund requests' },
  
  // Reports & Analytics
  { id: 'reports.view', name: 'View Reports', category: 'reports', description: 'Access system reports' },
  { id: 'reports.create', name: 'Create Reports', category: 'reports', description: 'Generate custom reports' },
  { id: 'reports.export', name: 'Export Reports', category: 'reports', description: 'Export report data' },
  { id: 'reports.analytics', name: 'Analytics Dashboard', category: 'reports', description: 'Access analytics dashboard' },
  
  // System Settings
  { id: 'settings.view', name: 'View Settings', category: 'settings', description: 'View system configuration' },
  { id: 'settings.edit', name: 'Edit Settings', category: 'settings', description: 'Modify system settings' },
  { id: 'settings.backup', name: 'Backup System', category: 'settings', description: 'Create system backups' },
  { id: 'settings.users', name: 'Manage Users', category: 'settings', description: 'User account management' },
];

// Sample roles data
const INITIAL_ROLES: Role[] = [
  {
    id: '1',
    name: 'Super Administrator',
    description: 'Full system access with all permissions',
    userCount: 2,
    permissions: ALL_PERMISSIONS.map(p => p.id),
    color: '#dc2626',
    isSystem: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Principal',
    description: 'School principal with administrative privileges',
    userCount: 1,
    permissions: ALL_PERMISSIONS.filter(p => !p.id.startsWith('settings.')).map(p => p.id),
    color: '#7c3aed',
    isSystem: true,
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'Teacher',
    description: 'Teaching staff with course and grade management',
    userCount: 45,
    permissions: [
      'students.view', 'courses.view', 'attendance.view', 'attendance.mark', 
      'attendance.edit', 'grades.view', 'grades.enter', 'grades.edit', 'reports.view'
    ],
    color: '#0891b2',
    isSystem: false,
    createdAt: '2024-01-20',
  },
  {
    id: '4',
    name: 'Accountant',
    description: 'Financial management and fee collection',
    userCount: 3,
    permissions: [
      'students.view', 'fees.view', 'fees.manage', 'fees.collect', 
      'fees.refund', 'reports.view', 'reports.export'
    ],
    color: '#16a34a',
    isSystem: false,
    createdAt: '2024-02-01',
  },
  {
    id: '5',
    name: 'Receptionist',
    description: 'Front desk and basic administrative tasks',
    userCount: 4,
    permissions: ['students.view', 'teachers.view', 'courses.view', 'attendance.view'],
    color: '#ea580c',
    isSystem: false,
    createdAt: '2024-02-10',
  },
];

// Main Component
export default function RolesPermissionsManagement() {
  const [activeTab, setActiveTab] = useState<'roles' | 'permissions'>('roles');
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filtered permissions based on search and category
  const filteredPermissions = useMemo(() => {
    let filtered = ALL_PERMISSIONS;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategory]);

  // Group permissions by category
  const groupedPermissions = useMemo(() => {
    const groups: Record<string, Permission[]> = {};
    filteredPermissions.forEach(permission => {
      if (!groups[permission.category]) {
        groups[permission.category] = [];
      }
      groups[permission.category].push(permission);
    });
    return groups;
  }, [filteredPermissions]);

  const handleTogglePermission = (permissionId: string) => {
    if (!selectedRole) return;
    
    const updatedPermissions = selectedRole.permissions.includes(permissionId)
      ? selectedRole.permissions.filter(p => p !== permissionId)
      : [...selectedRole.permissions, permissionId];
    
    const updatedRole = { ...selectedRole, permissions: updatedPermissions };
    setSelectedRole(updatedRole);
  };

  const handleSaveRole = () => {
    if (!selectedRole) return;
    
    setRoles(roles.map(r => r.id === selectedRole.id ? selectedRole : r));
    setIsEditing(false);
    setSelectedRole(null);
  };

  const handleCreateRole = (newRole: Omit<Role, 'id' | 'createdAt'>) => {
    const role: Role = {
      ...newRole,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setRoles([...roles, role]);
    setIsCreating(false);
  };

  const handleDeleteRole = (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(r => r.id !== roleId));
      setSelectedRole(null);
    }
  };

  const handleDuplicateRole = (role: Role) => {
    const duplicated: Role = {
      ...role,
      id: Date.now().toString(),
      name: `${role.name} (Copy)`,
      isSystem: false,
      userCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setRoles([...roles, duplicated]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
                  Roles & Permissions
                </h1>
                <p className="text-slate-600 mt-1 font-medium">Manage access control for your school management system</p>
              </div>
            </div>
            
            {activeTab === 'roles' && (
              <button
                onClick={() => setIsCreating(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create New Role
              </button>
            )}
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 mt-6 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('roles')}
              className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
                activeTab === 'roles'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Roles Management
              </div>
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
                activeTab === 'permissions'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Permissions Overview
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {activeTab === 'roles' ? (
          <RolesTab
            roles={roles}
            selectedRole={selectedRole}
            isEditing={isEditing}
            isCreating={isCreating}
            onSelectRole={setSelectedRole}
            onEditRole={() => setIsEditing(true)}
            onCancelEdit={() => {
              setIsEditing(false);
              setIsCreating(false);
              setSelectedRole(null);
            }}
            onSaveRole={handleSaveRole}
            onDeleteRole={handleDeleteRole}
            onDuplicateRole={handleDuplicateRole}
            onTogglePermission={handleTogglePermission}
            onCreateRole={handleCreateRole}
            allPermissions={ALL_PERMISSIONS}
          />
        ) : (
          <PermissionsTab
            permissions={filteredPermissions}
            groupedPermissions={groupedPermissions}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategory}
            roles={roles}
          />
        )}
      </div>
    </div>
  );
}

// Roles Tab Component
interface RolesTabProps {
  roles: Role[];
  selectedRole: Role | null;
  isEditing: boolean;
  isCreating: boolean;
  onSelectRole: (role: Role) => void;
  onEditRole: () => void;
  onCancelEdit: () => void;
  onSaveRole: () => void;
  onDeleteRole: (roleId: string) => void;
  onDuplicateRole: (role: Role) => void;
  onTogglePermission: (permissionId: string) => void;
  onCreateRole: (role: Omit<Role, 'id' | 'createdAt'>) => void;
  allPermissions: Permission[];
}

function RolesTab({
  roles,
  selectedRole,
  isEditing,
  isCreating,
  onSelectRole,
  onEditRole,
  onCancelEdit,
  onSaveRole,
  onDeleteRole,
  onDuplicateRole,
  onTogglePermission,
  onCreateRole,
  allPermissions,
}: RolesTabProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Roles List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
            <h2 className="text-xl font-bold text-slate-900 mb-4">All Roles</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          <div className="divide-y divide-slate-200 max-h-[calc(100vh-400px)] overflow-y-auto">
            {filteredRoles.map((role) => (
              <button
                key={role.id}
                onClick={() => onSelectRole(role)}
                className={`w-full p-5 text-left transition-all duration-200 hover:bg-slate-50 ${
                  selectedRole?.id === role.id ? 'bg-indigo-50 border-l-4 border-indigo-600' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: role.color + '20' }}
                    >
                      <Shield className="w-5 h-5" style={{ color: role.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{role.name}</h3>
                      {role.isSystem && (
                        <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded mt-1">
                          System Role
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{role.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{role.userCount} users</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="w-4 h-4" />
                    <span className="font-medium">{role.permissions.length} permissions</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Role Details */}
      <div className="lg:col-span-2">
        {isCreating ? (
          <RoleEditor
            role={null}
            allPermissions={allPermissions}
            onSave={onCreateRole}
            onCancel={onCancelEdit}
          />
        ) : selectedRole ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
            <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: selectedRole.color + '20' }}
                  >
                    <Shield className="w-8 h-8" style={{ color: selectedRole.color }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedRole.name}</h2>
                    <p className="text-slate-600 mt-1">{selectedRole.description}</p>
                  </div>
                </div>
                
                {!isEditing && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onDuplicateRole(selectedRole)}
                      className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      title="Duplicate Role"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    <button
                      onClick={onEditRole}
                      className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      title="Edit Role"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    {!selectedRole.isSystem && (
                      <button
                        onClick={() => onDeleteRole(selectedRole.id)}
                        className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Role"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-500" />
                  <span className="text-sm font-semibold text-slate-700">{selectedRole.userCount} assigned users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-slate-500" />
                  <span className="text-sm font-semibold text-slate-700">{selectedRole.permissions.length} permissions</span>
                </div>
              </div>
            </div>

            {isEditing ? (
              <div className="p-8">
                <PermissionSelector
                  selectedPermissions={selectedRole.permissions}
                  allPermissions={allPermissions}
                  onTogglePermission={onTogglePermission}
                />
                
                <div className="flex gap-3 mt-8 pt-6 border-t border-slate-200">
                  <button
                    onClick={onSaveRole}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg font-semibold flex items-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Save Changes
                  </button>
                  <button
                    onClick={onCancelEdit}
                    className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 font-semibold flex items-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Assigned Permissions</h3>
                <PermissionsList
                  permissions={allPermissions.filter(p => selectedRole.permissions.includes(p.id))}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-16 text-center">
            <Shield className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Role Selected</h3>
            <p className="text-slate-600">Select a role from the list to view and manage its permissions</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Role Editor Component
interface RoleEditorProps {
  role: Role | null;
  allPermissions: Permission[];
  onSave: (role: Omit<Role, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

function RoleEditor({ role, allPermissions, onSave, onCancel }: RoleEditorProps) {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    color: role?.color || '#0891b2',
    permissions: role?.permissions || [],
    userCount: role?.userCount || 0,
    isSystem: role?.isSystem || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleTogglePermission = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
      <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
        <h2 className="text-2xl font-bold text-slate-900">
          {role ? 'Edit Role' : 'Create New Role'}
        </h2>
        <p className="text-slate-600 mt-1">Configure role details and permissions</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Role Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="e.g., Department Head"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Role Color
            </label>
            <div className="flex gap-3">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="h-12 w-12 rounded-lg border border-slate-300 cursor-pointer"
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="#0891b2"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Description *
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
            placeholder="Brief description of this role's responsibilities"
          />
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Assign Permissions</h3>
          <PermissionSelector
            selectedPermissions={formData.permissions}
            allPermissions={allPermissions}
            onTogglePermission={handleTogglePermission}
          />
        </div>

        <div className="flex gap-3 pt-6 border-t border-slate-200">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg font-semibold flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            {role ? 'Save Changes' : 'Create Role'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 font-semibold flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// Permission Selector Component
interface PermissionSelectorProps {
  selectedPermissions: string[];
  allPermissions: Permission[];
  onTogglePermission: (permissionId: string) => void;
}

function PermissionSelector({ selectedPermissions, allPermissions, onTogglePermission }: PermissionSelectorProps) {
  const groupedPermissions: Record<string, Permission[]> = {};
  allPermissions.forEach(permission => {
    if (!groupedPermissions[permission.category]) {
      groupedPermissions[permission.category] = [];
    }
    groupedPermissions[permission.category].push(permission);
  });

  const getCategoryPermissions = (category: string) => {
    return groupedPermissions[category] || [];
  };

  const isCategoryFullySelected = (category: string) => {
    const categoryPerms = getCategoryPermissions(category);
    return categoryPerms.length > 0 && categoryPerms.every(p => selectedPermissions.includes(p.id));
  };

  const toggleCategoryPermissions = (category: string) => {
    const categoryPerms = getCategoryPermissions(category);
    const allSelected = isCategoryFullySelected(category);
    
    categoryPerms.forEach(permission => {
      if (allSelected && selectedPermissions.includes(permission.id)) {
        onTogglePermission(permission.id);
      } else if (!allSelected && !selectedPermissions.includes(permission.id)) {
        onTogglePermission(permission.id);
      }
    });
  };

  return (
    <div className="space-y-6">
      {Object.entries(PERMISSION_CATEGORIES).map(([key, label]) => {
        const categoryPerms = getCategoryPermissions(key);
        if (categoryPerms.length === 0) return null;
        
        const fullySelected = isCategoryFullySelected(key);
        const partiallySelected = categoryPerms.some(p => selectedPermissions.includes(p.id)) && !fullySelected;

        return (
          <div key={key} className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleCategoryPermissions(key)}
              className="w-full px-6 py-4 bg-gradient-to-r from-slate-50 to-blue-50 hover:from-slate-100 hover:to-blue-100 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  fullySelected 
                    ? 'bg-indigo-600 border-indigo-600' 
                    : partiallySelected
                    ? 'bg-indigo-200 border-indigo-400'
                    : 'border-slate-300 bg-white'
                }`}>
                  {fullySelected && <Check className="w-3 h-3 text-white" />}
                  {partiallySelected && <div className="w-2 h-2 bg-indigo-600 rounded-sm" />}
                </div>
                <span className="font-bold text-slate-900">{label}</span>
              </div>
              <span className="text-sm text-slate-600 font-medium">
                {categoryPerms.filter(p => selectedPermissions.includes(p.id)).length} / {categoryPerms.length}
              </span>
            </button>
            
            <div className="p-4 space-y-2 bg-white">
              {categoryPerms.map((permission) => (
                <label
                  key={permission.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-all"
                >
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(permission.id)}
                    onChange={() => onTogglePermission(permission.id)}
                    className="mt-1 w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">{permission.name}</div>
                    <div className="text-sm text-slate-600 mt-0.5">{permission.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Permissions List Component
interface PermissionsListProps {
  permissions: Permission[];
}

function PermissionsList({ permissions }: PermissionsListProps) {
  const groupedPermissions: Record<string, Permission[]> = {};
  permissions.forEach(permission => {
    if (!groupedPermissions[permission.category]) {
      groupedPermissions[permission.category] = [];
    }
    groupedPermissions[permission.category].push(permission);
  });

  if (permissions.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <Lock className="w-16 h-16 mx-auto mb-3 opacity-30" />
        <p>No permissions assigned to this role</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedPermissions).map(([category, perms]) => (
        <div key={category} className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-3 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
            <h4 className="font-bold text-slate-900">{PERMISSION_CATEGORIES[category as keyof typeof PERMISSION_CATEGORIES]}</h4>
          </div>
          <div className="p-4 space-y-2 bg-white">
            {perms.map((permission) => (
              <div key={permission.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-slate-900">{permission.name}</div>
                  <div className="text-sm text-slate-600 mt-0.5">{permission.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Permissions Tab Component
interface PermissionsTabProps {
  permissions: Permission[];
  groupedPermissions: Record<string, Permission[]>;
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  roles: Role[];
}

function PermissionsTab({
  permissions,
  groupedPermissions,
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  roles,
}: PermissionsTabProps) {
  const getRolesWithPermission = (permissionId: string) => {
    return roles.filter(role => role.permissions.includes(permissionId));
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search permissions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          >
            <option value="all">All Categories</option>
            {Object.entries(PERMISSION_CATEGORIES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Permissions Grid */}
      <div className="space-y-6">
        {Object.entries(groupedPermissions).map(([category, perms]) => (
          <div key={category} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="px-8 py-5 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">
                {PERMISSION_CATEGORIES[category as keyof typeof PERMISSION_CATEGORIES]}
              </h3>
              <p className="text-sm text-slate-600 mt-1">{perms.length} permissions</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {perms.map((permission) => {
                  const assignedRoles = getRolesWithPermission(permission.id);
                  
                  return (
                    <div
                      key={permission.id}
                      className="p-5 border border-slate-200 rounded-xl hover:shadow-md transition-all bg-gradient-to-br from-white to-slate-50"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          <Lock className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900">{permission.name}</h4>
                          <p className="text-sm text-slate-600 mt-1">{permission.description}</p>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-slate-200">
                        <div className="text-xs font-semibold text-slate-500 mb-2">Assigned to:</div>
                        {assignedRoles.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {assignedRoles.map((role) => (
                              <span
                                key={role.id}
                                className="px-2 py-1 text-xs font-semibold rounded-md"
                                style={{
                                  backgroundColor: role.color + '20',
                                  color: role.color,
                                }}
                              >
                                {role.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">No roles assigned</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {permissions.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-16 text-center">
          <AlertCircle className="w-20 h-20 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Permissions Found</h3>
          <p className="text-slate-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}