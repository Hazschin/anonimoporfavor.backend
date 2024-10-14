import { z } from 'zod';

export const searchNotesSchema = z
  .object({
    search: z.string(),
  })
  .required();

export type SearchNotesDto = z.infer<typeof searchNotesSchema>;
