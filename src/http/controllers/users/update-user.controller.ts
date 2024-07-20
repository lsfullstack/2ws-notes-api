import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaUsersRepository } from '../../../repositories/prisma/users.repository';
import { UpdateUserService } from '../../../services/users/update-user.service';
import { updateUserSchema } from '../../validations/users/update-user.schema';
import { ResourceNotFoundError } from '../../../errors/resource-not-found.error';

export const updateUserController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    name,
    email,
  } = updateUserSchema.parse(request.body);

  const { uuid } = request.params as { uuid: string };

  const prismaUserRepository = new PrismaUsersRepository();

  const updateUserService = new UpdateUserService(prismaUserRepository);

  try {
    await updateUserService.execute(
      uuid,
      {
        name,
        email,
      }
    );

    return reply.status(201).send();

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    throw error;
  }
}
