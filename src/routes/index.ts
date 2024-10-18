import { Elysia } from 'elysia';
import userController from '../controllers/user/user.controllers';
import authController from '../controllers/auth/auth.controllers';
import { corsMiddleware } from '../middleware/middleware'; 
const routes = new Elysia();

// Apply CORS middleware globally
routes.use(corsMiddleware);

routes.get('/', () => 'Hello World!');
routes.get('/healthz', () => 'Healthy'); 

routes.group('/auth', (app) => {
  app.use(authController); 
  return app; 
});

routes.group('/users', (app) => {
  app.use(userController); 
  return app; 
});

export default routes;
