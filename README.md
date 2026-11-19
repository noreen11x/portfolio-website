# Personal Portfolio Website

A complete personal portfolio website with both front-end and back-end features. This project showcases work experience, completed projects, and includes a contact form that sends messages to your email.

## Features

### Front-End
- ✅ Clean, modern layout with smooth scrolling
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Simple navigation with active link highlighting
- ✅ Sections for:
  - Introduction/About
  - Work Experience
  - Featured Projects with images
  - Contact Form
- ✅ Smooth animations and transitions
- ✅ Form validation and error handling

### Back-End
- ✅ Node.js and Express server
- ✅ Contact form handler with validation
- ✅ SQLite database to store messages
- ✅ Spam protection with rate limiting
- ✅ Email notifications via Nodemailer
- ✅ IP-based and email-based message limits

## Project Structure

```
portfolio-website/
├── frontend/              # Front-end files (HTML, CSS, JavaScript)
│   ├── index.html        # Main HTML file
│   ├── styles.css        # All CSS styles
│   └── script.js         # JavaScript functionality
├── server/               # Back-end files (Node.js, Express)
│   ├── src/
│   │   ├── index.ts      # Server entry point
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Business logic (database, mailer)
│   │   └── validators/   # Input validation
│   ├── package.json
│   └── .env.example      # Environment variables template
└── README.md             # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)

## Installation

### 1. Clone or Download the Project

If you have the project files, navigate to the project directory:
```bash
cd portfolio-website
```

### 2. Install Server Dependencies

Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `server` directory:
```bash
cp .env.example .env
```

Edit the `.env` file with your email configuration:

**For Gmail (Recommended for testing):**
1. Enable 2-factor authentication on your Google account
2. Generate an app-specific password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Create a new app password for "Mail"
3. Use these settings in `.env`:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
RECIPIENT_EMAIL=your-email@gmail.com
```

**For Other Email Providers (SMTP):**
```env
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
RECIPIENT_EMAIL=your-email@example.com
```

### 4. Customize the Front-End

Edit the `frontend/index.html` file to personalize:
- Replace "Your Name" with your actual name
- Update the intro section with your information
- Add your work experience
- Add your projects with images and descriptions
- Update contact information (email, location, social links)
- Replace placeholder images with your own

## Running the Project

### Start the Server

Open a terminal in the `server` directory:
```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`

### Open the Front-End

You have two options:

**Option 1: Using a Local Server (Recommended)**

If you have Python installed:
```bash
cd frontend
python3 -m http.server 3000
```

Or using Node.js http-server:
```bash
npm install -g http-server
cd frontend
http-server -p 3000
```

**Option 2: Open Directly in Browser**

Simply open `frontend/index.html` in your web browser. Note: The contact form won't work without a server due to CORS restrictions.

### Access the Website

Open your browser and navigate to:
- Front-end: `http://localhost:3000` (or the port you chose)
- Back-end API: `http://localhost:5000`

## API Endpoints

### POST `/api/contact/contact`

Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Message sent successfully! I'll get back to you soon."
}
```

**Error Responses:**
- `400`: Validation error
- `429`: Too many requests (rate limit exceeded)
- `500`: Server error

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Spam Protection

The contact form includes multiple layers of spam protection:

1. **Rate Limiting**: Maximum 5 requests per IP address per 15 minutes
2. **IP-based Limits**: Maximum 3 messages per IP address per hour
3. **Email-based Limits**: Maximum 2 messages per email address per hour
4. **Input Validation**: All fields are validated and sanitized

## Database

Messages are stored in an SQLite database (`server/database.sqlite`). The database is automatically created when the server starts.

**Database Schema:**
- `id`: Auto-incrementing primary key
- `name`: Sender's name
- `email`: Sender's email
- `message`: Message content
- `ip_address`: IP address (for spam protection)
- `created_at`: Timestamp

## Customization Guide

### Changing Colors

Edit `frontend/styles.css` and modify the CSS variables:
```css
:root {
    --primary-color: #6366f1;    /* Main brand color */
    --secondary-color: #8b5cf6;  /* Secondary color */
    --text-color: #1f2937;        /* Text color */
    /* ... */
}
```

### Adding More Sections

1. Add HTML in `frontend/index.html`
2. Add navigation link in the navbar
3. Add corresponding styles in `frontend/styles.css`
4. Update smooth scrolling in `frontend/script.js` if needed

### Changing Images

Replace placeholder images:
- Profile image: Update the `src` in the intro section
- Project images: Update the `src` in each project card

You can use:
- Local images (place in `frontend/images/` folder)
- External URLs
- Image hosting services

## Troubleshooting

### Contact Form Not Working

1. **Check CORS**: Ensure `CLIENT_URL` in `.env` matches your front-end URL
2. **Check Email Config**: Verify email settings in `.env` file
3. **Check Console**: Look for errors in browser console and server logs
4. **Check Network**: Ensure the server is running and accessible

### Email Not Sending

1. **Gmail Users**: Make sure you're using an app-specific password, not your regular password
2. **Check Logs**: Server logs will show email errors
3. **Test Connection**: The server verifies email config on startup
4. **Firewall**: Ensure your firewall isn't blocking the connection

### Database Issues

- The database file is created automatically
- If you need to reset: Delete `server/database.sqlite` and restart the server
- Check file permissions if you get database errors

## Production Deployment

### Front-End

1. Upload `frontend/` files to your web hosting
2. Update `API_URL` in `frontend/script.js` to point to your production server
3. Ensure your hosting supports static files

### Back-End

1. Set up a Node.js hosting (Heroku, DigitalOcean, AWS, etc.)
2. Set environment variables on your hosting platform
3. Ensure the database file is persisted (or use a cloud database)
4. Update CORS settings to allow your front-end domain

## Technologies Used

### Front-End
- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript (ES6+)

### Back-End
- Node.js
- Express.js
- TypeScript
- SQLite3
- Nodemailer
- Joi (validation)
- Express Rate Limit

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review server logs for error messages
3. Ensure all dependencies are installed correctly
4. Verify environment variables are set properly

## Next Steps

- Add more projects and update content
- Customize colors and styling to match your brand
- Add animations and interactions
- Integrate with social media APIs
- Add a blog section
- Implement dark mode
- Add analytics tracking

---

**Happy Coding! 🚀**
