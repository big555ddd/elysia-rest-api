import { Elysia, type Context } from 'elysia';
import { authMiddleware, permissionMiddleware } from '../middleware/authMiddleware';
import { Unauthorized } from '../base/response';
import { CreateUser, DeleteUser, GetUserById, ListUsers, UpdateUser } from '../controllers/user/user.controllers';


const user = new Elysia();

user.group('/users', (app) => {
    app.onBeforeHandle(authMiddleware);
    
    app.get('/list', async (context) => {
        // const hasPermission = await permissionMiddleware(context as any, 2);
        // if (!hasPermission) return Unauthorized('Permission denied', null);
        return await ListUsers(context as Context);
    });
    
    app.get('/:id', async (context) => {
        const hasPermission = await permissionMiddleware(context as any, 2);
        if (!hasPermission) return Unauthorized('Permission denied', null);
        return await GetUserById(context as Context);
    });
    
    app.post('/create', async (context) => {
        const hasPermission = await permissionMiddleware(context as any, 1);
        if (!hasPermission) return Unauthorized('Permission denied', null);
        return await CreateUser(context as Context);
    });
    
    app.patch('/:id', async (context) => {
        const hasPermission = await permissionMiddleware(context as any, 3);
        if (!hasPermission) return Unauthorized('Permission denied', null);
        return await UpdateUser(context as Context);
    });
    
    app.delete('/:id', async (context) => {
        const hasPermission = await permissionMiddleware(context as any, 4);
        if (!hasPermission) return Unauthorized('Permission denied', null);
        return await DeleteUser(context as Context);
    });

    return app;
});

export default user;
