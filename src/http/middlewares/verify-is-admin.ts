import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaUsersRepository } from '../../repositories/prisma/users.repository';
import { RetrieveUserService } from '../../services/users/retrieve-user.service';
import { UnauthorizedError } from '../../errors/unauthorized.error';
import { ResourceNotFoundError } from '../../errors/resource-not-found.error';

export async function verifyIsAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sub: user_uuid } = request.user;

  const prismaUsersRepository = new PrismaUsersRepository();

  const retrieveUserService = new RetrieveUserService(prismaUsersRepository);

  try {
    const user = await retrieveUserService.execute(user_uuid);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    if (!user.is_admin) {
      throw new UnauthorizedError();
    }
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized' });
  }
}
