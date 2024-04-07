import { InvalidCredentialsError } from '../../../errors/invalid-credentials.error';
import { authLoginSchema } from '../../validations/auth/auth-login.schema';
import { PrismaUsersRepository } from '../../../repositories/prisma/users.repository';
import { AuthLoginService } from '../../../services/auth/auth-login.service';
import { FastifyReply, FastifyRequest } from 'fastify';

export const authLoginController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {

  const data = authLoginSchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authLoginService = new AuthLoginService(prismaUsersRepository);

    const { user } = await authLoginService.execute(data);

    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.uuid,
      },
    });

    return reply.status(200).send({
      token,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
