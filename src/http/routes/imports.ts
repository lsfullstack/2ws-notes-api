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

// Notes
import { createNoteController } from '../controllers/notes/create-note.controller';
import { listNotesController } from '../controllers/notes/list-notes.controller';
import { retrieveNoteController } from '../controllers/notes/retrieve-note.controller';
import { updateNoteController } from '../controllers/notes/update-notes.controller';
import { deleteNoteController } from '../controllers/notes/delete-note.controller';
import { restoreNoteController } from '../controllers/notes/restore-note.contrroller';

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

export const notesRoutes = {
  createNoteController,
  listNotesController,
  retrieveNoteController,
  updateNoteController,
  deleteNoteController,
  restoreNoteController,
};
