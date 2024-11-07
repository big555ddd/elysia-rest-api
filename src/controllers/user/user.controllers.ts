import { Elysia } from 'elysia';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from './user.services';
import { CheckAuthorization } from '../../middleware/middleware';
import type { CreateUserDTO, Params, UpdateUserDTO } from './user.dto';
import { Success, BadRequest, Paginate } from '../../base/response';
import setupLogger from '../../../internal/utils/logger'; // นำเข้า logger

const logger = setupLogger(); // สร้าง logger

const userController = new Elysia()
  .get('list', async ({ query }) => {
    try {
      // รับform กับsize จาก query string
      const {
        form = 0,
        size = 10,
        search = '',
      } = query as Params;
    
      const users = await getAllUsers(form, size, search);
      console.log("users", users);
      return Paginate(users.data, users.skip,users.take,users.count);
    } catch (err) {
      logger.error('Error fetching users:', err);
      return BadRequest((err as Error).message, null);
    }
  })
  .get(':id', async ({ params }) => {
    try {
      logger.info(`Fetching user by ID: ${params.id}`);
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
  })
  .patch(':id', async ({ params, body, headers }) => {
    try {
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
      const deletedUser = await deleteUser(Number(params.id));
      console.log('User deleted:', deletedUser);
      return Success(deletedUser);
    } catch (err) {
      logger.error(`Error deleting user with ID: ${params.id}`, err);
      return BadRequest((err as Error).message, null);
    }
  });

export default userController;