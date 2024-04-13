import { FastifyReply, FastifyRequest } from 'fastify';
import { createNoteSchema } from '../../validations/notes/create-note.schema';
import { PrismaNotesRepository } from '../../../repositories/prisma/notes.repository';
import { CreateNoteService } from '../../../services/notes/create-note.service';

export const createNoteController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { description } = createNoteSchema.parse(request.body);
  const { sub: user_uuid } = request.user;

  const prismaNotesRepository = new PrismaNotesRepository();

  const createNoteService = new CreateNoteService(prismaNotesRepository);
  
  try {
    const note = await createNoteService.execute({
      description,
      user_uuid,                     
    });
    
    return reply.status(201).send({ note });

  } catch (error) {

    throw error;
  }
}