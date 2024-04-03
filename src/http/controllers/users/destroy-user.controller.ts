import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaUsersRepository } from '../../../repositories/prisma/users.repository';
import { ResourceNotFoundError } from '../../../errors/resource-not-foun.error';
import { DestroyUserService } from '../../../services/users/destroy-user.service';

export const destroyUserController = async (
  request: FastifyRequest, 
  reply: FastifyReply
) => {
  const { uuid } = request.params as { uuid: string };

  const prismaUserRepository = new PrismaUsersRepository();

  const destroyUserService = new DestroyUserService(prismaUserRepository);

  try {
    await destroyUserService.execute(uuid);

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    throw error;
  }
}
