import { type Context } from 'elysia';
import { getAllPermissions, createPermission,setPermission} from './permission.services';
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

export async function ListPermission(context:Context) {
        try {
          const permission = await getAllPermissions();
          console.log("permission", permission);
          return Success(permission.permission,);
        } catch (err) {
          logger.error('Error fetching permission:', err);
          return BadRequest((err as Error).message, null);
        }
}

export async function CreatePermission(context: Context) {
  try {
    const createdPermissions = await Promise.all(
      permissionlist.map(async (permission) => {
        try {
          // Attempt to create each permission and return the result
          return await createPermission(permission);
        } catch (error) {
          // Log the error for this specific permission and continue
          logger.error(`Error creating permission ${permission.name}:`, error);
          return null; // or some marker to indicate this permission failed
        }
      })
    );

    // Filter out any failed creations (if you used `null` as a marker for failed ones)
    const successfulCreations = createdPermissions.filter((p) => p !== null);

    console.log('Permissions created:', successfulCreations);
    return Success(successfulCreations);
  } catch (err) {
    logger.error('Error creating new Permission:', err);
    return BadRequest((err as Error).message, null);
  }
}


export async function SetPermission(context:Context) {
  try {
    const body = context.body || JSON.parse(await context.request.text());

    const data = body as SetPermissionDTO;
    const newPermission = await setPermission(data);
    console.log('New Permission created:', newPermission);
    return Success(newPermission);
  } catch (err) {
    logger.error('Error creating new Permission:', err);
    return BadRequest((err as Error).message, null);
  }
}