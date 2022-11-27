/// <reference types="node" />
import { Repository } from 'typeorm';
import { ProductCreateDto } from './dto/create.dto';
import { product } from './product.entity';
import { currencies } from 'src/currency/currency.entity';
export declare class ProductService {
    private ProductRep;
    private CurrenciesRep;
    constructor(ProductRep: Repository<product>, CurrenciesRep: Repository<currencies>);
    create(dto: ProductCreateDto): Promise<void>;
    GetAll(params: object): Promise<void>;
    getQrCode(query: object): Promise<Buffer>;
    Delete(product_id: bigint): Promise<void>;
}
