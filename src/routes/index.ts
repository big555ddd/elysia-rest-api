import { Elysia } from 'elysia';
import userController from '../controllers/user/user.controllers';
import authController from '../controllers/auth/auth.controllers';
import { corsMiddleware } from '../middleware/middleware';
import { authMiddleware } from '../middleware/authMiddleware';
import roleController from '../controllers/role/role.controllers';
import permissionController from '../controllers/permission/permission.controllers';

const routes = new Elysia();

// Apply CORS middleware globally
routes.use(corsMiddleware);

// Public routes
routes.get('/', () => 'Hello World!');
routes.get('/healthz', () => 'Healthy');

// Authentication routes
routes.group('/auth', (app) => {
  app.use(authController);
  return app;
});

// User routes with authentication middleware
routes.group('/users', (app) => {
  app.onBeforeHandle(authMiddleware);
  app.use(userController);
  return app;
});

routes.group('/role', (app) => {
  app.onBeforeHandle(authMiddleware);
  app.use(roleController);
  return app;
});

routes.group('/permission', (app) => {
  app.onBeforeHandle(authMiddleware);
  app.use(permissionController);
  return app;
});

export default routes;
