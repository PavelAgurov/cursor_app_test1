import React, { useState } from 'react';
import { 
  MessageSquare,
  Award,
  AlertTriangle,
  FileText,
  Gift,
  BarChart2,
  Box
} from 'react-feather';
import { dashboardItems } from '../data/dashboardData';
import Header from './Header';
import ComplaintForm from './ComplaintForm';
import './Dashboard.css';

interface DashboardProps {
  username: string | null;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ username, onLogout }) => {
  const [showComplaintForm, setShowComplaintForm] = useState<boolean>(false);
  
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

  const handleItemClick = (id: string) => {
    if (id === 'complaint') {
      setShowComplaintForm(true);
    }
  };

  const handleComplaintSubmitSuccess = () => {
    setShowComplaintForm(false);
    alert('Complaint submitted successfully!');
  };

  const handleComplaintCancel = () => {
    setShowComplaintForm(false);
  };

  return (
    <div className="dashboard">
      <Header username={username} onLogout={onLogout} />
      
      {showComplaintForm ? (
        <div className="complaint-form-overlay">
          <ComplaintForm 
            username={username}
            onSubmitSuccess={handleComplaintSubmitSuccess}
            onCancel={handleComplaintCancel}
          />
        </div>
      ) : (
        <main className="dashboard-content">
          <div className="dashboard-grid">
            {dashboardItems.map(item => (
              <div 
                key={item.id} 
                className="dashboard-item"
                onClick={() => handleItemClick(item.id)}
              >
                <div className="dashboard-item-content">
                  {getIcon(item.icon)}
                  <h3 className="dashboard-item-title">{item.title}</h3>
                  <p className="dashboard-item-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
      
      <div className="chat-button-container">
        <button className="chat-button" aria-label="Chat">
          <MessageSquare size={24} color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard; 