import { product } from "src/product/product.entity";
import { BaseEntity } from "typeorm";
export declare class categories extends BaseEntity {
    id: bigint;
    name: string;
    min_percent: number;
    max_percent: number;
    whole_percent: number;
    min_product: number;
    products: product[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
