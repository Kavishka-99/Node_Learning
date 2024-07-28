const express = require('express');
const path = require('path');

const app = express();

// Middleware to serve static files from the public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Route to render the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route to serve JSON response
app.get('/json', (req, res) => {
    res.json({ message: "Hello json" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
