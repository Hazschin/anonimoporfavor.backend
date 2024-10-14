import { z } from 'zod';

export const getNoteSchema = z
  .object({
    noteId: z.number(),
  })
  .required();

export type GetNoteDto = z.infer<typeof getNoteSchema>;
