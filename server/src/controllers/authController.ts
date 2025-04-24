import { Request, Response } from 'express';
import { userService } from '../services/userService';

interface AuthController {
  login(req: Request, res: Response): void;
}

interface LoginRequest {
  username: string;
  password: string;
}

const authController: AuthController = {
  login: (req: Request, res: Response): void => {
    try {
      const { username, password } = req.body as LoginRequest;
      
      if (!username || !password) {
        res.status(400).json({ 
          success: false, 
          message: 'Username and password are required' 
        });
        return;
      }
      
      const isAuthenticated = userService.authenticate(username, password);
      
      if (isAuthenticated) {
        res.status(200).json({ 
          success: true, 
          message: 'Authentication successful' 
        });
      } else {
        res.status(401).json({ 
          success: false, 
          message: 'Invalid username or password' 
        });
      }
    } catch (error) {
      console.error('Error in login controller:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  }
};

export { authController }; 