import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaChartBar, FaWallet } from 'react-icons/fa';

import './SidebarMenu.css';

const SidebarMenu = () => {
  return (
    <div className="sidebar-menu">
      <div className="menu-content">
        <ul>
          <li>
            <Link to="/Home" className="menu-item">
              <FaHome />
              <span className="menu-text">Home</span>
            </Link>
          </li>
          
          <li>
            <Link to="/meta" className="menu-item">
              <FaChartBar />
              <span className="menu-text">Meta</span>
            </Link>
          </li>
          <li>
            <Link to="/financeiro" className="menu-item">
              <FaWallet />
              <span className="menu-text">Financeiro</span>
            </Link>
            <li>
            <Link to="/login" className="menu-item">
              <FaUser />
              <span className="menu-text">Login</span>
            </Link>
          </li>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenu;
