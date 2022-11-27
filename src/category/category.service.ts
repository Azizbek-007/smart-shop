import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { categories } from './categories.entity';
import { createDto } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(categories)
        private Categories: Repository<categories>
    ) {}

    async index (): Promise<void> {
        const payload: object = await this.Categories.find({
            select: ['id', 'name', 'min_percent', 'max_percent', 'whole_percent', 'min_product', 'deleted_at']
        });

        throw new HttpException({
            successful: true,
            code: 200,
            message: 'successful',
            payload
        }, HttpStatus.OK);

    }

    async create (dto: createDto): Promise<void> {
       
        const Categories = new categories()
        
        Categories.name = dto.name,
        Categories.min_percent = dto['percents']['min'],
        Categories.max_percent = dto['percents']['max'],
        Categories.whole_percent = dto['percents']['wholesale'],
        Categories.min_product = dto['percents']['min_product'];

        await Categories.save()
        
        throw new HttpException({
            successful: true,
            code: 201,
            message: 'successful',
            payload: Categories
        }, HttpStatus.CREATED);
    }

    async update (dto: UpdateDTO): Promise<void> {
        const findCategory = await this.Categories.findOneBy({ id: dto.category_id});
        if (!findCategory) throw new NotFoundException('category  id not found');
        findCategory.min_percent = dto['percents']['min'],
        findCategory.max_percent = dto['percents']['max'],
        findCategory.whole_percent = dto['percents']['wholesale'],
        findCategory.min_product = dto['percents']['min_product'];
        await findCategory.save();

        throw new HttpException({
            successful: true,
            code: 200,
            message: 'successful',
            findCategory
        }, HttpStatus.OK);
    }

    async delete (id :bigint) {
        const find = await this.Categories.softDelete({id: id});
        console.log(find)
        if (!find.affected){
            throw new NotFoundException('category_id not found');
        }
        throw new HttpException('deleted', HttpStatus.OK);
    }
} 
