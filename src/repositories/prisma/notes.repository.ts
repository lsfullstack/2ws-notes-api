import { notesRepositoryInterface } from '../../interfaces/notes/notes-repository.interface';
import { CreateNoteRequest, UpdateNoteRequest } from '../../interfaces/notes/notes.interface';
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

  async findAll(user_uuid: string): Promise<Note[]> {
    const notes = await prisma.note.findMany({
      where: {
        user_uuid,
      },
      orderBy: {
        created_ad: 'asc',
      },
    });

    return notes;
  }

  async findByUuid(uuid: string): Promise<Note | null> {
    const note = await prisma.note.findUnique({
      where: {
        uuid,
      }
    });

    return note;
  }

  async update(uuid: string, data: UpdateNoteRequest): Promise<Note | null> {
    const note = await prisma.note.update({
      where: {
        uuid
      },
      data: {
        ...data,
        updated_at: new Date(),
      }
    });

    return note;
  }

  async delete(uuid: string) {
    try {
      await prisma.note.update({
        where: {
          uuid,
        },
        data: {
          is_active: false,
          deleted_at: new Date(),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async restore(uuid: string) {
    try {
      await prisma.note.update({
        where: {
          uuid,
        },
        data: {
          is_active: true,
          deleted_at: null,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async destroy(uuid: string): Promise<void> {
    await prisma.note.delete({
      where: {
        uuid,
      },
    });
  }
}
