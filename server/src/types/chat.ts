export interface ChatMessage {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  username: string;
}

export interface ChatResponse {
  success: boolean;
  message: ChatMessage;
  error?: string;
} 