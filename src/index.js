// index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home'; // Certifique-se de que o caminho esteja correto
import Login from './pages/Login/Login';
import Meta from '../src/pages/Meta/meta';
import Financeiro from '../src/pages/Financeiro/financeiro';
import Register from '../src/pages/Login/register'; // Importa o novo componente Register
import reportWebVitals from './reportWebVitals';
import SidebarMenu from '../src/componestes/SidebarMenu/SidebarMenu'; // Certifique-se de que o caminho esteja correto

const Layout = ({ children }) => {
  const location = useLocation();
  const hideSidebar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {!hideSidebar && <SidebarMenu />}
      <div style={{ flex: 1, marginLeft: hideSidebar ? 0 : 'auto', transition: 'margin-left 0.3s' }}>
        {children}
      </div>
    </div>
  );
};

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Layout><Login /></Layout>} />
    <Route path="/register" element={<Layout><Register /></Layout>} /> {/* Adiciona a rota para registro */}
    <Route path="/home" element={<Layout><Home /></Layout>} /> {/* Adiciona a rota para a página inicial */}
    <Route path="/meta" element={<Layout><Meta /></Layout>} />
    <Route path="/financeiro" element={<Layout><Financeiro /></Layout>} />
    {/* Adicione outras rotas conforme necessário */}
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
