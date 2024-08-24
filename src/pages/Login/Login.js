import React, { useState } from 'react';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Redirecionar para a página inicial após login bem-sucedido
        navigate('/home');
      })
      .catch(() => {
        setError('Credenciais inválidas. Tente novamente.');
      });
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
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
          <button className="register-button" onClick={handleRegisterRedirect}>
            Criar Novo Usuário
          </button>
        </form>
      </div>

      <div className="promo-section">
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
  );
};

export default Login;
