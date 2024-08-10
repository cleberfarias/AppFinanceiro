import React, { useState } from 'react';
import './Login.css';

import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use o hook useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Credenciais provisórias
    if (email === 'cleber.fdelgado@gmail.com' && password === '123') {
      // Redirecionar para a página inicial após login bem-sucedido
      navigate('/'); // Navega para a página inicial
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      {/* Left Side: Login Form */}
      <div className="login-form-container">
        <div className="login-form-content">
          <h1 className="login-title">SEJA BEM VINDO AO SISTEMA FINANCEIRO!</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="login">LOGIN:</label>
              <input
                type="email"
                id="login"
                placeholder="DIGITE SEU E-MAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="senha">SENHA:</label>
              <input
                type="password"
                id="senha"
                placeholder="DIGITE SUA SENHA"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <a href="#" className="forgot-password">Esqueceu sua senha? Clique aqui!</a>
            <button type="submit" className="login-button">Acessar</button>
          </form>
          <div className="logo-container">
            <img src='{logo}' alt="App Financeiro" />
          </div>
        </div>
      </div>

      {/* Right Side: Promotional Section */}
      <div className="promo-section">
        <div className="promo-overlay"></div>
        <div className="promo-content">
          <h2 className="promo-title">Aqui você consegue, <span className="highlight">Acompanhar suas metas e controlar seu financeiro</span></h2>
          <p>
          "Gerencie suas metas e controle suas finanças de forma prática e eficiente. Acompanhe seus objetivos e tenha total controle sobre seus gastos, tudo em um só lugar."
          </p>
          <ul className="steps-list">
            <li><span>1</span> Planejamento e Acompanhamento de Metas</li>
            <li><span>2</span> Controle Financeiro Completo</li>
            <li><span>3</span> Automatização de Tarefas</li>
            <li><span>4</span> Relatórios e Análises</li>
          </ul>
          <button className="promo-button">Veja como é</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
