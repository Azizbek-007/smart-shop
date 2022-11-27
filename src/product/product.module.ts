import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { currencies } from 'src/currency/currency.entity';
import { ProductController } from './product.controller';
import { product } from './product.entity';
import { ProductService } from './product.service';

@Module({
    imports: [TypeOrmModule.forFeature([product, currencies])],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule {}
