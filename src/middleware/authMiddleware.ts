// middlewares/authMiddleware.ts
import { CheckAuthorization } from './middleware';
import setupLogger from '../../internal/utils/logger';
import { BadRequest } from '../base/response';
import type { Context } from 'elysia'; // ใช้ Context เท่านั้น

const logger = setupLogger();

// กำหนดประเภทของฟังก์ชัน next เป็น () => Promise<any> แทน
export const authMiddleware = (
  handler: (context: Context & { auth?: any }, next: () => Promise<any>) => Promise<any>
) => async (context: Context & { auth?: any }, next: () => Promise<any>) => {
  const headersObject = CheckAuthorization(context.headers);

  if (headersObject.code === 400) {
    logger.error('Invalid token');
    return BadRequest('Invalid token', null); // ส่ง BadRequest response
  }

  // Set headersObject in context for future use
  context.auth = headersObject;

  return await handler(context, next);
};
