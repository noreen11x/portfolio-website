# Quick Start Guide

Get your portfolio website up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
cd server
npm install
```

## Step 2: Configure Email

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your email settings (see README.md for detailed instructions)

## Step 3: Start the Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## Step 4: Open the Front-End

**Option A: Using Python (if installed)**
```bash
cd ../frontend
python3 -m http.server 3000
```

**Option B: Using Node.js http-server**
```bash
npm install -g http-server
cd ../frontend
http-server -p 3000
```

**Option C: Open directly**
- Open `frontend/index.html` in your browser
- Note: Contact form requires a server due to CORS

## Step 5: Customize

1. Edit `frontend/index.html` to add your information
2. Replace placeholder images
3. Update colors in `frontend/styles.css` (CSS variables at the top)

## That's It! 🎉

Your portfolio is now running. Visit `http://localhost:3000` to see it.

For detailed documentation, see [README.md](README.md)

