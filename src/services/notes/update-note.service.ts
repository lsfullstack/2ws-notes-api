import { ResourceNotFoundError } from '../../errors/resource-not-found.error';
import { notesRepositoryInterface } from '../../interfaces/notes/notes-repository.interface';
import { UpdateNoteRequest } from '../../interfaces/notes/notes.interface';

export class UpdateNoteService {
  constructor(private notesRepository: notesRepositoryInterface) {}

  async execute(uuid: string, data: UpdateNoteRequest) {
    const note = await this.notesRepository.update(uuid, data);

    if (!note) {
      throw new ResourceNotFoundError();
    }

    return note;
  }
}
