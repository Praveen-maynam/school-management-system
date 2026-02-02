// // import React, { useState, useRef } from 'react';
// // import { Users, UserPlus, UserMinus, ShieldCheck, KeyRound, Edit2, Trash2 } from 'lucide-react';

// // // Mock data for super admins
// // const mockAdmins = [
// //   { id: '1', name: 'Alice Johnson', email: 'alice@domain.com', role: 'Owner', status: 'Active' },
// //   { id: '2', name: 'Bob Smith', email: 'bob@domain.com', role: 'Admin', status: 'Active' },
// //   { id: '3', name: 'Carol Lee', email: 'carol@domain.com', role: 'Support', status: 'Inactive' },
// // ];

// // const roles = ['Owner', 'Admin', 'Support'];

// // const SuperAdminListScreen: React.FC = () => {
// //   const [admins, setAdmins] = useState(mockAdmins);
// //   const [modal, setModal] = useState<{ open: boolean; admin?: typeof mockAdmins[0]; isEdit?: boolean }>({ open: false, admin: undefined, isEdit: false });
// //   const [processing, setProcessing] = useState(false);
// //   const nameRef = useRef<HTMLInputElement>(null);
// //   const emailRef = useRef<HTMLInputElement>(null);
// //   const roleRef = useRef<HTMLSelectElement>(null);

// //   const openModal = (admin?: typeof mockAdmins[0]) => setModal({ open: true, admin, isEdit: !!admin });
// //   const closeModal = () => setModal({ open: false, admin: undefined, isEdit: false });

// //   const handleSave = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setProcessing(true);
// //     const name = nameRef.current?.value.trim() || '';
// //     const email = emailRef.current?.value.trim() || '';
// //     const role = roleRef.current?.value || 'Admin';
// //     setTimeout(() => {
// //       setProcessing(false);
// //       if (modal.isEdit && modal.admin) {
// //         setAdmins((prev) => prev.map(a => a.id === modal.admin!.id ? { ...a, name, email, role } : a));
// //       } else {
// //         setAdmins((prev) => [...prev, { id: `${Date.now()}`, name, email, role, status: 'Active' }]);
// //       }
// //       closeModal();
// //     }, 1000);
// //   };

// //   const handleRemove = (id: string) => {
// //     setAdmins((prev) => prev.filter(a => a.id !== id));
// //   };

// //   const handleRoleChange = (id: string, newRole: string) => {
// //     setAdmins((prev) => prev.map(a => a.id === id ? { ...a, role: newRole } : a));
// //   };

// //   return (
// //     <div className="p-6">
// //       <div className="flex items-center justify-between mb-6">
// //         <h1 className="text-2xl font-bold flex items-center gap-2"><Users className="w-6 h-6 text-blue-600" /> Super Admin Management</h1>
// //         <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 flex items-center gap-2" onClick={() => openModal()}><UserPlus className="w-5 h-5" /> Add Super Admin</button>
// //       </div>
// //       <div className="overflow-x-auto bg-white rounded-lg shadow">
// //         <table className="min-w-full divide-y divide-gray-200">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody className="bg-white divide-y divide-gray-200">
// //             {admins.map((admin) => (
// //               <tr key={admin.id} className="hover:bg-gray-50">
// //                 <td className="px-6 py-4 whitespace-nowrap font-semibold flex items-center gap-2">
// //                   <ShieldCheck className="w-4 h-4 text-blue-500" /> {admin.name}
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap">{admin.email}</td>
// //                 <td className="px-6 py-4 whitespace-nowrap">
// //                   <select
// //                     className="border border-gray-300 rounded px-2 py-1 text-sm"
// //                     value={admin.role}
// //                     onChange={e => handleRoleChange(admin.id, e.target.value)}
// //                   >
// //                     {roles.map(r => <option key={r} value={r}>{r}</option>)}
// //                   </select>
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap">
// //                   <span className={`px-2 py-1 rounded text-xs font-semibold ${admin.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>{admin.status}</span>
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap flex gap-2">
// //                   <button className="text-blue-600 hover:underline flex items-center gap-1" onClick={() => openModal(admin)}><Edit2 className="w-4 h-4" /> Edit</button>
// //                   <button className="text-red-600 hover:underline flex items-center gap-1" onClick={() => handleRemove(admin.id)}><UserMinus className="w-4 h-4" /> Remove</button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //       {/* Add/Edit Admin Modal */}
// //       {modal.open && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
// //           <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 relative">
// //             <button onClick={closeModal} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700">&times;</button>
// //             <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">{modal.isEdit ? <Edit2 className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />} {modal.isEdit ? 'Edit Super Admin' : 'Add Super Admin'}</h2>
// //             <form onSubmit={handleSave} className="space-y-4">
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-1">Name</label>
// //                 <input
// //                   type="text"
// //                   className="w-full border border-gray-300 rounded px-3 py-2"
// //                   defaultValue={modal.admin?.name || ''}
// //                   ref={nameRef}
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-1">Email</label>
// //                 <input
// //                   type="email"
// //                   className="w-full border border-gray-300 rounded px-3 py-2"
// //                   defaultValue={modal.admin?.email || ''}
// //                   ref={emailRef}
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-1">Role</label>
// //                 <select
// //                   className="w-full border border-gray-300 rounded px-3 py-2"
// //                   defaultValue={modal.admin?.role || 'Admin'}
// //                   ref={roleRef}
// //                   required
// //                 >
// //                   {roles.map(r => <option key={r} value={r}>{r}</option>)}
// //                 </select>
// //               </div>
// //               <div className="flex justify-end gap-2 mt-6">
// //                 <button
// //                   type="button"
// //                   className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
// //                   onClick={closeModal}
// //                   disabled={processing}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   className={`px-4 py-2 rounded text-white font-semibold ${processing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
// //                   disabled={processing}
// //                 >
// //                   {processing ? 'Saving...' : (modal.isEdit ? 'Save Changes' : 'Add Admin')}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //       {/* Security Policies & 2FA */}
// //       <div className="mt-10 bg-white rounded-lg shadow p-6">
// //         <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><KeyRound className="w-5 h-5 text-purple-600" /> Security Policies & 2FA</h2>
// //         <ul className="list-disc pl-6 text-gray-700">
// //           <li>Enforce strong passwords for all admins</li>
// //           <li>Enable two-factor authentication (2FA)</li>
// //           <li>Role-based access control</li>
// //           <li>Audit logs for all admin actions</li>
// //           <li>IP restrictions for admin logins</li>
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SuperAdminListScreen;

// // AdminManagement.tsx - Production-level Admin Management System
// import React, { useState, useCallback, useMemo, useEffect } from 'react';
// import {
//   Shield,
//   Users,
//   UserPlus,
//   UserX,
//   Settings,
//   Activity,
//   Lock,
//   Unlock,
//   Eye,
//   EyeOff,
//   MoreVertical,
//   Search,
//   Filter,
//   Download,
//   RefreshCw,
//   Clock,
//   MapPin,
//   Smartphone,
//   Globe,
//   AlertTriangle,
//   CheckCircle2,
//   XCircle,
//   Info,
//   Zap,
//   Key,
//   Mail,
//   Phone,
//   Calendar,
//   TrendingUp,
//   TrendingDown,
//   Award,
//   Target,
//   Database,
//   FileText,
//   Edit3,
//   Trash2,
//   Copy,
//   Check,
//   X,
//   ChevronDown,
//   ChevronRight,
//   LogOut,
//   Bell,
//   Loader2,
//   Save,
//   Plus,
//   Minus,
//   ExternalLink,
//   ShieldCheck,
//   ShieldAlert,
//   Fingerprint,
//   Monitor,
//   Laptop,
//   Chrome,
//   User
// } from 'lucide-react';

// import type {
//   AdminUser,
//   AdminRole,
//   AdminStatus,
//   AuditLogEntry,
//   SecurityPolicy,
//   AdminStatistics,
//   AdminFilters,
//   AuditLogFilters,
//   TwoFactorConfig,
//   IPRestriction,
//   ActiveSession,
//   AdminNotification
// } from './admin-types';

// // ============================================================================
// // CONSTANTS & MOCK DATA
// // ============================================================================

// const ROLE_CONFIGS = {
//   owner: {
//     label: 'Owner',
//     color: 'from-pink-500 to-rose-600',
//     icon: '👑',
//     description: 'Full system access and control',
//     level: 3
//   },
//   admin: {
//     label: 'Admin',
//     color: 'from-violet-500 to-purple-600',
//     icon: '⚡',
//     description: 'Manage users and settings',
//     level: 2
//   },
//   support: {
//     label: 'Support',
//     color: 'from-cyan-500 to-blue-600',
//     icon: '🎯',
//     description: 'View and assist users',
//     level: 1
//   }
// };

// const MOCK_ADMINS: AdminUser[] = [
//   {
//     id: '1',
//     email: 'sarah.johnson@school.edu',
//     name: 'Sarah Johnson',
//     role: 'owner',
//     status: 'active',
//     createdAt: new Date('2024-01-15'),
//     updatedAt: new Date(),
//     lastLoginAt: new Date(),
//     lastLoginIp: '192.168.1.100',
//     lastLoginLocation: 'New York, USA',
//     permissions: [],
//     twoFactor: {
//       enabled: true,
//       methods: ['totp', 'sms'],
//       primaryMethod: 'totp',
//       enforcedByPolicy: false,
//       lastVerified: new Date()
//     },
//     security: {
//       passwordLastChanged: new Date('2024-01-15'),
//       passwordExpireDays: 90,
//       failedLoginAttempts: 0,
//       ipRestrictions: [],
//       sessionTimeout: 30,
//       maxConcurrentSessions: 3,
//       currentSessions: [],
//       trustedDevices: []
//     },
//     metadata: {
//       createdBy: 'system',
//       department: 'Administration',
//       phone: '+1 (555) 123-4567',
//       timezone: 'America/New_York'
//     }
//   },
//   {
//     id: '2',
//     email: 'mike.anderson@school.edu',
//     name: 'Mike Anderson',
//     role: 'admin',
//     status: 'active',
//     createdAt: new Date('2024-02-20'),
//     updatedAt: new Date(),
//     lastLoginAt: new Date(Date.now() - 3600000),
//     lastLoginIp: '192.168.1.101',
//     lastLoginLocation: 'Los Angeles, USA',
//     permissions: [],
//     twoFactor: {
//       enabled: true,
//       methods: ['totp'],
//       primaryMethod: 'totp',
//       enforcedByPolicy: true,
//       lastVerified: new Date()
//     },
//     security: {
//       passwordLastChanged: new Date('2024-02-20'),
//       passwordExpireDays: 90,
//       failedLoginAttempts: 0,
//       ipRestrictions: [],
//       sessionTimeout: 30,
//       maxConcurrentSessions: 3,
//       currentSessions: [],
//       trustedDevices: []
//     },
//     metadata: {
//       createdBy: '1',
//       department: 'IT',
//       phone: '+1 (555) 234-5678',
//       timezone: 'America/Los_Angeles'
//     }
//   },
//   {
//     id: '3',
//     email: 'emma.wilson@school.edu',
//     name: 'Emma Wilson',
//     role: 'support',
//     status: 'active',
//     createdAt: new Date('2024-03-10'),
//     updatedAt: new Date(),
//     lastLoginAt: new Date(Date.now() - 7200000),
//     lastLoginIp: '192.168.1.102',
//     lastLoginLocation: 'Chicago, USA',
//     permissions: [],
//     twoFactor: {
//       enabled: false,
//       methods: [],
//       enforcedByPolicy: false
//     },
//     security: {
//       passwordLastChanged: new Date('2024-03-10'),
//       passwordExpireDays: 90,
//       failedLoginAttempts: 0,
//       ipRestrictions: [],
//       sessionTimeout: 30,
//       maxConcurrentSessions: 2,
//       currentSessions: [],
//       trustedDevices: []
//     },
//     metadata: {
//       createdBy: '1',
//       department: 'Support',
//       phone: '+1 (555) 345-6789',
//       timezone: 'America/Chicago'
//     }
//   },
//   {
//     id: '4',
//     email: 'john.smith@school.edu',
//     name: 'John Smith',
//     role: 'admin',
//     status: 'suspended',
//     createdAt: new Date('2024-01-25'),
//     updatedAt: new Date(),
//     lastLoginAt: new Date(Date.now() - 86400000 * 5),
//     lastLoginIp: '192.168.1.103',
//     lastLoginLocation: 'Houston, USA',
//     permissions: [],
//     twoFactor: {
//       enabled: true,
//       methods: ['sms'],
//       primaryMethod: 'sms',
//       enforcedByPolicy: true
//     },
//     security: {
//       passwordLastChanged: new Date('2024-01-25'),
//       passwordExpireDays: 90,
//       failedLoginAttempts: 5,
//       accountLockedUntil: new Date(Date.now() + 3600000),
//       ipRestrictions: [],
//       sessionTimeout: 30,
//       maxConcurrentSessions: 3,
//       currentSessions: [],
//       trustedDevices: []
//     },
//     metadata: {
//       createdBy: '1',
//       department: 'IT',
//       timezone: 'America/Chicago'
//     }
//   }
// ];

// const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
//   {
//     id: '1',
//     timestamp: new Date(),
//     action: 'login_success',
//     actor: {
//       id: '1',
//       name: 'Sarah Johnson',
//       email: 'sarah.johnson@school.edu',
//       role: 'owner'
//     },
//     metadata: {
//       ipAddress: '192.168.1.100',
//       userAgent: 'Mozilla/5.0...',
//       location: 'New York, USA',
//       sessionId: 'sess_123',
//       requestId: 'req_456'
//     },
//     severity: 'low',
//     category: 'authentication'
//   },
//   {
//     id: '2',
//     timestamp: new Date(Date.now() - 1800000),
//     action: 'role_changed',
//     actor: {
//       id: '1',
//       name: 'Sarah Johnson',
//       email: 'sarah.johnson@school.edu',
//       role: 'owner'
//     },
//     target: {
//       id: '2',
//       type: 'admin',
//       name: 'Mike Anderson'
//     },
//     changes: [
//       { field: 'role', oldValue: 'support', newValue: 'admin' }
//     ],
//     metadata: {
//       ipAddress: '192.168.1.100',
//       userAgent: 'Mozilla/5.0...',
//       location: 'New York, USA',
//       sessionId: 'sess_123',
//       requestId: 'req_457'
//     },
//     severity: 'high',
//     category: 'authorization'
//   },
//   {
//     id: '3',
//     timestamp: new Date(Date.now() - 3600000),
//     action: 'login_failed',
//     actor: {
//       id: '4',
//       name: 'John Smith',
//       email: 'john.smith@school.edu',
//       role: 'admin'
//     },
//     metadata: {
//       ipAddress: '192.168.1.103',
//       userAgent: 'Mozilla/5.0...',
//       location: 'Houston, USA',
//       sessionId: 'sess_124',
//       requestId: 'req_458'
//     },
//     severity: 'medium',
//     category: 'authentication'
//   },
//   {
//     id: '4',
//     timestamp: new Date(Date.now() - 7200000),
//     action: '2fa_enabled',
//     actor: {
//       id: '2',
//       name: 'Mike Anderson',
//       email: 'mike.anderson@school.edu',
//       role: 'admin'
//     },
//     metadata: {
//       ipAddress: '192.168.1.101',
//       userAgent: 'Mozilla/5.0...',
//       location: 'Los Angeles, USA',
//       sessionId: 'sess_125',
//       requestId: 'req_459'
//     },
//     severity: 'low',
//     category: 'security'
//   }
// ];

// const MOCK_STATS: AdminStatistics = {
//   totalAdmins: 4,
//   activeAdmins: 3,
//   pendingInvitations: 2,
//   suspendedAccounts: 1,
//   totalLogins24h: 47,
//   failedLogins24h: 3,
//   twoFactorEnabled: 3,
//   ipRestrictionsActive: 0,
//   auditLogsToday: 156,
//   securityAlertsToday: 2
// };

// // ============================================================================
// // UTILITY FUNCTIONS
// // ============================================================================

// const formatDate = (date: Date): string => {
//   return new Intl.DateTimeFormat('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   }).format(date);
// };

// const formatRelativeTime = (date: Date): string => {
//   const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
//   if (seconds < 60) return 'just now';
//   if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//   if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//   if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
//   return formatDate(date);
// };

// const getStatusColor = (status: AdminStatus): string => {
//   const colors: Record<AdminStatus, string> = {
//     active: 'from-emerald-500 to-green-600',
//     inactive: 'from-slate-500 to-gray-600',
//     suspended: 'from-red-500 to-rose-600',
//     pending: 'from-amber-500 to-yellow-600'
//   };
//   return colors[status];
// };

// const getStatusIcon = (status: AdminStatus): React.ReactElement => {
//   const icons: Record<AdminStatus, React.ReactElement> = {
//     active: <CheckCircle2 className="w-4 h-4" />,
//     inactive: <XCircle className="w-4 h-4" />,
//     suspended: <ShieldAlert className="w-4 h-4" />,
//     pending: <Clock className="w-4 h-4" />
//   };
//   return icons[status];
// };

// const getSeverityColor = (severity: string): string => {
//   const colors: Record<string, string> = {
//     low: 'text-cyan-400 bg-cyan-500/10',
//     medium: 'text-amber-400 bg-amber-500/10',
//     high: 'text-orange-400 bg-orange-500/10',
//     critical: 'text-red-400 bg-red-500/10'
//   };
//   return colors[severity] || colors.low;
// };

// // ============================================================================
// // COMPONENTS
// // ============================================================================

// interface MetricCardProps {
//   icon: React.ElementType;
//   label: string;
//   value: string | number;
//   trend?: number;
//   color?: string;
//   glowColor?: string;
// }

// const MetricCard: React.FC<MetricCardProps> = ({ 
//   icon: Icon, 
//   label, 
//   value, 
//   trend,
//   color = 'cyan',
//   glowColor = 'cyan'
// }) => (
//   <div className="relative group">
//     <div className={`absolute inset-0 bg-gradient-to-r from-${glowColor}-500/20 to-${glowColor}-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
//     <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-800 p-6 hover:border-${color}-500/50 transition-all duration-300">
//       <div className="flex items-start justify-between mb-4">
//         <div className={`p-3 bg-gradient-to-br ${ROLE_CONFIGS.owner.color} rounded-xl shadow-lg shadow-${color}-500/20`}>
//           <Icon className="w-6 h-6 text-white" />
//         </div>
//         {trend !== undefined && (
//           <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
//             trend >= 0 
//               ? 'text-emerald-400 bg-emerald-500/10' 
//               : 'text-red-400 bg-red-500/10'
//           }`}>
//             {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
//             {Math.abs(trend)}%
//           </div>
//         )}
//       </div>
//       <div className="text-3xl font-black text-white mb-1 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
//         {value}
//       </div>
//       <div className="text-sm font-bold text-slate-400 uppercase tracking-wide">{label}</div>
//     </div>
//   </div>
// );

// interface StatusBadgeProps {
//   status: AdminStatus;
// }

// const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
//   <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${getStatusColor(status)} text-white text-xs font-bold uppercase tracking-wide shadow-lg`}>
//     {getStatusIcon(status)}
//     <span>{status}</span>
//   </div>
// );

// interface RoleBadgeProps {
//   role: AdminRole;
// }

// const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
//   const config = ROLE_CONFIGS[role];
//   return (
//     <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${config.color} text-white text-xs font-bold uppercase tracking-wide shadow-lg`}>
//       <span>{config.icon}</span>
//       <span>{config.label}</span>
//     </div>
//   );
// };

// // ============================================================================
// // MAIN COMPONENT
// // ============================================================================

// const AdminManagement: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'admins' | 'audit' | 'security' | '2fa' | 'ip'>('admins');
//   const [admins, setAdmins] = useState<AdminUser[]>(MOCK_ADMINS);
//   const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOGS);
//   const [stats, setStats] = useState<AdminStatistics>(MOCK_STATS);
//   const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  
//   const [searchQuery, setSearchQuery] = useState('');
//   const [roleFilter, setRoleFilter] = useState<AdminRole | 'all'>('all');
//   const [statusFilter, setStatusFilter] = useState<AdminStatus | 'all'>('all');
//   const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   const addNotification = useCallback((
//     type: AdminNotification['type'],
//     title: string,
//     message: string
//   ) => {
//     const notification: AdminNotification = {
//       id: Date.now().toString(),
//       type,
//       title,
//       message,
//       timestamp: new Date(),
//       read: false,
//       priority: 'medium'
//     };
//     setNotifications(prev => [notification, ...prev].slice(0, 5));
//     setTimeout(() => {
//       setNotifications(prev => prev.filter(n => n.id !== notification.id));
//     }, 5000);
//   }, []);

//   const filteredAdmins = useMemo(() => {
//     return admins.filter(admin => {
//       const matchesSearch = 
//         admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         admin.email.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesRole = roleFilter === 'all' || admin.role === roleFilter;
//       const matchesStatus = statusFilter === 'all' || admin.status === statusFilter;
      
//       return matchesSearch && matchesRole && matchesStatus;
//     });
//   }, [admins, searchQuery, roleFilter, statusFilter]);

//   const handleDeleteAdmin = useCallback(async () => {
//     if (!selectedAdmin) return;
    
//     setIsSaving(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     setAdmins(prev => prev.filter(a => a.id !== selectedAdmin.id));
//     setShowDeleteModal(false);
//     setSelectedAdmin(null);
//     setIsSaving(false);
//     addNotification('success', 'Admin Deleted', `${selectedAdmin.name} has been removed from the system`);
//   }, [selectedAdmin, addNotification]);

//   const handleToggle2FA = useCallback(async (admin: AdminUser) => {
//     setIsSaving(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     setAdmins(prev => prev.map(a => 
//       a.id === admin.id 
//         ? { ...a, twoFactor: { ...a.twoFactor, enabled: !a.twoFactor.enabled } }
//         : a
//     ));
//     setIsSaving(false);
//     addNotification(
//       'success', 
//       '2FA Updated', 
//       `Two-factor authentication ${!admin.twoFactor.enabled ? 'enabled' : 'disabled'} for ${admin.name}`
//     );
//   }, [addNotification]);

//   const handleSuspendAdmin = useCallback(async (admin: AdminUser) => {
//     setIsSaving(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     const newStatus: AdminStatus = admin.status === 'suspended' ? 'active' : 'suspended';
//     setAdmins(prev => prev.map(a => 
//       a.id === admin.id ? { ...a, status: newStatus } : a
//     ));
//     setIsSaving(false);
//     addNotification(
//       'warning',
//       'Status Changed',
//       `${admin.name} has been ${newStatus === 'suspended' ? 'suspended' : 'reactivated'}`
//     );
//   }, [addNotification]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      
//       {/* Cyberpunk Grid Background */}
//       <div className="fixed inset-0 opacity-10">
//         <div className="absolute inset-0" style={{
//           backgroundImage: 'linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)',
//           backgroundSize: '40px 40px'
//         }} />
//       </div>

//       {/* Notifications */}
//       <div className="fixed top-6 right-6 z-50 space-y-3 w-96">
//         {notifications.map(notif => (
//           <div
//             key={notif.id}
//             className={`
//               relative overflow-hidden p-5 rounded-2xl backdrop-blur-xl border-2
//               animate-slideIn shadow-2xl
//               ${notif.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/50' : ''}
//               ${notif.type === 'error' ? 'bg-red-500/10 border-red-500/50' : ''}
//               ${notif.type === 'warning' ? 'bg-amber-500/10 border-amber-500/50' : ''}
//               ${notif.type === 'security' ? 'bg-purple-500/10 border-purple-500/50' : ''}
//               ${notif.type === 'info' ? 'bg-cyan-500/10 border-cyan-500/50' : ''}
//             `}
//           >
//             <div className="relative flex items-start gap-3">
//               {notif.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />}
//               {notif.type === 'error' && <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />}
//               {notif.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />}
//               {notif.type === 'security' && <ShieldCheck className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />}
//               {notif.type === 'info' && <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />}
//               <div className="flex-1">
//                 <div className="font-bold text-sm text-white mb-1">{notif.title}</div>
//                 <div className="text-sm text-slate-300">{notif.message}</div>
//               </div>
//               <button
//                 onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
//                 className="p-1 hover:bg-white/10 rounded-lg transition-colors"
//               >
//                 <X className="w-4 h-4 text-slate-400" />
//               </button>
//             </div>
//             <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
//               notif.type === 'success' ? 'from-emerald-500 to-green-600' : ''
//             } ${notif.type === 'error' ? 'from-red-500 to-rose-600' : ''} ${
//               notif.type === 'warning' ? 'from-amber-500 to-yellow-600' : ''
//             } animate-pulse`} />
//           </div>
//         ))}
//       </div>

//       {/* Header */}
//       <header className="relative sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b-2 border-cyan-500/30 shadow-xl shadow-cyan-500/10">
//         <div className="max-w-[1800px] mx-auto px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-5">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl blur-xl opacity-50 animate-pulse" />
//                 <div className="relative p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-lg shadow-cyan-500/30">
//                   <Shield className="w-8 h-8 text-white" />
//                 </div>
//               </div>
//               <div>
//                 <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
//                   Admin Management
//                 </h1>
//                 <p className="text-sm text-slate-400 font-bold mt-1 tracking-wide">
//                   SECURE ACCESS CONTROL SYSTEM
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-3">
//                 <div className="px-4 py-2.5 bg-slate-800/50 backdrop-blur rounded-xl border border-cyan-500/30">
//                   <div className="flex items-center gap-2">
//                     <Lock className="w-4 h-4 text-cyan-400" />
//                     <span className="text-sm font-bold text-cyan-400">AES-256</span>
//                   </div>
//                 </div>
//                 <div className="px-4 py-2.5 bg-emerald-500/10 backdrop-blur rounded-xl border border-emerald-500/30">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
//                     <span className="text-sm font-bold text-emerald-400">SECURE</span>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={() => setShowAddModal(true)}
//                 className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2"
//               >
//                 <UserPlus className="w-5 h-5" />
//                 Add Admin
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Stats Dashboard */}
//       <div className="relative max-w-[1800px] mx-auto px-8 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//           <MetricCard
//             icon={Users}
//             label="Total Admins"
//             value={stats.totalAdmins}
//             trend={12}
//             color="cyan"
//             glowColor="cyan"
//           />
//           <MetricCard
//             icon={Activity}
//             label="Active Now"
//             value={stats.activeAdmins}
//             trend={8}
//             color="emerald"
//             glowColor="emerald"
//           />
//           <MetricCard
//             icon={ShieldCheck}
//             label="2FA Enabled"
//             value={stats.twoFactorEnabled}
//             trend={15}
//             color="purple"
//             glowColor="purple"
//           />
//           <MetricCard
//             icon={AlertTriangle}
//             label="Security Alerts"
//             value={stats.securityAlertsToday}
//             trend={-25}
//             color="amber"
//             glowColor="amber"
//           />
//           <MetricCard
//             icon={Database}
//             label="Audit Logs"
//             value={stats.auditLogsToday}
//             trend={5}
//             color="blue"
//             glowColor="blue"
//           />
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="relative bg-slate-900/50 backdrop-blur-xl border-b-2 border-slate-800">
//         <div className="max-w-[1800px] mx-auto px-8">
//           <div className="flex gap-2 overflow-x-auto py-4">
//             {[
//               { id: 'admins' as const, label: 'Administrators', icon: Users },
//               { id: 'audit' as const, label: 'Audit Logs', icon: FileText },
//               { id: 'security' as const, label: 'Security Policies', icon: Shield },
//               { id: '2fa' as const, label: '2FA Config', icon: Fingerprint },
//               { id: 'ip' as const, label: 'IP Restrictions', icon: Globe },
//             ].map(tab => {
//               const Icon = tab.icon;
//               const isActive = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`
//                     relative flex items-center gap-3 px-6 py-3.5 rounded-xl font-bold text-sm
//                     transition-all duration-300 whitespace-nowrap
//                     ${isActive 
//                       ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30' 
//                       : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
//                     }
//                   `}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span>{tab.label}</span>
//                   {isActive && (
//                     <div className="absolute inset-0 rounded-xl bg-white/10 animate-pulse" />
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="relative max-w-[1800px] mx-auto px-8 py-8">

//         {/* ADMINISTRATORS TAB */}
//         {activeTab === 'admins' && (
//           <div className="space-y-6 animate-fadeIn">
            
//             {/* Filters */}
//             <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-6">
//               <div className="flex items-center gap-4 flex-wrap">
//                 <div className="flex-1 min-w-[300px]">
//                   <div className="relative">
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
//                     <input
//                       type="text"
//                       placeholder="Search by name or email..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
//                     />
//                   </div>
//                 </div>

//                 <select
//                   value={roleFilter}
//                   onChange={(e) => setRoleFilter(e.target.value as any)}
//                   className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white font-semibold focus:outline-none focus:border-cyan-500 transition-colors"
//                 >
//                   <option value="all">All Roles</option>
//                   <option value="owner">Owner</option>
//                   <option value="admin">Admin</option>
//                   <option value="support">Support</option>
//                 </select>

//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value as any)}
//                   className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white font-semibold focus:outline-none focus:border-cyan-500 transition-colors"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                   <option value="suspended">Suspended</option>
//                   <option value="pending">Pending</option>
//                 </select>

//                 <button className="px-4 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors flex items-center gap-2">
//                   <Filter className="w-5 h-5 text-cyan-400" />
//                   <span className="font-bold text-white">More Filters</span>
//                 </button>
//               </div>
//             </div>

//             {/* Admin List */}
//             <div className="space-y-4">
//               {filteredAdmins.map(admin => (
//                 <div
//                   key={admin.id}
//                   className="group relative bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 hover:border-cyan-500/50 p-6 transition-all duration-300"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-300" />
                  
//                   <div className="relative flex items-start justify-between">
//                     <div className="flex items-start gap-5 flex-1">
//                       {/* Avatar */}
//                       <div className="relative">
//                         <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl blur opacity-50" />
//                         <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg">
//                           {admin.name.split(' ').map(n => n[0]).join('')}
//                         </div>
//                         {admin.status === 'active' && (
//                           <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-lg shadow-emerald-500/50" />
//                         )}
//                       </div>

//                       {/* Info */}
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <h3 className="text-xl font-black text-white">{admin.name}</h3>
//                           <RoleBadge role={admin.role} />
//                           <StatusBadge status={admin.status} />
//                         </div>
                        
//                         <div className="flex items-center gap-4 text-sm text-slate-400 font-semibold mb-3">
//                           <div className="flex items-center gap-2">
//                             <Mail className="w-4 h-4 text-cyan-400" />
//                             <span>{admin.email}</span>
//                           </div>
//                           {admin.metadata.phone && (
//                             <div className="flex items-center gap-2">
//                               <Phone className="w-4 h-4 text-cyan-400" />
//                               <span>{admin.metadata.phone}</span>
//                             </div>
//                           )}
//                           {admin.metadata.department && (
//                             <div className="flex items-center gap-2">
//                               <Award className="w-4 h-4 text-cyan-400" />
//                               <span>{admin.metadata.department}</span>
//                             </div>
//                           )}
//                         </div>

//                         <div className="flex items-center gap-6 text-xs text-slate-500 font-bold">
//                           <div className="flex items-center gap-2">
//                             <Clock className="w-4 h-4" />
//                             <span>Last login: {formatRelativeTime(admin.lastLoginAt!)}</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <MapPin className="w-4 h-4" />
//                             <span>{admin.lastLoginLocation}</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Globe className="w-4 h-4" />
//                             <span>{admin.lastLoginIp}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-xl border border-slate-700">
//                         {admin.twoFactor.enabled ? (
//                           <>
//                             <ShieldCheck className="w-4 h-4 text-emerald-400" />
//                             <span className="text-xs font-bold text-emerald-400">2FA ON</span>
//                           </>
//                         ) : (
//                           <>
//                             <ShieldAlert className="w-4 h-4 text-amber-400" />
//                             <span className="text-xs font-bold text-amber-400">2FA OFF</span>
//                           </>
//                         )}
//                       </div>

//                       <button
//                         onClick={() => handleToggle2FA(admin)}
//                         disabled={isSaving}
//                         className="p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors disabled:opacity-50"
//                       >
//                         {admin.twoFactor.enabled ? (
//                           <Unlock className="w-5 h-5 text-cyan-400" />
//                         ) : (
//                           <Lock className="w-5 h-5 text-amber-400" />
//                         )}
//                       </button>

//                       <button
//                         onClick={() => handleSuspendAdmin(admin)}
//                         disabled={isSaving}
//                         className="p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors disabled:opacity-50"
//                       >
//                         {admin.status === 'suspended' ? (
//                           <CheckCircle2 className="w-5 h-5 text-emerald-400" />
//                         ) : (
//                           <XCircle className="w-5 h-5 text-red-400" />
//                         )}
//                       </button>

//                       <button
//                         onClick={() => {
//                           setSelectedAdmin(admin);
//                           setShowDeleteModal(true);
//                         }}
//                         className="p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl transition-colors"
//                       >
//                         <Trash2 className="w-5 h-5 text-red-400" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* AUDIT LOGS TAB */}
//         {activeTab === 'audit' && (
//           <div className="space-y-6 animate-fadeIn">
//             <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-8">
//               <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
//                 <FileText className="w-7 h-7 text-cyan-400" />
//                 Security Audit Logs
//               </h2>

//               <div className="space-y-3">
//                 {auditLogs.map(log => (
//                   <div
//                     key={log.id}
//                     className="p-5 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors"
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${getSeverityColor(log.severity)}`}>
//                             {log.severity}
//                           </span>
//                           <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase bg-slate-700 text-slate-300">
//                             {log.category}
//                           </span>
//                           <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
//                             {log.action.replace(/_/g, ' ')}
//                           </span>
//                         </div>
                        
//                         <div className="text-sm text-white font-semibold mb-2">
//                           <span className="text-cyan-400">{log.actor.name}</span>
//                           {' '}performed{' '}
//                           <span className="text-purple-400">{log.action.replace(/_/g, ' ')}</span>
//                           {log.target && (
//                             <>
//                               {' '}on{' '}
//                               <span className="text-blue-400">{log.target.name}</span>
//                             </>
//                           )}
//                         </div>

//                         <div className="flex items-center gap-4 text-xs text-slate-500 font-bold">
//                           <span>{formatDate(log.timestamp)}</span>
//                           <span>•</span>
//                           <span>{log.metadata.ipAddress}</span>
//                           <span>•</span>
//                           <span>{log.metadata.location}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Other tabs with placeholders */}
//         {activeTab === 'security' && (
//           <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-8">
//             <h2 className="text-2xl font-black text-white mb-4">Security Policies</h2>
//             <p className="text-slate-400">Configure system-wide security policies and access controls</p>
//           </div>
//         )}

//         {activeTab === '2fa' && (
//           <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-8">
//             <h2 className="text-2xl font-black text-white mb-4">Two-Factor Authentication</h2>
//             <p className="text-slate-400">Manage 2FA settings and enforcement policies</p>
//           </div>
//         )}

//         {activeTab === 'ip' && (
//           <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-8">
//             <h2 className="text-2xl font-black text-white mb-4">IP Restrictions</h2>
//             <p className="text-slate-400">Configure IP whitelisting and blacklisting</p>
//           </div>
//         )}

//       </main>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && selectedAdmin && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="relative bg-slate-900 rounded-2xl border-2 border-red-500/50 p-8 max-w-md w-full shadow-2xl shadow-red-500/20">
//             <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-rose-600/10 rounded-2xl" />
            
//             <div className="relative">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="p-4 bg-red-500/20 rounded-2xl">
//                   <AlertTriangle className="w-8 h-8 text-red-400" />
//                 </div>
//                 <h3 className="text-2xl font-black text-white">Delete Administrator</h3>
//               </div>

//               <p className="text-slate-300 mb-6">
//                 Are you sure you want to delete <span className="font-bold text-white">{selectedAdmin.name}</span>? 
//                 This action cannot be undone and will revoke all access immediately.
//               </p>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => {
//                     setShowDeleteModal(false);
//                     setSelectedAdmin(null);
//                   }}
//                   className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteAdmin}
//                   disabled={isSaving}
//                   className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
//                 >
//                   {isSaving ? (
//                     <>
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                       Deleting...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 className="w-5 h-5" />
//                       Delete Admin
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');
        
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateX(100px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
//         }

//         .animate-slideIn {
//           animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
//         }

//         * {
//           font-family: 'Rajdhani', -apple-system, BlinkMacSystemFont, sans-serif;
//         }

//         ::-webkit-scrollbar {
//           width: 10px;
//           height: 10px;
//         }

//         ::-webkit-scrollbar-track {
//           background: #0f172a;
//         }

//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #06b6d4, #0284c7);
//           border-radius: 10px;
//         }

//         ::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #0891b2, #0369a1);
//         }

//         button {
//           user-select: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AdminManagement;


import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  Shield,
  Users,
  UserPlus,
  UserX,
  Settings,
  Activity,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  MoreVertical,
  Search,
  Filter,
  Download,
  RefreshCw,
  Clock,
  MapPin,
  Smartphone,
  Globe,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  Zap,
  Key,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  Database,
  FileText,
  Edit3,
  Trash2,
  Copy,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  LogOut,
  Bell,
  Loader2,
  Save,
  Plus,
  Minus,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  Fingerprint,
  Monitor,
  Laptop,
  Chrome,
  User
} from 'lucide-react';

import type {
  AdminUser,
  AdminRole,
  AdminStatus,
  AuditLogEntry,
  SecurityPolicy,
  AdminStatistics,
  AdminFilters,
  AuditLogFilters,
  TwoFactorConfig,
  IPRestriction,
  ActiveSession,
  AdminNotification
} from './admin-types';

// ============================================================================
// CONSTANTS & MOCK DATA
// ============================================================================

const ROLE_CONFIGS = {
  owner: {
    label: 'Owner',
    color: 'from-rose-500 to-pink-600',
    icon: '👑',
    description: 'Full system access and control',
    level: 3
  },
  admin: {
    label: 'Admin',
    color: 'from-violet-500 to-purple-600',
    icon: '⚡',
    description: 'Manage users and settings',
    level: 2
  },
  support: {
    label: 'Support',
    color: 'from-blue-500 to-indigo-600',
    icon: '🎯',
    description: 'View and assist users',
    level: 1
  }
};

const MOCK_ADMINS: AdminUser[] = [
  {
    id: '1',
    email: 'sarah.johnson@school.edu',
    name: 'Sarah Johnson',
    role: 'owner',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
    lastLoginAt: new Date(),
    lastLoginIp: '192.168.1.100',
    lastLoginLocation: 'New York, USA',
    permissions: [],
    twoFactor: {
      enabled: true,
      methods: ['totp', 'sms'],
      primaryMethod: 'totp',
      enforcedByPolicy: false,
      lastVerified: new Date()
    },
    security: {
      passwordLastChanged: new Date('2024-01-15'),
      passwordExpireDays: 90,
      failedLoginAttempts: 0,
      ipRestrictions: [],
      sessionTimeout: 30,
      maxConcurrentSessions: 3,
      currentSessions: [],
      trustedDevices: []
    },
    metadata: {
      createdBy: 'system',
      department: 'Administration',
      phone: '+1 (555) 123-4567',
      timezone: 'America/New_York'
    }
  },
  {
    id: '2',
    email: 'mike.anderson@school.edu',
    name: 'Mike Anderson',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date(),
    lastLoginAt: new Date(Date.now() - 3600000),
    lastLoginIp: '192.168.1.101',
    lastLoginLocation: 'Los Angeles, USA',
    permissions: [],
    twoFactor: {
      enabled: true,
      methods: ['totp'],
      primaryMethod: 'totp',
      enforcedByPolicy: true,
      lastVerified: new Date()
    },
    security: {
      passwordLastChanged: new Date('2024-02-20'),
      passwordExpireDays: 90,
      failedLoginAttempts: 0,
      ipRestrictions: [],
      sessionTimeout: 30,
      maxConcurrentSessions: 3,
      currentSessions: [],
      trustedDevices: []
    },
    metadata: {
      createdBy: '1',
      department: 'IT',
      phone: '+1 (555) 234-5678',
      timezone: 'America/Los_Angeles'
    }
  },
  {
    id: '3',
    email: 'emma.wilson@school.edu',
    name: 'Emma Wilson',
    role: 'support',
    status: 'active',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date(),
    lastLoginAt: new Date(Date.now() - 7200000),
    lastLoginIp: '192.168.1.102',
    lastLoginLocation: 'Chicago, USA',
    permissions: [],
    twoFactor: {
      enabled: false,
      methods: [],
      enforcedByPolicy: false
    },
    security: {
      passwordLastChanged: new Date('2024-03-10'),
      passwordExpireDays: 90,
      failedLoginAttempts: 0,
      ipRestrictions: [],
      sessionTimeout: 30,
      maxConcurrentSessions: 2,
      currentSessions: [],
      trustedDevices: []
    },
    metadata: {
      createdBy: '1',
      department: 'Support',
      phone: '+1 (555) 345-6789',
      timezone: 'America/Chicago'
    }
  },
  {
    id: '4',
    email: 'john.smith@school.edu',
    name: 'John Smith',
    role: 'admin',
    status: 'suspended',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date(),
    lastLoginAt: new Date(Date.now() - 86400000 * 5),
    lastLoginIp: '192.168.1.103',
    lastLoginLocation: 'Houston, USA',
    permissions: [],
    twoFactor: {
      enabled: true,
      methods: ['sms'],
      primaryMethod: 'sms',
      enforcedByPolicy: true
    },
    security: {
      passwordLastChanged: new Date('2024-01-25'),
      passwordExpireDays: 90,
      failedLoginAttempts: 5,
      accountLockedUntil: new Date(Date.now() + 3600000),
      ipRestrictions: [],
      sessionTimeout: 30,
      maxConcurrentSessions: 3,
      currentSessions: [],
      trustedDevices: []
    },
    metadata: {
      createdBy: '1',
      department: 'IT',
      timezone: 'America/Chicago'
    }
  }
];

const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: '1',
    timestamp: new Date(),
    action: 'login_success',
    actor: {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@school.edu',
      role: 'owner'
    },
    metadata: {
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0...',
      location: 'New York, USA',
      sessionId: 'sess_123',
      requestId: 'req_456'
    },
    severity: 'low',
    category: 'authentication'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1800000),
    action: 'role_changed',
    actor: {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@school.edu',
      role: 'owner'
    },
    target: {
      id: '2',
      type: 'admin',
      name: 'Mike Anderson'
    },
    changes: [
      { field: 'role', oldValue: 'support', newValue: 'admin' }
    ],
    metadata: {
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0...',
      location: 'New York, USA',
      sessionId: 'sess_123',
      requestId: 'req_457'
    },
    severity: 'high',
    category: 'authorization'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 3600000),
    action: 'login_failed',
    actor: {
      id: '4',
      name: 'John Smith',
      email: 'john.smith@school.edu',
      role: 'admin'
    },
    metadata: {
      ipAddress: '192.168.1.103',
      userAgent: 'Mozilla/5.0...',
      location: 'Houston, USA',
      sessionId: 'sess_124',
      requestId: 'req_458'
    },
    severity: 'medium',
    category: 'authentication'
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 7200000),
    action: '2fa_enabled',
    actor: {
      id: '2',
      name: 'Mike Anderson',
      email: 'mike.anderson@school.edu',
      role: 'admin'
    },
    metadata: {
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0...',
      location: 'Los Angeles, USA',
      sessionId: 'sess_125',
      requestId: 'req_459'
    },
    severity: 'low',
    category: 'security'
  }
];

const MOCK_STATS: AdminStatistics = {
  totalAdmins: 4,
  activeAdmins: 3,
  pendingInvitations: 2,
  suspendedAccounts: 1,
  totalLogins24h: 47,
  failedLogins24h: 3,
  twoFactorEnabled: 3,
  ipRestrictionsActive: 0,
  auditLogsToday: 156,
  securityAlertsToday: 2
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const formatRelativeTime = (date: Date): string => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return formatDate(date);
};

const getStatusColor = (status: AdminStatus): string => {
  const colors: Record<AdminStatus, string> = {
    active: 'from-emerald-500 to-green-600',
    inactive: 'from-slate-500 to-gray-600',
    suspended: 'from-red-500 to-rose-600',
    pending: 'from-amber-500 to-yellow-600'
  };
  return colors[status];
};

const getStatusIcon = (status: AdminStatus): React.ReactElement => {
  const icons: Record<AdminStatus, React.ReactElement> = {
    active: <CheckCircle2 className="w-4 h-4" />,
    inactive: <XCircle className="w-4 h-4" />,
    suspended: <ShieldAlert className="w-4 h-4" />,
    pending: <Clock className="w-4 h-4" />
  };
  return icons[status];
};

const getSeverityColor = (severity: string): string => {
  const colors: Record<string, string> = {
    low: 'text-blue-600 bg-blue-50 border-blue-200',
    medium: 'text-amber-700 bg-amber-50 border-amber-200',
    high: 'text-orange-700 bg-orange-50 border-orange-200',
    critical: 'text-red-700 bg-red-50 border-red-200'
  };
  return colors[severity] || colors.low;
};

// ============================================================================
// COMPONENTS
// ============================================================================

interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend?: number;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  icon: Icon, 
  label, 
  value, 
  trend,
  color = 'blue'
}) => (
  <div className="relative group">
    <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 bg-gradient-to-br ${ROLE_CONFIGS.owner.color} rounded-xl shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
            trend >= 0 
              ? 'text-emerald-700 bg-emerald-50' 
              : 'text-red-700 bg-red-50'
          }`}>
            {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="text-3xl font-black text-slate-900 mb-1">
        {value}
      </div>
      <div className="text-sm font-bold text-slate-600 uppercase tracking-wide">{label}</div>
    </div>
  </div>
);

interface StatusBadgeProps {
  status: AdminStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${getStatusColor(status)} text-white text-xs font-bold uppercase tracking-wide shadow-md`}>
    {getStatusIcon(status)}
    <span>{status}</span>
  </div>
);

interface RoleBadgeProps {
  role: AdminRole;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
  const config = ROLE_CONFIGS[role];
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${config.color} text-white text-xs font-bold uppercase tracking-wide shadow-md`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AdminManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'admins' | 'audit' | 'security' | '2fa' | 'ip'>('admins');
  const [admins, setAdmins] = useState<AdminUser[]>(MOCK_ADMINS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOGS);
  const [stats, setStats] = useState<AdminStatistics>(MOCK_STATS);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<AdminRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<AdminStatus | 'all'>('all');
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const addNotification = useCallback((
    type: AdminNotification['type'],
    title: string,
    message: string
  ) => {
    const notification: AdminNotification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date(),
      read: false,
      priority: 'medium'
    };
    setNotifications(prev => [notification, ...prev].slice(0, 5));
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  }, []);

  const filteredAdmins = useMemo(() => {
    return admins.filter(admin => {
      const matchesSearch = 
        admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || admin.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || admin.status === statusFilter;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [admins, searchQuery, roleFilter, statusFilter]);

  const handleDeleteAdmin = useCallback(async () => {
    if (!selectedAdmin) return;
    
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAdmins(prev => prev.filter(a => a.id !== selectedAdmin.id));
    setShowDeleteModal(false);
    setSelectedAdmin(null);
    setIsSaving(false);
    addNotification('success', 'Admin Deleted', `${selectedAdmin.name} has been removed from the system`);
  }, [selectedAdmin, addNotification]);

  const handleToggle2FA = useCallback(async (admin: AdminUser) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAdmins(prev => prev.map(a => 
      a.id === admin.id 
        ? { ...a, twoFactor: { ...a.twoFactor, enabled: !a.twoFactor.enabled } }
        : a
    ));
    setIsSaving(false);
    addNotification(
      'success', 
      '2FA Updated', 
      `Two-factor authentication ${!admin.twoFactor.enabled ? 'enabled' : 'disabled'} for ${admin.name}`
    );
  }, [addNotification]);

  const handleSuspendAdmin = useCallback(async (admin: AdminUser) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newStatus: AdminStatus = admin.status === 'suspended' ? 'active' : 'suspended';
    setAdmins(prev => prev.map(a => 
      a.id === admin.id ? { ...a, status: newStatus } : a
    ));
    setIsSaving(false);
    addNotification(
      'warning',
      'Status Changed',
      `${admin.name} has been ${newStatus === 'suspended' ? 'suspended' : 'reactivated'}`
    );
  }, [addNotification]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Subtle Pattern Background */}
      <div className="fixed inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #0ea5e9 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Notifications */}
      <div className="fixed top-6 right-6 z-50 space-y-3 w-96">
        {notifications.map(notif => (
          <div
            key={notif.id}
            className={`
              relative overflow-hidden p-5 rounded-2xl backdrop-blur-xl border-2 bg-white shadow-xl
              animate-slideIn
              ${notif.type === 'success' ? 'border-emerald-200' : ''}
              ${notif.type === 'error' ? 'border-red-200' : ''}
              ${notif.type === 'warning' ? 'border-amber-200' : ''}
              ${notif.type === 'security' ? 'border-purple-200' : ''}
              ${notif.type === 'info' ? 'border-blue-200' : ''}
            `}
          >
            <div className="relative flex items-start gap-3">
              {notif.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />}
              {notif.type === 'error' && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />}
              {notif.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />}
              {notif.type === 'security' && <ShieldCheck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />}
              {notif.type === 'info' && <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />}
              <div className="flex-1">
                <div className="font-bold text-sm text-slate-900 mb-1">{notif.title}</div>
                <div className="text-sm text-slate-600">{notif.message}</div>
              </div>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b-2 border-blue-200 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                  Admin Management
                </h1>
                <p className="text-sm text-slate-600 font-bold mt-1 tracking-wide">
                  Secure Access Control System
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-bold text-blue-600">AES-256</span>
                  </div>
                </div>
                <div className="px-4 py-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm font-bold text-emerald-600">SECURE</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Add Admin
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Dashboard */}
      <div className="relative max-w-[1800px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <MetricCard
            icon={Users}
            label="Total Admins"
            value={stats.totalAdmins}
            trend={12}
          />
          <MetricCard
            icon={Activity}
            label="Active Now"
            value={stats.activeAdmins}
            trend={8}
          />
          <MetricCard
            icon={ShieldCheck}
            label="2FA Enabled"
            value={stats.twoFactorEnabled}
            trend={15}
          />
          <MetricCard
            icon={AlertTriangle}
            label="Security Alerts"
            value={stats.securityAlertsToday}
            trend={-25}
          />
          <MetricCard
            icon={Database}
            label="Audit Logs"
            value={stats.auditLogsToday}
            trend={5}
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="relative bg-white/70 backdrop-blur-xl border-b-2 border-slate-200">
        <div className="max-w-[1800px] mx-auto px-8">
          <div className="flex gap-2 overflow-x-auto py-4">
            {[
              { id: 'admins' as const, label: 'Administrators', icon: Users },
              { id: 'audit' as const, label: 'Audit Logs', icon: FileText },
              { id: 'security' as const, label: 'Security Policies', icon: Shield },
              { id: '2fa' as const, label: '2FA Config', icon: Fingerprint },
              { id: 'ip' as const, label: 'IP Restrictions', icon: Globe },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative flex items-center gap-3 px-6 py-3.5 rounded-xl font-bold text-sm
                    transition-all duration-300 whitespace-nowrap
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative max-w-[1800px] mx-auto px-8 py-8">

        {/* ADMINISTRATORS TAB */}
        {activeTab === 'admins' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Filters */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-[300px]">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                </div>

                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as any)}
                  className="px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-blue-400 transition-colors"
                >
                  <option value="all">All Roles</option>
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                  <option value="support">Support</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-blue-400 transition-colors"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                  <option value="pending">Pending</option>
                </select>

                <button className="px-4 py-3 bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 rounded-xl transition-colors flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-slate-900">More Filters</span>
                </button>
              </div>
            </div>

            {/* Admin List */}
            <div className="space-y-4">
              {filteredAdmins.map(admin => (
                <div
                  key={admin.id}
                  className="group relative bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg p-6 transition-all duration-300"
                >
                  <div className="relative flex items-start justify-between">
                    <div className="flex items-start gap-5 flex-1">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-md">
                          {admin.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {admin.status === 'active' && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-black text-slate-900">{admin.name}</h3>
                          <RoleBadge role={admin.role} />
                          <StatusBadge status={admin.status} />
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-slate-600 font-semibold mb-3">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-500" />
                            <span>{admin.email}</span>
                          </div>
                          {admin.metadata.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-blue-500" />
                              <span>{admin.metadata.phone}</span>
                            </div>
                          )}
                          {admin.metadata.department && (
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-blue-500" />
                              <span>{admin.metadata.department}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-6 text-xs text-slate-500 font-bold">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Last login: {formatRelativeTime(admin.lastLoginAt!)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{admin.lastLoginLocation}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            <span>{admin.lastLoginIp}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border-2 border-slate-200">
                        {admin.twoFactor.enabled ? (
                          <>
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs font-bold text-emerald-600">2FA ON</span>
                          </>
                        ) : (
                          <>
                            <ShieldAlert className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-bold text-amber-600">2FA OFF</span>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => handleToggle2FA(admin)}
                        disabled={isSaving}
                        className="p-3 bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 rounded-xl transition-colors disabled:opacity-50"
                      >
                        {admin.twoFactor.enabled ? (
                          <Unlock className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Lock className="w-5 h-5 text-amber-600" />
                        )}
                      </button>

                      <button
                        onClick={() => handleSuspendAdmin(admin)}
                        disabled={isSaving}
                        className="p-3 bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 rounded-xl transition-colors disabled:opacity-50"
                      >
                        {admin.status === 'suspended' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setSelectedAdmin(admin);
                          setShowDeleteModal(true);
                        }}
                        className="p-3 bg-red-50 hover:bg-red-100 border-2 border-red-200 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AUDIT LOGS TAB */}
        {activeTab === 'audit' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <FileText className="w-7 h-7 text-blue-600" />
                Security Audit Logs
              </h2>

              <div className="space-y-3">
                {auditLogs.map(log => (
                  <div
                    key={log.id}
                    className="p-5 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase border ${getSeverityColor(log.severity)}`}>
                            {log.severity}
                          </span>
                          <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase bg-slate-200 text-slate-700 border border-slate-300">
                            {log.category}
                          </span>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                            {log.action.replace(/_/g, ' ')}
                          </span>
                        </div>
                        
                        <div className="text-sm text-slate-900 font-semibold mb-2">
                          <span className="text-blue-600">{log.actor.name}</span>
                          {' '}performed{' '}
                          <span className="text-purple-600">{log.action.replace(/_/g, ' ')}</span>
                          {log.target && (
                            <>
                              {' '}on{' '}
                              <span className="text-indigo-600">{log.target.name}</span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-500 font-bold">
                          <span>{formatDate(log.timestamp)}</span>
                          <span>•</span>
                          <span>{log.metadata.ipAddress}</span>
                          <span>•</span>
                          <span>{log.metadata.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs with placeholders */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Security Policies</h2>
            <p className="text-slate-600">Configure system-wide security policies and access controls</p>
          </div>
        )}

        {activeTab === '2fa' && (
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Two-Factor Authentication</h2>
            <p className="text-slate-600">Manage 2FA settings and enforcement policies</p>
          </div>
        )}

        {activeTab === 'ip' && (
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-4">IP Restrictions</h2>
            <p className="text-slate-600">Configure IP whitelisting and blacklisting</p>
          </div>
        )}

      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-2xl border-2 border-red-300 p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-red-100 rounded-2xl">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Delete Administrator</h3>
            </div>

            <p className="text-slate-700 mb-6">
              Are you sure you want to delete <span className="font-bold text-slate-900">{selectedAdmin.name}</span>? 
              This action cannot be undone and will revoke all access immediately.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedAdmin(null);
                }}
                className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAdmin}
                disabled={isSaving}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 disabled:from-slate-300 disabled:to-slate-300 text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    Delete Admin
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-slideIn {
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #6366f1);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #4f46e5);
        }

        button {
          user-select: none;
        }
      `}</style>
    </div>
  );
};

export default AdminManagement;