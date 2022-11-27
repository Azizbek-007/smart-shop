import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";


export class objectDTO {

    @IsNumber()
    min: number;

    @IsNumber()
    max: number;

    @IsNumber()
    wholesale: number;

    @IsNumber()
    min_product: number
}

export class createDto {
    
    @IsString()
    name: string;

    @ValidateNested({ each: true })
    @Type(() => objectDTO)
    percents: objectDTO[];
}