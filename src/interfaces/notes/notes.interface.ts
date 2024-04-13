import { User } from '@prisma/client';

export interface CreateNoteRequest {
  description: string;
  user_uuid?: string;
  user?: User;
}

export interface UpdateNoteRequest {
  description?: string;
  is_favorite?: boolean;
}
