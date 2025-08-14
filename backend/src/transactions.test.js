// // backend/tests/transactions.test.js
// import request from 'supertest';
// import app from '../server.js'; // make sure server exports `app`

// describe('GET /api/transactions', () => {
//   let token;

//   beforeAll(async () => {
//     // login or signup to get token
//     const res = await request(app)
//       .post('/api/auth/login')
//       .send({ email: 'me@example.com', password: 'testpass123' });

//     token = res.body.token;
//   });

//   it('returns a list of transactions', async () => {
//     const res = await request(app)
//       .get('/api/transactions')
//       .set('Authorization', `Bearer ${token}`);

//     expect(res.status).toBe(200);
//     expect(Array.isArray(res.body.transactions)).toBe(true);
//   });
// });


import request from 'supertest';
import app from '../server.js';

describe('Transactions API', () => {
  it('should return 401 without auth', async () => {
    const res = await request(app).get('/api/transactions');
    expect(res.statusCode).toBe(401);
  });
});
