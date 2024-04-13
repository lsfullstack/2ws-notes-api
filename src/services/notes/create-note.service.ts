import { ResourceNotFoundError } from '../../errors/resource-not-found.error';
import { notesRepositoryInterface } from '../../interfaces/notes/notes-repository.interface';
import { CreateNoteRequest } from '../../interfaces/notes/notes.interface';
import { prisma } from '../../lib/prisma';

export class CreateNoteService {
  constructor(private notesRepository: notesRepositoryInterface) {}

  async execute(data: CreateNoteRequest) {
    const { description, user_uuid } = data;

    const user = await prisma.user.findUnique({
      where: {
        uuid: user_uuid,
      }
    });

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const note = await this.notesRepository.create({
      description,
      user_uuid,
    });

    return {
      note,
    }
  }
}
