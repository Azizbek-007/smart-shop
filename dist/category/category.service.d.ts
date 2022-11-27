import { Repository } from 'typeorm';
import { categories } from './categories.entity';
import { createDto } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
export declare class CategoryService {
    private Categories;
    constructor(Categories: Repository<categories>);
    index(): Promise<void>;
    create(dto: createDto): Promise<void>;
    update(dto: UpdateDTO): Promise<void>;
    delete(id: bigint): Promise<void>;
}
