import { z } from 'zod';

export const getNotesSchema = z
  .object({
    postPerPage: z.number(),
    page: z.number(),
  })
  .required();

export type GetNotesDto = z.infer<typeof getNotesSchema>;
