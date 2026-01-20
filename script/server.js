// server.js
// Express backend proxy for OpenAI API requests

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' folder

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Chat endpoint - Proxy for OpenAI API
app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;

    // Validate request
    if (!message || !history) {
        return res.status(400).json({ 
            error: 'Missing required fields: message and history' 
        });
    }

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ 
            error: 'OpenAI API key not configured on server' 
        });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: history,
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('OpenAI API Error:', response.status, errorData);
            
            return res.status(response.status).json({ 
                error: `OpenAI API error: ${response.status}`,
                details: errorData.error?.message || 'Unknown error'
            });
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            error: 'Failed to get response from AI',
            details: error.message 
        });
    }
});

// Catch-all route for SPA (if needed)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);
    
    if (!process.env.OPENAI_API_KEY) {
        console.warn('⚠️  WARNING: OPENAI_API_KEY not found in .env file!');
        console.warn('   Create a .env file with: OPENAI_API_KEY=your-key-here');
    } else {
        console.log('✅ OpenAI API key loaded successfully');
    }
});