# AI Chatbot Full-Stack Application

This document outlines the implementation plan for building a modern, premium AI chatbot using a React + TypeScript frontend and a Node.js + Express backend.

## Goal
Build a full-stack AI chatbot application featuring a clean, editorial UI design and a secure backend that proxies requests to the Anthropic Claude API.

## User Review Required
> [!IMPORTANT]
> The backend requires an `ANTHROPIC_API_KEY` to function. I will create a `.env.example` file, but you will need to provide your actual Anthropic API key in the `.env` file before we can fully test the chatbot.
> 
> Also, since we are doing a full-stack setup, I plan to create a monorepo-style structure with `frontend/` and `backend/` folders in this directory. Let me know if you prefer a different structure.

## Proposed Changes

We will create two main directories: `backend` and `frontend`.

### Backend (Node.js + Express)
The backend will securely handle the Anthropic API key and proxy requests from the frontend to Claude, utilizing response streaming.

#### [NEW] `backend/package.json`
Dependencies: `express`, `cors`, `dotenv`, `@anthropic-ai/sdk`.

#### [NEW] `backend/server.js`
An Express server exposing `POST /api/chat`. It will validate the input, call the Claude API (handling the stream), and pipe the response back to the client.

#### [NEW] `backend/.env` (and `.gitignore`)
Stores `ANTHROPIC_API_KEY`. It will be added to `.gitignore`.

---

### Frontend (React + TypeScript + Vite)
The frontend will feature the requested editorial design, custom fonts, and responsive components.

#### [NEW] `frontend/package.json`
Dependencies: `react`, `react-dom`, `tailwindcss`, `lucide-react` (for icons).

#### [NEW] `frontend/index.html`
Will include links to Google Fonts: **Syne** (headings), **Plus Jakarta Sans** (messages), and **JetBrains Mono** (metadata).

#### [NEW] `frontend/tailwind.config.js`
Configured with custom colors:
- Background: Cream/off-white (e.g., `#faf9f6`)
- Primary: Deep crimson/wine (e.g., `#722f37`)
- Secondary: Brass (e.g., `#b5a642`)
Configured with custom typography.

#### Components
- **[NEW] `frontend/src/App.tsx`**: Main application state (conversation history, loading/streaming state) and layout.
- **[NEW] `frontend/src/components/Header.tsx`**: App branding and clear chat action.
- **[NEW] `frontend/src/components/ChatWindow.tsx`**: Scrollable container that auto-scrolls to the latest message.
- **[NEW] `frontend/src/components/MessageBubble.tsx`**: Displays individual messages with distinct styles for user and assistant.
- **[NEW] `frontend/src/components/InputBar.tsx`**: Textarea that supports auto-resize, Enter-to-send, Shift+Enter for newline, and the crimson send button.
- **[NEW] `frontend/src/components/TypingIndicator.tsx`**: A minimal loading state when waiting for the first token.

## Verification Plan

### Automated Tests
- The frontend will be built using `npm run build` to verify there are no TypeScript errors.

### Manual Verification
- We will start the backend server (`node server.js`) and the frontend dev server (`npm run dev`).
- We will verify that sending a message successfully proxies through the backend to the Claude API and that the response streams smoothly into the UI.
- We will verify the UI matches the design direction (colors, fonts, responsiveness).
- We will test error handling (e.g., what happens if the API key is missing or invalid).
