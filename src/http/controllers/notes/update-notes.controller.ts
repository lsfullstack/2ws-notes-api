import { FastifyReply, FastifyRequest } from 'fastify';
import { updateNodeSchema } from '../../validations/notes/update-node.schema';
import { PrismaNotesRepository } from '../../../repositories/prisma/notes.repository';
import { UpdateNoteService } from '../../../services/notes/update-note.service';
import { ResourceNotFoundError } from '../../../errors/resource-not-found.error';

export const updateNoteController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const data = updateNodeSchema.parse(request.body);
  const { uuid } = request.params as { uuid: string };

  const prismaNotesRepository = new PrismaNotesRepository();

  const updateNoteService = new UpdateNoteService(prismaNotesRepository);

  try {
    const note = await updateNoteService.execute(uuid, {
      ...data,
    });

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
