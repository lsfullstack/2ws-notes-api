import { ResourceNotFoundError } from '../../errors/resource-not-found.error';
import { notesRepositoryInterface } from '../../interfaces/notes/notes-repository.interface';

export class RestoreNoteService {
  constructor(private notesRepository: notesRepositoryInterface) {}

  async execute(uuid: string) {
    const note = await this.notesRepository.findByUuid(uuid);
    
    if (!note) {
      throw new ResourceNotFoundError();
    }
    
    await this.notesRepository.restore(uuid);
  }
}
