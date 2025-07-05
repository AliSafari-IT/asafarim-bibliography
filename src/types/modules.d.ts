// Type declarations for modules without declaration files

declare module '@asafarim/react-privacy-consent' {
  export type ConsentType = 'necessary' | 'analytics' | 'marketing' | 'preferences' | 'custom';
  export type ConsentStatus = 'accepted' | 'rejected' | 'pending';
  export type BannerPosition = 'top' | 'bottom' | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  export type BannerLayout = 'banner' | 'modal' | 'inline' | 'corner-popup';

  export interface ConsentCategory {
    id: string;
    name: string;
    description: string;
    type: ConsentType;
    required: boolean;
    defaultValue: boolean;
  }

  export interface ConsentDecision {
    categoryId: string;
    status: ConsentStatus;
    timestamp: Date;
    version: string;
  }

  export interface ConsentRecord {
    userId?: string;
    sessionId: string;
    decisions: ConsentDecision[];
    lastUpdated: Date;
    version: string;
    ipAddress?: string;
    userAgent?: string;
  }

  export interface PrivacyConsentConfig {
    settings: {
      categories: ConsentCategory[];
      version: string;
      expirationDays: number;
      storageKey: string;
      showDeclineAll: boolean;
      showAcceptAll: boolean;
      showManagePreferences: boolean;
      autoShowDelay: number;
      respectDoNotTrack: boolean;
    };
    ui: {
      banner: {
        position: BannerPosition;
        layout: BannerLayout;
        showCloseButton: boolean;
        showCompanyLogo: boolean;
        blocking: boolean;
      };
      modal: {
        title: string;
        description: string;
        saveButtonText: string;
        acceptAllButtonText: string;
        declineAllButtonText: string;
        closeButtonText: string;
      };
      banner: {
        title: string;
        description: string;
        acceptButtonText: string;
        declineButtonText: string;
        managePreferencesButtonText: string;
      };
    };
    callbacks?: {
      onAccept?: (categoryId: string) => void;
      onDecline?: (categoryId: string) => void;
      onBannerDisplay?: () => void;
      onBannerClose?: () => void;
      onPreferencesDisplay?: () => void;
      onPreferencesSave?: (record: ConsentRecord) => void;
    };
  }

  export const ThemeProvider: React.FC<{children: React.ReactNode}>;
  export const ConsentProvider: React.FC<{config: PrivacyConsentConfig, children: React.ReactNode}>;
  export const ConsentBanner: React.FC;
  export const ConsentModal: React.FC;
  export const ConsentManager: React.FC;
  export function useConsent(): {
    getConsent: (categoryId: string) => boolean;
    hasConsent: (categoryId: string) => boolean;
    updateConsent: (categoryId: string, accepted: boolean) => void;
    acceptAll: () => void;
    declineAll: () => void;
    showPreferences: () => void;
    hidePreferences: () => void;
    consentRecord: ConsentRecord | null;
    preferencesVisible: boolean;
  };
}

declare module '@asafarim/react-themes' {
  export interface ThemeConfig {
    name: string;
    colors: Record<string, string>;
    fonts: Record<string, string>;
    spacing: Record<string, string>;
    borderRadius: Record<string, string>;
    transitions: Record<string, string>;
    shadows: Record<string, string>;
    [key: string]: any;
  }
  
  export function useTheme(): {
    theme: string;
    setTheme: (theme: string) => void;
    isDark: boolean;
    isLight: boolean;
    toggleTheme: () => void;
    themeConfig: ThemeConfig;
  };
  
  export const ThemeProvider: React.FC<{children: React.ReactNode}>;
  export const ThemeToggle: React.FC<{className?: string}>;
}
