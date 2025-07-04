import { useEffect } from 'react'
import { 
  useConsent,
  applyConsentTheme
} from '@asafarim/react-privacy-consent'
import { useTheme, ThemeToggle } from '@asafarim/react-themes'
import { globalConsentConfig } from '../config/consentConfig'
import './PrivacyConsentDemo.css'

// Use the global config for reference in the demo
const demoConfig = globalConsentConfig;

function PrivacyConsentDemo() {
  const { 
    consentRecord, 
    isVisible, 
    showPreferences, 
    resetConsent, 
    acceptAll, 
    rejectAll,
    getConsent
  } = useConsent();
  const { mode, currentTheme } = useTheme();

  // Debug: Log consent record changes
  useEffect(() => {
    console.log('[Demo] Consent record updated:', consentRecord);
    if (consentRecord) {
      console.log('[Demo] Current consent decisions:', consentRecord.decisions);
      consentRecord.decisions.forEach(decision => {
        console.log(`[Demo] Category ${decision.categoryId}: ${decision.status} (timestamp: ${decision.timestamp})`);
      });
    }
  }, [consentRecord]);

  useEffect(() => {
    console.log('[Demo] Theme mode changed to:', mode);
    console.log('[Demo] Current theme object:', currentTheme);
    
    // Handle all possible theme modes including 'auto'
    const isDark = mode === 'dark' || (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
      console.log('[Demo] Applying dark theme to consent components');
      applyConsentTheme({
        primaryColor: 'var(--accent-primary)',
        secondaryColor: 'var(--accent-hover)',
        backgroundColor: 'var(--bg-primary)',
        textColor: 'var(--text-primary)',
        borderColor: 'var(--border-primary)',
        borderRadius: '8px',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '14px',
        buttonStyle: 'solid',
        shadow: true
      });    } else {
      console.log('[Demo] Applying light theme to consent components');
      applyConsentTheme({
        primaryColor: 'var(--accent-primary)',
        secondaryColor: 'var(--accent-hover)',
        backgroundColor: 'var(--bg-primary)',
        textColor: 'var(--text-primary)',
        borderColor: 'var(--border-primary)',
        borderRadius: '8px',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '14px',
        buttonStyle: 'solid',
        shadow: true
      });
    }
  }, [mode, currentTheme]);

  const getConsentStatusDisplay = (categoryId: string) => {
    const status = getConsent(categoryId);
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="demo-container">
      <h1>React Privacy Consent Demo</h1>
      
      {/* Theme Controls */}
      <div className="demo-section">
        <h2>Theme Controls</h2>        <div className="demo-controls">
          <ThemeToggle />
          <div style={{ 
            marginLeft: '20px', 
            padding: '10px', 
            backgroundColor: 'var(--bg-tertiary)', 
            borderRadius: '4px',
            color: 'var(--text-primary)'
          }}>
            <strong>Current Theme Mode:</strong> {mode}
            <br />
            <strong>Is Dark:</strong> {mode === 'dark' || (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'Yes' : 'No'}
          </div>
        </div>
      </div>

      {/* Consent Controls */}
      <div className="demo-section">
        <h2>Consent Controls</h2>
        <div className="demo-controls">
          <button onClick={() => showPreferences()}>
            🛠️ Manage Preferences
          </button>
          <button onClick={acceptAll}>
            ✅ Accept All
          </button>
          <button onClick={rejectAll}>
            ❌ Reject All
          </button>
          <button onClick={resetConsent}>
            🔄 Reset Consent
          </button>
        </div>
      </div>

      {/* Current Consent Status */}
      <div className="demo-section">
        <h2>Current Consent Status</h2>
        {consentRecord ? (
          <div className="consent-status">
            <p><strong>Session ID:</strong> {consentRecord.sessionId}</p>
            <p><strong>Version:</strong> {consentRecord.version}</p>
            <p><strong>Last Updated:</strong> {new Date(consentRecord.lastUpdated).toLocaleString()}</p>
            
            <h3>Categories:</h3>
            {demoConfig.settings.categories.map((category) => (
              <div key={category.id} className="consent-category">
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  {category.required && <small><em>Required</em></small>}
                </div>
                <span className={`status-badge status-${getConsent(category.id)}`}>
                  {getConsentStatusDisplay(category.id)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p>No consent record available</p>
        )}
      </div>

      {/* Banner Status */}
      <div className="demo-section">
        <h2>Banner Status</h2>
        <p>Banner is currently: <strong>{isVisible ? 'Visible' : 'Hidden'}</strong></p>
        {!isVisible && (
          <p><em>The banner will show automatically when consent is reset or on first visit.</em></p>
        )}
      </div>

      {/* Integration Guide */}
      <div className="demo-section">
        <h2>Integration Guide</h2>
        <div style={{ textAlign: 'left' }}>          <h3>1. Install the Package</h3>
          <pre style={{ 
            background: 'var(--markdown-code-bg)', 
            color: 'var(--markdown-code-text)',
            padding: '1rem', 
            borderRadius: '4px' 
          }}>
            npm install @asafarim/react-privacy-consent
          </pre>

          <h3>2. Basic Usage</h3>
          <pre style={{ 
            background: 'var(--markdown-code-bg)', 
            color: 'var(--markdown-code-text)',
            padding: '1rem', 
            borderRadius: '4px' 
          }}>
{`import { ConsentProvider, ConsentBanner, ConsentModal } from '@asafarim/react-privacy-consent';
import '@asafarim/react-privacy-consent/styles.css';

function App() {
  return (
    <ConsentProvider config={yourConfig}>
      <YourAppContent />
      <ConsentBanner />
      <ConsentModal />
    </ConsentProvider>
  );
}`}
          </pre>          <h3>3. Use Consent Data</h3>
          <pre style={{ 
            background: 'var(--markdown-code-bg)', 
            color: 'var(--markdown-code-text)',
            padding: '1rem', 
            borderRadius: '4px' 
          }}>
{`import { useConsent } from '@asafarim/react-privacy-consent';

function YourComponent() {
  const { hasConsent, getConsent } = useConsent();
  
  if (hasConsent('analytics')) {
    // Load analytics scripts
  }
  
  return <div>Your content</div>;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// No need for a separate ConsentModalWrapper as it's already in the main App

function PrivacyConsentDemoWrapper() {
  return (
    <div>
      <PrivacyConsentDemo />
    </div>
  );
}

export default PrivacyConsentDemoWrapper;
