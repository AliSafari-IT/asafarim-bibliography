import React, { useState } from 'react';
import { DDMenu, MenuItem } from '@asafarim/dd-menu';
import '@asafarim/dd-menu/dist/index.css';
import '../styles/professional-dropdown.css';

const SearchableDropdown: React.FC = () => {
  // Sample data for demonstration
  const allItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", link: "/dashboard", icon: "🏠" },
    { id: "projects", label: "Projects", link: "/projects", icon: "📁" },
    { id: "tasks", label: "Tasks", link: "/tasks", icon: "✅" },
    { id: "calendar", label: "Calendar", link: "/calendar", icon: "📅" },
    { id: "messages", label: "Messages", link: "/messages", icon: "💬" },
    { id: "notifications", label: "Notifications", link: "/notifications", icon: "🔔" },
    { id: "settings", label: "Settings", link: "/settings", icon: "⚙️" },
    { id: "help", label: "Help & Support", link: "/help", icon: "❓" },
    { id: "profile", label: "My Profile", link: "/profile", icon: "👤" },
    { id: "team", label: "Team Members", link: "/team", icon: "👥" },
    { id: "analytics", label: "Analytics", link: "/analytics", icon: "📊" },
    { id: "reports", label: "Reports", link: "/reports", icon: "📈" },
    { id: "documents", label: "Documents", link: "/documents", icon: "📄" },
    { id: "files", label: "Files", link: "/files", icon: "📁" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [filteredItems, ] = useState<MenuItem[]>(allItems);
  const [, setFocusedIndex] = useState(-1);
  
  // Reset focused index when filtered items change
  React.useEffect(() => {
    setFocusedIndex(-1);
  }, [filteredItems]);

  // Handle keyboard events for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      setIsOpen(!isOpen);
      e.preventDefault();
    }
  };

  // Custom dropdown trigger with search functionality
  const customTrigger = (
    <div 
      className="pro-dropdown__trigger pro-dropdown__trigger--button"
      style={{
        background: 'linear-gradient(to right, #3b82f6, #6366f1)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
      role="button"
      aria-haspopup="true"
      aria-expanded={isOpen}
      tabIndex={0}
      onClick={() => setIsOpen(!isOpen)}
      onKeyDown={handleKeyDown}
    >
      <span>🔍</span> Search Menu Items
    </div>
  );

  return (
    <div style={{ padding: '40px', background: 'white', borderRadius: '12px' }}>
      <h3 style={{ 
        fontSize: '18px', 
        fontWeight: '600', 
        color: '#334155',
        marginBottom: '20px' 
      }}>
        Searchable Dropdown Menu
      </h3>
      
      <p style={{ 
        fontSize: '15px', 
        color: '#64748b',
        marginBottom: '20px',
        maxWidth: '600px'
      }}>
        This enhanced dropdown features a search input to quickly filter through menu items.
        Perfect for menus with many options or for improving user experience.
      </p>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Custom searchable dropdown */}
        <div>
          <DDMenu
            items={allItems}
            className="pro-dropdown pro-dropdown--default pro-dropdown--md"
            trigger={customTrigger}
            onItemClick={(item: MenuItem) => {
              if (item.onClick) item.onClick();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchableDropdown;
