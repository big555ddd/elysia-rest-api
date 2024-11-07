import { Elysia } from 'elysia';
import { getAllPermissions, createPermission,setPermission} from './permission.services';
import { CheckAuthorization } from '../../middleware/middleware';
import type {SetPermissionDTO } from './permission.dto';
import { Success, BadRequest } from '../../base/response';
import setupLogger from '../../../internal/utils/logger'; // นำเข้า logger

const logger = setupLogger(); // สร้าง logger

const permissionlist = [
  {
    id: 1,
    name: 'Create',
    description: 'Create',
    is_actived: true,
  },
  {
    id: 2,
    name: 'Read',
    description: 'Read',
    is_actived: true,
  },
  {
    id: 3,
    name: 'Update',
    description: 'Update',
    is_actived: true,
  },
  {
    id: 4,
    name: 'Delete',
    description: 'Delete',
    is_actived: true,
  },
];


const permissionController = new Elysia()
  .get('list', async () => {
    try {
      // รับform กับsize จาก query string
      const permission = await getAllPermissions();
      console.log("permission", permission);
      return Success(permission.permission,);
    } catch (err) {
      logger.error('Error fetching permission:', err);
      return BadRequest((err as Error).message, null);
    }
  })
  .post('create', async () => {
    try {
      // ใช้ permissionlist แทน body ในการสร้าง permissions หลายรายการ
      const createdPermissions = await Promise.all(
        permissionlist.map((permission) => createPermission(permission))
      );

      console.log('Permissions created:', createdPermissions);
      return Success(createdPermissions);
    } catch (err) {
      logger.error('Error creating new Permission:', err);
      return BadRequest((err as Error).message, null);
    }
  })
  .post('set', async ({ body}) => {
    try {
      const data = body as SetPermissionDTO;
      const newPermission = await setPermission(data);
      console.log('New Permission created:', newPermission);
      return Success(newPermission);
    } catch (err) {
      logger.error('Error creating new Permission:', err);
      return BadRequest((err as Error).message, null);
    }
  });
  

export default permissionController;