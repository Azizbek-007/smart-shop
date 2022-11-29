import { IsNumber, IsString } from "class-validator";

export class UpdateClient {

    @IsNumber()
    client_id: bigint;

    @IsNumber()
    branch_id: bigint;

    @IsString()
    about: string;

    @IsString()
    full_name: string;
    
    @IsString()
    phone: string;
    
    @IsString()
    type: string;
}