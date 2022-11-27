import { IsEnum, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { role } from "../employees.enum";

export class UpdateDTO {
    @IsNumber()
    employees_id: bigint;

    @IsPhoneNumber()
    phone: string;

    @IsString()
    avatar: string;

    @IsString()
    name: string;

    @IsString()
    password: string;
    
    @IsEnum(role)
    role: role;

    @IsNumber()
    pincode: string;
}