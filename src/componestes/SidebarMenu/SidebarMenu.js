import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaChartBar, FaWallet } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SidebarMenu.css';

const SidebarMenu = () => {
  return (
    <nav className="sidebar-menu">
      <div className="menu-content">
        <ul>
          <li className="menu-item">
            <Link to="/Home" className="nav-link">
              <FaHome />
              <span className="menu-text">Home</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/meta" className="nav-link">
              <FaChartBar />
              <span className="menu-text">Meta</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/financeiro" className="nav-link">
              <FaWallet />
              <span className="menu-text">Financeiro</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/login" className="nav-link">
              <FaUser />
              <span className="menu-text">Login</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SidebarMenu;
