const express = require('express');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Logger middleware
app.use((req, res, next) => {
    const logMessage = `${req.method} ${req.path} - ${req.ip}`;
    console.log(logMessage);
    next();
});

// Middleware to serve static files from the public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Route to render the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route to serve JSON response
app.get('/json', (req, res) => {
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        message = message.toUpperCase();
    }
    res.json({ message: message });
});

// Route to get current time
app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({ time: req.time });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
