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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./users.entity");
let ClientsService = class ClientsService {
    constructor(ClientRep) {
        this.ClientRep = ClientRep;
    }
    async register(dto) {
        const client = new users_entity_1.users();
        client.full_name = dto.full_name;
        client.phone = dto.phone;
        client.type = dto.type;
        client.about = dto.about;
        client.tin = dto.tin;
        try {
            await client.save();
        }
        catch (error) {
            console.log(error);
            if (error.code === 'ER_DUP_ENTRY')
                throw new common_1.HttpException('The phone field is required.', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            throw new common_1.InternalServerErrorException();
        }
        throw new common_1.HttpException({
            successful: true,
            code: 201,
            message: 'created',
            client
        }, common_1.HttpStatus.CREATED);
    }
    async GetAll(_query) {
        const current_page = _query.page | 0;
        const per_page = 60;
        const find = await this.ClientRep.find({
            select: ['id', 'full_name', 'phone', 'type', 'tin', 'balance', 'about', 'registered_at'],
            take: per_page,
            skip: current_page
        });
        const summa = await this.ClientRep
            .createQueryBuilder('users')
            .select('SUM(balance)')
            .getRawOne();
        const payload = {
            current_page,
            per_page,
            last_page: 1,
            data: {
                debt: summa['SUM(balance)'],
                clients: find
            }
        };
        throw new common_1.HttpException({
            successful: true,
            code: 200,
            message: "successful",
            payload
        }, common_1.HttpStatus.OK);
    }
    async UpdateClient(dto) {
        const client = await this.ClientRep.findOneBy({ id: dto.client_id });
        client.about = dto.about;
    }
};
ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientsService);
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map