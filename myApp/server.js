const express = require('express');
const app = express();
const port = 3000;

// Route to handle /api/whoami
app.get('/api/whoami', (req, res) => {
  const ipaddress = req.ip;
  const language = req.get('Accept-Language');
  const software = req.get('User-Agent');

  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
