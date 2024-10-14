import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { SearchNotesDto } from './ZodSchemas/searchNotes.zod';

export class SearchNotesPipe implements PipeTransform {
  constructor() {}

  transform(value: SearchNotesDto, metadata: ArgumentMetadata) {
    //const invalidChars = /[]/g;
    //value.search = value.search.replace(invalidChars, '');
    return value;
  }
}
