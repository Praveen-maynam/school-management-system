// Admin User Types
export type AdminRole = 'owner' | 'admin' | 'support';
export type AdminStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  joinedDate?: Date;
  lastLogin?: Date;
  permissions?: string[];
  avatar?: string;
  // Additional properties used in the component
  createdAt?: Date;
  updatedAt?: Date;
  lastLoginAt?: Date;
  lastLoginIp?: string;
  lastLoginLocation?: string;
  twoFactor?: TwoFactorConfig;
  security?: SecuritySettings;
  metadata?: {
    phone?: string;
    department?: string;
    [key: string]: any;
  };
}

// Audit Log Types
export interface AuditLogEntry {
  id: string;
  adminId?: string;
  adminName?: string;
  action: string;
  resource?: string;
  resourceId?: string;
  timestamp: Date;
  changes?: Array<{
    field: string;
    oldValue: string;
    newValue: string;
  }>;
  // Additional properties used in the component
  actor?: {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
  };
  target?: {
    id?: string;
    type?: string;
    name?: string;
  };
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    location?: string;
    sessionId?: string;
    requestId?: string;
    [key: string]: any;
  };
  severity?: string;
  category?: string;
}

export interface AuditLogFilters {
  adminId?: string;
  action?: string;
  resource?: string;
  startDate?: Date;
  endDate?: Date;
  searchTerm?: string;
}

// Security Policy Types
export interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  rules: SecurityRule[];
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SecurityRule {
  id: string;
  name: string;
  condition: string;
  action: 'allow' | 'block' | 'alert';
  priority: number;
}

// Admin Statistics Types
export interface AdminStatistics {
  totalAdmins: number;
  activeAdmins: number;
  inactiveAdmins?: number;
  suspendedAdmins?: number;
  // Additional properties used in the component
  pendingInvitations?: number;
  suspendedAccounts?: number;
  totalLogins24h?: number;
  failedLogins24h?: number;
  twoFactorEnabled?: number;
  ipRestrictionsActive?: number;
  auditLogsToday?: number;
  auditLogsLastDay?: number;
  auditLogsLastWeek?: number;
  systemHealth?: number;
  securityScore?: number;
  securityAlertsToday?: number;
}

// Admin Filters Types
export interface AdminFilters {
  role?: AdminRole;
  status?: AdminStatus;
  searchTerm?: string;
  sortBy?: 'name' | 'email' | 'joinedDate' | 'lastLogin';
  sortOrder?: 'asc' | 'desc';
}

// Security Settings Types
export type SecuritySettings = {
  passwordLastChanged?: Date;
  passwordExpireDays?: number;
  failedLoginAttempts?: number;
  accountLockedUntil?: Date;
  ipRestrictions?: string[];
  sessionTimeout?: number;
  maxConcurrentSessions?: number;
  currentSessions?: string[];
  trustedDevices?: string[];
};

// Two Factor Config Types
export type TwoFactorConfig = {
  enabled: boolean;
  method?: 'totp' | 'sms' | 'email';
  methods?: ('totp' | 'sms' | 'email')[];
  primaryMethod?: 'totp' | 'sms' | 'email';
  backupCodes?: string[];
  enforcedByPolicy?: boolean;
  lastVerified?: Date;
};

// IP Restriction Types
export interface IPRestriction {
  id: string;
  adminId: string;
  ipAddress: string;
  description?: string;
  allowedCountries?: string[];
  deniedCountries?: string[];
  createdAt: Date;
  expiresAt?: Date;
}

// Active Session Types
export interface ActiveSession {
  id: string;
  adminId: string;
  ipAddress: string;
  userAgent: string;
  loginTime: Date;
  lastActivity: Date;
  deviceInfo: {
    name?: string;
    type?: string;
    os?: string;
    browser?: string;
  };
}

// Admin Notification Types
export interface AdminNotification {
  id: string;
  adminId?: string;
  type: 'security' | 'system' | 'audit' | 'general' | 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  read?: boolean;
  createdAt?: Date;
  timestamp?: Date;
  actionUrl?: string;
  // Additional properties used in the component
  priority?: string;
}

export {};
