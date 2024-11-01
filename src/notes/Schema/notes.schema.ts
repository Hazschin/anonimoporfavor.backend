import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop({ unique: true, required: true })
  id: number;

  @Prop()
  author: string;

  @Prop()
  title: string;

  @Prop({ required: true })
  note: string;

  @Prop({ required: true, default: '', minlength: 0, maxlength: 100 })
  noteOverview: string;

  @Prop({ default: [] })
  tags: string[];

  @Prop({
    default: 'pending',
    enum: ['pending', 'approved', 'denied', 'reported', 'inReview', 'canceled'],
  })
  status: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
