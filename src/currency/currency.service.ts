import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { currencies } from './currency.entity';
import { CorrencySet } from './dto/correncyset.dto';

@Injectable()
export class CurrencyService {
    constructor(
        @InjectRepository(currencies)
        private Currencies: Repository<currencies>
    ) {}

    async  index (): Promise<void> {
        const findCurrencies = await this.Currencies.find({ select: ['id', 'name', 'code', 'rate']});
        if (findCurrencies.length == 0 ) throw new NotFoundException('currencies not found');
        throw new HttpException({
            successful: true,
            code: 200,
            message: 'succesful',
            payload: findCurrencies
        }, HttpStatus.OK);
    }

    async set (dto: CorrencySet): Promise<void> {
        const id = dto.currency_id;
        const rate = dto.rate;
        const FindCorrency  = await this.Currencies.findOneBy({ id });
        if ( FindCorrency === null ) {
            throw new NotFoundException("Coirrency Id not found");
        }
        FindCorrency.rate = rate;
        await FindCorrency.save();

        throw new HttpException({
            successful: true,
            code: 200,
            message: 'successful',
            FindCorrency
        }, HttpStatus.OK);
    }

    async ByGet (corrency_id: number): Promise<currencies> {
        return await this.Currencies.findOneBy({ id: corrency_id});
    }
    
}
