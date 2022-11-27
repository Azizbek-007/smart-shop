declare class cost_price_ref {
    currency_id: number;
    price: number;
}
declare class price_min_ref {
    currency_id: number;
    price: number;
}
declare class price_max_ref {
    currency_id: number;
    price: number;
}
declare class price_wholesale_ref {
    currency_id: number;
    price: number;
}
export declare class ProductCreateDto {
    category_id: number;
    name: string;
    brand: string;
    cost_price: cost_price_ref[];
    price_min: price_min_ref[];
    price_max: price_max_ref[];
    price_wholesale: price_wholesale_ref[];
}
export {};
