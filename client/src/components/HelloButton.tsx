import React from 'react';
import axios from 'axios';
import './HelloButton.css';

interface HelloButtonProps {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const HelloButton: React.FC<HelloButtonProps> = ({ setMessage, setLoading }) => {
  const handleClick = async (): Promise<void> => {
    try {
      setLoading(true);
      setMessage('');
      
      const response = await axios.get('/api/hello');
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error: Failed to fetch message from server');
      console.error('Error fetching hello message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="hello-button" onClick={handleClick}>
      Hello
    </button>
  );
};

export default HelloButton; 