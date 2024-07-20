import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaNotesRepository } from '../../../repositories/prisma/notes.repository';
import { RetrieveNoteService } from '../../../services/notes/retrieve-note.service';
import { ResourceNotFoundError } from '../../../errors/resource-not-found.error';

export const retrieveNoteController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { uuid } = request.params as { uuid: string; };

  const prismaNotesRepository = new PrismaNotesRepository();

  const retrieveNoteService = new RetrieveNoteService(prismaNotesRepository);

  try {
    const note = await retrieveNoteService.execute(uuid);

    return reply.status(201).send({ note });

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    throw error;
  }
}
