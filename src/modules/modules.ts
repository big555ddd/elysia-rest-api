import { Elysia } from 'elysia';
import { initDatabase } from '../../database/database.ts';
import setupLogger from '../../internal/utils/logger.ts'; // นำเข้าแบบ default

export const initModules = (app: Elysia) => {
  const logger = setupLogger();

  logger.info('Initializing database...');
  initDatabase(); // เชื่อมต่อกับฐานข้อมูล

  logger.info('All modules initialized');
};
