import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaNotesRepository } from '../../../repositories/prisma/notes.repository';
import { RestoreNoteService } from '../../../services/notes/restore-note.service';
import { ResourceNotFoundError } from '../../../errors/resource-not-found.error';

export const restoreNoteController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { uuid } = request.params as { uuid: string };

  const prismaNotesRepository = new PrismaNotesRepository();

  const restoreNoteService = new RestoreNoteService(prismaNotesRepository);

  try {
    await restoreNoteService.execute(uuid);
    
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    throw error;
  }
}
