# Safar - AI-Powered Travel Experience Sharing Platform

A modern web application built with React and Vite where users can share their travel experiences safely, powered by an AI-driven abusive content moderation system.

## Features

- 🏠 **Landing Page** - Attractive hero section with site description
- 🔐 **User Authentication** - Login and Signup with JWT-based authentication
- 📝 **Create Posts** - Share travel stories with images
- 🤖 **AI Content Moderation** - Real-time text filtering and sanitization
- 🗺️ **Explore Page** - Filter and search posts by destination
- 👤 **User Profile** - View and manage your posts
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Context API
- **Icons**: Lucide React

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

## Project Structure

```
safar/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API and business logic services
│   ├── contexts/      # React Context providers
│   ├── App.jsx        # Main app component
│   └── main.jsx       # Entry point
├── package.json
└── vite.config.js
```

## AI Moderation

The platform includes a real-time AI moderation system that:
- Detects abusive or toxic words as users type
- Automatically replaces offensive content
- Maintains readability while ensuring safety

## Future Enhancements

- Speech-to-text travel story input
- AI sentiment analysis for emotion tagging
- Community leaderboard
- Multi-language moderation support

## License

MIT

