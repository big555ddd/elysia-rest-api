import { Elysia } from 'elysia';
import authController from '../controllers/auth/auth.controllers';
import { corsMiddleware } from '../middleware/middleware';
import role from './role';
import user from './user';
import permission from './permission';

const app = new Elysia();

// Public routes
app.get('/', () => 'Hello World!');
app.get('/healthz', () => 'Healthy');

// Authentication routes
app.group('/auth', (app) => {
  app.use(authController);
  return app;
});

// Other routes
app.use(user);
app.use(role);
app.use(permission);

export default app;