import express from 'express';
import cors from 'cors';
import { apiRoutes } from './routes/api';

// Define interface for environment variables
interface ServerConfig {
  port: number;
}

// Server configuration with default values
const config: ServerConfig = {
  port: parseInt(process.env.PORT || '5001', 10)
};

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
}); 