import * as React from "react";
import {
  useTheme,
  useThemeToggle,
  ThemeToggle,
  ThemeSelector,
} from "@asafarim/react-themes"; // Adjust the import path as necessary

// Demo component that uses the theme
export const ThemeDemo: React.FC = () => {
  const { currentTheme, mode, themes } = useTheme();
  const { isDark, isLight, isAuto } = useThemeToggle();

  return (    <div
      style={{
        padding: "2rem",
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}    >
      {/* Header for @asafarim/react-themes package */}
      <div style={{ 
        textAlign: "center", 
        marginBottom: "3rem", 
        padding: "2rem",
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-primary)",
        borderRadius: "8px",
      }}>
        <h1 style={{ 
          fontSize: "2.5rem", 
          fontWeight: "bold", 
          marginBottom: "1rem",
          color: "var(--text-primary)",
          background: "linear-gradient(45deg, var(--accent-primary), var(--accent-hover))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          @asafarim/react-themes
        </h1>        <p style={{ 
          fontSize: "1.2rem", 
          color: "var(--text-secondary)",
          marginBottom: "1rem" 
        }}>
          A comprehensive React theme management package with TypeScript support
        </p>
        <p style={{ 
          fontSize: "1rem", 
          color: "var(--text-secondary)",
          marginBottom: "1.5rem" 
        }}>
          📦 View on{" "}
          <a 
            href="https://www.npmjs.com/package/@asafarim/react-themes" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: "var(--accent-primary)", 
              textDecoration: "none",
              fontWeight: "500"
            }}
          >
            npm
          </a>
        </p>
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: "1rem", 
          flexWrap: "wrap" 
        }}>          <span style={{ 
            padding: "0.25rem 0.75rem", 
            backgroundColor: "var(--accent-primary)", 
            color: "var(--button-primary-text)", 
            borderRadius: "9999px", 
            fontSize: "0.875rem" 
          }}>
            ⚛️ React 18+
          </span>
          <span style={{ 
            padding: "0.25rem 0.75rem", 
            backgroundColor: "var(--accent-primary)", 
            color: "var(--button-primary-text)", 
            borderRadius: "9999px", 
            fontSize: "0.875rem" 
          }}>
            📘 TypeScript
          </span>
          <span style={{ 
            padding: "0.25rem 0.75rem", 
            backgroundColor: "var(--accent-primary)", 
            color: "var(--button-primary-text)", 
            borderRadius: "9999px", 
            fontSize: "0.875rem" 
          }}>
            🎨 CSS Variables
          </span>          <span style={{ 
            padding: "0.25rem 0.75rem", 
            backgroundColor: "var(--accent-primary)", 
            color: "var(--button-primary-text)", 
            borderRadius: "9999px", 
            fontSize: "0.875rem" 
          }}>
            🌙 Dark Mode
          </span>
        </div>
      </div>
      
      <div style={{ marginBottom: "2rem" }}>
        <h2>Current Theme Info</h2>
        <p>Mode: {mode}</p>
        <p>Theme: {currentTheme.name}</p>
        <p>Is Dark: {isDark ? "Yes" : "No"}</p>
        <p>Is Light: {isLight ? "Yes" : "No"}</p>
        <p>Is Auto: {isAuto ? "Yes" : "No"}</p>
      </div>{" "}
      <div style={{ marginBottom: "2rem" }}>
        <h2>Theme Controls</h2>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <ThemeToggle />
          <ThemeToggle showLabels={true} />
          <ThemeSelector />          <button
            onClick={() => console.log("Current theme:", currentTheme)}
            style={{
              backgroundColor: "var(--button-primary)",
              color: "var(--button-primary-text)",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Log Current Theme
          </button>
        </div>
      </div>{" "}
      <div style={{ marginBottom: "2rem" }}>
        <h2>Available Themes</h2>
        <ul>
          {Object.keys(themes).map((themeName) => (
            <li key={themeName}>
              <strong>{themeName}</strong>
              {themes[themeName] === currentTheme && " (current)"}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginBottom: "2rem" }}>
        <h2>Theme Features</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >          <div
            style={{
              padding: "1rem",
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              borderRadius: "8px",
            }}
          >
            <h4>🎨 Multiple Themes</h4>
            <p>Light, dark, and custom themes</p>
          </div>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              borderRadius: "8px",
            }}
          >
            <h4>🔄 Auto Detection</h4>
            <p>Follows system preferences</p>
          </div>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              borderRadius: "8px",
            }}
          >
            <h4>💾 Persistence</h4>
            <p>Remembers your choice</p>
          </div>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              borderRadius: "8px",
            }}
          >
            <h4>⚛️ React Hooks</h4>
            <p>Easy theme management</p>
          </div>
        </div>
      </div>      <div
        style={{
          padding: "1rem",
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-primary)",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h3>CSS Variables Demo</h3>
        <p>This box uses CSS variables from the current theme.</p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button
            style={{
              backgroundColor: "var(--button-primary)",
              color: "var(--button-primary-text)",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Primary Button
          </button>
          <button
            style={{
              backgroundColor: "var(--teams-green)",
              color: "var(--text-success)",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Success Button
          </button>
          <button
            style={{
              backgroundColor: "var(--warning)",
              color: "var(--text-warning)",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Warning Button
          </button>
          <button
            style={{
              backgroundColor: "var(--teams-red)",
              color: "var(--text-error)",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Error Button
          </button>
        </div>
      </div>
    </div>
  );
};
