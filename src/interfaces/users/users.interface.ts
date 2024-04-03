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
