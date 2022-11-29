import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientRegister } from './dto/Register.dto';
import { UpdateClient } from './dto/update.dto';

@Controller('client')
export class ClientsController {
    constructor(
        private readonly ClientService: ClientsService
    ) {}

    @Post('register')
    async register (@Body() dto: ClientRegister) {
        dto.tin = dto.type == 'Y'? dto.tin : 'null';
        await this.ClientService.register(dto);
    }

    @Get('/')
    async clients(@Query() _query: {page: number, branch_id: number}) {
        await this.ClientService.GetAll(_query);
    }

    @Patch('update')
    async update_client(@Body() dto: UpdateClient) {
        await this.ClientService.UpdateClient(dto);
    }
}
