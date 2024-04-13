import { Note } from "@prisma/client";
import { CreateNoteRequest } from "./notes.interface";

export interface notesRepositoryInterface {
  create(data: CreateNoteRequest): Promise<Note>,
}
