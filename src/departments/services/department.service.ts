import { Injectable } from '@nestjs/common';
import { Utils } from '../../utils/Util';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Department, DepartmentDocument } from '../schemas/department.schema'
import {  CreateDepartmentRequestBody, CreateDepartmentResponseBody, DeleteDepartmentRequestBody, DeleteDepartmentResponseBody, GetDepartmentsResponseBody, UpdateDepartmentRequestBody, UpdateDepartmentResponseBody, ViewDepartmentRequestBody, ViewDepartmentResponseBody, } from '../entities/department.entity';
import * as Joi from 'joi'
import { User } from 'src/users/schemas/user.schema';



@Injectable()
export class DepartmentService {
    constructor(@InjectModel(Department.name) private departmentModel: Model<DepartmentDocument>) { }

    async createDepartment(department: CreateDepartmentRequestBody): Promise<CreateDepartmentResponseBody> {


        try {
            let value: any;
            const data: CreateDepartmentRequestBody = department

            const schema: Joi.ObjectSchema<any> = Joi.object({

                name: Joi.string().valid("ENGINEERING", "PRODUCT", "GROWTH").required(),

                description: Joi.string().required(),
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
                const { name, description } = department

                const departmentCheck = await this.departmentModel.find({ name })

                if (departmentCheck.length > 0) {
                    return {
                        statusCode: 400, status: false, message: "Department already exist", data: {}
                    }
                }

                let newDepartment = new this.departmentModel({ name, description })



                const saved = await newDepartment.save()


                // Success
                return {
                    statusCode: 200, status: true, message: "Department created successfully", data: saved
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


            }
        }
    }

    async deleteDepartment(user: DeleteDepartmentRequestBody): Promise<DeleteDepartmentResponseBody> {


        try {
            let value: any;
            const data: DeleteDepartmentRequestBody = user

            const schema = Joi.object({

                name: Joi.string().valid("ENGINEERING", "PRODUCT", "GROWTH").required()
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


                const { name } = user

                const deleteUser = await this.departmentModel.find({ name })


                if (deleteUser.length < 1) {
                    return {

                        statusCode: 400, status: false, message: "User not Found", data: {},
                    }
                }

                if (deleteUser) {
                    const id = deleteUser[0]._id

                    const deletedUser = await this.departmentModel.findByIdAndDelete(id)


                    return {

                        statusCode: 200, status: true, message: "Department Removed Successfully", data: deletedUser,
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

    async GetDepartments(): Promise<GetDepartmentsResponseBody> {

        try {


            const departments = await this.departmentModel.find({})

            return {

                statusCode: 200, status: true, message: "Users Retrieved Successfully", data: departments,
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


    async GetDepartment(department: ViewDepartmentRequestBody): Promise<ViewDepartmentResponseBody> {

        try {

            let value: any;
            const data: ViewDepartmentRequestBody = department

            const schema = Joi.object({

                name: Joi.string().valid("ENGINEERING", "PRODUCT", "GROWTH").required()
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
                const { name } = data


                const departments = await this.departmentModel.find({ name })

                const department = departments[0]

                return {

                    statusCode: 200, status: true, message: "Department Retrieved Successfully", data: department,
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


    async patchDepartmentDetails(department: UpdateDepartmentRequestBody): Promise<UpdateDepartmentResponseBody> {

        try {

           

            let value: any;
            const data: any = department

            const schema = Joi.object({

                name: Joi.string().valid("ENGINEERING", "PRODUCT", "GROWTH"),
                description: Joi.string().required(),
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

                const { name } = data

                const department = await this.departmentModel.find({ name })

                if (department.length > 0) {

                    const id = department[0]._id

                    const updateDepartment = await this.departmentModel.findByIdAndUpdate(
                        id,
                        data,
                        { new: true })


                    return {

                        statusCode: 200, status: true, message: "Department updated Successfully", data: updateDepartment,
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


    async ManagerPatchDepartmentDetails(department: UpdateDepartmentRequestBody): Promise<UpdateDepartmentResponseBody> {

        try {



            let value: any;
            const data: any = department

            const schema = Joi.object({

                name: Joi.string().valid("ENGINEERING", "PRODUCT", "GROWTH"),
                description: Joi.string().required(),
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

                const { name } = data

                const department = await this.departmentModel.find({ name })

                if (department.length > 0) {

                    const id = department[0]._id

                    const updateDepartment = await this.departmentModel.findByIdAndUpdate(
                        id,
                        data,
                        { new: true })


                    return {

                        statusCode: 200, status: true, message: "Department updated Successfully", data: updateDepartment,
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

   

    // async getDepartments(): Promise<GetUsersResponseBody> {

    //     try {
    //         const users = await this.userModel.find({})

    //         return {

    //             statusCode: 200, status: true, message: "Users Retrieved Successfully", data: users,
    //         }

    //     } catch (error) {
    //         Utils.logger.error(error);
    //         return {
    //             statusCode: 500,
    //             status: false,
    //             message: error.message,
    //             data: [{}],
    //         }
    //     }
    // }

   

    // async GetUsersByDepartment(): Promise<GetUsersResponseBody> {

    //     try {
    //         const users = await this.userModel.find({})

    //         return {

    //             statusCode: 200, status: true, message: "Users Retrieved Successfully", data: users,
    //         }

    //     } catch (error) {
    //         Utils.logger.error(error);
    //         return {
    //             statusCode: 500,
    //             status: false,
    //             message: error.message,
    //             data: [{}],
    //         }
    //     }
    // }

    // async FilterUsersInDepartment(): Promise<GetUsersResponseBody> {

    //     try {
    //         const users = await this.userModel.find({})

    //         return {

    //             statusCode: 200, status: true, message: "Users Retrieved Successfully", data: users,
    //         }

    //     } catch (error) {
    //         Utils.logger.error(error);
    //         return {
    //             statusCode: 500,
    //             status: false,
    //             message: error.message,
    //             data: [{}],
    //         }
    //     }
    // }



}






