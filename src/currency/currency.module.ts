import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyController } from './currency.controller';
import { currencies } from './currency.entity';
import { CurrencyService } from './currency.service';

@Module({
  imports: [TypeOrmModule.forFeature([currencies])],
  controllers: [CurrencyController],
  providers: [CurrencyService]
})
export class CurrencyModule {}
