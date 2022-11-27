import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { employees } from './employees.entity';
import { JwtPayloadITF } from './interface/jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private employeesRepository;
    constructor(employeesRepository: Repository<employees>);
    validate(payload: JwtPayloadITF): Promise<employees>;
}
export {};
