import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDTO } from './dto/register.dto';
import { UpdateDTO } from './dto/update.dto';
import { EmployeesITF } from './interface/employees.interface';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
    constructor(
        private readonly employeesService: EmployeesService
    ) {}
    
    @UseGuards(AuthGuard())
    @Get()
    async index () {
        return await this.employeesService.index();
    }

    @Post('register')
    async register (@Body() registerDTO: RegisterDTO) {
        return this.employeesService.register(registerDTO);
    }

    @Post('login')
    async login (@Body() itf: EmployeesITF) {
        return await this.employeesService.login(itf);
    }

    @UseGuards(AuthGuard())
    @Patch('update')
    async update (@Body() updateDTO: UpdateDTO) {
        return await this.employeesService.update(updateDTO);
    }

    @Get('pincode/generate')
    async pincode_generate () {
        await this.employeesService.random_pincode();
    }
    
}
