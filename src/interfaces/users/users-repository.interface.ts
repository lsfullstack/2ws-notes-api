import { User } from '@prisma/client';
import { CreateUserRequest } from './users.interface';

export interface usersRepositoryInterface {
  create(data: CreateUserRequest): Promise<User>,
  findByEmail(email: string): Promise<User | null>,
  findAll(): Promise<User[]>,
  findByUuid(uuid: string): Promise<User | null>,
}
