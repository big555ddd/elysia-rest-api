import {type Context } from 'elysia';
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from './role.services';
import { permissionMiddleware } from '../../middleware/authMiddleware';
import type { CreateRoleDTO, Params, UpdateRoleDTO } from './role.dto';
import { Success, BadRequest, Paginate, Unauthorized } from '../../base/response';
import setupLogger from '../../../internal/utils/logger'; // นำเข้า logger

const logger = setupLogger(); // สร้าง logger

// const roleController = new Elysia()
export async function ListRoles(context: Context) {
  try {
    const query = context.query as Params || {};
    const {
      form = 0,
      size = 10,
      search = '',
    } = query;

    const roles = await getAllRoles(form, size, search);
    console.log("roles", roles);
    return Paginate(roles.data, form, size, roles.count);
  } catch (err) {
    logger.error('Error fetching roles:', err);
    return BadRequest((err as Error).message, null);
  }
}

export async function GetRoleById(context: Context) {
  const params = context.params || {};
  try {
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
}

export async function CreateRole(context: Context) {
  try {
      // Parse the body if it's not automatically parsed
      const body = context.body || JSON.parse(await context.request.text());

      const data = body as CreateRoleDTO;
      const newrole = await createRole(data);
      console.log('New role created:', newrole);

      return Success(newrole);
  } catch (err) {
      logger.error('Error creating new role:', err);
      return BadRequest((err as Error).message, null);
  }
}

export async function UpdateRole(context: Context) {
  const params = context.params || {};

  try {
      // Parse the body if it's not automatically parsed
      const body = context.body || JSON.parse(await context.request.text());

      const data = body as UpdateRoleDTO;
      const updatedrole = await updateRole(Number(params.id), data);
      console.log('role updated:', updatedrole);

      return Success(updatedrole);
  } catch (err) {
      logger.error(`Error updating role with ID: ${params.id}`, err);
      return BadRequest((err as Error).message, null);
  }
}

export async function DeleteRole(context: Context) {
  const params = context.params || {};

  try {
      const hasPermission = await permissionMiddleware(context as any, 4);
      if (!hasPermission) return Unauthorized('Permission denied', null);

      const deletedrole = await deleteRole(Number(params.id));
      console.log('role deleted:', deletedrole);

      return Success(deletedrole);
  } catch (err) {
      logger.error(`Error deleting role with ID: ${params.id}`, err);
      return BadRequest((err as Error).message, null);
  }
}

// export default roleController;