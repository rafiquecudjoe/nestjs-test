

export enum Department {
    ENGINEERING = "Engineering",
    PRODUCT = "Product",
    GROWTH = "Growth",
}

export enum Roles {
    SUPER_ADMIN = "Super Admin",
    DEPARTMENT_MANAGER = "Department Manager",
    EMPLOYEE = "Employee",

}


export class CreateUserRequestBody {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password:string
    role: Roles;
    department: Department
}

export class CreateUserResponseBody{
    statusCode: number;
    status: boolean;
    message: string;
    accessToken: string;
    data:object

}


export class DeleteUserRequestBody{
email:string
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


