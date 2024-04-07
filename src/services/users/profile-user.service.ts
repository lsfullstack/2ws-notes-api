import { ResourceNotFoundError } from '../../errors/resource-not-foun.error';
import { usersRepositoryInterface } from '../../interfaces/users/users-repository.interface';
import { ProfileUserRequest, ProfileUserResponse } from '../../interfaces/users/users.interface';

export class ProfileUserService {
  constructor(private usersRepository: usersRepositoryInterface) {}

  async execute({ uuid }: ProfileUserRequest): Promise<ProfileUserResponse> {
    const user = await this.usersRepository.findByUuid(uuid);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
