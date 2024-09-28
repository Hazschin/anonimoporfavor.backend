import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './Schema/notes.schema';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
    constructor(@InjectModel("notes") private noteModel: Model<Note>){}

    getNotes(postPerPage: number = 10, page: number = 1) {

        return this.noteModel.find({})
                                .sort({_id: -1})
                                .skip(--page * postPerPage)
                                .limit(postPerPage)
                                .select("_id title author noteOverview");
    }

    getNote(noteId : string = "") {
        return this.noteModel.findById(noteId);
    }

    getNoteByTitle(title : string = "") {
        return this.noteModel.find({ title });
    }

    getNotesByTags(tags : string[] = [], skip: number = 0) {
        return this.noteModel.find({ tags : { $in: tags } }).skip(0).limit(10)
    }

    postNote(title:string, note:string, author:string,  tags:string[]) {
        const noteOverview = note.replace(/<[^>]*>/g, '');
        const Note = {title, note, noteOverview, author, tags};
        
        const createNote = new this.noteModel(Note);
        createNote.save();

        return createNote;
    }
}
