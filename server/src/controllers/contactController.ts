import { Request, Response } from 'express';
import { sendContactEmail } from '../services/mailer';
import { saveMessage, getMessageCountFromIP, getMessageCountFromEmail } from '../services/database';

class ContactController {
    async sendContactForm(req: Request, res: Response): Promise<Response | void> {
        const { name, email, message } = req.body;
        
        // Get IP address for spam protection
        const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';

        try {
            // Spam protection: Check message limits
            const messagesFromIP = await getMessageCountFromIP(ipAddress, 1); // Last hour
            const messagesFromEmail = await getMessageCountFromEmail(email, 1); // Last hour

            // Limit: 3 messages per IP per hour, 2 messages per email per hour
            if (messagesFromIP >= 3) {
                return res.status(429).json({ 
                    success: false,
                    message: 'Too many messages from this IP address. Please try again later.' 
                });
            }

            if (messagesFromEmail >= 2) {
                return res.status(429).json({ 
                    success: false,
                    message: 'Too many messages from this email. Please try again later.' 
                });
            }

            // Save message to database
            await saveMessage(name, email, message, ipAddress);

            // Send email notification
            try {
                await sendContactEmail({ name, email, message });
            } catch (emailError) {
                // Log email error but don't fail the request since message is saved
                console.error('Failed to send email notification:', emailError);
                // Continue - message is saved in database
            }

            return res.status(200).json({ 
                success: true,
                message: 'Message sent successfully! I\'ll get back to you soon.' 
            });
        } catch (err) {
            console.error('Error processing contact form:', err);
            return res.status(500).json({ 
                success: false,
                message: 'Failed to send message. Please try again later.' 
            });
        }
    }
}

const contactController = new ContactController();
export default contactController;