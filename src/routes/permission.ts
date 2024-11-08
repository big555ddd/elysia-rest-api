import { Elysia, type Context } from 'elysia';
import { authMiddleware, permissionMiddleware } from '../middleware/authMiddleware';
import { Unauthorized } from '../base/response';
import { CreatePermission, ListPermission, SetPermission } from '../controllers/permission/permission.controllers';


const permission = new Elysia();

permission.group('/permission', (app) => {
    app.onBeforeHandle(authMiddleware);

    app.get('/list', async (context) => {
        const hasPermission = await permissionMiddleware(context as any, 2);
        if (!hasPermission) return Unauthorized('Permission denied', null);
        return await ListPermission(context as Context);
    });

    app.post('/create', async (context) => {
        const hasPermission = await permissionMiddleware(context as any, 1);
        if (!hasPermission) return Unauthorized('Permission denied', null);
        return await CreatePermission(context as Context);
    });

    app.post('/set', async (context) => {
        const hasPermission = await permissionMiddleware(context as any, 1);
        if (!hasPermission) return Unauthorized('Permission denied', null);
        return await SetPermission(context as Context);
    });

    return app;
});

export default permission;