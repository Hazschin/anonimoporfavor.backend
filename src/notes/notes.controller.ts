import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller("notes")
export class NotesController {
    constructor(private readonly notesService: NotesService){}

    @Post("/getNotes")
    async getNotes(@Body() body : any){
        let postPerPage = body.postPerPage;
        let page = body.page;

        console.log(body, postPerPage, page);
        
        return this.notesService.getNotes(postPerPage, page);
    }
    
    @Post("/getNote")
    async getNote(@Body() body:any){
        let noteId = body.noteId;
        return this.notesService.getNote(noteId);
    }

    @Post("/getNoteByTitle")
    async getNoteByTitle(@Body() body:any){
        let title = body.title;

        return this.notesService.getNoteByTitle(title);
    }

    @Post("/getNoteByTags")
    async getNoteByTags(){
        return this.notesService.getNotesByTags([]);
    }
    

    @Post("/postNote")
    async postNote(@Body() body : any){
            const title = body.title;
            const note = body.note;
            const author = body.author;
            const tags = body.tags;
        return this.notesService.postNote(title, note, author, tags);
    }
    
}
