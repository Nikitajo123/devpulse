# DevPulse

AI-powered GitHub profile dashboard. Enter any GitHub username and get a visual breakdown of their activity, languages, commit patterns, and an AI-generated developer summary.

## Features

- Activity heatmap
- Language breakdown by repo
- Commit pattern analysis
- AI-generated developer profile summary
- Shareable profile links
- MongoDB result caching

## Tech Stack

- **Frontend:** React + TypeScript (Vite)
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB
- **AI:** OpenAI API
- **Data:** GitHub REST API

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Nikitajo123/devpulse.git
cd devpulse

# Setup server
cd server
npm install
npm run dev

# Setup client
cd ../client
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in `/server`:

```
GITHUB_TOKEN=your_github_token
OPENAI_API_KEY=your_openai_key
MONGODB_URI=your_mongodb_uri
PORT=3000
```

## License

MIT
