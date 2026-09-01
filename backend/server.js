require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const port = process.env.PORT || 3001;

// Initialize Anthropic client
// The client automatically uses process.env.ANTHROPIC_API_KEY
const anthropic = new Anthropic();

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Valid messages array is required' });
    }

    // Call Anthropic API with streaming
    const stream = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      messages: messages,
      stream: true,
    });

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    
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
