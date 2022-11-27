import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ProductCreateDto } from './dto/create.dto';
import { product } from './product.entity';
import { v4 as uuidv4 } from 'uuid';
import { currencies } from 'src/currency/currency.entity';
import { toFile } from 'qrcode';
import { readFile } from 'fs/promises';

@Injectable()
export class ProductService{
    constructor (
        @InjectRepository(product)
        private ProductRep: Repository<product>,
        @InjectRepository(currencies)
        private CurrenciesRep: Repository<currencies>
    ) {}

    async create (dto: ProductCreateDto): Promise<void> {
  
        const Product = new product()
        const uid = uuidv4()
        Product.category_id = dto.category_id;
        Product.name = dto.name;
        Product.brand = dto.brand;
        Product.cost_price = dto.cost_price;
        Product.min_price = dto.price_min;
        Product.max_price = dto.price_max;
        Product.whole_price = dto.price_wholesale;
        Product.uuid =uid;

        toFile(`/Users/muse/Desktop/1-sabaq/home/smart-shop/src/images/${uid}.png`, uid.toString(), function (err) {
            if (err) throw err
            console.log('done')
        })
        try {  
            await Product.save();
        } catch (error) {
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw new NotFoundException("Category ID not found");
            }
            console.log(error)
            throw new InternalServerErrorException();
        }
    
        throw new HttpException({
            successful: true,
            code: 201,
            message: 'Product Created',
            Product
        }, HttpStatus.CREATED);
      
    }
    
    async GetAll (params :object): Promise<void> {
        const search: string = params['search'];
        const count: number = params['count'];
        
        
        let payload = [];

        if (!search && !count) {
            const products = await this.ProductRep.find({relations: { category: true }});
            if(products.length == 0) throw new NotFoundException('product not found');

            for (const Product of products){
                const const_price = await this.CurrenciesRep.findOneBy({ id: Product['cost_price']['currency_id'] });
                const min_price = await this.CurrenciesRep.findOneBy({ id : Product['min_price']['currency_id'] });
                const max_price = await this.CurrenciesRep.findOneBy({ id: Product['max_price']['currency_id'] });
                const whole_price = await this.CurrenciesRep.findOneBy({ id: Product['whole_price']['currency_id']});

                payload.push({
                        id: Product['id'],
                        category_id: Product['category_id'],
                        category: Product['category'],
                        image: Product['image'],
                        name: Product['name'],
                        brand: Product['brand'],
                        cost_price: {
                            currency_id: Product['cost_price']['currency_id'],
                            name: const_price['name'],
                            code: const_price['code'],
                            price: Product['cost_price']['price']
                        },
                        min_price: {
                            currency_id: Product['cost_price']['currency_id'],
                            name: min_price['name'],
                            code: min_price['code'],
                            price: Product['min_price']['price']
                        },
                        max_price: {
                            currency_id: Product['cost_price']['currency_id'],
                            name: max_price['name'],
                            code: max_price['code'],
                            price: Product['max_price']['price']
                        },
                        whole_price: {
                            currency_id: Product['whole_price']['currency_id'],
                            name: whole_price['name'],
                            code: whole_price['code'],
                            price: Product['whole_price']['price']
                        },
                        warehouse : {
                            unit: {
                                id: '1',
                                name: 'name',
                                code: 'code'
                            },
                            count: 'count'
                        },
                        qr_code_base: `http://127.0.0.1:3000/product/qrcode/read?type=product&uuid=${Product['uuid']}`,
                        deleted_at: Product['deleted_at']
                    });
                
            };
        }else if (search){
            payload = await this.ProductRep.find({
                relations: {
                    category: true
                },
                where: {
                    name: Like(`%${search}%`)
                }
            });
            if(payload.length == 0) throw new NotFoundException('product not found')
        }
        throw new HttpException({
            successful: true,
            code: 200,
            message: 'successful',
            payload}, HttpStatus.OK);
    }

    async getQrCode(query: object): Promise<Buffer> {
        const Type: string = query['type'];
        const Uuid: string = query['uuid'];
        if (!Type || !Uuid) throw new BadRequestException("Type or Uuid Not Found");
   
        return readFile(`/Users/muse/Desktop/1-sabaq/home/smart-shop/src/images/${Uuid}.png`)
        .catch(err => {
            throw new NotFoundException('image not found');
        }) 
    }

    async Delete (product_id: bigint) {
        const find = await this.ProductRep.softDelete({ id: product_id });
        if (!find.affected){
            throw new NotFoundException('Product ID not found');
        }
        throw new HttpException('deleted', HttpStatus.OK);
    }



}

