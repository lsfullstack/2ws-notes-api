import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaUsersRepository } from '../../../repositories/prisma/users.repository';
import { ResourceNotFoundError } from '../../../errors/resource-not-foun.error';
import { ProfileUserService } from '../../../services/users/profile-user.service';

export const profileUserController = async (
  request: FastifyRequest, 
  reply: FastifyReply,
) => {
  const prismaUserRepository = new PrismaUsersRepository();

  const profileUserService = new ProfileUserService(prismaUserRepository);

  try {
    const user = await profileUserService.execute({
      uuid: request.user.sub,
    });

    return reply.status(201).send({ user });

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    throw error;
  }
}
