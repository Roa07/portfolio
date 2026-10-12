import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/api.js';
import { errorHandler } from './middleware/errorHandler.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env if present, else fallback to root .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config(); // fallback to current working directory .env

const app = express();

// Security and utility middleware
app.use(helmet());

const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin, or localhost, or matching CLIENT_URL, or any *.vercel.app domain
      if (
        !origin ||
        origin === allowedOrigin ||
        origin.startsWith('http://localhost:') ||
        origin.endsWith('.vercel.app')
      ) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy'));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Mount API routes
app.use('/api', apiRoutes);

// Root fallback / description
app.get('/', (req, res) => {
  res.json({
    name: 'Personal Portfolio API',
    version: '1.0.0',
    status: 'online',
    endpoints: ['/api/health', '/api/contact', '/api/projects'],
  });
});

// Centralized error handler
app.use(errorHandler);

// Start server function (exported for testing or direct execution)
export const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`[Portfolio Server] Running on http://localhost:${PORT}`);
  });
  return server;
};

// Auto-run if executed directly
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
