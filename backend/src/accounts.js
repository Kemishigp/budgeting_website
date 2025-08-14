// backend/src/accounts.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from './middleware/authMiddleware.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', requireAuth, async (req, res) => {
  try {
    const accounts = await prisma.account.findMany({
      where: { userId: req.user.id },
      orderBy: { name: 'asc' },
    });
    res.json({ accounts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch accounts', error: err.message });
  }
});

export default router;
