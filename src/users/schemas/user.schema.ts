import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { Department, Roles } from "../entities/user.entity";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({required:true})
    firstName: string
 
    @Prop()
    lastName: string

    @Prop()
    username: string

    @Prop()
    email :string     

    @Prop()
    role: Roles
    
    @Prop()
    department:Department
}

export const UserSchema = SchemaFactory.createForClass(User)