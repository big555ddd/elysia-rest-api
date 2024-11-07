import cors from '@elysiajs/cors';
import { BadRequest, Unauthorized } from '../../src/base/response';
import { verifyToken } from '../../internal/utils/jwt';
import prisma from '../../models/prismaClient';


export const corsMiddleware = cors({
  origin: '*', 
});

export async function CheckAuthorization(headers: any) {
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

export async function CheckPermission(headers: any,permissionId: number) {
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
} else if (typeof decodedToken !== 'string' && 'id' in decodedToken) {
  // check permission
  const user = await prisma.user.findFirst({
      where: {
        id: decodedToken.id,
        deleted_at: null, 
      },
    });
  
  if (user) {
    const permission = await prisma.role_permission.findFirst({
      where: {
        role_id: user.role_id,
        permission_id: permissionId,
      },
    });
    if (permission) {
    } else {
      return Unauthorized('you do not have permission to do this', null);
    }

  } else {
    return Unauthorized('User not found or has been deleted.', null);
  }

} else {
  return BadRequest('Invalid token payload', null);
}


  return headersObject;
}
