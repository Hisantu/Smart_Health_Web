require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const morgan = require('morgan');
const path = require('path');

const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const tokenRoutes = require('./routes/tokens');
const appointmentRoutes = require('./routes/appointments');
const doctorRoutes = require('./routes/doctors');
const departmentRoutes = require('./routes/departments');
const notificationRoutes = require('./routes/notifications');

const app = express();
const server = http.createServer(app);

// Socket.IO configuration - allow same origin in production
const io = new Server(server, {
  cors: { 
    origin: process.env.NODE_ENV === 'production' ? true : "*",
    credentials: true
  }
});

// CORS configuration - allow same origin
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? true : "*",
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  req.io = io;
  next();
});

// MongoDB connection
const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  console.error('❌ MONGO_URL environment variable is not set');
  process.exit(1);
}

mongoose.connect(mongoUrl)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/notifications', notificationRoutes);

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../../web/dist');
  app.use(express.static(frontendPath));
  
  // Handle React routing - return all requests to React app
  app.get('*', (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`📦 Serving frontend from: ${path.join(__dirname, '../../web/dist')}`);
  }
});
