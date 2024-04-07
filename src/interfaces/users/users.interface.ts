import { User } from '@prisma/client';

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  is_admin?: boolean;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}

export interface ProfileUserRequest {
  uuid: string;
}

export interface ProfileUserResponse {
  user: User;
}
