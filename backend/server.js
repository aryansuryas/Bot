require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = process.env.PORT || 3001;

// Initialize Gemini client
// The client automatically uses process.env.GEMINI_API_KEY
const ai = new GoogleGenAI();

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Valid messages array is required' });
    }

    // Call Gemini API with streaming
    const stream = await ai.models.generateContentStream({
      model: 'gemini-3.6-flash',
      contents: messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : msg.role,
        parts: [{ text: msg.content }]
      })),
    });

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      const content = chunk.text;
      if (content) {
        res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    // If headers have already been sent (e.g. streaming started), we can't send a JSON response
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: error.message || 'An error occurred during streaming' })}\n\n`);
      res.end();
    } else {
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
