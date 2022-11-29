import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { users } from './users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([users])],
    controllers: [ClientsController],
    providers: [ClientsService]
})

export class ClientsModule {}
