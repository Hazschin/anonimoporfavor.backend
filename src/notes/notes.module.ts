import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesMiddleware } from './notes.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './Schema/notes.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: "notes", schema:NoteSchema}])],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(NotesMiddleware)
    .forRoutes('/notes/getNotes', '/notes/postNote')
  }
}
