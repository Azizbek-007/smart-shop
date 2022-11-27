import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDTO } from './dto/register.dto';
import { UpdateDTO } from './dto/update.dto';
import { employees } from './employees.entity';
import { EmployeesITF } from './interface/employees.interface';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(employees)
        private employees: Repository<employees>,
        private jwtService: JwtService
    ) {}

    async index (): Promise<employees[]> {
        const payload = await this.employees.find({
            select: ['id', 'avatar', 'name', 'phone', 'salary', 'flex', 'role']
        });
        throw new HttpException({
            successful: true,
            code: 200,
            message: 'successful',
            payload
        }, HttpStatus.OK)
    }
    async register (dto: RegisterDTO) {
        const Employees = new employees();
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
        } catch (error) {
            if (error.code == 'ER_DUP_ENTRY') {
                throw new HttpException('The phone field is required.', HttpStatus.UNPROCESSABLE_ENTITY);
            }else{
                throw new InternalServerErrorException();
            }
        }

        return Employees;
    }

    async login (itf: EmployeesITF) {
        const phone = itf.phone;
        const password = itf.password;
        const pincode = itf.pincode;

        if (phone && password) {
            const foundEmploye = await this.employees.findOneBy({ phone });
            const isMatch = await bcrypt.compare(password, foundEmploye.password);
            if (!foundEmploye || !isMatch) {
                throw new UnauthorizedException('phone or password incorrect');
            } else {
                const token: string = this.jwtService.sign({ employees_id: foundEmploye.id });
                
                const payload = {
                    id: foundEmploye.id,
                    avatar: foundEmploye.avatar,
                    role: foundEmploye.role,
                    pincode: foundEmploye.pincode,
                    name: foundEmploye.name,
                    token
                }
                    throw new HttpException({
                        successful: true,
                        code: 200,
                        message: 'successful',
                        payload
                    }, HttpStatus.OK);
            }
        }else if (pincode) {
            const foundPincode = await this.employees.findOneBy({ pincode });
            if (!foundPincode) {
                throw new NotFoundException('Pin code not found');
            }
            const token: string = this.jwtService.sign({ employees_id: foundPincode.id });
                
            const payload = {
                id: foundPincode.id,
                avatar: foundPincode.avatar,
                role: foundPincode.role,
                pincode: foundPincode.pincode,
                name: foundPincode.name,
                token
            };
            throw new HttpException({
                successful: true,
                code: 200,
                message: 'successful',
                payload
            }, HttpStatus.OK);
        }else {
            throw new BadRequestException();
        }
    }
    
    async update (dto: UpdateDTO) {
        const Employefound = await this.employees.findOneBy({ id: dto.employees_id});
        if (Employefound) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(dto.password, salt);

            Employefound.phone = dto.phone,
            Employefound.avatar =dto.avatar,
            Employefound.name = dto.name,
            Employefound.password =hash,
            Employefound.role = dto.role,
            Employefound.pincode = dto.pincode
            
            await Employefound.save();

            const payload = {
                id: Employefound.id,
                avatar: Employefound.avatar,
                role: Employefound.role,
                phone: Employefound.phone,
                name: Employefound.name
            };

            throw new HttpException({
                successful: true,
                code: 200,
                message: 'successful',
                payload
            }, HttpStatus.OK);
            
        }else{
            throw new NotFoundException('Employees not found')
        }
    }

    async random_pincode () {
        const pincode = Math.floor(Math.random() * (9999 - 1000) + 1000);
        throw new HttpException({
            successful: true,
            code: 200,
            message: 'successful',
            payload: {
                pincode
            }
        }, HttpStatus.OK);
    }
}
