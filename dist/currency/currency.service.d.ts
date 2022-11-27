import { Repository } from 'typeorm';
import { currencies } from './currency.entity';
import { CorrencySet } from './dto/correncyset.dto';
export declare class CurrencyService {
    private Currencies;
    constructor(Currencies: Repository<currencies>);
    index(): Promise<void>;
    set(dto: CorrencySet): Promise<void>;
    ByGet(corrency_id: number): Promise<currencies>;
}
