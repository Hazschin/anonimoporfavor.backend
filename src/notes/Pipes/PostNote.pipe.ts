import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { PostNoteDto } from './ZodSchemas/postNote.zod';

export class PostNotePipe implements PipeTransform {
  constructor() {}

  transform(value: PostNoteDto, metadata: ArgumentMetadata) {
    console.log('Los datos fueron verificados');
    console.log(value.note);
    const noteRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    value.title = value.title.replace(/<[^>]*>/g, '');
    value.author = value.author.replace(/<[^>]*>/g, '');
    value.note = value.note.replace(noteRegex, '');

    console.log(value.note);
    return value;
  }
}
