import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { GetNotesByTitleDto } from './ZodSchemas/getNotesByTitle.zod';

export class GetNoteByTitlePipe implements PipeTransform {
  constructor() {}

  transform(value: GetNotesByTitleDto, metadata: ArgumentMetadata) {
    return value;
  }
}
