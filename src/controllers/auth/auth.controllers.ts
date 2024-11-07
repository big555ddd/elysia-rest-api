import { Elysia } from 'elysia';
import { login } from './auth.services';
import { Success, BadRequest } from '../../base/response'; // นำเข้า response functions

import type { LoginDTO } from './auth.dto'; // นำเข้า DTO
import type { CreateUserDTO } from '../user/user.dto';
import { createUser } from '../user/user.services';
import setupLogger from '../../../internal/utils/logger'; // นำเข้า logger

const logger = setupLogger(); // สร้าง logger

const authController = new Elysia()
  .post('/login', async ({ body }) => {
    const data = body as LoginDTO; // ตรวจสอบว่า body ที่ได้รับเป็น LoginDTO

    const { username, password } = data;

    try {
      // เรียกใช้ฟังก์ชัน login
      const result = await login(username, password);
      return Success(result); // ส่ง token เป็น JSON response แบบ Success
    } catch (err) {
      return BadRequest((err as Error).message, null); // ส่ง error response แบบ BadRequest
    }
  })
  .post('create', async ({ body}) => {
    try {
      const data = body as CreateUserDTO;
      const newUser = await createUser(data);
      console.log('New user created:', newUser);
      return Success(newUser);
    } catch (err) {
      logger.error('Error creating new user:', err);
      return BadRequest((err as Error).message, null);
    }
  });
  

export default authController;
