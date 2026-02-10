// Status Types
export type SettingStatus = 'active' | 'inactive' | 'testing' | 'error';
export type SettingsTab = 'sms' | 'email' | 'payment' | 'login' | 'whiteLabel' | 'security';

// SMS Provider Types
export interface SMSProvider {
  id: string;
  name: string;
  provider: 'twilio' | 'vonage' | 'aws_sns' | 'custom';
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

// Email Provider Types
export interface EmailProvider {
  id: string;
  name: string;
  provider: 'sendgrid' | 'mailgun' | 'ses' | 'postmark' | 'custom';
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

// Payment Gateway Types
export interface PaymentGateway {
  id: string;
  name: string;
  provider: 'stripe' | 'paypal' | 'square' | 'razorpay' | 'custom';
  status: SettingStatus;
  config: {
    publicKey: string;
    secretKey: string;
    webhookSecret: string;
    environment: 'production' | 'sandbox';
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

// Login Method Types
export interface LoginMethodConfig {
  id: string;
  method: 'email' | 'google' | 'microsoft' | 'apple' | 'saml' | 'ldap' | '2fa';
  enabled: boolean;
  displayName?: string;
  icon?: string;
  config?: Record<string, any>;
  order?: number;
  required?: boolean;
  usage?: {
    enabled?: boolean;
    successfulLogins?: number;
    failedAttempts?: number;
    lastUsedAt?: Date;
    // Additional properties used in the component
    totalLogins?: number;
    failedLogins?: number;
    lastLoginAt?: Date;
  };
}

// White Label Config Types
export interface WhiteLabelConfig {
  id: string;
  branding: {
    companyName: string;
    logoUrl?: string;
    faviconUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
    logo?: {
      primary?: string;
      favicon?: string;
      loginPage?: string;
      emailHeader?: string;
    };
    colors?: {
      primary?: string;
      secondary?: string;
      accent?: string;
      background?: string;
      text?: string;
    };
    fonts?: {
      primary?: string;
      secondary?: string;
    };
  };
  emailTemplate?: {
    templateId?: string;
    headerLogo?: string;
    footerText?: string;
    supportEmail?: string;
  };
  customDomain?: {
    domain: string;
    sslEnabled: boolean;
    verified: boolean;
  };
  customization?: {
    customDomain?: string;
    customDomainVerified?: boolean;
    sslEnabled?: boolean;
    hidePoweredBy?: boolean;
  };
  email?: {
    templateStyle?: string;
    footerText?: string;
    supportEmail?: string;
  };
  legal?: {
    termsOfService?: string;
    privacyPolicy?: string;
    supportEmail?: string;
    supportPhone?: string;
  };
  enabled?: boolean;
}

// Security Config Types
export interface SecurityConfig {
  id: string;
  authentication: {
    sessionTimeout: number;
    passwordPolicy?: {
      minLength?: number;
      requireSpecialChars?: boolean;
      requireNumbers?: boolean;
      requireUppercase?: boolean;
      expiryDays?: number;
    };
    twoFactorEnabled?: boolean;
    loginAttempts?: {
      maxAttempts?: number;
      lockoutDuration?: number;
    };
    // Additional properties used in the component
    maxSessionsPerUser?: number;
    requireEmailVerification?: boolean;
    requirePhoneVerification?: boolean;
    lockoutThreshold?: number;
    lockoutDuration?: number;
  };
  dataProtection?: {
    encryptionEnabled?: boolean;
    backupFrequency?: 'daily' | 'weekly' | 'monthly';
    dataRetention?: number;
    gdprEnabled?: boolean;
  };
  encryption?: {
    algorithm?: string;
    keyRotationDays?: number;
    encryptSensitiveData?: boolean;
    encryptAtRest?: boolean;
    encryptInTransit?: boolean;
  };
  accessControl: {
    ipWhitelistEnabled?: boolean;
    allowedIPs?: string[];
    roleBasedAccess?: boolean;
    // Additional properties used in the component
    ipWhitelist?: string[];
    ipBlacklist?: string[];
    geoBlocking?: {
      enabled?: boolean;
      blockedCountries?: string[];
      allowedCountries?: string[];
    };
    rateLimit?: {
      enabled?: boolean;
      requestsPerMinute?: number;
      requestsPerHour?: number;
    };
  };
  audit?: {
    loggingEnabled?: boolean;
    auditTrailDays?: number;
    alertOnSuspiciousActivity?: boolean;
    // Additional properties used in the component
    logAllActions?: boolean;
    logSensitiveActions?: boolean;
    logRetentionDays?: number;
    exportAuditLogs?: boolean;
  };
  compliance?: {
    gdprCompliant?: boolean;
    hipaaCompliant?: boolean;
    soc2Compliant?: boolean;
    iso27001Compliant?: boolean;
  };
  monitoring?: {
    securityScanning?: boolean;
    vulnerabilityAlerts?: boolean;
    suspiciousActivityAlerts?: boolean;
    failedLoginAlerts?: boolean;
  };
}

// Notification Message Types
export interface NotificationMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'security' | 'system' | 'audit' | 'general';
  title: string;
  message: string;
  timestamp?: Date;
  autoClose?: boolean;
  // Additional properties used in the component
  dismissible?: boolean;
}

export {};
