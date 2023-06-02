import React from 'react';
import './Header.css';
import logo from './logo.png';
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <div className="header">
      <div className="logo" onClick={handleLogoClick}>
        <img src={logo} alt="Logo" />
      </div>
      <div className="login-button">
        <button className="google-login-button" onClick={handleLogin}>
          Zaloguj
        </button>
      </div>
    </div>
  );
};

export default Header;
