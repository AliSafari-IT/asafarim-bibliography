import { useTheme } from '@asafarim/react-themes';

export default function ThemeDebug() {
  const { mode, currentTheme } = useTheme();
    return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      padding: '8px',
      borderRadius: '4px',
      fontSize: '12px',
      zIndex: 9999,
      border: '1px solid var(--border-primary)',
    }}>
      <div>Mode: {mode}</div>
      <div>Theme: {currentTheme.name}</div>
      <div>BG: {getComputedStyle(document.documentElement).getPropertyValue('--background-color')}</div>
    </div>
  );
}
