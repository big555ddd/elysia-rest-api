import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const initDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('🎉 Database connected');
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error);
    process.exit(1);
  }
};

export default prisma;
