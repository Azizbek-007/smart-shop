"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
const uuid_1 = require("uuid");
const currency_entity_1 = require("../currency/currency.entity");
const qrcode_1 = require("qrcode");
const promises_1 = require("fs/promises");
let ProductService = class ProductService {
    constructor(ProductRep, CurrenciesRep) {
        this.ProductRep = ProductRep;
        this.CurrenciesRep = CurrenciesRep;
    }
    async create(dto) {
        const Product = new product_entity_1.product();
        const uid = (0, uuid_1.v4)();
        Product.category_id = dto.category_id;
        Product.name = dto.name;
        Product.brand = dto.brand;
        Product.cost_price = dto.cost_price;
        Product.min_price = dto.price_min;
        Product.max_price = dto.price_max;
        Product.whole_price = dto.price_wholesale;
        Product.uuid = uid;
        (0, qrcode_1.toFile)(`/Users/muse/Desktop/1-sabaq/home/smart-shop/src/images/${uid}.png`, uid.toString(), function (err) {
            if (err)
                throw err;
            console.log('done');
        });
        try {
            await Product.save();
        }
        catch (error) {
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw new common_1.NotFoundException("Category ID not found");
            }
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
        throw new common_1.HttpException({
            successful: true,
            code: 201,
            message: 'Product Created',
            Product
        }, common_1.HttpStatus.CREATED);
    }
    async GetAll(params) {
        const search = params['search'];
        const count = params['count'];
        let payload = [];
        if (!search && !count) {
            const products = await this.ProductRep.find({ relations: { category: true } });
            if (products.length == 0)
                throw new common_1.NotFoundException('product not found');
            for (const Product of products) {
                const const_price = await this.CurrenciesRep.findOneBy({ id: Product['cost_price']['currency_id'] });
                const min_price = await this.CurrenciesRep.findOneBy({ id: Product['min_price']['currency_id'] });
                const max_price = await this.CurrenciesRep.findOneBy({ id: Product['max_price']['currency_id'] });
                const whole_price = await this.CurrenciesRep.findOneBy({ id: Product['whole_price']['currency_id'] });
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
                    warehouse: {
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
            }
            ;
        }
        else if (search) {
            payload = await this.ProductRep.find({
                relations: {
                    category: true
                },
                where: {
                    name: (0, typeorm_2.Like)(`%${search}%`)
                }
            });
            if (payload.length == 0)
                throw new common_1.NotFoundException('product not found');
        }
        throw new common_1.HttpException({
            successful: true,
            code: 200,
            message: 'successful',
            payload
        }, common_1.HttpStatus.OK);
    }
    async getQrCode(query) {
        const Type = query['type'];
        const Uuid = query['uuid'];
        if (!Type || !Uuid)
            throw new common_1.BadRequestException("Type or Uuid Not Found");
        return (0, promises_1.readFile)(`/Users/muse/Desktop/1-sabaq/home/smart-shop/src/images/${Uuid}.png`)
            .catch(err => {
            throw new common_1.NotFoundException('image not found');
        });
    }
    async Delete(product_id) {
        const find = await this.ProductRep.softDelete({ id: product_id });
        if (!find.affected) {
            throw new common_1.NotFoundException('Product ID not found');
        }
        throw new common_1.HttpException('deleted', common_1.HttpStatus.OK);
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.product)),
    __param(1, (0, typeorm_1.InjectRepository)(currency_entity_1.currencies)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map