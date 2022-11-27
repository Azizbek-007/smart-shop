import { CategoryService } from './category.service';
import { createDto } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    index(): Promise<void>;
    create(dto: createDto): Promise<void>;
    update(dto: UpdateDTO): Promise<void>;
    delete(id: bigint): Promise<void>;
}
