import { User } from '@prisma/client';
import { usersRepositoryInterface } from '../../interfaces/users/users-repository.interface';
import { CreateUserRequest, UpdateUserRequest } from '../../interfaces/users/users.interface';
import { prisma } from '../../lib/prisma';

export class PrismaUsersRepository implements usersRepositoryInterface {
  async create (data: CreateUserRequest): Promise<User> {
    const user = await prisma.user.create({
      data: {
        ...data
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      },
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return users;
  }

  async findByUuid(uuid: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        uuid,
      },
    });

    return user;
  }

  async update(uuid: string, data: UpdateUserRequest): Promise<User | null> {

    const user = await prisma.user.update({
      where: {
        uuid,
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });

    return user;
  }
}
