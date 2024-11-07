import { Elysia } from 'elysia';
import userController from '../controllers/user/user.controllers';
import authController from '../controllers/auth/auth.controllers';
import { corsMiddleware } from '../middleware/middleware';
import { authMiddleware } from '../middleware/authMiddleware';

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
  app.onBeforeHandle(authMiddleware); // Apply authMiddleware to all /users routes
  app.use(userController);
  return app;
});

export default routes;
