import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      //console.log('Usando Pipes', value);
      const parsedValue = this.schema.parse(value);
      //console.log('Usando Pipes', value);
      return parsedValue;
    } catch (error) {
      //console.log(error);
      throw new BadRequestException('Validation failed');
    }
  }
}
