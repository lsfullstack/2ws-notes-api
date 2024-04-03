import { FastifyInstance } from 'fastify';

// Users Controllers
import { createUserController } from './controllers/users/create-user.controller';
import { listUsersController } from './controllers/users/list-users.controller';
import { retrieveUserController } from './controllers/users/retrieve-user.controller';
import { updateUserController } from './controllers/users/update-user.controller';

export const routes = async (app: FastifyInstance) => {

  //? ============================== Users Routes ==============================
  app.post('/users', createUserController);
  app.get('/users', listUsersController);
  app.get('/users/:uuid', retrieveUserController);
  app.put('/users/:uuid', updateUserController);
}
