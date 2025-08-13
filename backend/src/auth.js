// // backend/src/auth.js
// import express from 'express';
// import { body, validationResult } from 'express-validator';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';

// // Initialize Prisma Client
// const prisma = new PrismaClient();
// // Create an Express router
// const router = express.Router();
// // Load environment variables
// const JWT_SECRET = process.env.JWT_SECRET;
// // Set JWT expiration time
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '3600'; // seconds76


// // POST /api/auth/signup
// router.post(
//   '/signup',
//   [
//     body('email').isEmail().withMessage('Valid email required'),
//     body('password').isLength({ min: 8 }).withMessage('Password min 8 chars'),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//     const { email, password } = req.body;

//     try {
//       // check if user exists
//       const existing = await prisma.user.findUnique({ where: { email } });
//       if (existing) return res.status(409).json({ error: 'Email already in use' });

//       const passwordHash = await bcrypt.hash(password, 10);
//       const user = await prisma.user.create({
//         data: { email, passwordHash },
//       });

//       // generate token
//       const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
//         expiresIn: Number(JWT_EXPIRES_IN),
//       });

//       return res.status(201).json({ token, user: { id: user.id, email: user.email } });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Server error' });
//     }
//   }
// );

// // POST /api/auth/login
// router.post(
//   '/login',
//   [body('email').isEmail(), body('password').exists()],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//     const { email, password } = req.body;

//     try {
//       const user = await prisma.user.findUnique({ where: { email } });
//       if (!user) return res.status(401).json({ error: 'Invalid credentials' });

//       const valid = await bcrypt.compare(password, user.passwordHash);
//       if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

//       const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
//         expiresIn: Number(JWT_EXPIRES_IN),
//       });

//       return res.json({ token, user: { id: user.id, email: user.email } });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Server error' });
//     }
//   }
// );

// export default router;


// backend/src/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { email, passwordHash },
  });

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

export default router;
