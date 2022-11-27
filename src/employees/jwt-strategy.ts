import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { employees } from './employees.entity';
import { JwtPayloadITF } from './interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(employees)
    private employeesRepository: Repository<employees>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadITF): Promise<employees> {
    const { employees_id } = payload;
    const user = this.employeesRepository.findOneBy({ id: employees_id})

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
