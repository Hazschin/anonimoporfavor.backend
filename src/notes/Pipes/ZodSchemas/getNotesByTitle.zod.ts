import { z } from 'zod';

export const getNotesByTitleSchema = z
  .object({
    title: z.string(),
  })
  .required();

export type GetNotesByTitleDto = z.infer<typeof getNotesByTitleSchema>;
