import React, { useState, useRef, useEffect } from 'react';
import { Grid, Mic, Send } from 'react-feather';
import './Chatbot.css';

interface ChatbotProps {
  username: string | null;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

const Chatbot: React.FC<ChatbotProps> = ({ username, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add initial greeting message when the component mounts
  useEffect(() => {
    const initialGreeting: Message = {
      id: '1',
      text: `Hey ${username || 'there'}, good morning! What can I help you with? Type in your query and I'll assist you.`,
      sender: 'bot'
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
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user'
    };
    
    addMessage(userMessage);
    setInputValue('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now().toString(),
        text: `Thanks for your message. Our team will get back to you shortly regarding: "${userMessage.text}"`,
        sender: 'bot'
      };
      
      addMessage(botResponse);
    }, 1000);
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
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type your query here"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="mic-button">
          <Mic size={20} color="#000" />
        </button>
        <button className="send-button" onClick={handleSendMessage}>
          <Send size={20} color="#578FFF" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot; 