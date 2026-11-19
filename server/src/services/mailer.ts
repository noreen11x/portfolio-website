import nodemailer from 'nodemailer';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

// Create transporter based on environment variables
const createTransporter = () => {
    // If using Gmail, use OAuth2 or app-specific password
    if (process.env.EMAIL_SERVICE === 'gmail') {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    // For other email services (SMTP)
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

const transporter = createTransporter();

// Send contact form email
export const sendContactEmail = async (formData: ContactFormData) => {
    const { name, email, message } = formData;
    const recipientEmail = process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: `New Contact Form Message from ${name}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><em>You can reply directly to this email to respond to ${name} at ${email}</em></p>
        `,
        replyTo: email,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${recipientEmail}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
};

// Verify email configuration
export const verifyEmailConfig = async (): Promise<boolean> => {
    try {
        await transporter.verify();
        console.log('Email server is ready to send messages');
        return true;
    } catch (error) {
        console.error('Email configuration error:', error);
        return false;
    }
};