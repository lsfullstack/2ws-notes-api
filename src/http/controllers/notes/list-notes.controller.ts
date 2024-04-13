import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaNotesRepository } from '../../../repositories/prisma/notes.repository';
import { ListNotesService } from '../../../services/notes/list-notes.service';

export const listNotesController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { sub: user_uuid } = request.user;

  const prismaNotesRepository = new PrismaNotesRepository();

  const listNotesService = new ListNotesService(prismaNotesRepository);

  const notes = await listNotesService.execute(user_uuid);

  return reply.status(200).send({ notes });
}
