import { Controller, Get, Patch, Post } from '@nestjs/common';

@Controller('clients')
export class ClientsController {

    @Post('register')
    async register () {

    }

    @Get('/')
    async clients() {

    }

    @Patch('update')
    async update_client() {
        
    }
}
