export enum Department {
    ENGINEERING,
    PRODUCT,
    GROWTH,
}

export enum Roles {
    SUPER_ADMIN,
    DEPARTMENT_MANAGER,
    EMPLOYEE,

}


export class CreateUserRequestBody {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: Roles;
    department: Department
}

export class CreateUserResponseBody{
    statusCode: 200;
    status: boolean;
    message: string;
    data:{}

}