import { Body, Controller, Delete, Get, Patch, Post,Res } from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateDepartmentRequestBody, DeleteDepartmentRequestBody, UpdateDepartmentRequestBody,  } from '../entities/department.entity';
import { DepartmentService} from '../services/department.service';
import { Response } from 'express';


@Controller('department')
export class DepartmentController {
    constructor(private departmentService: DepartmentService) { }
    
    @ApiTags('Super Admin Endpoints')
    @Post('/create')
    @ApiOperation({ summary: 'Create a Department' })
    @ApiResponse({ status: 200, description: 'Department Created successfully.' })
    async DepartmentCreate(@Body() department: CreateDepartmentRequestBody, @Res() res: Response){
        const response = await this.departmentService.createDepartment(department)
        
        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data 

        })
    }

    @ApiTags('Super Admin Endpoints')
    @Get('')
    @ApiOperation({ summary: 'List all departments' })
    @ApiResponse({ status: 201, description: 'All departments retrieved successfully' })
    async viewDepartments(@Res() res: Response) {
        const response = await this.departmentService.GetDepartments()

        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data

        })
    }


    
    @ApiTags('Super Admin Endpoints')
    @Delete('')
    @ApiOperation({ summary: 'Delete a department' })
    @ApiResponse({ status: 201, description: 'All departments retrieved successfully' })
    async adminUserDelete(@Body() user: DeleteDepartmentRequestBody, @Res() res: Response) {
        const response = await this.departmentService.deleteDepartment(user)

        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data

        })
    }

    @ApiTags('Super Admin Endpoints')
    @Post('')
    @ApiOperation({ summary: 'View details of a department' })
    @ApiResponse({ status: 200, description: 'Department Retrieved Successfully.' })
    async viewDepartment(@Body() department: DeleteDepartmentRequestBody,@Res() res: Response) {
        const response = await this.departmentService.GetDepartment(department)

        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data

        })
    }

    @ApiTags('Department Manager Endpoints')
    @Patch('')
    @ApiOperation({ summary: 'Update details of a department' })
    @ApiResponse({ status: 201, description: 'Department Updated successfully.' })
    async PatchDepartment(@Body() department: UpdateDepartmentRequestBody, @Res() res: Response) {
        const response = await this.departmentService.patchDepartmentDetails(department)

        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data

        })
    }

    @ApiTags('Super Admin Endpoints')
    @Patch('')
    @ApiOperation({ summary: 'Update Details of a Department by Manager' })
    @ApiResponse({ status: 201, description: 'Department Updated Successfully.' })
    async ManagerPatchDepartment(@Body() department: UpdateDepartmentRequestBody, @Res() res: Response) {
        const response = await this.departmentService.patchDepartmentDetails(department)

        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data

        })
    }

}
