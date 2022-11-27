import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";

class cost_price_ref {
    @IsNumber()
    currency_id: number;

    @IsNumber()
    price: number;

}
class price_min_ref {
    @IsNumber()
    currency_id: number;

    @IsNumber()
    price: number;   
}

class price_max_ref {
    @IsNumber()
    currency_id: number;

    @IsNumber()
    price: number;
}
class price_wholesale_ref {
    @IsNumber()
    currency_id: number;

    @IsNumber()
    price: number
}

export class ProductCreateDto {
    
    @IsNumber()
    category_id: number;
    
    @IsString()
    name: string;

    @IsString()
    brand: string;

    @ValidateNested({ each: true })
    @Type(() => cost_price_ref)
    cost_price: cost_price_ref[];

    @ValidateNested({ each: true })
    @Type(() => price_min_ref)
    price_min: price_min_ref[];

    @ValidateNested({ each: true })
    @Type(() => price_max_ref)
    price_max: price_max_ref[];

    @ValidateNested({ each: true })
    @Type(() => price_wholesale_ref)
    price_wholesale: price_wholesale_ref[];
}
