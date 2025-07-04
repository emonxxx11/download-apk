const express = require('express');
const path = require('path');
const app = express();

// Serve images and icons folders statically
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/icons', express.static(path.join(__dirname, 'icons')));

// Serve CSS and JS from public folder (or root if you put them there)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
