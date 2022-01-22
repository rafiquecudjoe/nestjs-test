

export enum EnumDepartment {
    ENGINEERING = "Engineering",
    PRODUCT = "Product",
    GROWTH = "Growth",
}




export class CreateDepartmentRequestBody {
    name: string;
    description: string;

}

export class CreateDepartmentResponseBody{
    statusCode: number;
    status: boolean;
    message: string;
    data:object

}

export class UpdateDepartmentRequestBody {
    name: string;
    description: string;

}

export class UpdateDepartmentResponseBody {
    statusCode: number;
    status: boolean;
    message: string;
    data: object

}



export class DeleteDepartmentRequestBody{
name:EnumDepartment
}

export class DeleteDepartmentResponseBody {
    statusCode: number;
    status: boolean;
    message: string;
    data: object
}

export class ViewDepartmentRequestBody {
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


