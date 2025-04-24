import { Request, Response } from 'express';
import { chatService } from '../services/chatService';
import { ChatRequest, ChatResponse } from '../types/chat';

interface ChatController {
  processMessage(req: Request, res: Response): Promise<void>;
}

const chatController: ChatController = {
  processMessage: async (req: Request, res: Response): Promise<void> => {
    try {
      const { message, username } = req.body as ChatRequest;
      
      if (!message) {
        res.status(400).json({
          success: false,
          error: 'Message is required'
        });
        return;
      }
      
      // Process the message through the chat service
      const botMessage = await chatService.processMessage({ message, username });
      
      // Return the response
      const response: ChatResponse = {
        success: true,
        message: botMessage
      };
      
      res.status(200).json(response);
    } catch (error) {
      console.error('Error in chat controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
};

export { chatController }; 