import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { NotesService } from './notes.service';
import { GetNotesDto, getNotesSchema } from './Pipes/ZodSchemas/getNotes.zod';
import { ValidationPipe } from './Pipes/Validation.pipe';
import { SearchNotesPipe } from './Pipes/SearchNotes.pipe';
import {
  SearchNotesDto,
  searchNotesSchema,
} from './Pipes/ZodSchemas/searchNotes.zod';
import { GetNoteDto, getNoteSchema } from './Pipes/ZodSchemas/getNote.zod';
import {
  GetNotesByTitleDto,
  getNotesByTitleSchema,
} from './Pipes/ZodSchemas/getNotesByTitle.zod';
import { GetNoteByTitlePipe } from './Pipes/GetNotesByTitle.pipe';
import { PostNoteDto, postNoteSchema } from './Pipes/ZodSchemas/postNote.zod';
import { PostNotePipe } from './Pipes/PostNote.pipe';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('/countNotes')
  async countNotes() {
    return this.notesService.countNotes();
  }

  @Post('/getNotes')
  @UsePipes(new ValidationPipe(getNotesSchema))
  async getNotes(@Body() body: GetNotesDto) {
    let { postPerPage, page } = body;
    return this.notesService.getNotes(postPerPage, page);
  }

  @Post('/searchNotes')
  @UsePipes(new ValidationPipe(searchNotesSchema), new SearchNotesPipe())
  async searchNotes(@Body() body: SearchNotesDto) {
    const { search, postPerPage, page } = body;
    return this.notesService.searchNotes(search, postPerPage, page);
  }

  /*@Post('/countNotes')
  @UsePipes(new ValidationPipe(searchNotesSchema), new SearchNotesPipe())
  async searchNotes(@Body() body: SearchNotesDto) {
    const { search, postPerPage, page } = body;
    return this.notesService.searchNotes(search, postPerPage, page);
  }*/

  @Post('/searchAndCountNotes')
  @UsePipes(new ValidationPipe(searchNotesSchema), new SearchNotesPipe())
  async searchNotesBy(@Body() body: SearchNotesDto) {
    const { search, postPerPage, page } = body;
    return {
      notes: await this.notesService.searchNotes(search, postPerPage, page),
      qNotes: await this.notesService.countSearchNotes(
        search,
        postPerPage,
        page,
      ),
    };
  }

  @Post('/getNote')
  @UsePipes(new ValidationPipe(getNoteSchema))
  async getNote(@Body() body: GetNoteDto) {
    let { noteId } = body;
    return this.notesService.getNote(noteId);
  }

  @Post('/getNoteByTitle')
  @UsePipes(new ValidationPipe(getNotesByTitleSchema), new GetNoteByTitlePipe())
  async getNoteByTitle(@Body() body: GetNotesByTitleDto) {
    let { title } = body;
    return this.notesService.getNoteByTitle(title);
  }

  @Post('/getNoteByTags')
  async getNoteByTags() {
    return this.notesService.getNotesByTags([]);
  }

  @Post('/postNote')
  @UsePipes(new ValidationPipe(postNoteSchema), new PostNotePipe())
  async postNote(@Body() body: PostNoteDto) {
    console.log('Creando nueva nota');
    const { title, note, author } = body;
    return this.notesService.postNote(title, note, author);
  }
}
