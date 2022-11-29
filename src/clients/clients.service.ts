import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientRegister } from './dto/Register.dto';
import { UpdateClient } from './dto/update.dto';
import { users } from './users.entity';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(users)
        private ClientRep: Repository<users>
    ) {}

    async register(dto: ClientRegister): Promise<void> {
        const client = new users();
        client.full_name = dto.full_name;
        client.phone = dto.phone;
        client.type = dto.type;
        client.about = dto.about;
        client.tin = dto.tin;

        try {
            await client.save();
        } catch (error) {
            console.log(error)
            if (error.code === 'ER_DUP_ENTRY') throw new HttpException('The phone field is required.', HttpStatus.UNPROCESSABLE_ENTITY);
            throw new InternalServerErrorException();
        }

        throw new HttpException({
            successful: true,
            code: 201,
            message: 'created',
            client
        }, HttpStatus.CREATED);
    }

    async GetAll (_query: { page: number; branch_id: number; }) {
        const current_page: number = _query.page |  0;
        const per_page: number = 60; 
    
        const find = await this.ClientRep.find({
            select: ['id', 'full_name', 'phone', 'type', 'tin', 'balance', 'about', 'registered_at'],
            take: per_page,
            skip: current_page
        });

        const summa = await this.ClientRep
        .createQueryBuilder('users')
        .select('SUM(balance)')
        .getRawOne();
        const payload: object = {
            current_page,
            per_page,
            last_page: 1,
            data: {
                debt: summa['SUM(balance)'],
                clients: find
            }
        }

        throw new HttpException({
            successful: true,
            code: 200,
            message: "successful",
            payload
        }, HttpStatus.OK)
    }

    async UpdateClient (dto: UpdateClient) {
        const client = await this.ClientRep.findOneBy({id: dto.client_id});
        client.about = dto.about;
    }
}
