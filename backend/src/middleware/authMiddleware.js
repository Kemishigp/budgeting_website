// // backend/src/middleware/authMiddleware.js
// import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
// const JWT_SECRET = process.env.JWT_SECRET;

// export const requireAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });

//     const parts = authHeader.split(' ');
//     if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Malformed token' });

//     const token = parts[1];
//     const payload = jwt.verify(token, JWT_SECRET);
//     // attach user object (minimal) to req
//     const user = await prisma.user.findUnique({ where: { id: payload.userId } });
//     if (!user) return res.status(401).json({ error: 'User not found' });

//     req.user = { id: user.id, email: user.email };
//     next();
//   } catch (err) {
//     console.error('auth error', err);
//     return res.status(401).json({ error: 'Invalid or expired token' });
//   }
// };


// backend/src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, createdAt: true }, // only return safe fields
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
