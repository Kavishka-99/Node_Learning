const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies (optional if you want to handle POST requests)
app.use(express.json());

// Route to handle /api/:date?
app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;

  // If dateParam is empty, use current date
  let date;
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if the dateParam is a Unix timestamp in milliseconds
    if (!isNaN(dateParam) && dateParam.length === 13) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Validate the date
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return the Unix and UTC timestamps
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
