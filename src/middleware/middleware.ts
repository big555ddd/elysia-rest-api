import cors from '@elysiajs/cors';
import { BadRequest } from '../../src/base/response';
import { verifyToken } from '../../internal/utils/jwt';


export const corsMiddleware = cors({
  origin: '*', 
});

export function CheckAuthorization(headers: any) {
  // สร้าง object ของ headers จาก headers ที่ได้รับ
  const headersObject: Record<string, string | null> = {};
  Object.entries(headers || {}).forEach(([key, value]) => {
    headersObject[key] = value as string;
  });
  
  // ตรวจสอบ Authorization header
  if (!headersObject.authorization) {
    return BadRequest('Authorization header is require', null);
  }

const token = headersObject.authorization!.split(' ')[1];

// ตรวจสอบ JWT token
const decodedToken = verifyToken(token);
if (!decodedToken) {
  return BadRequest('Invalid token', null);
}

  return headersObject;
}
