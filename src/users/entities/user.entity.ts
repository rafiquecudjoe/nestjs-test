import { ApiProperty } from '@nestjs/swagger';

export enum Department {
    ENGINEERING = "ENGINEERING",
    PRODUCT = "PRODUCT",
    GROWTH = "GROWTH",
}

export enum Roles {
    SUPER_ADMIN = "SUPER_ADMIN",
    DEPARTMENT_MANAGER = "DEPARTMENT_MANAGER",
    EMPLOYEE = "EMPLOYEE",

}


export class CreateUserRequestBody {

    @ApiProperty({ example: 'Jonhy', description: 'The User\'s fisrt name' })
    firstName: string;

    @ApiProperty({ example: 'Rocket', description: 'The user\'s last name' })
    lastName: string;

    @ApiProperty({ example: 'Jonhy1', description: 'The user\'s username' })
    username: string;

    @ApiProperty({ example: 'Jonhy12@gmail.com', description: 'The user\'s email' })
    email: string;

    @ApiProperty({ example: '**********', description: "The users\'s password" })
    password: string;

    @ApiProperty({ example: 'EMPLOYEE', description: 'The user\'s role' })
    role: Roles;

    @ApiProperty({ example: 'ENGINEERING', description: 'The users\'s department' })
    department?: Department
}

export class CreateUserResponseBody {
    statusCode: number;
    status: boolean;
    message: string;
    accessToken: string;
    data: object

}


export class DeleteUserRequestBody {
    @ApiProperty({ example: 'Jonhy12@gmail.com', description: 'The user\'s email' })
    email: string
}

export class DeleteUserResponseBody {
    statusCode: number;
    status: boolean;
    message: string;
    data: object
}


export class GetUsersResponseBody {
    statusCode: number;
    status: boolean;
    message: string;
    data: Array<object>
}

export class UserCheck {
    _id: string;
    role: string;
    email: string;
    password: string;
    username: string;
    firstName: string;
    accessToken: string;
    __v?: number;
    department?:string
}
 
export class UserSaved {
    _id: string;
    role: string;
    email: string;
    password: string;
    username: string;
    firstName: string;
    accessToken: string;
    __v?: number;
}




export class AssignToDepartmentRequestBody {

    @ApiProperty({ example: 'Jonhy12@gmail.com', description: 'The user\'s email' })
    email: string;

    @ApiProperty({ example: 'ENGINEERING', description: 'The departments name' })
    department: string;

}

export class AssignToDepartmentResponseBody {
    statusCode: number;
    status: boolean;
    message: string;
    data: object

}

export class GetUsersInDepartmentRequestBody {

    @ApiProperty({ example: 'ENGINEERING', description: 'The name of the department' })
    department: string;


}

export class GetUsersInDepartmentResponseBody {
    statusCode: number;
    status: boolean;
    message: string;
    data: object

}