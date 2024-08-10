import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Meta from './pages/Meta/meta';
import Financeiro from './pages/Financeiro/financeiro';
import reportWebVitals from './reportWebVitals';
import SidebarMenu from '../src/componestes/SidebarMenu/SidebarMenu'; // Certifique-se de que o caminho esteja correto

const Layout = ({ children }) => {
  const location = useLocation();
  const hideSidebar = location.pathname === '/login';

  return (
    <div style={{ display: 'flex' }}>
      {!hideSidebar && <SidebarMenu />}
      <div style={{ flex: 1, marginLeft: hideSidebar ? 0 : '250px', transition: 'margin-left 0.3s' }}>
        {children}
      </div>
    </div>
  );
};

const App = () => (
  <Routes>
    <Route path="/" element={<Layout><Home /></Layout>} />
    <Route path="/login" element={<Layout><Login /></Layout>} />
    <Route path="/meta" element={<Layout><Meta /></Layout>} />
    <Route path="/financeiro" element={<Layout><Financeiro /></Layout>} />
  </Routes>
);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
