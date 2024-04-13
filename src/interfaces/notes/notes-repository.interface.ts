import { Note } from '@prisma/client';
import { CreateNoteRequest, UpdateNoteRequest } from './notes.interface';

export interface notesRepositoryInterface {
  create(data: CreateNoteRequest): Promise<Note>,
  findAll(user_uuid: string): Promise<Note[]>,
  findByUuid(uuid: string): Promise<Note | null>,
  update(uuid: string, data: UpdateNoteRequest): Promise<Note | null>,
}
