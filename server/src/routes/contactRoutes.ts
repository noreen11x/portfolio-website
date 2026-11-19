import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import contactController from '../controllers/contactController';
import { validateContact } from '../validators/contactValidator';

const router = Router();

// Rate limiting middleware for spam protection
const contactRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting and validation to contact route
router.post('/submit', contactRateLimiter, validateContact, (req, res, next) => {
    contactController.sendContactForm(req, res).catch(next);
});

export default router;