import prisma from '../../../models/prismaClient';
import type { CreateRoleDTO, UpdateRoleDTO } from './role.dto';
import { hashPassword } from '../../../internal/utils/hashing'; // นำเข้าฟังก์ชัน hashing
import { omitFields } from '../../../helpers/objectHelpers'; // นำเข้า helper function




// ดึงผู้ใช้ทั้งหมด โดยไม่ดึงข้อมูลที่ถูก soft delete (deleted_at != null)
export const getAllRoles = async (form: number, size: number, search: string) => {
  const skip = parseInt(form.toString(), 10);
  const take = parseInt(size.toString(), 10);

  console.log("skip", skip);
  

  const whereClause: any = {
    deleted_at: null,
    ...(search && {
      first_name: {
        contains: search,
        mode: 'insensitive',
      },
    }),
  };

  // Fetch Role with conditions, pagination, and include role name
  const Role = await prisma.role.findMany({
    where: whereClause,
    skip: skip,
    take: take,
  });

  // Count total Role matching the conditions
  const count = await prisma.role.count({
    where: whereClause,
  });

  // Omit sensitive fields before returning
  const data = Role.map(role => omitFields(role, ['password', 'deleted_at']));
  return { data, count, skip, take };
};
  


// ดึงผู้ใช้ตาม ID โดยไม่ดึงข้อมูลที่ถูก soft delete (deleted_at != null)
export const getRoleById = async (id: number) => {
  
  const role = await prisma.role.findFirst({
    where: {
      id,
      deleted_at: null, 
    },
  });
  return role ? omitFields(role, ['deleted_at']) : null; // ลบฟิลด์ password และ deleted_at
};

// สร้างผู้ใช้ใหม่
export const createRole = async (data: CreateRoleDTO) => {
  const now = Math.floor(Date.now() / 1000); // Unix timestamp


  const newrole = await prisma.role.create({
    data: {
      ...data,
      created_at: now,
      updated_at: now,
    },
  });

  return omitFields(newrole, ['password', 'deleted_at']); // ลบฟิลด์ password และ deleted_at
};

// อัปเดตผู้ใช้
export const updateRole = async (id: number, data: UpdateRoleDTO) => {
  const now = Math.floor(Date.now() / 1000); // Unix timestamp

  // ตรวจสอบว่าผู้ใช้นี้ไม่ได้ถูก soft delete (deleted_at == null)
  const role = await prisma.role.findFirst({
    where: {
      id,
      deleted_at: null, // ตรวจสอบว่าผู้ใช้ไม่ได้ถูก soft delete
    },
  });

  if (!role) {
    throw new Error('role not found or has been deleted'); // ส่ง error หากผู้ใช้ถูก soft delete
  }

  let updateData = { ...data, updated_at: now };


  const updatedrole = await prisma.role.update({
    where: { id },
    data: updateData,
  });

  return omitFields(updatedrole, ['deleted_at']); // ลบฟิลด์ password และ deleted_at
};

// ลบผู้ใช้แบบ soft delete
export const deleteRole = async (id: number) => {
  const now = Math.floor(Date.now() / 1000); // Unix timestamp
  const deletedrole = await prisma.role.update({
    where: { id },
    data: { deleted_at: now }, // Soft delete by setting deleted_at to current timestamp
  });

  return omitFields(deletedrole, ['password', 'deleted_at']); // ลบฟิลด์ password และ deleted_at
};
