import { Elysia } from 'elysia';
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from './role.services';
import { CheckAuthorization } from '../../middleware/middleware';
import { permissionMiddleware } from '../../middleware/authMiddleware';
import type { CreateRoleDTO, Params, UpdateRoleDTO } from './role.dto';
import { Success, BadRequest, Paginate, Unauthorized } from '../../base/response';
import setupLogger from '../../../internal/utils/logger'; // นำเข้า logger

const logger = setupLogger(); // สร้าง logger

const roleController = new Elysia()
  .get('list', async (context) => {
    try {
      const hasPermission = await permissionMiddleware(context as any, 2);
      if (!hasPermission) return Unauthorized('Permission denied', null);

      const { query } = context;
      const {
        form = 0,
        size = 10,
        search = '',
      } = query as Params;

      const roles = await getAllRoles(form, size, search);
      console.log("roles", roles);
      return Paginate(roles.data, roles.skip, roles.take, roles.count);
    } catch (err) {
      logger.error('Error fetching roles:', err);
      return BadRequest((err as Error).message, null);
    }
  })
  .get(':id', async (context) => {
    const { params } = context;
    try {
      const hasPermission = await permissionMiddleware(context as any, 2);
      if (!hasPermission) return Unauthorized('Permission denied', null);

      logger.info(`Fetching role by ID: ${params.id}`);
      const role = await getRoleById(Number(params.id));
      if (!role) {
        logger.warn(`role not found with ID: ${params.id}`);
        return BadRequest('role not found', null);
      }
      console.log('role fetched:', role);  // ใช้ stringifyWithBigInt
      return Success(role);
    } catch (err) {
      logger.error(`Error fetching role by ID: ${params.id}`, err);
      return BadRequest((err as Error).message, null);
    }
  })
  .post('create', async (context) => {
    try {
      const hasPermission = await permissionMiddleware(context as any, 1);
      if (!hasPermission) return Unauthorized('Permission denied', null);

      const { body } = context;
      const data = body as CreateRoleDTO;
      const newrole = await createRole(data);
      console.log('New role created:', newrole);
      return Success(newrole);
    } catch (err) {
      logger.error('Error creating new role:', err);
      return BadRequest((err as Error).message, null);
    }
  })
  .patch(':id', async (context) => {
    const { params } = context;
    try {
      const hasPermission = await permissionMiddleware(context as any, 3);
      if (!hasPermission) return Unauthorized('Permission denied', null);

      const { params, body } = context;
      const data = body as UpdateRoleDTO;
      const updatedrole = await updateRole(Number(params.id), data);
      console.log('role updated:', updatedrole);
      return Success(updatedrole);
    } catch (err) {
      logger.error(`Error updating role with ID: ${params.id}`, err);
      return BadRequest((err as Error).message, null);
    }
  })
  .delete(':id', async (context) => {
    const { params } = context;
    try {
      const hasPermission = await permissionMiddleware(context as any, 4);
      if (!hasPermission) return Unauthorized('Permission denied', null);

      const { params } = context;
      const deletedrole = await deleteRole(Number(params.id));
      console.log('role deleted:', deletedrole);
      return Success(deletedrole);
    } catch (err) {
      logger.error(`Error deleting role with ID: ${params.id}`, err);
      return BadRequest((err as Error).message, null);
    }
  });

export default roleController;