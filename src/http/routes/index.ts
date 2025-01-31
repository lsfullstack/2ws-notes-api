import { FastifyInstance } from 'fastify';
import { userRoutes, authRoutes, notesRoutes } from './imports';
import { verifyJwt } from '../middlewares/verify-jwt';
import { verifyIsAdmin } from '../middlewares/verify-is-admin';

export const routes = async (app: FastifyInstance) => {

  //? ============================== Users Routes ==============================
  app.post('/users', userRoutes.createUserController);
  app.get('/users', { onRequest: [verifyJwt, verifyIsAdmin] }, userRoutes.listUsersController);
  app.get('/users/me', { onRequest: [verifyJwt] }, userRoutes.profileUserController);
  app.get('/users/:uuid', { onRequest: [verifyJwt, verifyIsAdmin] }, userRoutes.retrieveUserController);
  app.put('/users/:uuid', { onRequest: [verifyJwt] }, userRoutes.updateUserController);
  app.patch('/users/:uuid', { onRequest: [verifyJwt] }, userRoutes.deleteUserController);
  app.delete('/users/:uuid', { onRequest: [verifyJwt] }, userRoutes.destroyUserController);

  //? ============================== Auth Routes ===============================
  app.post('/auth/login', authRoutes.authLoginController);

  //? ============================= Notess Routes ==============================
  app.post('/notes', { onRequest: [verifyJwt] }, notesRoutes.createNoteController);
  app.get('/notes', { onRequest: [verifyJwt] }, notesRoutes.listNotesController);
  app.get('/notes/:uuid', { onRequest: [verifyJwt] }, notesRoutes.retrieveNoteController);
  app.put('/notes/:uuid', { onRequest: [verifyJwt] }, notesRoutes.updateNoteController);
  app.patch('/notes/:uuid', { onRequest: [verifyJwt] }, notesRoutes.deleteNoteController);
  app.patch('/notes/:uuid/restore', { onRequest: [verifyJwt] }, notesRoutes.restoreNoteController);
  app.delete('/notes/:uuid', { onRequest: [verifyJwt] }, notesRoutes.destroyNoteController);
}
