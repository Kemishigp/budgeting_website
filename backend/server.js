// // backend/server.js
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';

// import authRoutes from './src/auth.js';
// import transactionsRoutes from './src/transactions.js';
// import { requireAuth } from './src/middleware/authMiddleware.js';
// import accountsRoutes from './src/accounts.js';

// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Public auth routes
// app.use('/api/auth', authRoutes);

// // Protected routes
// app.use('/api/transactions', requireAuth, transactionsRoutes);

// // Example protected route
// app.get('/api/me', requireAuth, (req, res) => {
//   res.json(req.user);
// });

// // Start server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// // Accounts routes
// app.use('/api/accounts', accountsRoutes);

// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './src/auth.js';
import transactionsRoutes from './src/transactions.js';
import accountsRoutes from './src/accounts.js';
import { requireAuth } from './src/middleware/authMiddleware.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Public auth routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/transactions', requireAuth, transactionsRoutes);
app.use('/api/accounts', requireAuth, accountsRoutes);

// Example protected route
app.get('/api/me', requireAuth, (req, res) => res.json(req.user));

export default app;
