import { ApiProperty } from '@nestjs/swagger';

export enum EnumDepartment {
    ENGINEERING = "Engineering",
    PRODUCT = "Product",
    GROWTH = "Growth",
}



export class CreateDepartmentRequestBody {
    @ApiProperty({ example: 'ENGINEERING', description: "The Departments name" })
    name: string;

    @ApiProperty({ example: 'In charge of all engineering Technology stuus of the company', description: "The Departments description " })
    description: string;

}

export class CreateDepartmentResponseBody {

    statusCode: number;
    status: boolean;
    message: string;
    data: object

}

export class UpdateDepartmentRequestBody {
    @ApiProperty({ example: 'ENGINEERING', description: "The Departments name" })
    name: string;

    @ApiProperty({ example: 'In charge of all engineering Technology stuus of the company', description: "The Departments description " })
    description: string;

}

export class UpdateDepartmentResponseBody {
    statusCode: number;
    status: boolean;
    message: string;
    data: object

}



export class DeleteDepartmentRequestBody {
    @ApiProperty({ example: 'ENGINEERING', description: "The Departments name" })
    name: EnumDepartment
}

export class DeleteDepartmentResponseBody {
    statusCode: number;
    status: boolean;
    message: string;
    data: object
}

export class ViewDepartmentRequestBody {
    @ApiProperty({ example: 'ENGINEERING', description: "The Departments name" })
    name: EnumDepartment
}

export class ViewDepartmentResponseBody {
    statusCode: number;
    status: boolean;
    message: string;
    data: object
}

export class GetDepartmentsResponseBody {
    statusCode: number;
    status: boolean;
    message: string;
    data: Array<object>
}


