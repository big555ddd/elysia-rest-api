// middlewares/authMiddleware.ts
import { CheckAuthorization } from './middleware';
import setupLogger from '../../internal/utils/logger';
import { BadRequest } from '../base/response';
import type { Context } from 'elysia';

const logger = setupLogger();

export const authMiddleware = async (context: Context) => {
  const headersObject = CheckAuthorization(context.headers);

  if (headersObject.code === 400) {
    logger.error('Invalid token');
    return BadRequest('Invalid token', null); // ส่ง BadRequest response
  }

  // Set headersObject in context for future use
  (context as any).auth = headersObject; // ใช้ `as any` เพื่อเพิ่ม auth ใน context
};
