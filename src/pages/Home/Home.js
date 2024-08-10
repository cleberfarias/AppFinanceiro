import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate
import IconButton from '@mui/material/IconButton'; // Importa o componente IconButton
import NavigateNextIcon from '@mui/icons-material/NavigateNext'; // Importa o ícone NavigateNext
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Importa o ícone AttachMoney
import './Home.css';

const Home = () => {
  const navigate = useNavigate(); // Use o hook useNavigate

  const goToMeta = () => {
    navigate('/meta'); // Navega para a página Meta
  };

  const goToFinanceiro = () => {
    navigate('/financeiro'); // Navega para a página Financeiro
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Bem-vindo ao Sistema de Controle</h1>
      <div className="icon-container">
        <IconButton color="primary" onClick={goToMeta}>
          <NavigateNextIcon fontSize="large" />
        </IconButton>
        <IconButton color="secondary" onClick={goToFinanceiro}>
          <AttachMoneyIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default Home;
