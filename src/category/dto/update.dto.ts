import { Type } from "class-transformer";
import { IsNumber, ValidateNested } from "class-validator";


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

export class UpdateDTO {
    
    @IsNumber()
    category_id: bigint;

    @ValidateNested({ each: true })
    @Type(() => objectDTO)
    percents: objectDTO[];
}