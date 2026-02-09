
// --- BEGIN: Corrected Platform Settings Types ---

export type SettingStatus = 'active' | 'inactive' | 'testing' | 'error';

export type SettingsTab = 'sms' | 'email' | 'payment' | 'login' | 'whitelabel' | 'security';

export interface SMSProvider {
  id: string;
  name: string;
  provider: string;
  status: SettingStatus;
  config: {
    accountSid: string;
    authToken: string;
    phoneNumber: string;
  };
  credentials: {
    verified: boolean;
    lastVerified: Date;
    testMessagesSent: number;
  };
  usage: {
    messagesSent: number;
    messagesReceived: number;
    failedMessages: number;
    lastMessageAt: Date;
  };
  limits: {
    dailyLimit: number;
    monthlyLimit: number;
    costPerMessage: number;
  };
}

export interface EmailProvider {
  id: string;
  name: string;
  provider: string;
  status: SettingStatus;
  config: {
    apiKey: string;
    domain: string;
    fromEmail: string;
    fromName: string;
    replyTo: string;
  };
  credentials: {
    verified: boolean;
    domainVerified: boolean;
    dkimEnabled: boolean;
    spfEnabled: boolean;
    lastVerified: Date;
  };
  usage: {
    emailsSent: number;
    emailsDelivered: number;
    emailsBounced: number;
    emailsOpened: number;
    lastEmailAt: Date;
  };
  limits: {
    dailyLimit: number;
    monthlyLimit: number;
    costPerEmail: number;
  };
}

export interface PaymentGateway {
  id: string;
  name: string;
  provider: string;
  status: SettingStatus;
  config: {
    publicKey: string;
    secretKey: string;
    webhookSecret: string;
    environment: string;
    currency: string;
    acceptedPaymentMethods: string[];
  };
  credentials: {
    verified: boolean;
    webhookConfigured: boolean;
    last4: string;
    lastVerified: Date;
  };
  usage: {
    transactionsProcessed: number;
    totalAmount: number;
    failedTransactions: number;
    refunds: number;
    lastTransactionAt: Date;
  };
  fees: {
    percentageFee: number;
    fixedFee: number;
    chargebackFee: number;
  };
  security: {
    pciCompliant: boolean;
    fraudDetection: boolean;
    threeDSecure: boolean;
  };
}

export interface LoginMethodConfig {
  id: string;
  method: string;
  enabled: boolean;
  required: boolean;
  config: any;
  usage: {
    totalLogins: number;
    successfulLogins: number;
    failedLogins: number;
    lastLoginAt: Date;
  };
}

export interface WhiteLabelConfig {
  id: string;
  branding: {
    companyName: string;
    logo: {
      primary: string;
      favicon: string;
      loginPage: string;
      emailHeader: string;
    };
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
  };
  customization: {
    customDomain: string;
    customDomainVerified: boolean;
    sslEnabled: boolean;
    hidePoweredBy: boolean;
  };
  email: {
    templateStyle: string;
    footerText: string;
  };
  legal: {
    termsOfService: string;
    privacyPolicy: string;
    supportEmail: string;
    supportPhone: string;
  };
}

export interface SecurityConfig {
  id: string;
  authentication: {
    sessionTimeout: number;
    maxSessionsPerUser: number;
    requireEmailVerification: boolean;
    requirePhoneVerification: boolean;
    lockoutThreshold: number;
    lockoutDuration: number;
  };
  encryption: {
    algorithm: string;
    keyRotationDays: number;
    encryptSensitiveData: boolean;
    encryptAtRest: boolean;
    encryptInTransit: boolean;
  };
  accessControl: {
    ipWhitelist: string[];
    ipBlacklist: string[];
    geoBlocking: {
      enabled: boolean;
      blockedCountries: string[];
      allowedCountries: string[];
    };
    rateLimit: {
      enabled: boolean;
      requestsPerMinute: number;
      requestsPerHour: number;
    };
  };
  audit: {
    logAllActions: boolean;
    logSensitiveActions: boolean;
    logRetentionDays: number;
    exportAuditLogs: boolean;
  };
  compliance: {
    gdprCompliant: boolean;
    hipaaCompliant: boolean;
    soc2Compliant: boolean;
    iso27001Compliant: boolean;
  };
  monitoring: {
    securityScanning: boolean;
    vulnerabilityAlerts: boolean;
    suspiciousActivityAlerts: boolean;
    failedLoginAlerts: boolean;
  };
}

export interface NotificationMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: Date;
  dismissible: boolean;
}

export interface PlatformStats {
  totalUsers: number;
  activeUsers: number;
  totalAdmins: number;
  activeAdmins: number;
  totalParents: number;
  activeParents: number;
  totalTeachers: number;
  activeTeachers: number;
  totalStudents: number;
  activeStudents: number;
}

export interface FormState {
    [key: string]: any;
}

// --- END: Corrected Platform Settings Types ---
