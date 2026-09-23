require('dotenv').config();
const express = require('express');
const path = require('path');
const apiRoutes = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

app.get('/category/:type', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'category.html'));
});

app.get('/detail/:type/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'detail.html'));
});

app.listen(PORT, () => {
  console.log(`有鬆島 server running on http://localhost:${PORT}`);
});
