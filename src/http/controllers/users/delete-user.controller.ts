import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaUsersRepository } from '../../../repositories/prisma/users.repository';
import { ResourceNotFoundError } from '../../../errors/resource-not-found.error';
import { DeleteUserService } from '../../../services/users/delete-user.service';

export const deleteUserController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { uuid } = request.params as { uuid: string };

  const prismaUserRepository = new PrismaUsersRepository();

  const deleteUserService = new DeleteUserService(prismaUserRepository);

  try {
    await deleteUserService.execute(uuid);

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    throw error;
  }
}
