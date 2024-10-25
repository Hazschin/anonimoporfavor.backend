import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './Schema/notes.schema';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(@InjectModel('notes') private noteModel: Model<Note>) {
    this.findMinParams = {
      $or: [{ status: 'pending' }, { status: 'approved' }],
    };
    this.noteOverviewShort = {
      start: 0,
      end: 99,
    };
  }

  noteOverviewShort;

  findMinParams;

  countNotes() {
    return this.noteModel.countDocuments({ ...this.findMinParams });
  }

  getNotes(postPerPage: number = 10, page: number = 1) {
    return this.noteModel
      .find({ ...this.findMinParams })
      .sort({ _id: -1 })
      .skip(--page * postPerPage)
      .limit(postPerPage)
      .select('id title author noteOverview');
  }

  getNote(noteId: number = 0) {
    return this.noteModel
      .findOne({
        ...this.findMinParams,
        id: noteId,
      })
      .select('id title author note');
  }

  searchNotes(search: string) {
    return this.noteModel
      .find({
        $and: [
          { ...this.findMinParams },
          {
            $or: [
              { title: { $regex: search, $options: 'i' } },
              //{ noteOverview: { $regex: search, $options: 'i' } },
            ],
          },
        ],
      })
      .sort({ _id: -1 })
      .select('id title author noteOverview');
  }

  getNoteByTitle(title: string = '') {
    return this.noteModel
      .find({ ...this.findMinParams, title })
      .select('id title author noteOverview');
  }

  getNotesByTags(tags: string[] = [], skip: number = 0) {
    return this.noteModel
      .find({ ...this.findMinParams, tags: { $in: tags } })
      .skip(0)
      .limit(10);
  }

  async postNote(title: string, note: string, author: string) {
    let noteOverview = note
      .replace(/<[^>]*>/g, '')
      .slice(this.noteOverviewShort.start, this.noteOverviewShort.end);
    if (noteOverview === '') noteOverview = '(Sin vista previa)';

    const id = await this.noteModel.countDocuments({});
    const Note = { id, title, note, noteOverview, author };

    const createNote = new this.noteModel(Note);
    createNote.save();

    return createNote;
  }
}
