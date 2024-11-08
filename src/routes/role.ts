import { Elysia, type Context } from 'elysia';
import { authMiddleware, permissionMiddleware } from '../middleware/authMiddleware';
import { CreateRole, DeleteRole, GetRoleById, ListRoles, UpdateRole } from '../controllers/role/role.controllers';
import { Unauthorized } from '../base/response';

const role = new Elysia();

role.group('/role', (app) => {
    app.onBeforeHandle(authMiddleware);
    
    app.get('/list', async (context) => {
        const hasPermission = await permissionMiddleware(context as any, 2);
        if (!hasPermission) return Unauthorized('Permission denied', null);
        return await ListRoles(context as Context);
    });
    
    app.get('/:id', async (context) => {
        const hasPermission = await permissionMiddleware(context as any, 2);
        if (!hasPermission) return Unauthorized('Permission denied', null);
        return await GetRoleById(context as Context);
    });
    
    app.post('/create', async (context) => {
        const hasPermission = await permissionMiddleware(context as any, 1);
        if (!hasPermission) return Unauthorized('Permission denied', null);
        return await CreateRole(context as Context);
    });
    
    app.patch('/:id', async (context) => {
        const hasPermission = await permissionMiddleware(context as any, 3);
        if (!hasPermission) return Unauthorized('Permission denied', null);
        return await UpdateRole(context as Context);
    });
    
    app.delete('/:id', async (context) => {
        const hasPermission = await permissionMiddleware(context as any, 4);
        if (!hasPermission) return Unauthorized('Permission denied', null);
        return await DeleteRole(context as Context);
    });

    return app;
});

export default role;
