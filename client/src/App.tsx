import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import HelloButton from './components/HelloButton';
import useAuth from './hooks/useAuth';

const App: React.FC = () => {
  const { isAuthenticated, username, login, logout } = useAuth();
  const [message, setMessage] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleLogout = (): void => {
    logout();
    setMessage('');
  };

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={login} />;
  }

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>Hello App</h1>
          {username && <p className="welcome-message">Welcome, {username}!</p>}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        
        <HelloButton setMessage={setMessage} setLoading={setLoading} />
        
        {loading && <p className="loading">Loading...</p>}
        {!loading && message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default App; 