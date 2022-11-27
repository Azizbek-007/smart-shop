import { categories } from "src/category/categories.entity";
import { BaseEntity } from "typeorm";
export declare class product extends BaseEntity {
    id: bigint;
    category: categories;
    category_id: number;
    image: string;
    name: string;
    brand: string;
    cost_price: object;
    min_price: object;
    max_price: object;
    whole_price: object;
    uuid: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
