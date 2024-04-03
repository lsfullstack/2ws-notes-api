import { hash } from 'bcrypt';
import { usersRepositoryInterface } from '../../interfaces/users/users-repository.interface';
import { CreateUserRequest } from '../../interfaces/users/users.interface';
import { EmailAlreadyExistsError } from '../../errors/email-already-exists.error';

export class CreateUserService {
  constructor(private usersRepository: usersRepositoryInterface) {}

  async execute(data: CreateUserRequest) {
    const { name, email, password, is_admin } = data;

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if(userWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password: password_hash,
      is_admin: is_admin ?? false,
    });
  }
}
