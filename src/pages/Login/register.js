import React, { useState } from 'react';
import { auth } from '../../firebaseConfig'; // Certifique-se de que o caminho está correto
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Função correta para registro
//import './Register.css'; // Importe o CSS para a página de registro

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Usuário registrado com sucesso!');
      setError('');
    } catch (error) {
      setError('Erro ao registrar o usuário: ' + error.message);
      setSuccess('');
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Criar Novo Usuário</h1>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="input-group">
          <label htmlFor="register-email">E-MAIL:</label>
          <input
            type="email"
            id="register-email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="register-password">SENHA:</label>
          <input
            type="password"
            id="register-password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button type="submit" className="register-button">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
