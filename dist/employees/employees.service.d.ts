import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dto/register.dto';
import { UpdateDTO } from './dto/update.dto';
import { employees } from './employees.entity';
import { EmployeesITF } from './interface/employees.interface';
export declare class EmployeesService {
    private employees;
    private jwtService;
    constructor(employees: Repository<employees>, jwtService: JwtService);
    index(): Promise<employees[]>;
    register(dto: RegisterDTO): Promise<employees>;
    login(itf: EmployeesITF): Promise<void>;
    update(dto: UpdateDTO): Promise<void>;
    random_pincode(): Promise<void>;
}
