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
exports.CurrencyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const currency_entity_1 = require("./currency.entity");
let CurrencyService = class CurrencyService {
    constructor(Currencies) {
        this.Currencies = Currencies;
    }
    async index() {
        const findCurrencies = await this.Currencies.find({ select: ['id', 'name', 'code', 'rate'] });
        if (findCurrencies.length == 0)
            throw new common_1.NotFoundException('currencies not found');
        throw new common_1.HttpException({
            successful: true,
            code: 200,
            message: 'succesful',
            payload: findCurrencies
        }, common_1.HttpStatus.OK);
    }
    async set(dto) {
        const id = dto.currency_id;
        const rate = dto.rate;
        const FindCorrency = await this.Currencies.findOneBy({ id });
        if (FindCorrency === null) {
            throw new common_1.NotFoundException("Coirrency Id not found");
        }
        FindCorrency.rate = rate;
        await FindCorrency.save();
        throw new common_1.HttpException({
            successful: true,
            code: 200,
            message: 'successful',
            FindCorrency
        }, common_1.HttpStatus.OK);
    }
    async ByGet(corrency_id) {
        return await this.Currencies.findOneBy({ id: corrency_id });
    }
};
CurrencyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(currency_entity_1.currencies)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CurrencyService);
exports.CurrencyService = CurrencyService;
//# sourceMappingURL=currency.service.js.map