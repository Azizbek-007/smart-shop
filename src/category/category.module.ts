import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from 'src/employees/employees.module';
import { categories } from './categories.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
    imports: [TypeOrmModule.forFeature([categories]), EmployeesModule],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule {}
