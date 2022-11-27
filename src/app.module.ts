import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { EmployeesModule } from './employees/employees.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CurrencyModule } from './currency/currency.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ClientsModule } from './clients/clients.module';
import { OrdersModule } from './orders/orders.module';
import { ConsumptionsModule } from './consumptions/consumptions.module';
import { SalaryModule } from './salary/salary.module';
import { PaymentModule } from './payment/payment.module';
import { StatisticaModule } from './statistica/statistica.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { BranchModule } from './branch/branch.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(TypeOrmConfig),    
    EmployeesModule, 
    CategoryModule, 
    ProductModule, 
    CurrencyModule, 
    WarehouseModule, 
    ClientsModule, 
    OrdersModule, 
    ConsumptionsModule, 
    SalaryModule, 
    PaymentModule, 
    StatisticaModule, 
    IngredientsModule, 
    BranchModule, 
    CompanyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
