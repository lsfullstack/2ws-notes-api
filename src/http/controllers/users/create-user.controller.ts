import { FastifyReply, FastifyRequest } from 'fastify';
import { createUserSchema } from '../../validations/users/create-user.schema';
import { PrismaUsersRepository } from '../../../repositories/prisma/users.repository';
import { CreateUserService } from '../../../services/users/create-user.service';
import { EmailAlreadyExistsError } from '../../../errors/email-already-exists.error';

export const createUserController = async (
  request: FastifyRequest, 
  reply: FastifyReply
) => {
  const {
    name,
    email,
    password,
    is_admin
  } = createUserSchema.parse(request.body);

  const prismaUserRepository = new PrismaUsersRepository();

  const createUserService = new CreateUserService(prismaUserRepository);

  try {
    await createUserService.execute({
      name,
      email,
      password,
      is_admin,
    });

    return reply.status(201).send();

  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }

    throw error;
  }
}
