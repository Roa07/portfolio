import express from 'express';
import rateLimit from 'express-rate-limit';
import { handleContactSubmit, getProjects } from '../controllers/contactController.js';
import { validateContactInput } from '../middleware/validate.js';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

// Strict rate limiter for contact form submissions (5 requests per 15 minutes per IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact inquiries from this IP, please try again in 15 minutes.',
  },
});

// GET /api/health - check server and database status
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: getDBStatus() ? 'connected' : 'disconnected (in-memory fallback active)',
    environment: process.env.NODE_ENV || 'development',
  });
});

// POST /api/contact - validate and process contact form submissions
router.post('/contact', contactLimiter, validateContactInput, handleContactSubmit);

// GET /api/projects - retrieve portfolio projects
router.get('/projects', getProjects);

export default router;
