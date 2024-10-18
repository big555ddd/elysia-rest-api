import { Elysia } from 'elysia';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from './user.services';
import { CheckAuthorization } from '../../../helpers/objectHelpers';
import type { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { Success, BadRequest } from '../../base/response';
import setupLogger from '../../../internal/utils/logger'; // นำเข้า logger

const logger = setupLogger(); // สร้าง logger

const userController = new Elysia()
  .get('list', async ({ headers }) => {
    try {
      // ใช้ฟังก์ชัน Helper สำหรับแปลง headers และตรวจสอบ Authorization
      const headersObject = CheckAuthorization(headers);

      // ตรวจสอบว่า headersObject เป็น BadRequest หรือไม่
      if (headersObject.code === 400) {
        logger.error('Invalid token');
        return headersObject;
      }

      logger.info('Fetching all users...');
      const users = await getAllUsers();
      console.log("users", users);
      return Success(users);
    } catch (err) {
      logger.error('Error fetching users:', err);
      return BadRequest((err as Error).message, null);
    }
  })
  .get(':id', async ({ params, headers }) => {
    try {
      logger.info(`Fetching user by ID: ${params.id}`);

      // ใช้ฟังก์ชัน Helper สำหรับแปลง headers และตรวจสอบ Authorization
      const headersObject = CheckAuthorization(headers);

      // ตรวจสอบว่า headersObject เป็น BadRequest หรือไม่
      if (headersObject.code === 400) {
        return headersObject;
      }

      const user = await getUserById(Number(params.id));
      if (!user) {
        logger.warn(`User not found with ID: ${params.id}`);
        return BadRequest('User not found', null);
      }
      console.log('User fetched:', user);  // ใช้ stringifyWithBigInt
      return Success(user);
    } catch (err) {
      logger.error(`Error fetching user by ID: ${params.id}`, err);
      return BadRequest((err as Error).message, null);
    }
  })
  .post('create', async ({ body, headers }) => {
    try {
      // ใช้ฟังก์ชัน Helper สำหรับแปลง headers และตรวจสอบ Authorization
      const headersObject = CheckAuthorization(headers);

      // ตรวจสอบว่า headersObject เป็น BadRequest หรือไม่
      if (headersObject.code === 400) {
        return headersObject;
      }

      const data = body as CreateUserDTO;
      const newUser = await createUser(data);
      console.log('New user created:', newUser);
      return Success(newUser);
    } catch (err) {
      logger.error('Error creating new user:', err);
      return BadRequest((err as Error).message, null);
    }
  })
  .patch(':id', async ({ params, body, headers }) => {
    try {
      // ใช้ฟังก์ชัน Helper สำหรับแปลง headers และตรวจสอบ Authorization
      const headersObject = CheckAuthorization(headers);

      // ตรวจสอบว่า headersObject เป็น BadRequest หรือไม่
      if (headersObject.code === 400) {
        return headersObject;
      }

      const data = body as UpdateUserDTO;
      const updatedUser = await updateUser(Number(params.id), data);
      console.log('User updated:', updatedUser);
      return Success(updatedUser);
    } catch (err) {
      logger.error(`Error updating user with ID: ${params.id}`, err);
      return BadRequest((err as Error).message, null);
    }
  })
  .delete(':id', async ({ params, headers }) => {
    try {
      // ใช้ฟังก์ชัน Helper สำหรับแปลง headers และตรวจสอบ Authorization
      const headersObject = CheckAuthorization(headers);

      // ตรวจสอบว่า headersObject เป็น BadRequest หรือไม่
      if (headersObject.code === 400) {
        return headersObject;
      }

      const deletedUser = await deleteUser(Number(params.id));
      console.log('User deleted:', deletedUser);
      return Success(deletedUser);
    } catch (err) {
      logger.error(`Error deleting user with ID: ${params.id}`, err);
      return BadRequest((err as Error).message, null);
    }
  });

export default userController;