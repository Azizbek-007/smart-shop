import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductCreateDto } from './dto/create.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor (
        private readonly productService: ProductService
    ) {}

    @Post()
    async create (@Body() dto: ProductCreateDto) {
        return await this.productService.create(dto);
    }

    @Put()
    async update () {

    }

    @Get()
    product (@Query() query): Promise<void> {
        
        return this.productService.GetAll(query);
    }

    @Get('/ingredient')
    async product_copy () {

    }

    @Get('qrcode/read')
    async qrcode_read (@Query() query: object, @Res() response: Response) {
        const file =  await this.productService.getQrCode(query);
        response.contentType('image/png');
        return response.send(file)
    }

    @Post('/export')
    async product_export () {

    }

    @Post('/import')
    async product_import () {

    }

    @Delete('/:id')
    async product_delete (@Param('id') _id: bigint) {
        await this.productService.Delete(_id);
    }
}
