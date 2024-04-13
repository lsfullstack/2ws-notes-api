import { notesRepositoryInterface } from '../../interfaces/notes/notes-repository.interface';
import { CreateNoteRequest } from '../../interfaces/notes/notes.interface';
import { Note } from '@prisma/client';
import { prisma } from '../../lib/prisma';

export class PrismaNotesRepository implements notesRepositoryInterface {
  async create(data: CreateNoteRequest): Promise<Note> {
    const note = await prisma.note.create({
      data: {
        ...data,
      },
    });

    return note;
  }
}
