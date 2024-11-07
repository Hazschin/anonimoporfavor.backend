import { z } from 'zod';

export const searchNotesSchema = z
  .object({
    search: z.string(),
    postPerPage: z.number(),
    page: z.number(),
  })
  .required();

export type SearchNotesDto = z.infer<typeof searchNotesSchema>;
