import { FastifyInstance } from 'fastify';
import { userRoutes, authRoutes } from './imports';
import { verifyJwt } from '../middlewares/verify-jwt';

export const routes = async (app: FastifyInstance) => {

  //? ============================== Users Routes ==============================
  app  .post('/users',                                   userRoutes.createUserController);
  app   .get('/users',       { onRequest: [verifyJwt] }, userRoutes.listUsersController);
  app   .get('/users/me',    { onRequest: [verifyJwt] }, userRoutes.profileUserController);
  app   .get('/users/:uuid', { onRequest: [verifyJwt] }, userRoutes.retrieveUserController);
  app   .put('/users/:uuid', { onRequest: [verifyJwt] }, userRoutes.updateUserController);
  app .patch('/users/:uuid', { onRequest: [verifyJwt] }, userRoutes.deleteUserController);
  app.delete('/users/:uuid', { onRequest: [verifyJwt] }, userRoutes.destroyUserController);

  //? ============================== Auth Routes ===============================
  app.post('/auth/login', authRoutes.authLoginController);
}
