import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// เพิ่ม Middleware เข้าไป
prisma.$use(async (params, next) => {
  if (params.model === 'user') {
    const now = Math.floor(Date.now() / 1000); // Unix timestamp (วินาที)

    // เมื่อสร้าง user
    if (params.action === 'create') {
      params.args.data.created_at = now;
      params.args.data.updated_at = now;
    }

    // เมื่ออัปเดต user
    if (params.action === 'update') {
      params.args.data.updated_at = now;
    }

    // เมื่อทำการลบ (soft delete)
    if (params.action === 'delete') {
      params.action = 'update'; // แทนที่จะลบ เราใช้ soft delete
      params.args.data.deleted_at = now;
    }
  }

  // เรียกฟังก์ชันถัดไป
  return next(params);
});

export default prisma;
