# Smart Health Web Application

A comprehensive health management platform built with React and Node.js.

## Features

- Health monitoring and tracking
- User authentication and profiles
- Real-time notifications
- Responsive web design

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: Render

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB connection string

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Hisantu/Smart_Health_Web.git
cd Smart_Health_Web
```

2. Install dependencies:
```bash
npm run install-all
```

3. Set up environment variables:
Create a `.env` file in the `server` directory with:
```
NODE_ENV=development
PORT=4000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start development servers:
```bash
# Start backend
cd server && npm run dev

# Start frontend (in another terminal)
cd web && npm run dev
```

## Deployment

The application is configured for deployment on Render with the following settings:

- **Root Directory**: `smart_health/smart_health`
- **Build Command**: `cd server && npm install && cd ../web && npm install && npm run build`
- **Start Command**: `cd server && node index.js`

## License

MIT License