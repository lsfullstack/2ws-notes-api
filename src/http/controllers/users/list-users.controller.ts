import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../../repositories/prisma/users.repository";
import { ListUsersService } from "../../../services/users/list-users.service";

export const listUsersController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const prismaUsersRepository = new PrismaUsersRepository();

  const listUsersService = new ListUsersService(prismaUsersRepository);

  const users = await listUsersService.execute();

  return reply.status(200).send({ users });
} 
