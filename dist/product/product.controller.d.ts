import { Response } from 'express';
import { ProductCreateDto } from './dto/create.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(dto: ProductCreateDto): Promise<void>;
    update(): Promise<void>;
    product(query: any): Promise<void>;
    product_copy(): Promise<void>;
    qrcode_read(query: object, response: Response): Promise<Response<any, Record<string, any>>>;
    product_export(): Promise<void>;
    product_import(): Promise<void>;
    product_delete(_id: bigint): Promise<void>;
}
