// SMS Provider type
export interface SMSProvider {
	id: string;
	name: string;
	provider: string;
	apiKey?: string;
}

// Email Provider type
export interface EmailProvider {
	id: string;
	name: string;
	provider: string;
	apiKey?: string;
}

// Payment Gateway type
export interface PaymentGateway {
	id: string;
	name: string;
	provider: string;
	publicKey?: string;
	secretKey?: string;
}

// Setting status type
export type SettingStatus = 'active' | 'inactive' | 'testing';

// Settings tab type
export type SettingsTab = 'sms' | 'email' | 'payment' | 'login' | 'whiteLabel' | 'security';

// Notification message type
export interface NotificationMessage {
	id: string;
	type: 'success' | 'error' | 'info' | 'warning';
	title: string;
	message: string;
}

// Login method config type
export interface LoginMethodConfig {
	id: string;
	method: string;
	enabled?: boolean;
}

// White label config type
export interface WhiteLabelConfig {
	id: string;
	branding: {
		companyName: string;
		logoUrl?: string;
	};
	enabled: boolean;
}

// Security config type
export interface SecurityConfig {
	id: string;
	authentication: {
		sessionTimeout: number;
		twoFA: boolean;
		allowedIPs?: string[];
	};
}


