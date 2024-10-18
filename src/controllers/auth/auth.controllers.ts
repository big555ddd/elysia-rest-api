import { Elysia } from 'elysia';
import { login } from './auth.services';
import { Success, BadRequest } from '../../base/response'; // นำเข้า response functions
import type { LoginDTO } from './auth.dto'; // นำเข้า DTO

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
  });

export default authController;
