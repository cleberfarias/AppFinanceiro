import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate
import IconButton from '@mui/material/IconButton'; // Importa o componente IconButton
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Importa o ícone TrendingUp
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Importa o ícone AccountBalance
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
        <IconButton 
          color="primary" 
          onClick={goToMeta} 
          className="icon-button"
        >
          <TrendingUpIcon fontSize="large" />
        </IconButton>
        <IconButton 
          color="secondary" 
          onClick={goToFinanceiro} 
          className="icon-button"
        >
          <AccountBalanceIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default Home;
