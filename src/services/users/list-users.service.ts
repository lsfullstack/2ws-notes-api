import { usersRepositoryInterface } from '../../interfaces/users/users-repository.interface';

export class ListUsersService {
  constructor(private usersRepository: usersRepositoryInterface) {}

  async execute() {
    const users = await this.usersRepository.findAll();

    const usersWithoutPassword = users.map(user => {

      return {
        ...user,
        password: undefined,
      }
    });

    return usersWithoutPassword;
  }
}
