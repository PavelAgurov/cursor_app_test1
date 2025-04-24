import React, { useState, useRef, useEffect } from 'react';
import { Grid, Mic, Send } from 'react-feather';
import axios from 'axios';
import './Chatbot.css';

interface ChatbotProps {
  username: string | null;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ username, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add initial greeting message when the component mounts
  useEffect(() => {
    const initialGreeting: Message = {
      id: '1',
      text: `Hey ${username || 'there'}, good morning! What can I help you with? Type in your query and I'll assist you.`,
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
    
    setMessages([initialGreeting]);
  }, [username]);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;
    
    // Create the user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    // Add the user message to the chat
    addMessage(userMessage);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Send the message to the backend API
      const response = await axios.post('/api/chat/message', {
        message: userMessage.text,
        username: username || 'guest'
      });
      
      if (response.data.success) {
        // Add the bot response to the chat
        addMessage(response.data.message);
      } else {
        // Handle error response
        const errorMessage: Message = {
          id: Date.now().toString(),
          text: 'Sorry, something went wrong. Please try again later.',
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
        
        addMessage(errorMessage);
      }
    } catch (error) {
      console.error('Error sending message to API:', error);
      
      // Add error message to the chat
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'An error occurred while processing your message. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };
  
  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <button className="chatbot-menu-button">
          <Grid size={20} color="#000" />
        </button>
        <div className="chatbot-title">Odido chatbot</div>
        <div className="user-avatar">
          {username ? username.charAt(0).toUpperCase() : 'U'}
        </div>
      </div>
      
      <div className="chatbot-messages">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.sender}-message`}
          >
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot-message">
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type your query here"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button className="mic-button">
          <Mic size={20} color="#000" />
        </button>
        <button 
          className="send-button" 
          onClick={handleSendMessage}
          disabled={isLoading || inputValue.trim() === ''}
        >
          <Send size={20} color="#578FFF" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot; 