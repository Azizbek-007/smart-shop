import { RegisterDTO } from './dto/register.dto';
import { UpdateDTO } from './dto/update.dto';
import { EmployeesITF } from './interface/employees.interface';
import { EmployeesService } from './employees.service';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    index(): Promise<import("./employees.entity").employees[]>;
    register(registerDTO: RegisterDTO): Promise<import("./employees.entity").employees>;
    login(itf: EmployeesITF): Promise<void>;
    update(updateDTO: UpdateDTO): Promise<void>;
    pincode_generate(): Promise<void>;
}
