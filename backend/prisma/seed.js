import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      passwordHash: 'hashedpassword123', // hash it for production!
    },
  });

  // Create categories
  const foodCategory = await prisma.category.create({
    data: { name: 'Food & Dining' },
  });

  const billsCategory = await prisma.category.create({
    data: { name: 'Bills & Utilities' },
  });

  // Create accounts
  const account1 = await prisma.account.create({
    data: {
      userId: user.id,
      provider: 'Chase Bank',
      accountName: 'Checking Account',
      last4: '1234',
      currency: 'USD',
    },
  });

  const account2 = await prisma.account.create({
    data: {
      userId: user.id,
      provider: 'Bank of America',
      accountName: 'Savings Account',
      last4: '5678',
      currency: 'USD',
    },
  });

  // Create transactions
  await prisma.transaction.createMany({
    data: [
      {
        accountId: account1.id,
        userId: user.id,
        amount: -45.67,
        currency: 'USD',
        merchant: 'Starbucks',
        date: new Date('2025-08-01'),
        categoryId: foodCategory.id,
        rawJson: { note: 'Morning coffee run' },
      },
      {
        accountId: account1.id,
        userId: user.id,
        amount: -120.0,
        currency: 'USD',
        merchant: 'Electric Company',
        date: new Date('2025-08-03'),
        categoryId: billsCategory.id,
        rawJson: { note: 'Monthly bill' },
      },
      {
        accountId: account2.id,
        userId: user.id,
        amount: 2000.0,
        currency: 'USD',
        merchant: 'Employer Payroll',
        date: new Date('2025-08-05'),
        categoryId: billsCategory.id,
        rawJson: { note: 'Paycheck' },
      },
      {
        accountId: account1.id,
        userId: user.id,
        amount: -15.99,
        currency: 'USD',
        merchant: 'Netflix',
        date: new Date('2025-08-06'),
        categoryId: billsCategory.id,
        rawJson: { note: 'Monthly subscription' },
      },
    ],
  });

  // Create recommendations
  await prisma.recommendation.createMany({
    data: [
      { userId: user.id, text: 'Consider setting a dining-out budget.' },
      { userId: user.id, text: 'Your electricity bill is higher than last month.' },
    ],
  });

  console.log('✅ Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
