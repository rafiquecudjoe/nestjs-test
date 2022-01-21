import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import * as mongoose from 'mongoose';
import { User } from "./user.schema";

export type DepartmentDocument = Department & Document;

@Schema()
export class Department {
    @Prop({ required: true })
    Name: string

    @Prop()
    description:string    

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    users: User

 

    
}

export const DepartmentSchema = SchemaFactory.createForClass(Department)