import { Injectable } from '@nestjs/common';
import { Utils } from '../../utils/Util';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Department, DepartmentDocument } from '../schemas/department.schema'
import {  CreateDepartment, CreateDepartmentRequestBody, CreateDepartmentResponseBody, DeleteDepartmentRequestBody, DeleteDepartmentResponseBody, DepartmentCheck, GetDepartmentsResponseBody, UpdateDepartmentRequestBody, UpdateDepartmentResponseBody, ViewDepartmentRequestBody, ViewDepartmentResponseBody, } from '../entities/department.entity';
import * as Joi from 'joi'



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

                const departmentCheck = await this.departmentModel.findOne({ name })

                if (departmentCheck) {
                    return {
                        statusCode: 400, status: false, message: "Department already exist", data: {}
                    }
                }

                let newDepartment: any = new this.departmentModel({ name, description })



                const saved : CreateDepartment = await newDepartment.save()


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

            const schema : Joi.ObjectSchema<any> = Joi.object({

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

                const deleteDepartment: DepartmentCheck = await this.departmentModel.findOne({ name })


                if (!deleteDepartment) {
                    return {

                        statusCode: 400, status: false, message: "User not Found", data: {},
                    }
                }

                if (deleteDepartment) {
                    const id = deleteDepartment._id

                    const deletedDepartment : DepartmentCheck= await this.departmentModel.findByIdAndDelete(id)

                    return {

                        statusCode: 200, status: true, message: "Department Removed Successfully", data: deletedDepartment,
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

            const departments :DepartmentCheck[] = await this.departmentModel.find({})

            return {

                statusCode: 200, status: true, message: "Departments Retrieved Successfully", data: departments,
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

            const schema : Joi.ObjectSchema<any> = Joi.object({

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


                const department: DepartmentCheck = await this.departmentModel.findOne({ name })
                
                if (!department) {
                    
                    return {

                        statusCode: 400, status: false, message: "Department does not exist", data: {},
                    }
                }


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

            const schema: Joi.ObjectSchema<any> = Joi.object({

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

                const department :DepartmentCheck = await this.departmentModel.findOne({ name })

                if (department) {

                    const id : string  = department._id

                    const updateDepartment :DepartmentCheck = await this.departmentModel.findByIdAndUpdate(
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

            const schema: Joi.ObjectSchema<any> = Joi.object({

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

                const department :DepartmentCheck = await this.departmentModel.findOne({ name })

                if (department) {

                    const id : string = department._id

                    const updateDepartment : DepartmentCheck = await this.departmentModel.findByIdAndUpdate(
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


}






