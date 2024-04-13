import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaNotesRepository } from '../../../repositories/prisma/notes.repository';
import { DeleteNoteService } from '../../../services/notes/delete-note.service';
import { ResourceNotFoundError } from '../../../errors/resource-not-found.error';

export const deleteNoteController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { uuid } = request.params as { uuid: string };

  const prismaNotesRepository = new PrismaNotesRepository();

  const deleteNoteService = new DeleteNoteService(prismaNotesRepository);

  try {
    await deleteNoteService.execute(uuid);

    return reply.status(204).send();

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    throw error;
  }
}
