import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaNotesRepository } from '../../../repositories/prisma/notes.repository';
import { DestroyNoteService } from '../../../services/notes/destroy-note.service';
import { ResourceNotFoundError } from '../../../errors/resource-not-found.error';

export const destroyNoteController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { uuid } = request.params as { uuid: string };

  const prismaNotesRepository = new PrismaNotesRepository();

  const destroyNoteService = new DestroyNoteService(prismaNotesRepository);

  try {
    await destroyNoteService.execute(uuid);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }
  }
}
