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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const categories_entity_1 = require("./categories.entity");
let CategoryService = class CategoryService {
    constructor(Categories) {
        this.Categories = Categories;
    }
    async index() {
        const payload = await this.Categories.find({
            select: ['id', 'name', 'min_percent', 'max_percent', 'whole_percent', 'min_product', 'deleted_at']
        });
        throw new common_1.HttpException({
            successful: true,
            code: 200,
            message: 'successful',
            payload
        }, common_1.HttpStatus.OK);
    }
    async create(dto) {
        const Categories = new categories_entity_1.categories();
        Categories.name = dto.name,
            Categories.min_percent = dto['percents']['min'],
            Categories.max_percent = dto['percents']['max'],
            Categories.whole_percent = dto['percents']['wholesale'],
            Categories.min_product = dto['percents']['min_product'];
        await Categories.save();
        throw new common_1.HttpException({
            successful: true,
            code: 201,
            message: 'successful',
            payload: Categories
        }, common_1.HttpStatus.CREATED);
    }
    async update(dto) {
        const findCategory = await this.Categories.findOneBy({ id: dto.category_id });
        if (!findCategory)
            throw new common_1.NotFoundException('category  id not found');
        findCategory.min_percent = dto['percents']['min'],
            findCategory.max_percent = dto['percents']['max'],
            findCategory.whole_percent = dto['percents']['wholesale'],
            findCategory.min_product = dto['percents']['min_product'];
        await findCategory.save();
        throw new common_1.HttpException({
            successful: true,
            code: 200,
            message: 'successful',
            findCategory
        }, common_1.HttpStatus.OK);
    }
    async delete(id) {
        const find = await this.Categories.softDelete({ id: id });
        console.log(find);
        if (!find.affected) {
            throw new common_1.NotFoundException('category_id not found');
        }
        throw new common_1.HttpException('deleted', common_1.HttpStatus.OK);
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categories_entity_1.categories)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map