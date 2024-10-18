import { BadRequest } from '../src/base/response';
import { verifyToken } from '../internal/utils/jwt';

export function stringifyWithBigInt(obj: any) {
  return JSON.stringify(obj, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value // แปลง BigInt เป็น string
  );
}

// Helper function to omit specific fields from an object
export const omitFields = (data: any, fields: string[]) => {
  if (Array.isArray(data)) {
    return data.map((item) => {
      const newItem = { ...item };
      fields.forEach((field) => delete newItem[field]); // ลบฟิลด์ที่ต้องการออกจาก object
      return newItem;
    });
  } else {
    const newItem = { ...data };
    fields.forEach((field) => delete newItem[field]); // ลบฟิลด์ที่ต้องการออกจาก object
    return newItem;
  }
};

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
