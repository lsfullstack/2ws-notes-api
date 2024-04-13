import { notesRepositoryInterface } from '../../interfaces/notes/notes-repository.interface';

export class ListNotesService {
  constructor(private notesRepository: notesRepositoryInterface) {}

  async execute(user_uuid: string) {
    const notes = await this.notesRepository.findAll(user_uuid);

    return notes;
  }
}
