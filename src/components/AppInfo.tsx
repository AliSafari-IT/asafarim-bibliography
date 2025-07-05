import React, { useState, useEffect } from 'react';
import './AppInfo.css';

const AppInfo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  const tabs = [
    { 
      title: 'Redux', 
      icon: '🔄',
      color: 'var(--accent-primary, #a6e3a1)',
      link: 'https://blog.asafarim.com/docs/React/Redux/Redux-Basic-Example',
      description: 'State management with Redux Toolkit',
      filename: 'redux-slice.ts',
      language: 'typescript',
      activeLine: 3,
      activeCol: 24
    },
    { 
      title: 'API Data', 
      icon: '📊',
      color: 'var(--accent-secondary, #f38ba8)',
      link: 'https://blog.asafarim.com/docs/React/Basics/handle-data-from-api',
      description: 'Fetching and handling API data',
      filename: 'api-client.ts',
      language: 'javascript',
      activeLine: 5,
      activeCol: 12
    },
    { 
      title: 'useFetch', 
      icon: '🪝',
      color: 'var(--primary, #fab387)',
      link: 'https://blog.asafarim.com/docs/React/Hooks/useFetch',
      description: 'Custom hooks for data fetching',
      filename: 'use-fetch.tsx',
      language: 'tsx',
      activeLine: 4,
      activeCol: 18
    },
    { 
      title: 'Axios', 
      icon: '🌐',
      color: 'var(--secondary, #89b4fa)',
      link: 'https://blog.asafarim.com/docs/React/Axios',
      description: 'HTTP client for API requests',
      filename: 'axios-config.ts',
      language: 'typescript',
      activeLine: 5,
      activeCol: 9
    }
  ];

  useEffect(() => {
    if (isExpanded) {
      setAnimationClass('fade-in');
    } else {
      setAnimationClass('fade-out');
    }
  }, [isExpanded]);

  const handleTabClick = (index: number) => {
    setAnimationClass('tab-transition');
    setTimeout(() => {
      setActiveTab(index);
      setAnimationClass('');
    }, 300);
  };

  // Code content for each tab
  const codeContent = {
    0: [ // Redux
      { 
        content: "// Redux Toolkit slice for managing books", 
        type: "comment"
      },
      { 
        content: "import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';", 
        type: "import"
      },
      { 
        content: "", 
        type: "blank"
      },
      { 
        content: "const fetchBooks = createAsyncThunk('books/fetchAll', async() => {", 
        type: "declaration",
        highlight: true
      },
      { 
        content: "  const response = await fetch('/api/books');", 
        type: "statement"
      },
      { 
        content: "  return await response.json();", 
        type: "statement"
      },
      { 
        content: "});", 
        type: "closing"
      },
      { 
        content: "", 
        type: "blank"
      },
      { 
        content: "const booksSlice = createSlice({", 
        type: "declaration"
      },
      { 
        content: "  name: 'books',", 
        type: "property"
      },
      { 
        content: "  initialState: {", 
        type: "property"
      }
    ],
    1: [ // API Data
      { 
        content: "// API Data Handling with fetch", 
        type: "comment"
      },
      { 
        content: "async function fetchData() {", 
        type: "function"
      },
      { 
        content: "  try {", 
        type: "control"
      },
      { 
        content: "    const response = await fetch('/api/books');", 
        type: "statement"
      },
      { 
        content: "    if (!response.ok) {", 
        type: "control",
        highlight: true
      },
      { 
        content: "      throw new Error(`HTTP error! Status: ${response.status}`);", 
        type: "statement"
      },
      { 
        content: "    }", 
        type: "closing"
      },
      { 
        content: "    const data = await response.json();", 
        type: "statement"
      },
      { 
        content: "    return data;", 
        type: "return"
      },
      { 
        content: "  } catch (error) {", 
        type: "control"
      },
      { 
        content: "    console.error(error);", 
        type: "statement"
      },
      { 
        content: "  }", 
        type: "closing"
      }
    ],
    2: [ // useFetch
      { 
        content: "// Custom React hook for data fetching", 
        type: "comment"
      },
      { 
        content: "import { useState, useEffect } from 'react';", 
        type: "import"
      },
      { 
        content: "", 
        type: "blank"
      },
      { 
        content: "function useFetch<T>(url: string) {", 
        type: "function",
        highlight: true
      },
      { 
        content: "  const [data, setData] = useState<T | null>(null);", 
        type: "statement"
      },
      { 
        content: "  const [loading, setLoading] = useState(true);", 
        type: "statement"
      },
      { 
        content: "  const [error, setError] = useState<Error | null>(null);", 
        type: "statement"
      },
      { 
        content: "", 
        type: "blank"
      },
      { 
        content: "  useEffect(() => {", 
        type: "hook"
      },
      { 
        content: "    let isMounted = true;", 
        type: "statement"
      },
      { 
        content: "    // Fetch implementation", 
        type: "comment"
      },
      { 
        content: "  }, [url]);", 
        type: "closing"
      }
    ],
    3: [ // Axios
      { 
        content: "// Axios Configuration for API requests", 
        type: "comment"
      },
      { 
        content: "import axios from 'axios';", 
        type: "import"
      },
      { 
        content: "import { getAuthToken } from './auth-service';", 
        type: "import"
      },
      { 
        content: "", 
        type: "blank"
      },
      { 
        content: "const api = axios.create({", 
        type: "declaration",
        highlight: true
      },
      { 
        content: "  baseURL: process.env.REACT_APP_API_URL || 'https://api.example.com',", 
        type: "property"
      },
      { 
        content: "  timeout: 10000,", 
        type: "property"
      },
      { 
        content: "  headers: {", 
        type: "property"
      },
      { 
        content: "    'Content-Type': 'application/json',", 
        type: "property"
      },
      { 
        content: "  }", 
        type: "closing"
      },
      { 
        content: "});", 
        type: "closing"
      }
    ]
  };

  // Function to render code line with proper syntax highlighting
  const renderCodeLine = (line: { content: string, type: string, highlight?: boolean }, index: number) => {
    const isHighlighted = line.highlight || false;
    const isHovered = hoveredLine === index;
    
    const lineStyle: React.CSSProperties = {
      display: 'block',
      position: 'relative',
      padding: '0 0.75rem',
      height: '1.5em',
      lineHeight: 1.5,
    };
    
    if (isHighlighted) {
      lineStyle.background = 'var(--editor-line-highlight, rgba(128,128,128,0.07))';
    } else if (isHovered) {
      lineStyle.background = 'var(--editor-line-hover, rgba(128,128,128,0.04))';
    }

    // Different styling based on line type
    let contentElement;
    switch(line.type) {
      case 'comment':
        contentElement = <span style={{color: 'var(--code-comment, #6a9955)'}}>{line.content}</span>;
        break;
      case 'import':
        contentElement = (
          <React.Fragment>
            <span style={{color: 'var(--code-keyword, #569cd6)'}}>import </span>
            {line.content.includes('from') ? (
              <React.Fragment>
                <span style={{color: 'var(--code-text, #9cdcfe)'}}>{line.content.split('from')[0].replace('import ', '')}</span>
                <span style={{color: 'var(--code-keyword, #569cd6)'}}> from </span>
                <span style={{color: 'var(--code-string, #ce9178)'}}>
                  {line.content.split('from')[1].trim().replace(';', '')}
                </span>
                <span style={{color: 'var(--code-text, #d4d4d4)'}}>;</span>
              </React.Fragment>
            ) : (
              <span style={{color: 'var(--code-text, #9cdcfe)'}}>{line.content.replace('import ', '')}</span>
            )}
          </React.Fragment>
        );
        break;
      case 'function':
      case 'declaration':
        contentElement = line.content.split('(').map((part, i) => {
          if (i === 0) {
            const keywords = ['const', 'let', 'var', 'function', 'async', 'class'];
            let processed = part;
            keywords.forEach(keyword => {
              processed = processed.replace(new RegExp(`\\b${keyword}\\b`, 'g'), 
                `<keyword>${keyword}</keyword>`);
            });
            
            const parts = processed.split('<keyword>');
            return (
              <React.Fragment key={i}>
                {parts.map((subPart, j) => {
                  if (j === 0) return subPart;
                  const [keyword, rest] = subPart.split('</keyword>');
                  return (
                    <React.Fragment key={j}>
                      <span style={{color: 'var(--code-keyword, #569cd6)'}}>{keyword}</span>
                      <span style={{color: rest.includes('=') ? 'var(--code-variable, #4fc1ff)' : 'var(--code-function, #dcdcaa)'}}>
                        {rest}
                      </span>
                    </React.Fragment>
                  );
                })}
                {i < line.content.split('(').length - 1 && '('}
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={i}>
                <span style={{color: 'var(--code-text, #d4d4d4)'}}>{part}</span>
              </React.Fragment>
            );
          }
        });
        break;
      case 'property':
        if (line.content.includes(':')) {
          const [prop, value] = line.content.split(':');
          contentElement = (
            <React.Fragment>
              <span style={{color: 'var(--code-property, #9cdcfe)'}}>{prop.trim()}</span>
              <span style={{color: 'var(--code-text, #d4d4d4)'}}>{': '}</span>
              {value.includes("'") || value.includes('"') ? (
                <span style={{color: 'var(--code-string, #ce9178)'}}>{value.trim()}</span>
              ) : !isNaN(Number(value.trim().replace(',', ''))) ? (
                <span style={{color: 'var(--code-number, #b5cea8)'}}>{value.trim()}</span>
              ) : (
                <span style={{color: 'var(--code-text, #d4d4d4)'}}>{value.trim()}</span>
              )}
            </React.Fragment>
          );
        } else {
          contentElement = <span style={{color: 'var(--code-text, #d4d4d4)'}}>{line.content}</span>;
        }
        break;
      case 'statement':
      case 'control':
      case 'hook':
        const keywords = ['const', 'let', 'var', 'if', 'else', 'try', 'catch', 'for', 'while', 'return', 'await', 'new', 'true', 'false', 'null', 'undefined'];
        let processed = line.content;
        keywords.forEach(keyword => {
          processed = processed.replace(new RegExp(`\\b${keyword}\\b`, 'g'), 
            `<keyword>${keyword}</keyword>`);
        });
        
        const parts = processed.split('<keyword>');
        contentElement = (
          <React.Fragment>
            {parts.map((part, i) => {
              if (i === 0) return <span style={{color: 'var(--code-text, #d4d4d4)'}}>{part}</span>;
              const [keyword, rest] = part.split('</keyword>');
              return (
                <React.Fragment key={i}>
                  <span style={{color: 'var(--code-keyword, #569cd6)'}}>{keyword}</span>
                  <span style={{color: 'var(--code-text, #d4d4d4)'}}>{rest}</span>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
        break;
      case 'return':
        contentElement = (
          <React.Fragment>
            <span style={{color: 'var(--code-keyword, #569cd6)'}}>return </span>
            <span style={{color: 'var(--code-variable, #9cdcfe)'}}>{line.content.replace('return ', '')}</span>
          </React.Fragment>
        );
        break;
      case 'blank':
        contentElement = <span>{''}</span>;
        break;
      default:
        contentElement = <span style={{color: 'var(--code-text, #d4d4d4)'}}>{line.content}</span>;
    }

    return (
      <div 
        key={index} 
        style={lineStyle}
        onMouseEnter={() => setHoveredLine(index)}
        onMouseLeave={() => setHoveredLine(null)}
      >
        {contentElement}
      </div>
    );
  };

  return (
    <div
      className={`app-info-container ${isExpanded ? 'expanded' : 'collapsed'}`}
      data-testid="app-info-container"
      style={{
        background: 'var(--dropdown-bg)',
        color: 'var(--text-primary)',
        border: '1px solid var(--navbar-border)',
        boxShadow: '0 4px 12px var(--shadow-color, rgba(0,0,0,0.08))',
        borderRadius: '1rem',
        transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden',
      }}
    >
      <div
        className="app-info-header"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          borderBottom: isExpanded ? '1px solid var(--navbar-border)' : 'none',
          cursor: 'pointer',
          padding: '1rem 1.5rem',
          borderTopLeftRadius: '1rem',
          borderTopRightRadius: '1rem',
          transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div className="header-content" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="header-icon" style={{ fontSize: '1.25rem' }}>📚</div>
          <h3 data-testid="doc-tab-0" style={{ margin: 0, fontWeight: 600 }}>Documentation & Resources</h3>
        </div>
        <div 
          className="expand-icon" 
          style={{ 
            transition: 'transform 0.3s ease',
            transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
            color: 'var(--text-secondary)'
          }}
        >
          {isExpanded ? '▼' : '▲'}
        </div>
      </div>
      {isExpanded && (
        <div
          className={`app-info-content ${animationClass}`}
          data-testid="app-info-content"
          style={{
            background: 'var(--dropdown-bg)',
            color: 'var(--text-primary)',
            borderBottomLeftRadius: '1rem',
            borderBottomRightRadius: '1rem',
            padding: '1.5rem',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
        >
          <div className="info-intro" style={{ marginBottom: '2rem' }}>
            <div 
              className="glow-text" 
              style={{ 
                color: 'var(--accent-primary)',
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '0.75rem',
                textShadow: '0 0 8px var(--accent-shadow, rgba(166, 227, 161, 0.3))'
              }}
            >
              ASafariM Bibliography
            </div>
            <p style={{ 
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              margin: 0
            }}>
              This application demonstrates modern React development patterns and best practices.
              Explore our documentation to learn how it's built.
            </p>
          </div>
          <div className="tabs-container">
            <div 
              className="tabs-header"
              style={{
                display: 'flex',
                gap: '0.5rem',
                overflowX: 'auto',
                paddingBottom: '0.5rem',
              }}
            >
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`tab ${activeTab === index ? 'active' : ''}`}
                  style={{
                    '--tab-color': tab.color,
                    background: activeTab === index ? 'var(--bg-secondary)' : 'var(--dropdown-bg)',
                    color: activeTab === index ? tab.color : 'var(--text-primary)',
                    border: `1px solid ${activeTab === index ? tab.color : 'var(--navbar-border)'}`,
                    borderRadius: '0.5rem',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.1s ease',
                    flexShrink: 0,
                    boxShadow: activeTab === index ? `0 2px 6px ${tab.color}25` : 'none',
                    transform: activeTab === index ? 'translateY(-2px)' : 'translateY(0)',
                  } as React.CSSProperties}
                  onClick={() => handleTabClick(index)}
                  data-testid={`tab-${index}`}
                  onMouseEnter={(e) => {
                    if (activeTab !== index) {
                      e.currentTarget.style.borderColor = tab.color;
                      e.currentTarget.style.color = tab.color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== index) {
                      e.currentTarget.style.borderColor = 'var(--navbar-border)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }
                  }}
                >
                  <span className="tab-icon" style={{ fontSize: '1.25rem' }}>{tab.icon}</span>
                  <span className="tab-title" style={{ fontWeight: activeTab === index ? 600 : 400 }}>{tab.title}</span>
                </div>
              ))}
            </div>
            <div
              className={`tab-content ${animationClass}`}
              data-testid={`${tabs[activeTab].title.toLowerCase().replace(/ /g, '-')}-content`}
              style={{
                background: 'var(--dropdown-bg)',
                color: 'var(--text-primary)',
                borderRadius: '0.75rem',
                border: '1px solid var(--navbar-border)',
                marginTop: '1rem',
                padding: '1.5rem',
                transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 2px 8px var(--shadow-color, rgba(0,0,0,0.05))',
              }}
            >
              <div 
                className="tab-header" 
                style={{ 
                  color: tabs[activeTab].color,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}
              >
                <span className="tab-icon-large" style={{ fontSize: '2rem' }}>{tabs[activeTab].icon}</span>
                <h3 style={{ margin: 0, fontWeight: 600 }}>{tabs[activeTab].title}</h3>
              </div>
              <p 
                style={{ 
                  color: 'var(--text-secondary)',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}
              >
                {tabs[activeTab].description}
              </p>
              <div 
                className="card-container"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                <div
                  className="feature-card"
                  style={{
                    '--card-color': tabs[activeTab].color,
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--navbar-border)',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    boxShadow: `0 4px 12px ${tabs[activeTab].color}15`,
                    height: '100%',
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 8px 24px ${tabs[activeTab].color}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 12px ${tabs[activeTab].color}15`;
                  }}
                >
                  <div 
                    className="card-content"
                    style={{
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <h4 
                      style={{ 
                        color: tabs[activeTab].color, 
                        marginTop: 0,
                        marginBottom: '0.75rem',
                        fontWeight: 600
                      }}
                    >
                      Learn More
                    </h4>
                    <p 
                      style={{ 
                        color: 'var(--text-secondary)',
                        marginBottom: '1.5rem',
                        lineHeight: '1.6',
                        flex: 1
                      }}
                    >
                      Explore our detailed documentation with code examples and best practices.
                    </p>
                    <a
                      href={tabs[activeTab].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="doc-link"
                      style={{ 
                        color: tabs[activeTab].color,
                        textDecoration: 'none',
                        fontWeight: 500,
                        display: 'inline-flex',
                        alignItems: 'center',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        const arrow = e.currentTarget.querySelector('.arrow');
                        if (arrow) {
                          (arrow as HTMLElement).style.transform = 'translateX(4px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        const arrow = e.currentTarget.querySelector('.arrow');
                        if (arrow) {
                          (arrow as HTMLElement).style.transform = 'translateX(0)';
                        }
                      }}
                    >
                      View Documentation <span className="arrow" style={{ marginLeft: '0.5rem', transition: 'transform 0.2s ease' }}>→</span>
                    </a>
                  </div>
                </div>
                
                {/* VS Code inspired editor preview */}
                <div
                  className="code-preview"
                  style={{
                    '--card-color': tabs[activeTab].color,
                    background: 'var(--code-bg, var(--bg-primary, #1e1e2e))',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--navbar-border)',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
                    boxShadow: `0 4px 12px ${tabs[activeTab].color}15`,
                    height: '100%',
                    position: 'relative',
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)';
                    e.currentTarget.style.boxShadow = `0 8px 30px ${tabs[activeTab].color}35`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = `0 4px 12px ${tabs[activeTab].color}15`;
                  }}
                >
                  {/* VS Code inspired editor window */}
                  <div className="editor-window" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Title bar with window controls */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem 0.75rem',
                      background: 'var(--code-header-bg, var(--bg-secondary, #181825))',
                      borderBottom: '1px solid var(--navbar-border)'
                    }}>
                      {/* Window controls (Mac style) */}
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <div
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: 'var(--dot-red, #ff5f56)',
                            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
                            transition: 'transform 0.15s ease'
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.2)' }}
                          onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                        />
                        <div
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: 'var(--dot-yellow, #ffbd2e)',
                            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
                            transition: 'transform 0.15s ease'
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.2)' }}
                          onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                        />
                        <div
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: 'var(--dot-green, #27c93f)',
                            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
                            transition: 'transform 0.15s ease'
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.2)' }}
                          onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                        />
                      </div>
                      
                      {/* File tab */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.25rem',
                        background: 'var(--code-tab-active, rgba(255,255,255,0.05))',
                        fontSize: '0.8125rem',
                        color: 'var(--text-secondary)',
                        gap: '0.5rem'
                      }}>
                        <span style={{ 
                          color: activeTab === 0 ? '#e06c75' : 
                                 activeTab === 1 ? '#61afef' : 
                                 activeTab === 2 ? '#d19a66' : '#98c379'
                        }}>
                          {tabs[activeTab].filename}
                        </span>
                      </div>
                      
                      <div style={{ width: '12px' }}></div>
                    </div>
                    
                    {/* Editor content area */}
                    <div style={{ display: 'flex', flexGrow: 1, height: '100%' }}>
                      {/* Activity bar */}
                      <div style={{
                        width: '2.5rem',
                        background: 'var(--code-activitybar-bg, rgba(0,0,0,0.15))',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '0.5rem 0',
                        gap: '0.75rem',
                        borderRight: '1px solid var(--navbar-border)',
                      }}>
                        {/* Files icon (active) */}
                        <div style={{
                          width: '1.5rem',
                          height: '1.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderLeft: `2px solid ${tabs[activeTab].color}`,
                          borderRadius: '0.125rem',
                          background: 'var(--code-icon-active-bg, rgba(255,255,255,0.1))'
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{color: 'var(--text-secondary)'}}>
                            <path d="M17.5 0h-9L7 1.5V6H2.5L1 7.5v15.07L2.5 24h12.07L16 22.57V18h4.7l1.3-1.43V4.5L17.5 0zm0 2.12l2.38 2.38H17.5V2.12zm-3 20.38h-12v-15H7v9.07L8.5 18h6v4.5zm6-6h-12v-15H16V6h4.5v10.5z" fill="currentColor"/>
                          </svg>
                        </div>
                        
                        {/* Search icon */}
                        <div style={{
                          width: '1.5rem',
                          height: '1.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0.6,
                          transition: 'opacity 0.2s ease',
                        }} onMouseOver={(e) => { e.currentTarget.style.opacity = '1' }} onMouseOut={(e) => { e.currentTarget.style.opacity = '0.6' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{color: 'var(--text-tertiary, #888)'}}>
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
                          </svg>
                        </div>
                        
                        {/* Extensions icon */}
                        <div style={{
                          width: '1.5rem',
                          height: '1.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0.6,
                          transition: 'opacity 0.2s ease',
                        }} onMouseOver={(e) => { e.currentTarget.style.opacity = '1' }} onMouseOut={(e) => { e.currentTarget.style.opacity = '0.6' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{color: 'var(--text-tertiary, #888)'}}>
                            <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" fill="currentColor"/>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Line numbers and code */}
                      <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
                        {/* Line numbers */}
                        <div style={{
                          padding: '0.75rem 0',
                          color: 'var(--text-tertiary, #636e83)',
                          fontFamily: 'var(--font-mono, "SF Mono", SFMono-Regular, ui-monospace, "DejaVu Sans Mono", Menlo, Consolas, monospace)',
                          fontSize: '0.8125rem',
                          lineHeight: 1.5,
                          userSelect: 'none',
                          textAlign: 'right',
                          borderRight: '1px solid var(--editor-line-number-border, rgba(128,128,128,0.15))',
                          width: '2.5rem',
                          flexShrink: 0,
                          position: 'relative',
                        }}>
                          {/* Line highlight decoration */}
                          <div style={{
                            position: 'absolute',
                            left: 0,
                            top: `calc(0.75rem + ${tabs[activeTab].activeLine - 1} * 1.5em)`,
                            width: '0.1875rem',
                            height: '1.5em',
                            background: tabs[activeTab].color,
                          }}></div>
                          
                          {/* Line numbers */}
                          {Array.from({ length: codeContent[activeTab as keyof typeof codeContent].length }).map((_, idx) => (
                            <div 
                              key={idx}
                              style={{
                                padding: '0 0.5rem',
                                color: tabs[activeTab].activeLine === idx + 1 ? 'var(--text-primary)' : 'var(--text-tertiary)',
                                fontWeight: tabs[activeTab].activeLine === idx + 1 ? 500 : 400,
                              }}
                            >
                              {idx + 1}
                            </div>
                          ))}
                        </div>
                        
                        {/* Code content */}
                        <div style={{ flexGrow: 1, position: 'relative' }}>
                          {/* Code content */}
                          <pre style={{
                            margin: 0,
                            padding: '0.75rem 0 0.75rem 0',
                            fontFamily: 'var(--font-mono, "SF Mono", SFMono-Regular, ui-monospace, "DejaVu Sans Mono", Menlo, Consolas, monospace)',
                            fontSize: '0.8125rem',
                            lineHeight: 1.5,
                            overflowX: 'auto',
                            color: 'var(--code-text, var(--text-primary))',
                            height: '100%',
                            position: 'relative',
                            textAlign: 'left',
                            whiteSpace: 'pre',
                          }}>
                            {codeContent[activeTab as keyof typeof codeContent].map((line, idx) => renderCodeLine(line, idx))}
                          </pre>
                          
                          {/* Minimap */}
                          <div style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: '3rem',
                            background: 'var(--code-minimap-bg, rgba(0,0,0,0.03))',
                            borderLeft: '1px solid var(--editor-minimap-border, rgba(128,128,128,0.1))',
                            padding: '0.25rem',
                            overflow: 'hidden',
                            pointerEvents: 'none',
                          }}>
                            <div style={{
                              opacity: 0.4,
                              transform: 'scale(0.2)',
                              transformOrigin: 'top right',
                              position: 'absolute',
                              right: '0.25rem',
                              top: '0.25rem',
                            }}>
                              {/* Simplified representation of code in minimap */}
                              {Array.from({ length: codeContent[activeTab as keyof typeof codeContent].length }).map((_, idx) => (
                                <div 
                                  key={idx}
                                  style={{
                                    width: `${20 + Math.random() * 80}px`,
                                    height: '3px',
                                    background: tabs[activeTab].activeLine === idx + 1 ? tabs[activeTab].color : 'var(--text-primary)',
                                    opacity: tabs[activeTab].activeLine === idx + 1 ? 0.8 : 0.15,
                                    marginBottom: '6px',
                                    borderRadius: '1px',
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status bar */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.25rem 0.75rem',
                      fontSize: '0.75rem',
                      borderTop: '1px solid var(--navbar-border)',
                      background: 'var(--code-statusbar-bg, rgba(0,0,0,0.1))',
                      color: 'var(--text-tertiary, #888)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span>{tabs[activeTab].language}</span>
                        <span>UTF-8</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span>Ln {tabs[activeTab].activeLine}, Col {tabs[activeTab].activeCol}</span>
                        <span>Spaces: 2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div 
            className="tech-stack" 
            style={{ 
              marginTop: '2rem',
              color: 'var(--text-secondary)',
              borderTop: '1px solid var(--navbar-border)',
              paddingTop: '1.5rem'
            }}
          >
            <div 
              className="tech-title"
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Technologies Used
            </div>
            <div 
              className="tech-icons"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div 
                className="tech-icon"
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  border: '1px solid var(--navbar-border)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px var(--shadow-color, rgba(0,0,0,0.1))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                ⚛️ React
              </div>
              <div 
                className="tech-icon"
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  border: '1px solid var(--navbar-border)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px var(--shadow-color, rgba(0,0,0,0.1))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                🔄 Redux
              </div>
              <div 
                className="tech-icon"
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  border: '1px solid var(--navbar-border)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px var(--shadow-color, rgba(0,0,0,0.1))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                📘 TypeScript
              </div>
              <div 
                className="tech-icon"
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  border: '1px solid var(--navbar-border)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px var(--shadow-color, rgba(0,0,0,0.1))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                🌐 Axios
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppInfo;
