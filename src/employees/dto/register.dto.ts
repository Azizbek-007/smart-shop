import { IsEnum, IsNumber, IsNumberString, IsPhoneNumber, IsString } from "class-validator";
import { role } from "../employees.enum";

export class RegisterDTO {
    
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

    @IsNumber()
    flex: Number;
    
    @IsNumber()
    salary: Number;
}