import { FastifyInstance } from "fastify";

// Users Controllers
import { createUserController } from "./controllers/users/create-user.controller";
import { listUsersController } from "./controllers/users/list-users.controller";

export const routes = async (app: FastifyInstance) => {

  //? ============================== Users Routes ==============================
  app.post('/users', createUserController);
  app.get('/users', listUsersController);
}
