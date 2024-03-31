import { FastifyInstance } from "fastify";

// Users Controllers
import { createUserController } from "./controllers/users/create-user.controller";

export const routes = async (app: FastifyInstance) => {

  //? ============================== Users Routes ==============================
  app.post('/users', createUserController)
}