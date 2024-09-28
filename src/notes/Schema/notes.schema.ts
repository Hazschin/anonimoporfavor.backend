
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose"

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
    
    @Prop()
    author: string 

    @Prop()
    title: string

    @Prop({required : true})
    note: string
    
    @Prop({required : true})
    noteOverview: string

    @Prop()
    tags:string[]

    @Prop({default: false})
    status: boolean

}

export const NoteSchema = SchemaFactory.createForClass(Note);