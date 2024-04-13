import { ResourceNotFoundError } from '../../errors/resource-not-found.error';
import { usersRepositoryInterface } from '../../interfaces/users/users-repository.interface';

export class RetrieveUserService {
  constructor(private usersRepository: usersRepositoryInterface) { }

  async execute(uuid: string) {
    const user = await this.usersRepository.findByUuid(uuid);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      ...user,
      password: undefined,
    }
  }
}
