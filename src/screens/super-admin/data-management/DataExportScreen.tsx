



import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Upload, 
  Database, 
  Shield, 
  Clock, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  FileText,
  RefreshCw,
  Archive,
  Lock,
  Unlock,
  Calendar,
  HardDrive,
  Filter,
  Search,
  ChevronDown,
  Settings
} from 'lucide-react';

// Types
interface BackupJob {
  id: string;
  timestamp: Date;
  size: string;
  status: 'completed' | 'in-progress' | 'failed';
  type: 'manual' | 'scheduled';
  dataTypes: string[];
}

interface ExportRequest {
  id: string;
  requestedBy: string;
  requestedAt: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  dataScope: string[];
  format: 'json' | 'csv' | 'sql';
}

interface DeletionRecord {
  id: string;
  entity: string;
  deletedBy: string;
  deletedAt: Date;
  reason: string;
  dataType: string;
  complianceRef?: string;
}

const SuperAdminDataManagement = () => {
  const [activeTab, setActiveTab] = useState<'export' | 'backup' | 'restore' | 'delete'>('export');
  const [backups, setBackups] = useState<BackupJob[]>([]);
  const [exports, setExports] = useState<ExportRequest[]>([]);
  const [deletions, setDeletions] = useState<DeletionRecord[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // Mock data initialization
  useEffect(() => {
    setBackups([
      {
        id: 'bkp-001',
        timestamp: new Date('2026-01-30T02:00:00'),
        size: '2.4 GB',
        status: 'completed',
        type: 'scheduled',
        dataTypes: ['students', 'staff', 'courses', 'grades']
      },
      {
        id: 'bkp-002',
        timestamp: new Date('2026-01-29T02:00:00'),
        size: '2.3 GB',
        status: 'completed',
        type: 'scheduled',
        dataTypes: ['students', 'staff', 'courses', 'grades']
      },
      {
        id: 'bkp-003',
        timestamp: new Date('2026-01-29T15:30:00'),
        size: '2.3 GB',
        status: 'completed',
        type: 'manual',
        dataTypes: ['students', 'grades']
      }
    ]);

    setExports([
      {
        id: 'exp-001',
        requestedBy: 'admin@school.edu',
        requestedAt: new Date('2026-01-30T10:15:00'),
        status: 'completed',
        dataScope: ['all_students', 'all_grades'],
        format: 'csv'
      },
      {
        id: 'exp-002',
        requestedBy: 'principal@school.edu',
        requestedAt: new Date('2026-01-29T14:20:00'),
        status: 'processing',
        dataScope: ['staff_records'],
        format: 'json'
      }
    ]);

    setDeletions([
      {
        id: 'del-001',
        entity: 'Student Record - ID: 45678',
        deletedBy: 'admin@school.edu',
        deletedAt: new Date('2026-01-28T09:00:00'),
        reason: 'GDPR Right to Erasure Request',
        dataType: 'Student Data',
        complianceRef: 'GDPR-REQ-2026-001'
      }
    ]);
  }, []);

  // Data Export Handler
  const handleFullExport = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const newExport: ExportRequest = {
        id: `exp-${String(exports.length + 1).padStart(3, '0')}`,
        requestedBy: 'current.admin@school.edu',
        requestedAt: new Date(),
        status: 'processing',
        dataScope: ['all_data'],
        format: 'json'
      };
      
      setExports([newExport, ...exports]);
      setIsProcessing(false);
      
      // Simulate completion
      setTimeout(() => {
        setExports(prev => prev.map(exp => 
          exp.id === newExport.id ? { ...exp, status: 'completed' } : exp
        ));
      }, 3000);
    }, 1000);
  };

  // Backup Creation Handler
  const handleCreateBackup = async () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const newBackup: BackupJob = {
        id: `bkp-${String(backups.length + 1).padStart(3, '0')}`,
        timestamp: new Date(),
        size: '2.5 GB',
        status: 'in-progress',
        type: 'manual',
        dataTypes: ['students', 'staff', 'courses', 'grades', 'attendance']
      };
      
      setBackups([newBackup, ...backups]);
      setIsProcessing(false);
      
      setTimeout(() => {
        setBackups(prev => prev.map(bkp => 
          bkp.id === newBackup.id ? { ...bkp, status: 'completed' } : bkp
        ));
      }, 5000);
    }, 800);
  };

  // Permanent Deletion Handler
  const handlePermanentDelete = async (entity: string, reason: string, complianceRef?: string) => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const newDeletion: DeletionRecord = {
        id: `del-${String(deletions.length + 1).padStart(3, '0')}`,
        entity,
        deletedBy: 'current.admin@school.edu',
        deletedAt: new Date(),
        reason,
        dataType: 'Mixed',
        complianceRef
      };
      
      setDeletions([newDeletion, ...deletions]);
      setIsProcessing(false);
    }, 1200);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-600 bg-emerald-50';
      case 'in-progress': case 'processing': return 'text-amber-600 bg-amber-50';
      case 'failed': return 'text-rose-600 bg-rose-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl shadow-lg shadow-indigo-500/20">
                <Database className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Data Management Center
                </h1>
                <p className="text-sm text-slate-600 mt-0.5">
                  Super Admin Controls
                </p>
              </div>
            </div>
           
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-[1800px] mx-auto px-8 pt-8">
        <div className="flex gap-2 border-b border-slate-200">
          {[
            { id: 'export', label: 'Data Export', icon: Download },
            { id: 'backup', label: 'Backups', icon: Archive },
            { id: 'restore', label: 'Restore', icon: RefreshCw },
            { id: 'delete', label: 'Compliance & Deletion', icon: Trash2 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all relative ${
                activeTab === tab.id
                  ? 'text-indigo-700 border-b-2 border-indigo-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-8 py-8">
        {/* Export Tab */}
        {activeTab === 'export' && (
          <div className="space-y-6">
            {/* Action Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Full School Data Export
                </h2>
                <p className="text-indigo-100 text-sm mt-1">
                  Export complete database for compliance, migration, or backup purposes
                </p>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <FileText className="w-5 h-5 text-indigo-700" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-600">Format</div>
                        <div className="font-semibold text-slate-900">JSON / CSV / SQL</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Shield className="w-5 h-5 text-green-700" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-600">Security</div>
                        <div className="font-semibold text-slate-900">AES-256 Encrypted</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Clock className="w-5 h-5 text-amber-700" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-600">Est. Time</div>
                        <div className="font-semibold text-slate-900">5-10 minutes</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600" defaultChecked />
                    <span className="text-sm font-medium text-slate-700">Include all student records</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600" defaultChecked />
                    <span className="text-sm font-medium text-slate-700">Include staff & personnel data</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600" defaultChecked />
                    <span className="text-sm font-medium text-slate-700">Include academic records & grades</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600" />
                    <span className="text-sm font-medium text-slate-700">Include financial transactions</span>
                  </label>
                </div>

                <button
                  onClick={handleFullExport}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Preparing Export...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Generate Full Export
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Export History */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Export History</h3>
              </div>
              <div className="divide-y divide-slate-200">
                {exports.map(exp => (
                  <div key={exp.id} className="p-8 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm font-medium text-slate-900">{exp.id}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(exp.status)}`}>
                            {exp.status}
                          </span>
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">
                            {exp.format.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-slate-600">
                          Requested by <span className="font-medium text-slate-900">{exp.requestedBy}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {exp.requestedAt.toLocaleString()}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {exp.dataScope.map(scope => (
                            <span key={scope} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md font-medium">
                              {scope.replace(/_/g, ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                      {exp.status === 'completed' && (
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Backup Tab */}
        {activeTab === 'backup' && (
          <div className="space-y-6">
            {/* Backup Controls */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Archive className="w-5 h-5" />
                  Automated Backup System
                </h2>
                <p className="text-green-100 text-sm mt-1">
                  Scheduled backups run daily at 2:00 AM UTC
                </p>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-green-900">Automatic Backups</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold text-green-700">ENABLED</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-900">Daily at 2:00 AM</div>
                    <div className="text-sm text-green-700 mt-1">Next backup in 14h 32m</div>
                  </div>
                  
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-sm font-medium text-blue-900 mb-3">Retention Policy</div>
                    <div className="text-2xl font-bold text-blue-900">30 Days</div>
                    <div className="text-sm text-blue-700 mt-1">Older backups auto-archived</div>
                  </div>
                </div>

                <button
                  onClick={handleCreateBackup}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Creating Backup...
                    </>
                  ) : (
                    <>
                      <Archive className="w-5 h-5" />
                      Create Manual Backup
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Backup History */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Backup History</h3>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Filter className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>
              <div className="divide-y divide-slate-200">
                {backups.map(backup => (
                  <div key={backup.id} className="p-8 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <HardDrive className="w-5 h-5 text-slate-600" />
                          <span className="font-mono text-sm font-medium text-slate-900">{backup.id}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(backup.status)}`}>
                            {backup.status}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            backup.type === 'scheduled' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {backup.type}
                          </span>
                        </div>
                        <div className="text-sm text-slate-600 flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {backup.timestamp.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <HardDrive className="w-4 h-4" />
                            {backup.size}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {backup.dataTypes.map(type => (
                            <span key={type} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-md font-medium">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm">
                          <RefreshCw className="w-4 h-4" />
                          Restore
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Restore Tab */}
        {activeTab === 'restore' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Data Restoration
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  Restore from previous backups with precision control
                </p>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="p-6 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-900 mb-1">Critical Action Required</h4>
                      <p className="text-sm text-amber-800">
                        Restoration will overwrite current data. Ensure you have created a recent backup before proceeding. This action requires additional authentication.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Select Backup to Restore
                    </label>
                    <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option>Select a backup...</option>
                      {backups.filter(b => b.status === 'completed').map(backup => (
                        <option key={backup.id} value={backup.id}>
                          {backup.id} - {backup.timestamp.toLocaleString()} ({backup.size})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      Restoration Scope
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                        <input type="radio" name="scope" className="w-4 h-4 text-blue-600" defaultChecked />
                        <span className="text-sm font-medium text-slate-700">Full System Restore</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                        <input type="radio" name="scope" className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-slate-700">Selective Data Restore</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Admin Verification Code
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your verification code"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                  <RefreshCw className="w-5 h-5" />
                  Initiate Restoration Process
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Tab */}
        {activeTab === 'delete' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-rose-600 to-red-600 px-8 py-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  Permanent Deletion & Compliance
                </h2>
                <p className="text-rose-100 text-sm mt-1">
                  GDPR, FERPA, and regulatory compliance tools
                </p>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="p-6 bg-rose-50 border-l-4 border-rose-500 rounded-lg">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-rose-900 mb-1">Irreversible Action</h4>
                      <p className="text-sm text-rose-800">
                        Permanent deletion cannot be undone. All data will be securely erased from all systems including backups per compliance requirements.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-slate-700" />
                      <div>
                        <div className="text-sm text-slate-600">GDPR Compliant</div>
                        <div className="font-semibold text-slate-900">Right to Erasure</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-slate-700" />
                      <div>
                        <div className="text-sm text-slate-600">FERPA Compliant</div>
                        <div className="font-semibold text-slate-900">Student Privacy</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-700" />
                      <div>
                        <div className="text-sm text-slate-600">Audit Trail</div>
                        <div className="font-semibold text-slate-900">Full Logging</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Entity/Record ID to Delete
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Student ID, Staff ID, Record Reference"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Deletion Reason (Required)
                    </label>
                    <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white">
                      <option>Select reason...</option>
                      <option>GDPR Right to Erasure Request</option>
                      <option>FERPA Student Data Removal</option>
                      <option>Data Retention Policy Expiry</option>
                      <option>Court Order / Legal Requirement</option>
                      <option>Administrative Correction</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Compliance Reference Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., GDPR-REQ-2026-001"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="p-5 bg-slate-50 rounded-xl">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 mt-1 rounded border-slate-300 text-rose-600" />
                      <div className="text-sm">
                        <span className="font-semibold text-slate-900">I confirm this permanent deletion</span>
                        <p className="text-slate-600 mt-1">
                          I understand that this action is irreversible and will permanently erase all associated data from all systems, databases, and backups.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => handlePermanentDelete('Sample Entity', 'GDPR Right to Erasure Request', 'GDPR-REQ-2026-002')}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-rose-600 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-rose-500/30 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Processing Deletion...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      Execute Permanent Deletion
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Deletion Audit Log */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Deletion Audit Log</h3>
                <p className="text-sm text-slate-600 mt-1">Complete record of all permanent deletions</p>
              </div>
              <div className="divide-y divide-slate-200">
                {deletions.map(deletion => (
                  <div key={deletion.id} className="p-8 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-rose-100 rounded-xl">
                        <Trash2 className="w-5 h-5 text-rose-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm font-medium text-slate-900">{deletion.id}</span>
                          <span className="px-2 py-1 bg-rose-100 text-rose-700 text-xs font-semibold rounded">
                            {deletion.dataType}
                          </span>
                          {deletion.complianceRef && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                              {deletion.complianceRef}
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-medium text-slate-900 mb-1">{deletion.entity}</div>
                        <div className="text-sm text-slate-600 mb-2">
                          <span className="font-medium">Reason:</span> {deletion.reason}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>Deleted by {deletion.deletedBy}</span>
                          <span>•</span>
                          <span>{deletion.deletedAt.toLocaleString()}</span>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors">
                        <FileText className="w-4 h-4" />
                        View Certificate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SuperAdminDataManagement;