import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CorrencySet } from './dto/correncyset.dto';

@Controller('currency')
export class CurrencyController {
    constructor(
        private readonly currencyService: CurrencyService
    ) {}

    @Get()
    async index () {
        return await this.currencyService.index();
    }

    @Post()
    async set(@Body() dto: CorrencySet) {
        return await this.currencyService.set(dto);
    }
}
