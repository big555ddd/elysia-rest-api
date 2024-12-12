import dotenv from 'dotenv';
import prisma from '../../database/database';
import setupLogger from '../../internal/utils/logger';
import routes from '../../src/routes';
import { Elysia } from 'elysia';
import { corsMiddleware } from '../middleware/middleware';

// Load environment variables
dotenv.config();

// Load configuration only once
export let cachedConfig: { jwtSecret: string; dbUrl: string; port: number; host: string; jwtDuration: string } | null = null;

export const loadConfig = () => {
  if (!cachedConfig) {
    cachedConfig = {
      jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
      dbUrl: process.env.DATABASE_URL || '',
      port: parseInt(process.env.PORT || '9090', 10),  // อ่านค่า port จาก .env
      host: process.env.APP_HOST || 'http://127.0.0.1', // อ่านค่า host จาก .env
      jwtDuration: process.env.JWT_DURATION || '24h',  // อ่านค่า JWT_DURATION จาก .env
    };
  }
  return cachedConfig;
};

export const initModules = async (app: Elysia) => {
  const logger = setupLogger();

  // Load configuration
  const config = loadConfig();

  try {
    logger.info('Connecting to the database...');
    await prisma.$connect();
    logger.info('🎉 Database connected successfully');
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    process.exit(1);
  }
  app.use(corsMiddleware);

  app.use(routes); // Use all defined routes


  logger.info('All modules initialized');
};
