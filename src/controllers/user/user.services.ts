import prisma from '../../../models/prismaClient';
import type { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { hashPassword } from '../../../internal/utils/hashing'; // นำเข้าฟังก์ชัน hashing
import { omitFields } from '../../../helpers/objectHelpers'; // นำเข้า helper function

// ดึงผู้ใช้ทั้งหมด โดยไม่ดึงข้อมูลที่ถูก soft delete (deleted_at != null)
export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      deleted_at: null, 
    },
  });
  return omitFields(users, ['password', 'deleted_at']); // ลบฟิลด์ password และ deleted_at
};

// ดึงผู้ใช้ตาม ID โดยไม่ดึงข้อมูลที่ถูก soft delete (deleted_at != null)
export const getUserById = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
      deleted_at: null, 
    },
  });
  return user ? omitFields(user, ['password', 'deleted_at']) : null; // ลบฟิลด์ password และ deleted_at
};

// สร้างผู้ใช้ใหม่
export const createUser = async (data: CreateUserDTO) => {
  const now = Math.floor(Date.now() / 1000); // Unix timestamp
  
  // Hash password โดยใช้ฟังก์ชันที่นำเข้ามา
  const hashedPassword = await hashPassword(data.password);

  const newUser = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword, // เก็บ password ที่ถูก hash
      created_at: now,
      updated_at: now,
    },
  });

  return omitFields(newUser, ['password', 'deleted_at']); // ลบฟิลด์ password และ deleted_at
};

// อัปเดตผู้ใช้
export const updateUser = async (id: number, data: UpdateUserDTO) => {
  const now = Math.floor(Date.now() / 1000); // Unix timestamp

  // ตรวจสอบว่าผู้ใช้นี้ไม่ได้ถูก soft delete (deleted_at == null)
  const user = await prisma.user.findFirst({
    where: {
      id,
      deleted_at: null, // ตรวจสอบว่าผู้ใช้ไม่ได้ถูก soft delete
    },
  });

  if (!user) {
    throw new Error('User not found or has been deleted'); // ส่ง error หากผู้ใช้ถูก soft delete
  }

  let updateData = { ...data, updated_at: now };

  // ถ้ามีการส่ง password มา ต้องทำการ hash ก่อนอัปเดต
  if (data.password) {
    const hashedPassword = await hashPassword(data.password);
    updateData = { ...updateData, password: hashedPassword };
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  return omitFields(updatedUser, ['password', 'deleted_at']); // ลบฟิลด์ password และ deleted_at
};

// ลบผู้ใช้แบบ soft delete
export const deleteUser = async (id: number) => {
  const now = Math.floor(Date.now() / 1000); // Unix timestamp
  const deletedUser = await prisma.user.update({
    where: { id },
    data: { deleted_at: now }, // Soft delete by setting deleted_at to current timestamp
  });

  return omitFields(deletedUser, ['password', 'deleted_at']); // ลบฟิลด์ password และ deleted_at
};