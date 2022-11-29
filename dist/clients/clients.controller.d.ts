import { ClientsService } from './clients.service';
import { ClientRegister } from './dto/Register.dto';
import { UpdateClient } from './dto/update.dto';
export declare class ClientsController {
    private readonly ClientService;
    constructor(ClientService: ClientsService);
    register(dto: ClientRegister): Promise<void>;
    clients(_query: {
        page: number;
        branch_id: number;
    }): Promise<void>;
    update_client(dto: UpdateClient): Promise<void>;
}
