// Admin types for SuperAdminListScreen

export type AdminRole = 'owner' | 'admin' | 'support';

export type AdminStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface AdminUser {
	id: string;
	email: string;
	name: string;
	role: AdminRole;
	status: AdminStatus;
	createdAt: Date;
	updatedAt: Date;
	lastLoginAt: Date;
	lastLoginIp: string;
	lastLoginLocation: string;
	permissions: string[];
	twoFactor: TwoFactorConfig;
	security: SecurityPolicy;
	metadata: {
		createdBy?: string;
		department?: string;
		phone?: string;
		timezone?: string;
	};
}

export interface TwoFactorConfig {
	enabled: boolean;
	methods: string[];
	primaryMethod?: string;
	enforcedByPolicy?: boolean;
	lastVerified?: Date;
}

export interface SecurityPolicy {
	passwordLastChanged: Date;
	passwordExpireDays: number;
	failedLoginAttempts: number;
	accountLockedUntil?: Date;
	ipRestrictions: IPRestriction[];
	sessionTimeout: number;
	maxConcurrentSessions: number;
	currentSessions: ActiveSession[];
	trustedDevices: string[];
}

export interface IPRestriction {
	id: string;
	ip: string;
	allowed: boolean;
}

export interface ActiveSession {
	id: string;
	device: string;
	location: string;
	lastActive: Date;
}

export interface AdminNotification {
	id: string;
	type: 'success' | 'error' | 'info' | 'warning' | 'security';
	title: string;
	message: string;
	timestamp: Date;
	read: boolean;
	priority: 'low' | 'medium' | 'high';
}

export interface AuditLogEntry {
	id: string;
	timestamp: Date;
	action: string;
	actor: {
		id: string;
		name: string;
		email: string;
		role: AdminRole;
	};
	target?: {
		id: string;
		type: string;
		name: string;
	};
	changes?: Array<{ field: string; oldValue: any; newValue: any }>;
	metadata: {
		ipAddress: string;
		userAgent: string;
		location: string;
		sessionId: string;
		requestId: string;
	};
	severity: 'low' | 'medium' | 'high' | 'critical';
	category: string;
}

export interface AdminStatistics {
	totalAdmins: number;
	activeAdmins: number;
	pendingInvitations: number;
	suspendedAccounts: number;
	totalLogins24h: number;
	failedLogins24h: number;
	twoFactorEnabled: number;
	ipRestrictionsActive: number;
	auditLogsToday: number;
	securityAlertsToday: number;
}

export interface AdminFilters {
	role?: AdminRole;
	status?: AdminStatus;
	search?: string;
}

export interface AuditLogFilters {
	severity?: string;
	category?: string;
	actorId?: string;
	dateFrom?: Date;
	dateTo?: Date;
}

export {};
