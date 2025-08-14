// backend/src/transactions.js
import express from 'express';
import multer from 'multer';
import { parse } from 'csv-parse/sync';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from './middleware/authMiddleware.js';

const router = express.Router();
const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });

// Helper: validate a transaction
const validateTransaction = (t) => {
  const errors = [];
  if (!t.amount || isNaN(Number(t.amount))) errors.push('Invalid or missing amount');
  if (!t.date || isNaN(Date.parse(t.date))) errors.push('Invalid or missing date');
  if (!t.merchant) errors.push('Missing merchant');
  // category can be optional
  return errors;
};

// POST /api/transactions/upload
router.post('/upload', requireAuth, upload.single('file'), async (req, res) => {
  try {
    const { file } = req;
    let transactions = [];

    if (file) {
      const csvString = file.buffer.toString('utf-8');
      const records = parse(csvString, { columns: true, skip_empty_lines: true, trim: true });

      transactions = records.map((r, index) => {
        const validationErrors = validateTransaction(r);
        if (validationErrors.length) {
          throw new Error(`Row ${index + 1}: ${validationErrors.join(', ')}`);
        }
        return {
          userId: req.user.id,
          amount: parseFloat(r.amount),
          date: new Date(r.date),
          merchant: r.merchant,
          category: r.category || null,
        };
      });
    } else if (req.body.transactions) {
      transactions = req.body.transactions.map((t, index) => {
        const validationErrors = validateTransaction(t);
        if (validationErrors.length) {
          throw new Error(`Transaction ${index + 1}: ${validationErrors.join(', ')}`);
        }
        return {
          userId: req.user.id,
          amount: parseFloat(t.amount),
          date: new Date(t.date),
          merchant: t.merchant,
          category: t.category || null,
        };
      });
    } else {
      return res.status(400).json({ message: 'No file or JSON transactions provided' });
    }

    // Deduplication: check for existing transactions (same userId, amount, date, merchant)
    const existing = await prisma.transaction.findMany({
      where: {
        OR: transactions.map((t) => ({
          userId: t.userId,
          amount: t.amount,
          date: t.date,
          merchant: t.merchant,
        })),
      },
      select: { id: true, amount: true, date: true, merchant: true },
    });

    const filtered = transactions.filter((t) =>
      !existing.some((e) => e.amount === t.amount && e.date.getTime() === t.date.getTime() && e.merchant === t.merchant)
    );

    const created = await prisma.transaction.createMany({
      data: filtered,
    });

    res.json({ message: 'Transactions uploaded', attempted: transactions.length, inserted: created.count });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(400).json({ message: 'Transaction upload failed', error: err.message });
  }
});


// backend/src/transactions.js
router.get('/', requireAuth, async (req, res) => {
  try {
    const { start, end, category } = req.query;

    const filters = { userId: req.user.id };

    if (start || end) {
      filters.date = {};
      if (start) filters.date.gte = new Date(start);
      if (end) filters.date.lte = new Date(end);
    }

    if (category) {
      filters.category = category;
    }

    const transactions = await prisma.transaction.findMany({
      where: filters,
      orderBy: { date: 'desc' },
    });

    res.json({ transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch transactions', error: err.message });
  }
});


export default router;
