import { compare } from 'bcrypt';
import { InvalidCredentialsError } from '../../errors/invalid-credentials.error';
import { AuthLoginRequest, AuthLoginResponse } from '../../interfaces/auth/auth-login.interface';
import { usersRepositoryInterface } from '../../interfaces/users/users-repository.interface';

export class AuthLoginService {
  constructor(private usersRepository: usersRepositoryInterface) {}

  async execute({ email, password }: AuthLoginRequest): Promise<AuthLoginResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    }
  }
}
