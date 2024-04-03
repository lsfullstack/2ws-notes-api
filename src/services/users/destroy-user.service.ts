import { ResourceNotFoundError } from '../../errors/resource-not-foun.error';
import { usersRepositoryInterface } from '../../interfaces/users/users-repository.interface';

export class DestroyUserService {
  constructor(private usersRepository: usersRepositoryInterface) {}

  async execute(uuid: string) {
    const user = await this.usersRepository.findByUuid(uuid);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    await this.usersRepository.destroy(uuid);
  }
}
