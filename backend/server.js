// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/auth.js';
import { requireAuth } from './src/middleware/authMiddleware.js';

// Call the dotenv config to load environment variables
dotenv.config();
// initialize the express app
const app = express();

// Middleware
//Tells the app to use CORS for all routes
app.use(cors());
// Parses incoming JSON requests
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Example protected route
app.get('/api/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// app.get('/api/me', requireAuth, (req, res) => {
//   res.json({ user: req.user });
// });
