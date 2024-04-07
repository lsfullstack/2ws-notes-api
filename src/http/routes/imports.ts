// Users
import { createUserController } from '../controllers/users/create-user.controller';
import { listUsersController } from '../controllers/users/list-users.controller';
import { retrieveUserController } from '../controllers/users/retrieve-user.controller';
import { updateUserController } from '../controllers/users/update-user.controller';
import { deleteUserController } from '../controllers/users/delete-user.controller';
import { destroyUserController } from '../controllers/users/destroy-user.controller';
import { profileUserController } from '../controllers/users/profile-user.controller';

// Auth
import { authLoginController } from '../controllers/auth/auth-login.controller';

export const userRoutes = {
  createUserController,
  listUsersController,
  profileUserController,
  retrieveUserController,
  updateUserController,
  deleteUserController,
  destroyUserController,
};

export const authRoutes = {
  authLoginController,
};
