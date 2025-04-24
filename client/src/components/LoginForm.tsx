import React, { useState } from 'react';
import axios from 'axios';
import { LoginCredentials, AuthResponse } from '../types/auth';
import './LoginForm.css';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post<AuthResponse>('/api/login', credentials);
      
      if (response.data.success) {
        // Store authentication state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', credentials.username);
        onLoginSuccess();
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Invalid username or password');
      } else {
        setError('An error occurred during login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="logo-container">
          <img src="/odido-logo.svg" alt="Odido Logo" className="odido-logo" />
        </div>
        <div className="login-form-container">
          <h1>Welcome to Odido!</h1>
          <p className="login-subtitle">Please enter your valid Odido email ID to sign in</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="adams@odido.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="************"
                required
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button 
              type="submit" 
              className="sign-in-button" 
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          
          <div className="register-link">
            <a href="#">Not a user? Register now.</a>
          </div>
          
          <div className="copyright">
            <a href="#">Copyright details</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 