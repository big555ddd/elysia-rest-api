import prisma from '../../../models/prismaClient';
import type { CreatePermissionDTO, SetPermissionDTO } from './permission.dto';
import { omitFields } from '../../../helpers/objectHelpers'; // นำเข้า helper function




// ดึงผู้ใช้ทั้งหมด โดยไม่ดึงข้อมูลที่ถูก soft delete (deleted_at != null)
export const getAllPermissions = async () => {

  const permission = await prisma.permission.findMany({
    orderBy: {
      id: 'asc',
    },
  });

  return { permission };
};



// ดึงผู้ใช้ตาม ID โดยไม่ดึงข้อมูลที่ถูก soft delete (deleted_at != null)
export const getPermissionById = async (id: number) => {

  const permission = await prisma.permission.findFirst({
    where: {
      id,
    },
  });
  return permission ? omitFields(permission, ['deleted_at']) : null; // ลบฟิลด์ password และ deleted_at
};

// สร้างผู้ใช้ใหม่
export const createPermission = async (data: CreatePermissionDTO) => {
  // ลบข้อมูลทั้งหมดในตาราง permission
  await prisma.permission.deleteMany();

  // เพิ่มข้อมูลหลายรายการในครั้งเดียวจาก data ที่เป็น array
  const newPermissions = await prisma.permission.createManyAndReturn({
    data: data,
  });

  return newPermissions;
};


// set permission
export const setPermission = async (data: SetPermissionDTO) => {
  const { role_id, permission_id } = data;

  if (!role_id || !permission_id) {
    throw new Error('role_id or permission_id is missing');
  }

  console.log("data", permission_id);
  console.log("role", role_id);

  await prisma.role_permission.deleteMany({
    where: {
      role_id: role_id,
    },
  });  
  // สร้างรายการข้อมูลสำหรับการ insert
  const rolePermissionsData = permission_id.map((permId) => ({
    role_id: role_id!,
    permission_id: permId,
  }));

  // เพิ่มข้อมูลทั้งหมดใน role_permission table ในครั้งเดียว
  const result = await prisma.role_permission.createManyAndReturn({
    data: rolePermissionsData,
    skipDuplicates: true, // ป้องกันการซ้ำซ้อน
  });

  return result;
};

