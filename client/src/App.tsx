import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import useAuth from './hooks/useAuth';

const App: React.FC = () => {
  const { isAuthenticated, username, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={login} />;
  }

  return <Dashboard username={username} onLogout={logout} />;
};

export default App; 