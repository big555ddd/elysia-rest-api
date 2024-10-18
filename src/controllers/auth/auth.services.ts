import prisma from '../../../models/prismaClient';
import { comparePassword } from '../../../internal/utils/hashing'; // สำหรับตรวจสอบรหัสผ่าน
import { createToken } from '../../../internal/utils/jwt'; // สำหรับสร้าง JWT token

export const login = async (username: string, password: string) => {
  // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
  const user = await prisma.user.findUnique({
    where: { username },
  });

  // ถ้าไม่เจอผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
  if (!user || !(await comparePassword(password, user.password))) {
    throw new Error('Invalid username or password');
  }

  // สร้าง token โดยใช้ฟังก์ชัน createToken
  const token = createToken({ id: user.id, username: user.username });

  return { token };
};
