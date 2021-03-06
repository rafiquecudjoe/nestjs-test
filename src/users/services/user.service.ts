import { Injectable } from '@nestjs/common';
import { Utils } from '../../utils/Util';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { AssignToDepartmentRequestBody, AssignToDepartmentResponseBody, CreateUserRequestBody, CreateUserResponseBody, DeleteUserRequestBody, DeleteUserResponseBody, GetUsersInDepartmentRequestBody, GetUsersInDepartmentResponseBody, GetUsersResponseBody, UserCheck, UserSaved } from '../entities/user.entity';
import { hashPassword } from 'src/utils/helpers';
import * as jwt from "jsonwebtoken"
import { Chance } from "chance"
import * as Joi from 'joi'



@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async createUser(user: CreateUserRequestBody): Promise<CreateUserResponseBody> {

        const chance: Chance.Chance = new Chance()
        try {

            let value: any;
            const data: CreateUserRequestBody = user

            const schema: Joi.ObjectSchema<any> = Joi.object({


                username: Joi.string()
                    .min(3)
                    .max(30)
                    .required(),

                firstName: Joi.string().required(),

                lastName: Joi.string(),

                role: Joi.string().valid('EMPLOYEE', 'SUPER_ADMIN', 'DEPARTMENT_MANAGER').required(),

                department: Joi.string().valid("ENGINEERING", "PRODUCT", "GROWTH"),

                password: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),


                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()


            })
            try {
                value = await schema.validateAsync(data);

            } catch (error) {
                return {
                    statusCode: 500,
                    status: false,
                    message: error.message,
                    accessToken: "",
                    data: {}
                }

            }

            if (value) {
                const { password, firstName, lastName, username, email, role, department } = user

                const hashedPassword: string = await hashPassword(password)

                let newUser = new this.userModel({ password: hashedPassword, firstName, lastName, username, email, role, department })

                const randomString: string = chance.string()

                const accessToken: string = jwt.sign({ userId: newUser._id }, randomString, { expiresIn: "5d" })

                newUser.accessToken = accessToken

                const userCheck : UserCheck = await this.userModel.findOne({ email })

                if (userCheck) {

                    return {
                        statusCode: 500,
                        status: false,
                        message: "Email already Exist",
                        data: {},
                        accessToken: ""

                    }
                }

                const saved: UserSaved = await newUser.save()
                // Success
                return {
                    statusCode: 200, status: true, message: "User created successfully", data: saved, accessToken
                }
            }
            // Error
        } catch (error) {
            Utils.logger.error(error);
            return {
                statusCode: 500,
                status: false,
                message: error.message,
                data: {},
                accessToken: ""

            }
        }
    }

    async deleteUser(user: DeleteUserRequestBody): Promise<DeleteUserResponseBody> {


        try {
            let value: any;
            const data: DeleteUserRequestBody = user

            const schema : Joi.ObjectSchema<any> = Joi.object({

                email: Joi.string().required()
            })

            try {
                value = await schema.validateAsync(data);

            } catch (error) {
                return {
                    statusCode: 500,
                    status: false,
                    message: error.message,
                    data: {}
                }

            }

            if (value) {


                const { email } = user

                const deleteUser = await this.userModel.find({ email })


                if (deleteUser.length < 1) {
                    return {

                        statusCode: 400, status: false, message: "User not Found", data: {},
                    }
                }

                if (deleteUser) {
                    const id = deleteUser[0]._id

                    const deletedUser = await this.userModel.findByIdAndDelete(id)


                    return {

                        statusCode: 200, status: true, message: "User Removed Successfully", data: deletedUser,
                    }

                }

            }
        } catch (error) {
            Utils.logger.error(error);
            return {
                statusCode: 500,
                status: false,
                message: error.message,
                data: {},


            }
        }
    }

    async getUsers(): Promise<GetUsersResponseBody> {

        try {
            const users : User[] = await this.userModel.find({})

            return {

                statusCode: 200, status: true, message: "Users Retrieved Successfully", data: users,
            }

        } catch (error) {
            Utils.logger.error(error);
            return {
                statusCode: 500,
                status: false,
                message: error.message,
                data: [{}],
            }
        }
    }


    async assignUserToDepartment(request: AssignToDepartmentRequestBody): Promise<AssignToDepartmentResponseBody> {

        try {

            let value: any;
            const data: any = request

            const schema: Joi.ObjectSchema<any> = Joi.object({

                department: Joi.string().valid("ENGINEERING", "PRODUCT", "GROWTH").required(),
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
            })

            try {
                value = await schema.validateAsync(data);

            } catch (error) {
                return {
                    statusCode: 500,
                    status: false,
                    message: error.message,
                    data: {}
                }

            }
            if (value) {

                const { email } = data
                const user : UserCheck = await this.userModel.findOne({ email })

                if (!user) {

                    return {

                        statusCode: 200, status: true, message: "Users Not Found", data: {},
                    }

                }

                if (user) {

                    if (user.department) {

                        return {

                            statusCode: 400, status: true, message: "User is Already Assigned a Department ", data: {},
                        }

                    }

                    const id :string = user._id


                    const assignUser :UserCheck = await this.userModel.findByIdAndUpdate(id, data, { new: true })
                    return {

                        statusCode: 200, status: true, message: "Users Assigned to Department Successfully", data: assignUser,
                    }
                }

            }

        } catch (error) {
            Utils.logger.error(error);
            return {
                statusCode: 500,
                status: false,
                message: error.message,
                data: [{}],
            }
        }
    }

    async getUsersInDepartment(request: GetUsersInDepartmentRequestBody): Promise<GetUsersInDepartmentResponseBody> {

        try {

            let value: any;
            const data: any = request

            const schema: Joi.ObjectSchema<any> = Joi.object({

                department: Joi.string().valid("ENGINEERING", "PRODUCT", "GROWTH").required(),
            })

            try {
                value = await schema.validateAsync(data);

            } catch (error) {
                return {
                    statusCode: 500,
                    status: false,
                    message: error.message,
                    data: {}
                }
            }
            if (value) {

                const { department } = data

                const usersIndepartment : User[] = await this.userModel.find({ department })

                if (usersIndepartment.length < 1) {
                    return {

                        statusCode: 200, status: true, message: "No Users in Department", data: {},
                    }

                }

                return {

                    statusCode: 200, status: true, message: `Users in ${department} Department Retrieved Successfully`, data: usersIndepartment,
                }
            }
        } catch (error) {
            Utils.logger.error(error);
            return {
                statusCode: 500,
                status: false,
                message: error.message,
                data: [{}],
            }
        }
    }
}






