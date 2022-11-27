import { CurrencyService } from './currency.service';
import { CorrencySet } from './dto/correncyset.dto';
export declare class CurrencyController {
    private readonly currencyService;
    constructor(currencyService: CurrencyService);
    index(): Promise<void>;
    set(dto: CorrencySet): Promise<void>;
}
