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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const employees_entity_1 = require("./employees.entity");
let EmployeesService = class EmployeesService {
    constructor(employees, jwtService) {
        this.employees = employees;
        this.jwtService = jwtService;
    }
    async index() {
        const payload = await this.employees.find({
            select: ['id', 'avatar', 'name', 'phone', 'salary', 'flex', 'role']
        });
        throw new common_1.HttpException({
            successful: true,
            code: 200,
            message: 'successful',
            payload
        }, common_1.HttpStatus.OK);
    }
    async register(dto) {
        const Employees = new employees_entity_1.employees();
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(dto.password, salt);
        Employees.phone = dto.phone;
        Employees.avatar = dto.avatar;
        Employees.name = dto.name;
        Employees.password = hash;
        Employees.role = dto.role;
        Employees.pincode = dto.pincode;
        Employees.flex = String(dto.flex);
        Employees.salary = String(dto.salary);
        try {
            await Employees.save();
        }
        catch (error) {
            if (error.code == 'ER_DUP_ENTRY') {
                throw new common_1.HttpException('The phone field is required.', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
        return Employees;
    }
    async login(itf) {
        const phone = itf.phone;
        const password = itf.password;
        const pincode = itf.pincode;
        if (phone && password) {
            const foundEmploye = await this.employees.findOneBy({ phone });
            const isMatch = await bcrypt.compare(password, foundEmploye.password);
            if (!foundEmploye || !isMatch) {
                throw new common_1.UnauthorizedException('phone or password incorrect');
            }
            else {
                const token = this.jwtService.sign({ employees_id: foundEmploye.id });
                const payload = {
                    id: foundEmploye.id,
                    avatar: foundEmploye.avatar,
                    role: foundEmploye.role,
                    pincode: foundEmploye.pincode,
                    name: foundEmploye.name,
                    token
                };
                throw new common_1.HttpException({
                    successful: true,
                    code: 200,
                    message: 'successful',
                    payload
                }, common_1.HttpStatus.OK);
            }
        }
        else if (pincode) {
            const foundPincode = await this.employees.findOneBy({ pincode });
            if (!foundPincode) {
                throw new common_1.NotFoundException('Pin code not found');
            }
            const token = this.jwtService.sign({ employees_id: foundPincode.id });
            const payload = {
                id: foundPincode.id,
                avatar: foundPincode.avatar,
                role: foundPincode.role,
                pincode: foundPincode.pincode,
                name: foundPincode.name,
                token
            };
            throw new common_1.HttpException({
                successful: true,
                code: 200,
                message: 'successful',
                payload
            }, common_1.HttpStatus.OK);
        }
        else {
            throw new common_1.BadRequestException();
        }
    }
    async update(dto) {
        const Employefound = await this.employees.findOneBy({ id: dto.employees_id });
        if (Employefound) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(dto.password, salt);
            Employefound.phone = dto.phone,
                Employefound.avatar = dto.avatar,
                Employefound.name = dto.name,
                Employefound.password = hash,
                Employefound.role = dto.role,
                Employefound.pincode = dto.pincode;
            await Employefound.save();
            const payload = {
                id: Employefound.id,
                avatar: Employefound.avatar,
                role: Employefound.role,
                phone: Employefound.phone,
                name: Employefound.name
            };
            throw new common_1.HttpException({
                successful: true,
                code: 200,
                message: 'successful',
                payload
            }, common_1.HttpStatus.OK);
        }
        else {
            throw new common_1.NotFoundException('Employees not found');
        }
    }
    async random_pincode() {
        const pincode = Math.floor(Math.random() * (9999 - 1000) + 1000);
        throw new common_1.HttpException({
            successful: true,
            code: 200,
            message: 'successful',
            payload: {
                pincode
            }
        }, common_1.HttpStatus.OK);
    }
};
EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employees_entity_1.employees)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], EmployeesService);
exports.EmployeesService = EmployeesService;
//# sourceMappingURL=employees.service.js.map