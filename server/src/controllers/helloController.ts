import { Request, Response } from 'express';
import { helloService } from '../services/helloService';

interface HelloController {
  getHello(req: Request, res: Response): void;
}

const helloController: HelloController = {
  getHello: (req: Request, res: Response): void => {
    try {
      const message = helloService.getMessage();
      res.status(200).json({ message });
    } catch (error) {
      console.error('Error in getHello controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export { helloController }; 