import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SidebarMenu.css';

const SidebarMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar-menu ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-button" onClick={toggleMenu}>
        {isCollapsed ? '☰' : '✖'}
      </button>
      <div className={`menu-content ${isCollapsed ? 'hidden' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/meta">Meta</Link></li>
          <li><Link to="/financeiro">Financeiro</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenu;
