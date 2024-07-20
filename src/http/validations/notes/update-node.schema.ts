import { z } from 'zod';

export const updateNodeSchema = z.object({
  description: z.string().optional(),
  is_favorite: z.boolean().optional(),
});
