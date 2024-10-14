import { z } from 'zod';

export const postNoteSchema = z
  .object({
    title: z.string(),
    note: z.string(),
    author: z.string(),
  })
  .required();

export type PostNoteDto = z.infer<typeof postNoteSchema>;
