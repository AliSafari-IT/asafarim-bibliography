import type { PrivacyConsentConfig, ConsentRecord } from '@asafarim/react-privacy-consent';

// Global consent configuration for the entire application
export const globalConsentConfig: PrivacyConsentConfig = {
  settings: {
    version: '1.7.0', // Increment version to reset any corrupted storage
    storageKey: 'asafarim-bibliography-privacy-consent', // Use unique storage key for bibliography app
    expirationDays: 365,
    autoShowDelay: 1000,
    showDeclineAll: true,
    showAcceptAll: true,
    showManagePreferences: true,
    respectDoNotTrack: true,
    categories: [
      {
        id: 'necessary',
        name: 'Necessary Cookies',
        description: 'Essential cookies required for basic website functionality. These cannot be disabled.',
        type: 'necessary' as const,
        required: true,
        defaultValue: true
      },
      {
        id: 'analytics',
        name: 'Analytics & Performance',
        description: 'Help us understand how visitors interact with our website by collecting anonymous information.',
        type: 'analytics' as const,
        required: false,
        defaultValue: false
      },
      {
        id: 'marketing',
        name: 'Marketing & Advertising',
        description: 'Used to deliver personalized advertisements and measure campaign effectiveness.',
        type: 'marketing' as const,
        required: false,
        defaultValue: false
      },
      {
        id: 'preferences',
        name: 'Preferences',
        description: 'Remember your settings and preferences to provide a personalized experience.',
        type: 'preferences' as const,
        required: false,
        defaultValue: false
      }
    ]
  },
  banner: {
    position: 'bottom',
    layout: 'banner',
    showCloseButton: true,
    showCompanyLogo: false,
    blocking: false,
    animation: true,
    backdrop: false
  },
  texts: {
    title: 'We value your privacy',
    description: 'We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies.',
    acceptAllText: 'Accept All',
    rejectAllText: 'Reject All',
    managePreferencesText: 'Manage Preferences',
    savePreferencesText: 'Save Preferences',
    closeText: 'Close',
    learnMoreText: 'Learn More',
    privacyPolicyUrl: 'https://asafarim.com/legal-docs/privacy-policy',
    cookiePolicyUrl: 'https://asafarim.com/legal-docs/cookie-policy'
  },
  onConsentChange: (consent: ConsentRecord) => {
    console.log('[Global Consent] Consent changed:', consent);
  },
  onBannerShow: () => {
    console.log('[Global Consent] Banner shown');
  },
  onBannerHide: () => {
    console.log('[Global Consent] Banner hidden');
  },
  onError: (error: Error) => {
    console.error('[Global Consent] Error:', error);
  }
};
