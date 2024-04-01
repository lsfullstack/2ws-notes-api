import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaUsersRepository } from '../../../repositories/prisma/users.repository';
import { EmailAlreadyExistsError } from '../../../errors/email-already-exists.error';
import { RetrieveUserService } from '../../../services/users/retrieve-user.service';
import { ResourceNotFoundError } from '../../../errors/resource-not-foun.error';

export const retrieveUserController = async (
  request: FastifyRequest, 
  reply: FastifyReply
) => {
  const { uuid } = request.params as { uuid: string };

  const prismaUserRepository = new PrismaUsersRepository();

  const retrieveUserService = new RetrieveUserService(prismaUserRepository);

  try {
    const user = await retrieveUserService.execute(uuid);

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
