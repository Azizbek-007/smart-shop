import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf, ValidateNested } from "class-validator";
import { UserEnum } from "../usertype.enum";


export class ClientRegister {

    @IsString()
    full_name: string;

    @IsString()
    phone: string;

    @IsEnum(UserEnum)
    type: UserEnum;

    tin: string | 'Y';

    @IsString()
    about: string;
}