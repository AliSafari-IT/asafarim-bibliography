import React, { useState, useEffect } from 'react';
import './AppInfo.css';

const AppInfo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  const tabs = [
    { 
      title: 'Redux', 
      icon: '🔄',
      color: '#a6e3a1',
      link: 'https://blog.asafarim.com/docs/React/Redux/Redux-Basic-Example',
      description: 'State management with Redux Toolkit'
    },
    { 
      title: 'API Data', 
      icon: '📊',
      color: '#f38ba8',
      link: 'https://blog.asafarim.com/docs/React/Basics/handle-data-from-api',
      description: 'Fetching and handling API data'
    },
    { 
      title: 'useFetch', 
      icon: '🪝',
      color: '#fab387',
      link: 'https://blog.asafarim.com/docs/React/Hooks/useFetch',
      description: 'Custom hooks for data fetching'
    },
    { 
      title: 'Axios', 
      icon: '🌐',
      color: '#89b4fa',
      link: 'https://blog.asafarim.com/docs/React/Axios',
      description: 'HTTP client for API requests'
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

  return (
    <div className={`app-info-container ${isExpanded ? 'expanded' : 'collapsed'}`} data-testid="app-info-container">
      <div 
        className="app-info-header" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="header-content">
          <div className="header-icon">📚</div>
          <h3 data-testid="doc-tab-0">Documentation & Resources</h3>
        </div>
        <div className="expand-icon">{isExpanded ? '▼' : '▲'}</div>
      </div>
      
      {isExpanded && (
        <div className={`app-info-content ${animationClass}`} data-testid="app-info-content">
          <div className="info-intro">
            <div className="glow-text">ASafariM Bibliography</div>
            <p>
              This application demonstrates modern React development patterns and best practices.
              Explore our documentation to learn how it's built.
            </p>
          </div>
          
          <div className="tabs-container">
            <div className="tabs-header">
              {tabs.map((tab, index) => (
                <div 
                  key={index}
                  className={`tab ${activeTab === index ? 'active' : ''}`}
                  style={{ '--tab-color': tab.color } as React.CSSProperties}
                  onClick={() => handleTabClick(index)}
                  data-testid={`tab-${index}`}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-title">{tab.title}</span>
                </div>
              ))}
            </div>
            
            <div className={`tab-content ${animationClass}`} data-testid={`${tabs[activeTab].title.toLowerCase().replace(/ /g, '-')}-content`}>
              <div className="tab-header" style={{ color: tabs[activeTab].color }}>
                <span className="tab-icon-large">{tabs[activeTab].icon}</span>
                <h3>{tabs[activeTab].title}</h3>
              </div>
              <p>{tabs[activeTab].description}</p>
              <div className="card-container">
                <div className="feature-card" style={{ '--card-color': tabs[activeTab].color } as React.CSSProperties}>
                  <div className="card-content">
                    <h4>Learn More</h4>
                    <p>Explore our detailed documentation with code examples and best practices.</p>
                    <a 
                      href={tabs[activeTab].link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="doc-link"
                    >
                      View Documentation <span className="arrow">→</span>
                    </a>
                  </div>
                </div>
                <div className="code-preview" style={{ '--card-color': tabs[activeTab].color } as React.CSSProperties}>
                  <div className="code-header">
                    <div className="code-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="code-title">Example Code</div>
                  </div>
                  <pre className="code-block">
                    {activeTab === 0 && `// Redux Toolkit slice
const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {...},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, ...)
      .addCase(fetchBooks.fulfilled, ...)
  }
});`}
                    {activeTab === 1 && `// API Data Handling
async function fetchData() {
  try {
    const response = await fetch('/api/books');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}`}
                    {activeTab === 2 && `// useFetch Hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Fetch logic here
  }, [url]);
  
  return { data, loading, error };
}`}
                    {activeTab === 3 && `// Axios Configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${token}\`
  }
});`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
          
          <div className="tech-stack">
            <div className="tech-title">Technologies Used</div>
            <div className="tech-icons">
              <div className="tech-icon">⚛️ React</div>
              <div className="tech-icon">🔄 Redux</div>
              <div className="tech-icon">📘 TypeScript</div>
              <div className="tech-icon">🌐 Axios</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppInfo;
