# AI Chat Bot (openai) 

A lightning-fast, sleek AI chat application built with React, Node.js, and Google's Gemini `gemini-3.6-flash` model.

## Features

- **Blazing Fast**: Powered by Gemini 3.6-flash and Vite.
- **Real-time Streaming**: Streams responses chunk-by-chunk using Server-Sent Events (SSE) for a seamless chat experience.
- **Modern UI**: Clean and minimal user interface.
- **Secure**: Backend handles API key securely, keeping the frontend safe.

## Prerequisites

- Node.js (v18 or higher recommended)
- A Google Gemini API Key

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aryansuryas/Bot.git
   cd Bot
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   - Copy `.env.example` to `.env` and add your Gemini API key:
     ```env
     GEMINI_API_KEY=your_gemini_api_key_here
     PORT=3001
     ```
   - Start the backend server:
     ```bash
     node server.js
     ```

3. **Frontend Setup:**
   - Open a new terminal instance and run:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```
   - The application will be available at `http://localhost:5173/`.
