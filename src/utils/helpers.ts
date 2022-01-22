import  * as bcrypt from "bcrypt"


export async function hashPassword(password : any) {
    return await bcrypt.hash(password, 10);
}

export async function validatePassword(plainPassword: any, hashedPassword: any) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}