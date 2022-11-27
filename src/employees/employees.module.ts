import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { employees } from './employees.entity';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { JwtStrategy } from './jwt-strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([employees]),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({ secret: process.env.JWT_SECRET, 
            signOptions: {
                expiresIn: 3600
            }
        })
    ],
    controllers: [EmployeesController],
    providers: [EmployeesService, JwtStrategy],
    exports: [JwtStrategy, PassportModule]
})
export class EmployeesModule {}
