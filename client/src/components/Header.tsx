import React from 'react';
import { Menu, User } from 'react-feather';
import './Header.css';

interface HeaderProps {
  username: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
  return (
    <div className="header-container">
      <header className="app-header">
        <div className="header-left">
          <button className="menu-button" aria-label="Menu">
            <Menu size={24} color="#333" />
          </button>
          <h1 className="header-title">My dashboard</h1>
        </div>
        <div className="header-right">
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
          <div className="user-avatar">
            <User size={24} color="#333" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header; 