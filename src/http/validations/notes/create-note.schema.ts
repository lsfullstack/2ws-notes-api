import { z } from 'zod';

export const createNoteSchema = z.object({
  description: z.string(),  
});
