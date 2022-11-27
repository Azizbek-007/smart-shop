import { IsNumber } from "class-validator";

export class CorrencySet {
    @IsNumber()
    currency_id: number

    @IsNumber()
    rate: number;
}