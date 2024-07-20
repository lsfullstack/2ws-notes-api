import { usersRepositoryInterface } from '../../interfaces/users/users-repository.interface';
import { UpdateUserRequest } from '../../interfaces/users/users.interface';
import { ResourceNotFoundError } from '../../errors/resource-not-found.error';

export class UpdateUserService {
  constructor(private usersRepository: usersRepositoryInterface) { }

  async execute(uuid: string, data: UpdateUserRequest) {
    const { name, email } = data;

    const user = await this.usersRepository.findByUuid(uuid);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    await this.usersRepository.update(
      uuid,
      {
        name: name ? name : user.name,
        email: email ? email : user.email,
      }
    );
  }
}
