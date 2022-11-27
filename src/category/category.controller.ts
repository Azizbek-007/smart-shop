import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from './category.service';
import { createDto } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@UseGuards(AuthGuard())
@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @Get()
    async index (): Promise<void> {
        return await this.categoryService.index();
    }

    @Post()
    async create (@Body() dto: createDto): Promise<void> {
        return await this.categoryService.create(dto);
    }

    @Patch()
    async update (@Body() dto: UpdateDTO): Promise<void> {
        return await this.categoryService.update(dto);
    }

    @Delete('/:id')
    async delete (@Param('id') id: bigint): Promise<void> {
        return await this.categoryService.delete(id);
    }
}


