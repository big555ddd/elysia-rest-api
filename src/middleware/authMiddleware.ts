// middlewares/authMiddleware.ts
import { CheckAuthorization, CheckPermission } from './middleware';
import setupLogger from '../../internal/utils/logger';
import { BadRequest } from '../base/response';
import type { Context } from 'elysia';

const logger = setupLogger();

export const authMiddleware = async (context: Context) => {
  const headersObject = CheckAuthorization(context.headers);

  if ((await headersObject).code === 400) {
    logger.error('Invalid token');
    return BadRequest('Invalid token', null); // ส่ง BadRequest response
  }

  // Set headersObject in context for future use
  (context as any).auth = headersObject; // ใช้ `as any` เพื่อเพิ่ม auth ใน context
};

export const permissionMiddleware = async (context: Context, permissionId: number) => {
  const headersObject = await CheckPermission(context.headers, permissionId);

  if (headersObject.code === 400) {
    logger.error('Invalid token');
    return false;
  }

  if (headersObject.code === 401) {
    logger.error('Permission denied');
    return false;
  }

  // Set headersObject in context for future use
  (context as any).auth = headersObject; 
  return true;
};
