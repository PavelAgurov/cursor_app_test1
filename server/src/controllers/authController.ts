import { Request, Response } from 'express';
import { userService } from '../services/userService';

interface AuthController {
  login(req: Request, res: Response): void;
  getUserInfo(req: Request, res: Response): void;
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
        const user = userService.getUserByUsername(username);
        
        res.status(200).json({ 
          success: true, 
          message: 'Authentication successful',
          user: {
            username: user?.username
          }
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
  },
  
  getUserInfo: (req: Request, res: Response): void => {
    try {
      const { username } = req.params;
      
      if (!username) {
        res.status(400).json({
          success: false,
          message: 'Username is required'
        });
        return;
      }
      
      const user = userService.getUserByUsername(username);
      
      if (user) {
        res.status(200).json({
          success: true,
          user: {
            username: user.username
          }
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    } catch (error) {
      console.error('Error in getUserInfo controller:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
};

export { authController }; 