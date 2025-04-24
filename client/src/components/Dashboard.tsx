import React from 'react';
import { 
  Menu, 
  User, 
  MessageSquare,
  Award,
  AlertTriangle,
  FileText,
  Gift,
  BarChart2,
  Box
} from 'react-feather';
import { dashboardItems } from '../data/dashboardData';
import './Dashboard.css';

interface DashboardProps {
  username: string | null;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ username, onLogout }) => {
  // Map icon string to the corresponding react-feather component
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'award':
        return <Award className="dashboard-item-icon" size={40} color="#4285F4" />;
      case 'alert-triangle':
        return <AlertTriangle className="dashboard-item-icon" size={40} color="#4285F4" />;
      case 'file-text':
        return <FileText className="dashboard-item-icon" size={40} color="#4285F4" />;
      case 'gift':
        return <Gift className="dashboard-item-icon" size={40} color="#4285F4" />;
      case 'bar-chart-2':
        return <BarChart2 className="dashboard-item-icon" size={40} color="#4285F4" />;
      case 'box':
        return <Box className="dashboard-item-icon" size={40} color="#4285F4" />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <button className="menu-button" aria-label="Menu">
            <Menu size={24} color="#333" />
          </button>
          <h1 className="dashboard-title">My dashboard</h1>
        </div>
        <div className="header-right">
          <div className="user-avatar">
            <User size={24} color="#333" />
          </div>
        </div>
      </header>
      
      <main className="dashboard-content">
        <div className="dashboard-grid">
          {dashboardItems.map(item => (
            <div key={item.id} className="dashboard-item">
              <div className="dashboard-item-content">
                {getIcon(item.icon)}
                <h3 className="dashboard-item-title">{item.title}</h3>
                <p className="dashboard-item-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <div className="chat-button-container">
        <button className="chat-button" aria-label="Chat">
          <MessageSquare size={24} color="#fff" />
        </button>
      </div>
      
      <div className="logout-container">
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard; 