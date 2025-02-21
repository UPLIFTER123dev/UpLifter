const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual API keys
const NEWS_API_KEY = '3fa576be00c74fe58c85e4a98341c8c9';
const QUOTES_API_KEY = 'g5bSk2c8hlg8kdG9ztFipg==BzikateZnpQMaPjK';

// Middleware to serve static files
app.use(express.static('public'));

// Route to fetch news
app.get('/api/news', async (req, res) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2025-01-21&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// Route to fetch quotes
app.get('/api/quotes', async (req, res) => {
    try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/quotes`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quotes' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});