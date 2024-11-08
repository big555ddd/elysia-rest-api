// main.routes.ts
import { Elysia, type Context } from 'elysia';
import authController from '../controllers/auth/auth.controllers';
import { corsMiddleware } from '../middleware/middleware';
import role from './role';
import user from './user';
import permission from './permission';

const routes = new Elysia();
const app = new Elysia();

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


routes.use(user);
routes.use(role);
routes.use(permission)

export default routes;
