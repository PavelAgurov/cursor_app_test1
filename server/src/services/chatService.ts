import { ChatMessage, ChatRequest } from '../types/chat';

interface ChatService {
  processMessage(request: ChatRequest): Promise<ChatMessage>;
}

// Simple responses based on keywords in the user's message
const keywordResponses: Record<string, string> = {
  'hello': 'Hello! How can I assist you today?',
  'hi': 'Hi there! How can I help you?',
  'help': 'I can assist with various inquiries. What specific information are you looking for?',
  'complaint': 'I understand you want to submit a complaint. Please provide details about your issue.',
  'policy': 'Our policies can be found in the Policy section. Is there a specific policy you\'re interested in?',
  'contact': 'You can reach our support team at support@odido.com or call 555-123-4567.',
  'thanks': 'You\'re welcome! Is there anything else I can help you with?',
  'thank you': 'You\'re welcome! Is there anything else I can help you with?'
};

const chatService: ChatService = {
  processMessage: async (request: ChatRequest): Promise<ChatMessage> => {
    try {
      const { message, username } = request;
      
      // Add a small delay to simulate processing time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate response based on keywords
      let responseText = '';
      
      // Check for keyword matches
      const lowerCaseMessage = message.toLowerCase();
      let matched = false;
      
      for (const [keyword, response] of Object.entries(keywordResponses)) {
        if (lowerCaseMessage.includes(keyword)) {
          responseText = response;
          matched = true;
          break;
        }
      }
      
      // Default response if no keywords matched
      if (!matched) {
        responseText = `Thanks for your message. Our team will review your inquiry: "${message}" and get back to you shortly.`;
      }
      
      // Create a bot message
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      
      return botMessage;
    } catch (error) {
      console.error('Error in chat service:', error);
      
      // Return a fallback message
      return {
        id: Date.now().toString(),
        text: 'Sorry, I encountered an error processing your request. Please try again later.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
    }
  }
};

export { chatService }; 