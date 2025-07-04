import React from 'react';
import { DDMenu, MenuItem } from '@asafarim/dd-menu';
import '@asafarim/dd-menu/dist/index.css';
import '../styles/professional-dropdown.css';

const ProfessionalDropdownShowcase: React.FC = () => {
  // Main navigation items
  const navItems: MenuItem[] = [
    { 
      id: "dashboard", 
      label: "Dashboard", 
      link: "/dashboard",
      icon: "🏠"
    },
    {
      id: "projects",
      label: "Projects",
      icon: "📁",
      children: [
        { id: "active-projects", label: "Active Projects", link: "/projects/active", icon: "⚡" },
        { id: "completed-projects", label: "Completed Projects", link: "/projects/completed", icon: "✅" },
        { id: "archived-projects", label: "Archived Projects", link: "/projects/archive", icon: "📦" },
        { id: "project-settings", label: "Project Settings", link: "/projects/settings", icon: "⚙️" },
      ],
    },
    { 
      id: "team", 
      label: "Team", 
      link: "/team",
      icon: "👥",
      children: [
        { id: "team-members", label: "Team Members", link: "/team/members", icon: "👤" },
        { id: "team-roles", label: "Roles & Permissions", link: "/team/roles", icon: "🔒" },
        { id: "team-activity", label: "Activity Log", link: "/team/activity", icon: "📊" },
      ],
    },
    { 
      id: "analytics", 
      label: "Analytics", 
      link: "/analytics",
      icon: "📈"
    },
    { 
      id: "settings", 
      label: "Settings", 
      link: "/settings",
      icon: "⚙️"
    },
  ];

  // User profile menu items
  const profileItems: MenuItem[] = [
    { id: "profile", label: "My Profile", link: "/profile", icon: "👤" },
    { id: "account", label: "Account Settings", link: "/account", icon: "⚙️" },
    { id: "notifications", label: "Notifications", link: "/notifications", icon: "🔔" },
    { id: "divider-1", label: "—", disabled: true },
    { id: "help", label: "Help & Support", link: "/help", icon: "❓" },
    { id: "feedback", label: "Send Feedback", onClick: () => alert('Feedback form opened'), icon: "💬" },
    { id: "divider-2", label: "—", disabled: true },
    { id: "logout", label: "Sign Out", onClick: () => alert('Signing out...'), icon: "🚪" },
  ];

  return (
    <div style={{ 
      padding: '40px',
      background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)',
      borderRadius: '12px',
      boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h2 style={{ 
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '12px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Professional Dropdown Menus
        </h2>
        <p style={{ 
          fontSize: '16px',
          color: '#64748b',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Elegant, accessible, and highly customizable dropdown components for modern web applications
        </p>
      </div>

      {/* Modern Navigation Bar */}
      <section style={{
        marginBottom: '40px',
        background: 'white',
        borderRadius: '12px',
        padding: '16px 24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#334155',
          marginBottom: '16px' 
        }}>
          Modern Navigation Bar
        </h3>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ 
            fontWeight: '700', 
            fontSize: '20px', 
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ 
              background: '#3b82f6',
              color: 'white',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              fontSize: '16px'
            }}>B</span>
            Bibliography
          </div>
          
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <DDMenu 
              items={navItems} 
              className="pro-dropdown pro-dropdown--navbar pro-dropdown--md"
              trigger={
                <div 
                  className="pro-dropdown__trigger pro-dropdown__trigger--text"
                  role="button"
                  aria-haspopup="true"
                  tabIndex={0}
                >
                  Navigation
                </div>
              }
            />
            
            <DDMenu 
              items={profileItems} 
              className="pro-dropdown pro-dropdown--minimal pro-dropdown--md"
              trigger={
                <div className="pro-dropdown__trigger pro-dropdown__trigger--avatar">
                  AS
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Dropdown Variants */}
      <section style={{
        marginBottom: '40px'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#334155',
          marginBottom: '16px' 
        }}>
          Dropdown Variants
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {/* Default Dropdown */}
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '500', color: '#475569' }}>
              Default Style
            </h4>
            <DDMenu 
              items={navItems} 
              className="pro-dropdown pro-dropdown--default pro-dropdown--md"
              trigger={
                <button className="pro-dropdown__trigger pro-dropdown__trigger--button">
                  Open Menu
                </button>
              }
            />
          </div>
          
          {/* Minimal Dropdown */}
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '500', color: '#475569' }}>
              Minimal Style
            </h4>
            <DDMenu 
              items={navItems} 
              className="pro-dropdown pro-dropdown--minimal pro-dropdown--md"
              trigger={
                <button className="pro-dropdown__trigger pro-dropdown__trigger--button" style={{
                  background: '#f8fafc',
                  color: '#334155',
                  border: '1px solid #e2e8f0'
                }}>
                  Minimal Menu
                </button>
              }
            />
          </div>
          
          {/* Dark Dropdown */}
          <div style={{
            background: '#1e293b',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '500', color: '#f8fafc' }}>
              Dark Style
            </h4>
            <DDMenu 
              items={navItems} 
              className="pro-dropdown pro-dropdown--dark pro-dropdown--md"
              trigger={
                <button className="pro-dropdown__trigger pro-dropdown__trigger--button" style={{
                  background: '#334155',
                  color: '#f8fafc',
                  border: '1px solid #475569'
                }}>
                  Dark Menu
                </button>
              }
            />
          </div>
          
          {/* Size Variants */}
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '500', color: '#475569' }}>
              Size Variants
            </h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <DDMenu 
                items={navItems} 
                className="pro-dropdown pro-dropdown--minimal pro-dropdown--sm"
                trigger={
                  <button className="pro-dropdown__trigger pro-dropdown__trigger--button" style={{
                    padding: '6px 12px',
                    fontSize: '12px'
                  }}>
                    Small
                  </button>
                }
              />
              
              <DDMenu 
                items={navItems} 
                className="pro-dropdown pro-dropdown--minimal pro-dropdown--md"
                trigger={
                  <button className="pro-dropdown__trigger pro-dropdown__trigger--button">
                    Medium
                  </button>
                }
              />
              
              <DDMenu 
                items={navItems} 
                className="pro-dropdown pro-dropdown--minimal pro-dropdown--lg"
                trigger={
                  <button className="pro-dropdown__trigger pro-dropdown__trigger--button" style={{
                    padding: '10px 20px',
                    fontSize: '16px'
                  }}>
                    Large
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Custom Trigger Examples */}
      <section style={{
        marginBottom: '40px',
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#334155',
          marginBottom: '20px' 
        }}>
          Custom Trigger Examples
        </h3>
        
        <div style={{
          display: 'flex',
          gap: '32px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {/* Button Trigger */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#64748b' }}>Button</p>
            <DDMenu 
              items={navItems} 
              className="pro-dropdown pro-dropdown--minimal pro-dropdown--md"
              trigger={
                <button className="pro-dropdown__trigger pro-dropdown__trigger--button">
                  Actions Menu
                </button>
              }
            />
          </div>
          
          {/* Icon Trigger */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#64748b' }}>Icon</p>
            <DDMenu 
              items={profileItems} 
              className="pro-dropdown pro-dropdown--minimal pro-dropdown--md"
              trigger={
                <div className="pro-dropdown__trigger pro-dropdown__trigger--icon">
                  ⚙️
                </div>
              }
            />
          </div>
          
          {/* Text Trigger */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#64748b' }}>Text</p>
            <DDMenu 
              items={navItems} 
              className="pro-dropdown pro-dropdown--minimal pro-dropdown--md"
              trigger={
                <span className="pro-dropdown__trigger pro-dropdown__trigger--text">
                  More Options
                </span>
              }
            />
          </div>
          
          {/* Avatar Trigger */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#64748b' }}>Avatar</p>
            <DDMenu 
              items={profileItems} 
              className="pro-dropdown pro-dropdown--minimal pro-dropdown--md"
              trigger={
                <div className="pro-dropdown__trigger pro-dropdown__trigger--avatar">
                  AS
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Features List */}
      <section style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#334155',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Key Features
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {[
            { icon: '🎨', title: 'Customizable', desc: 'Multiple variants and styling options' },
            { icon: '⚡', title: 'Performant', desc: 'Optimized for smooth interactions' },
            { icon: '📱', title: 'Responsive', desc: 'Works on all screen sizes' },
            { icon: '♿', title: 'Accessible', desc: 'ARIA compliant and keyboard navigable' },
            { icon: '🔍', title: 'TypeScript', desc: 'Fully typed for developer experience' },
            { icon: '🧩', title: 'Modular', desc: 'Easy to integrate and extend' }
          ].map((feature, index) => (
            <div key={index} style={{
              background: '#f8fafc',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{feature.icon}</div>
              <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                {feature.title}
              </h4>
              <p style={{ fontSize: '13px', color: '#64748b' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfessionalDropdownShowcase;
