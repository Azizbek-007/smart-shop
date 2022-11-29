import { Repository } from 'typeorm';
import { ClientRegister } from './dto/Register.dto';
import { UpdateClient } from './dto/update.dto';
import { users } from './users.entity';
export declare class ClientsService {
    private ClientRep;
    constructor(ClientRep: Repository<users>);
    register(dto: ClientRegister): Promise<void>;
    GetAll(_query: {
        page: number;
        branch_id: number;
    }): Promise<void>;
    UpdateClient(dto: UpdateClient): Promise<void>;
}
